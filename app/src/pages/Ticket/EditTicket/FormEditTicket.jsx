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
import classes from "../TicketPage.module.sass";
import { getDateISOSString } from "../../../helpers/date";
import { Button } from "../../../components/Uis/Button";
import { Context } from "../../../context/Context";
import { validate } from "../../../utils/validate";
import { getFormData } from "../../../utils/form";
import { Search } from "../../../components/Forms/Search";
import * as API from "../../../utils/api";
import { OK } from "../../../constants/statusCodes";
import { useFetch } from "../../../hooks";
import { USERS_ROUTE } from "../../../constants/routes";

function FormEditTicket({ data }) {
  const [ticket, setTicket] = useState(data);
  const [loading, userCurent, error] = useFetch(
    `${USERS_ROUTE}/${ticket.assignBy}`
  );
  const formRef = useRef(null);
  const [user, setUser] = useState();

  let { statuses, priorities } = useContext(Context);
  statuses = statuses || JSON.parse(localStorage.getItem("statuses"));
  priorities = priorities || JSON.parse(localStorage.getItem("priorities"));
  const navigate = useNavigate();

  const handleSearchUsers = useCallback(async (query) => {
    const response = await API.get(`/users?_query=${query}`);
    const users = response.data;
    return users;
  }, []);

  useEffect(() => setUser(userCurent), [userCurent, error, loading]);

  const handleSelect = useCallback(
    (id) => setTicket({ ...ticket, assignBy: id }),
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

    console.log(data);

    const response = await API.update(`/tickets/${id}`, data);
    if (response.status === OK) {
      console.log("Success updating tickets");
      return;
    }
    console.log("Error updating tickets");
  }, []);

  useEffect(() => {
    const form = formRef.current;
    return () => {
      console.log(form);
      if (form)
        return validate(
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
            // {
            //   selector: "assign_by",
            //   parentSelector: ".form-group",
            //   messageSelector: ".form-message",
            //   rules: [
            //     {
            //       validator: () => user !== undefined,
            //       message: "Assign By is required",
            //     },
            //   ],
            // },
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
    };
  }, [formRef.current]);

  useEffect(() => {
    setTicket(data);
  }, [data]);

  if (ticket === null)
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  if (ticket === null || statuses === undefined || priorities === undefined)
    return (
      <div>
        <p>Error...</p>
      </div>
    );
  return (
    <div className={classes["form__ticket"]}>
      <form ref={formRef} data-id={ticket?.id}>
        <span className={classes["form-row"]}>
          <Input
            title="Name"
            value={ticket?.name || ""}
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
            value={getDateISOSString(ticket?.dueDate || "2000-01-01")}
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
            value={getDateISOSString(ticket?.createDate || "2000-01-01")}
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
            value={ticket?.assignBy || ""}
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
            value={ticket?.status || 0}
            onChange={(event) =>
              setTicket({ ...ticket, status: event.target.value })
            }
            tabIndex={3}
          />
          <DropDown
            title="Priority"
            options={priorities}
            value={ticket?.priority || 0}
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
            value={ticket?.description || ""}
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
          <Button tabIndex={6} type="submit">
            <span className={classes["item__title"]}>Save</span>
          </Button>
          <Button onClick={() => navigate("/tickets")} tabIndex={6}>
            <span className={classes["item__title"]}>Back</span>
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
          <figcaption>{user?.name || ""}</figcaption>
        </figure>
      </div>
    </div>
  );
}

FormEditTicket.propTypes = {
  onSubmit: PropTypes.func,
  data: PropTypes.object,
};

export default memo(FormEditTicket);
