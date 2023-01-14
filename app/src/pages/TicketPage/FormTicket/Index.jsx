import React, { useState, useCallback, useEffect, useRef, memo } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import {
  DATE_DEFAULT,
  INPUT_EMPTY_DEFAULT,
  SELECT_OPTIONS_DEFAULT,
} from "@constants/default";
import classes from "./index.module.sass";
import { getDateISOSString } from "@helpers/date";
import { Button } from "@components/Uis";
import { USERS_ROUTE } from "@constants";
import * as API from "@utils/api";
import { OK } from "@constants";
import { rules } from "./TicketRules";
import { DropDown, Input, Search, TextArea } from "@components/Forms";

function FormTicket({ ticket, callback }) {
  const [formDataTicket, setFormDataTicket] = useState(
    ticket || {
      assignBy: INPUT_EMPTY_DEFAULT,
      name: INPUT_EMPTY_DEFAULT,
      description: INPUT_EMPTY_DEFAULT,
      dueDate: INPUT_EMPTY_DEFAULT,
      createDate: INPUT_EMPTY_DEFAULT,
      status: SELECT_OPTIONS_DEFAULT,
      priority: SELECT_OPTIONS_DEFAULT,
    }
  );
  const [user, setUser] = useState();
  const [formError, setFormError] = useState();
  const navigate = useNavigate();
  const formRef = useRef();

  const statuses = JSON.parse(localStorage.getItem("statuses"));
  const priorities = JSON.parse(localStorage.getItem("priorities"));

  useEffect(() => {
    const assignBy = ticket?.assignBy;
    if (assignBy) {
      handleFetchUser(assignBy);
    }
    if (formError === undefined) {
      const formDatakeys = Object.keys(formDataTicket);
      const t = {};
      for (const key of formDatakeys) {
        const listRule = rules[key];
        if (listRule !== undefined) {
          t[key] = {
            status: false,
            message: INPUT_EMPTY_DEFAULT,
          };
        }
      }
      setFormError(t);
    }
  }, [formDataTicket, formError, ticket?.assignBy]);

  const handleFetchUser = useCallback(async (id) => {
    const response = await API.get(`/${USERS_ROUTE}/${id}`);
    if (response.status === OK) {
      const data = response.data;
      setUser(data);
    }
  }, []);

  const handleSelect = useCallback(
    ({ id, avatar, name }) => {
      setFormDataTicket({ ...formDataTicket, assignBy: id });
      setUser({ id, avatar, name });
    },
    [formDataTicket]
  );

  const handleSearchUsers = useCallback(async (query) => {
    const response = await API.get(`/${USERS_ROUTE}?_query=${query}`);
    const users = response.data;
    return users;
  }, []);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (formDataTicket) {
        const formDatakeys = Object.keys(formDataTicket);
        const errors = {};
        for (const key of formDatakeys) {
          const listRule = rules[key];
          if (listRule !== undefined) {
            const value = formDataTicket[key];
            for (const rule of listRule) {
              const check = !rule.validator(value);
              errors[key] = { status: check, message: rule.message };
              if (check) break;
            }
          }
        }

        for (const key in errors) {
          if (!errors[key].status) delete errors[key];
        }
        if (Object.keys(errors).length === 0) {
          callback(formDataTicket);
        }
        setFormError(errors);
      }
    },
    [callback, formDataTicket]
  );

  const handleValid = useCallback(
    (name) => {
      if (formError && formError[name])
        setFormError({ ...formError, [name]: { status: false, message: "" } });
    },
    [formError]
  );

  const handleChangeDropdown = useCallback(
    (event, name) => {
      setFormDataTicket({
        ...formDataTicket,
        [name]: parseInt(event.target.value),
      });
      handleValid(name);
    },
    [formDataTicket, handleValid]
  );

  return (
    <div className={`${classes.form__container} flex`}>
      <form
        ref={formRef}
        data-id={formDataTicket?.id}
        className={classes["form-ticket"]}
      >
        <span className={classes["form-ticket__row"]}>
          <Input
            title="Assign By"
            value={user?.name || INPUT_EMPTY_DEFAULT}
            message=""
            valid={formError?.assignBy}
            disabled
            type="text"
            onChange={(event) =>
              setFormDataTicket({
                ...formDataTicket,
                assignBy: event.target.value,
              })
            }
            tabIndex={2}
          />

          {ticket && (
            <Input
              title="Create Date"
              value={getDateISOSString(
                formDataTicket?.createDate || DATE_DEFAULT
              )}
              type="date"
              disabled
              tabIndex={2}
            />
          )}
        </span>

        <span className={classes["form-ticket__row"]}>
          <Input
            title="Name"
            value={formDataTicket?.name || INPUT_EMPTY_DEFAULT}
            type="text"
            valid={formError?.name}
            message="Field name is required"
            onKeyDown={() => handleValid("name")}
            onChange={(event) =>
              setFormDataTicket({ ...formDataTicket, name: event.target.value })
            }
            tabIndex={1}
          />

          <Input
            title="Due Date"
            value={getDateISOSString(formDataTicket?.dueDate || DATE_DEFAULT)}
            valid={formError?.dueDate}
            type="date"
            onKeyDown={() => handleValid("dueDate")}
            onChange={(event) =>
              setFormDataTicket({
                ...formDataTicket,
                dueDate: event.target.value,
              })
            }
            tabIndex={2}
          />
        </span>

        <span className={classes["form-ticket__row"]}>
          <DropDown
            title="Status"
            options={statuses}
            valid={formError?.status}
            value={formDataTicket?.status || SELECT_OPTIONS_DEFAULT}
            onChange={(event) => handleChangeDropdown(event, "status")}
            tabIndex={3}
          />

          <DropDown
            title="Priority"
            options={priorities}
            valid={formError?.priority}
            value={formDataTicket?.priority || SELECT_OPTIONS_DEFAULT}
            onChange={(event) => handleChangeDropdown(event, "priority")}
            tabIndex={4}
          />
        </span>

        <span className={classes["form-ticket__row"]}>
          <TextArea
            title="Description"
            valid={formError?.description}
            tabIndex={5}
            message={formError?.description?.message}
            onKeyDown={() => handleValid("description")}
            value={
              (formDataTicket?.description && formDataTicket?.description) ||
              INPUT_EMPTY_DEFAULT
            }
            onChange={(event) =>
              setFormDataTicket({
                ...formDataTicket,
                description: event.target.value,
              })
            }
          />
        </span>

        <span className={classes["form__action"]}>
          <Button tabIndex={6} type="submit" onClick={handleSubmit}>
            <span className={classes["item__title"]}>Save</span>
          </Button>

          <Button onClick={() => navigate("/tickets")} tabIndex={6}>
            <span className={classes["item__title"]}>Back</span>
          </Button>
        </span>
      </form>

      <div className={classes["user__info"]}>
        <Search onSearch={handleSearchUsers} onSelect={handleSelect} />
        <figure className={classes["user-info__avatar"]}>
          <img
            src={
              user?.avatar ||
              "https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg"
            }
            alt=""
          />
          <figcaption>{user?.name || INPUT_EMPTY_DEFAULT}</figcaption>
        </figure>
      </div>
    </div>
  );
}

FormTicket.propTypes = {
  ticket: PropTypes.object,
  callback: PropTypes.func,
};

export default memo(FormTicket);
