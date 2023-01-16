import React, { useState, useCallback, useEffect, memo } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import {
  AVATAR_DEFAULT,
  DATE_DEFAULT,
  INPUT_EMPTY_DEFAULT,
  SELECT_OPTIONS_DEFAULT,
} from "@constants/default";
import classes from "./index.module.sass";
import { getDateISOSString } from "@helpers/date";
import { USERS_ROUTE } from "@constants";
import * as API from "@utils/api";
import { rules } from "./TicketRules";
import { DropDown, Input, Search, TextArea, Button } from "@components";
import { validate } from "@src/utils/validate";
import { OK, TICKET_ROUTE } from "@src/constants";

function FormTicket({ ticket, onSubmit }) {
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
  const [user, setUser] = useState({ id: formData?.assignBy });
  const [formValid, setFormValid] = useState();
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  const statuses = JSON.parse(localStorage.getItem("statuses"));
  const priorities = JSON.parse(localStorage.getItem("priorities"));

  useEffect(() => {
    formValid &&
      Object.values(formValid).every((item) => item === undefined) &&
      setDisabled(false);
  }, [formValid]);

  useEffect(() => {
    async function getUser() {
      const response = await API.get(`${USERS_ROUTE}/${user?.id}`);
      if (response.status === OK) {
        const user = response.data;
        setUser(user);
      }
    }

    getUser();
  }, []);

  useEffect(() => {
    setFormData({ ...formData, assignBy: user?.id });
  }, [user]);

  const handleSelect = useCallback(({ id, avatar, name }) => {
    setUser({ id, avatar, name });
  }, []);

  const handleSearchUsers = useCallback(async (query) => {
    const response = await API.get(`${USERS_ROUTE}?_query=${query}`);
    const users = response.data;
    return users;
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      setDisabled(true);
      event.preventDefault();
      const errorMessage = validate.validateForm(formData, rules);
      let currentErrorMessage = { ...formValid, ...errorMessage };
      if (
        formData &&
        Object.values(currentErrorMessage).every((item) => item === undefined)
      ) {
        const loginMessage = await onSubmit(formData);
        if (loginMessage)
          currentErrorMessage = { ...errorMessage, ...loginMessage };
      }
      setDisabled(false);
      setFormValid(currentErrorMessage);
    },
    [formData, formValid, onSubmit]
  );

  const handleChangeControl = useCallback((value, field) => {
    if (field === "status" || field === "priority") value = parseInt(value, 10);
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleValidControl = useCallback((value, field) => {
    const errorMessage = validate.validateField(value, rules[field]);
    errorMessage &&
      setFormValid((prev) => ({ ...prev, [field]: errorMessage }));
  }, []);

  const handleBlurControl = useCallback(
    (value, field) => {
      handleValidControl(value, field);
    },
    [handleValidControl]
  );

  const handleFocusControl = useCallback((value, field) => {
    setFormValid((prev) => ({ ...prev, [field]: undefined }));
  }, []);

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
            errorMessage={formValid?.assignBy}
            tabIndex={1}
            label="Assign By"
            onSearch={handleSearchUsers}
            onSelect={handleSelect}
            onBlur={handleBlurControl}
            onFocus={handleFocusControl}
            disabled
          />

          {ticket && (
            <Input
              label="Create Date"
              value={getDateISOSString(formData.createDate)}
              type="date"
              disabled
              tabIndex={2}
            />
          )}
        </span>

        <span className={classes["form-ticket__row"]}>
          <Input
            label="Name"
            value={formData.name}
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
            value={getDateISOSString(formData.dueDate)}
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
            value={formData.status}
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
            value={formData.priority}
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
            value={formData.description}
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
