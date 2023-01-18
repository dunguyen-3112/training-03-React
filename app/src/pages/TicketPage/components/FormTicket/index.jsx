import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import React, { useState, useCallback, useEffect, memo } from "react";

import {
  AVATAR_DEFAULT,
  DATE_DEFAULT,
  INPUT_EMPTY_DEFAULT,
  SELECT_OPTIONS_DEFAULT,
} from "@constants/default";
import { OK, TICKET_ROUTE, USERS_ROUTE } from "@constants";
import * as API from "@utils/api";
import { getDateISOSString } from "@helpers/date";
import { validate } from "@src/utils/validate";
import { rules } from "./TicketRules";
import { DropDown, Input, Search, TextArea, Button } from "@components";
import classes from "./index.module.sass";

function FormTicket({ ticket, onSubmit }) {
  // Ticket Data
  const [formData, setFormData] = useState(
    ticket || {
      assignBy: INPUT_EMPTY_DEFAULT,
      name: INPUT_EMPTY_DEFAULT,
      description: INPUT_EMPTY_DEFAULT,
      dueDate: DATE_DEFAULT,
      createDate: DATE_DEFAULT,
      status: SELECT_OPTIONS_DEFAULT,
      priority: SELECT_OPTIONS_DEFAULT,
    }
  );
  // Data valid
  const [formValid, setFormValid] = useState();
  // User assign By
  const [user, setUser] = useState();
  // Disiable Button submit
  const [disabled, setDisabled] = useState(false);

  const navigate = useNavigate();

  // Get Statuses and Prioriries from localStorage
  const statuses = JSON.parse(localStorage.getItem("statuses"));
  const priorities = JSON.parse(localStorage.getItem("priorities"));

  // Check Form valid and Form data change to update State Disiable Button Submit
  useEffect(() => {
    const disabledButton = () => {
      if (ticket === undefined)
        if (
          formValid &&
          Object.values(formValid).every((item) => item === undefined)
        )
          return setDisabled(false);

      if (ticket) {
        const { assignBy, name, description, dueDate, status, priority } =
          ticket;
        if (
          // If data has changed
          assignBy !== formData.assignBy ||
          name !== formData.name ||
          description !== formData.description ||
          formData.dueDate !== dueDate ||
          status !== formData.status ||
          priority !== formData.priority
        )
          return setDisabled(false);
      }
      setDisabled(true);
    };

    disabledButton();
  }, [formData, ticket, formValid]);

  // Update State user when id change
  useEffect(() => {
    async function getUser() {
      const id = user?.id || formData.assignBy;
      if (id) {
        const response = await API.get(`${USERS_ROUTE}/${id}`);
        if (response.status === OK) {
          const user = response.data;
          setUser(user);
          setFormData((prev) => ({ ...prev, assignBy: user.id }));
        }
      }
    }
    getUser();
  }, [formData.assignBy, user?.id]);

  // get data user from search
  const handleSelect = useCallback(({ id, avatar, name }) => {
    setUser({ id, avatar, name });
  }, []);

  // handle search user like name
  const handleSearchUsers = useCallback(async (query) => {
    const response = await API.get(`${USERS_ROUTE}?_query=${query}`);
    const users = response.data;
    return users;
  }, []);

  // handle submit form
  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      // Disible button submit
      setDisabled(true);
      // Valid form data
      const errorMessage = validate.validateForm(formData, rules);
      let currentErrorMessage = { ...formValid, ...errorMessage };
      // Check form data hasn't valid
      if (
        Object.values(currentErrorMessage).every((item) => item === undefined)
      ) {
        onSubmit(formData);
      }
      setDisabled(false);
      setFormValid(currentErrorMessage);
    },
    [formData, formValid, onSubmit]
  );

  // Handle input change
  const handleChangeControl = useCallback((value, field) => {
    if (field === "status" || field === "priority") value = parseInt(value, 10);
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  // Handle valid control
  const handleValidControl = useCallback((value, field) => {
    const errorMessage = validate.validateField(value, rules[field]);
    errorMessage &&
      setFormValid((prev) => ({ ...prev, [field]: errorMessage }));
  }, []);

  // Handle valid onBlur
  const handleBlurControl = useCallback(
    (value, field) => {
      handleValidControl(value, field);
    },
    [handleValidControl]
  );

  // Handle valid onFocus
  const handleFocusControl = useCallback((value, field) => {
    setFormValid((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  // Handle back to List Ticket
  const handleBack = useCallback(
    (event) => {
      event.preventDefault();
      navigate(`/${TICKET_ROUTE}`);
    },
    [navigate]
  );

  return (
    <div className={`${classes.form__container} flex`}>
      <form data-id={formData.id} className={classes["form-ticket"]}>
        <span className={classes["form-ticket__row"]}>
          <Search
            value={user?.name}
            field="assignBy"
            errorMessage={formValid?.assignBy || INPUT_EMPTY_DEFAULT}
            tabIndex={1}
            label="Assign By"
            onSearch={handleSearchUsers}
            onSelect={handleSelect}
            onBlur={handleBlurControl}
            onFocus={handleFocusControl}
          />

          {ticket && (
            <Input
              label="Create Date"
              value={getDateISOSString(formData.createDate || DATE_DEFAULT)}
              type="date"
              disabled
              tabIndex={2}
            />
          )}
        </span>

        <span className={classes["form-ticket__row"]}>
          <Input
            label="Name"
            value={formData.name || INPUT_EMPTY_DEFAULT}
            type="text"
            onBlur={handleBlurControl}
            onFocus={handleFocusControl}
            onChange={handleChangeControl}
            tabIndex={3}
            field="name"
            errorMessage={formValid?.name}
          />

          <Input
            label="Due Date"
            value={getDateISOSString(formData.dueDate || DATE_DEFAULT)}
            type="date"
            onBlur={handleBlurControl}
            onFocus={handleFocusControl}
            onChange={handleChangeControl}
            tabIndex={4}
            field="dueDate"
            errorMessage={formValid?.dueDate}
          />
        </span>

        <span className={classes["form-ticket__row"]}>
          <DropDown
            label="Status"
            options={statuses}
            value={formData.status || SELECT_OPTIONS_DEFAULT}
            onFocus={handleFocusControl}
            onBlur={handleBlurControl}
            onChange={handleChangeControl}
            field="status"
            tabIndex={5}
            errorMessage={formValid?.status}
          />

          <DropDown
            label="Priority"
            options={priorities}
            value={formData.priority || SELECT_OPTIONS_DEFAULT}
            onFocus={handleFocusControl}
            onBlur={handleBlurControl}
            onChange={handleChangeControl}
            field="priority"
            tabIndex={6}
            errorMessage={formValid?.priority}
          />
        </span>

        <span className={classes["form-ticket__row"]}>
          <TextArea
            label="Description"
            tabIndex={7}
            value={formData.description || INPUT_EMPTY_DEFAULT}
            onFocus={handleFocusControl}
            onBlur={handleBlurControl}
            onChange={handleChangeControl}
            field="description"
            errorMessage={formValid?.description}
          />
        </span>

        <span className={classes["form__action"]}>
          <Button
            tabIndex={8}
            type="submit"
            onClick={handleSubmit}
            disabled={disabled}
          >
            <span className={classes["item__title"]}>Save</span>
          </Button>

          <Button onClick={handleBack} tabIndex={9}>
            <span className={classes["item__title"]}>Back</span>
          </Button>
        </span>
      </form>

      <div className={classes["user__info"]}>
        <figure className={classes["user-info__avatar"]}>
          <img src={user?.avatar || AVATAR_DEFAULT} alt="" />
        </figure>
      </div>
    </div>
  );
}

FormTicket.propTypes = {
  ticket: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default memo(FormTicket);
