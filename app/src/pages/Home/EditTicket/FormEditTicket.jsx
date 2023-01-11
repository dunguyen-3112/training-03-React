import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  memo,
  useCallback,
} from "react";
import { PropTypes } from "prop-types";
import { useNavigate } from "react-router-dom";

import { Input } from "../../../components/Forms/Input";
import { DropDown } from "../../../components/Forms/DropDown";
import { TextReal } from "../../../components/Forms/TextArea";
import { useFetch } from "../../../hooks";
import classes from "../TicketPage.module.sass";
import { getDateISOSString } from "../../../helpers/date";
import { Button } from "../../../components/Uis/Button";
import { Context } from "../../../context/Context";
import { validate } from "../../../utils/validate";
import { getFormData } from "../../../utils/form";
import { Search } from "../../../components/Forms/Search";
import * as API from "../../../utils/api";

function FormEditTicket({ ticketId }) {
  const [loading, data, error] = useFetch(`/tickets?_ticketId=${ticketId}`);
  const [ticket, setTicket] = useState(data);
  const formRef = useRef(null);
  const [loading1, data1, error1] = useFetch(`/users/${ticket?.assignBy}`);
  const [user, setUser] = useState();

  let { statuses, priorities } = useContext(Context);
  statuses = statuses || JSON.parse(localStorage.getItem("statuses"));
  priorities = priorities || JSON.parse(localStorage.getItem("priorities"));
  const navigate = useNavigate();

  useEffect(() => {
    setTicket(data);
  }, [data, loading, error]);

  useEffect(() => {
    setUser(data1);
  }, [data1, loading1, error1, ticket, user]);

  const handleSearchUsers = useCallback(async (query) => {
    const response = await API.get(`/users?_query=${query}`);
    const users = response.data.data;
    return users;
  }, []);

  const handleSelect = useCallback(
    (id) => {
      setTicket({ ...ticket, assignBy: id });
    },
    [ticket]
  );

  const handleEdit = useCallback(async () => {
    const { name, assign_by, priority, id, status, description, due_date } =
      getFormData(formRef.current);
    const data = {
      name,
      id,
      priority,
      assignBy: assign_by,
      status,
      description,
      dueDate: due_date,
    };
    const response = await API.update(`/tickets/${id}`, data);
    console.log(response);
    navigate("/tickets");
  }, []);

  useEffect(() => {
    const form = formRef.current;
    if (form) {
      const formData = getFormData(form);
      if (formData) {
        validate(
          form,
          [
            {
              selector: "name",
              parentSelector: ".form-group",
              messageSelector: ".form-message",
              rules: [
                {
                  validator: (value) => validate.isRequired(value),
                  message: "Name is required",
                },
                {
                  validator: (value) => validate.minLength(value, 6),
                  message: "Name min length is 6 characters!",
                },
              ],
            },
            {
              selector: "description",
              parentSelector: ".form-group",
              messageSelector: ".form-message",
              rules: [
                {
                  validator: (value) => validate.isRequired(value),
                  message: "Description is required",
                },
                {
                  validator: (value) => validate.minLength(value, 20),
                  message: "Description min length is 20 characters!",
                },
              ],
            },
            {
              selector: "status",
              parentSelector: ".form-group",
              messageSelector: ".form-message",
              rules: [
                {
                  validator: (value) => validate.isRequired(value),
                  message: "Status is required",
                },
              ],
            },
            {
              selector: "priority",
              parentSelector: ".form-group",
              messageSelector: ".form-message",
              rules: [
                {
                  validator: (value) => validate.isRequired(value),
                  message: "Priority is required",
                },
              ],
            },
            {
              selector: "due_date",
              parentSelector: ".form-group",
              messageSelector: ".form-message",
              rules: [
                {
                  validator: (value) => validate.isRequired(value),
                  message: "Due date is required",
                },
                {
                  validator: (value) => validate.isDate(value),
                  message: "Date is Invalid",
                },
              ],
            },
          ],
          handleEdit
        );
      }
    }
  }, [formRef, handleEdit, data]);

  if (loading || ticket === null)
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  if (
    error ||
    ticket === null ||
    statuses === undefined ||
    priorities === undefined
  )
    return (
      <div>
        <p>{error.message}</p>
      </div>
    );
  return (
    <div className={classes["form__ticket"]}>
      <form ref={formRef} data-id={ticket?.id}>
        <span className={classes["form-row"]}>
          <Input
            title="Name"
            value={`${ticket?.name}`}
            message=""
            placeholder=""
            type="text"
            onChange={(event) =>
              setTicket({ ...ticket, name: event.target.value })
            }
            tabIndex={1}
          />
          <Input
            title="Due Date"
            value={getDateISOSString(ticket?.dueDate)}
            message=""
            placeholder=""
            type="date"
            onChange={(event) =>
              setTicket({
                ...ticket,
                dueDate: event.target.value,
              })
            }
            tabIndex={2}
          />
        </span>
        <span className={classes["form-row"]}>
          <Input
            title="Create Date"
            value={getDateISOSString(ticket?.createDate)}
            message=""
            placeholder=""
            type="date"
            disabled
            onChange={(event) =>
              setTicket({
                ...ticket,
                createDate: event.target.value,
              })
            }
            tabIndex={2}
          />
          <Input
            title="Assign By"
            value={ticket?.assignBy}
            message=""
            placeholder=""
            type="text"
            onChange={(event) =>
              setTicket({
                ...ticket,
                assignBy: event.target.value,
              })
            }
            tabIndex={2}
          />
        </span>
        <span className={classes["form-row"]}>
          <DropDown
            title="Status"
            options={statuses}
            value={ticket?.status}
            onChange={(event) =>
              setTicket({ ...ticket, status: event.target.value })
            }
            tabIndex={3}
          />
          <DropDown
            title="Priority"
            options={priorities}
            value={ticket?.priority}
            onChange={(event) =>
              setTicket({
                ...ticket,
                priority: event.target.value,
              })
            }
            tabIndex={4}
          />
        </span>
        <span className={classes["form-row"]}>
          <TextReal
            title="Description"
            value={ticket?.description}
            onChange={(event) =>
              setTicket({
                ...ticket,
                description: event.target.value,
              })
            }
            tabIndex={5}
          />
        </span>
        <span className={classes["nav__action"]}>
          <Button tabIndex={6}>
            <span className={classes["item__title"]}>Save</span>
          </Button>
          <Button onClick={() => navigate("/tickets")} tabIndex={6}>
            <span className={classes["item__title"]}>Cancel</span>
          </Button>
        </span>
      </form>
      <div className={classes["info"]}>
        <Search
          onSearch={handleSearchUsers}
          title="AssignBy"
          onSelect={handleSelect}
        />
        <figure className={classes["avatar"]}>
          <img
            src={
              user?.avatar ||
              "https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg"
            }
            alt=""
          />
          <figcaption>{data1?.name || ""}</figcaption>
        </figure>
      </div>
    </div>
  );
}

FormEditTicket.propTypes = {
  onSubmit: PropTypes.func,
  ticketId: PropTypes.string,
};

export default memo(FormEditTicket);