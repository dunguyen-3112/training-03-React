import React, { useCallback } from "react";
import { useParams } from "react-router-dom";

import { useFetch } from "@hooks";
import classes from "../../index.module.sass";
import FormTicket from "../FormTicket";
import * as API from "@utils/api";
import { OK, TICKET_ROUTE } from "@src/constants";
import { useState } from "react";
import { Notification } from "@src/components";
import { useNavigate } from "react-router-dom";

export default function EditTicket() {
  const { ticketId } = useParams();
  const [notifiType, setNotifiType] = useState();
  const [loading, data, error] = useFetch(
    `${TICKET_ROUTE}?_ticket_id=${ticketId}`
  );

  const navigate = useNavigate();
  const handleUpdate = useCallback(async function (data) {
    const response = await API.update(`${TICKET_ROUTE}`, data);
    if (response.status === OK) {
      const data = response.data;
      let tickets = JSON.parse(localStorage.getItem("tickets"));
      tickets = tickets.filter((ticket) => ticket.id !== data.id);
      tickets = [data, ...tickets];
      localStorage.setItem("tickets", JSON.stringify(tickets));
      navigate(`/${TICKET_ROUTE}`);
    } else setNotifiType("error");
  }, []);

  if (error) return <span>Error...</span>;
  if (loading) return <span>Loading...</span>;

  return (
    <section className={classes["tickets__page"]}>
      <div className={classes["tickets__content"]}>
        {notifiType && (
          <Notification
            message={`Update Ticket ${notifiType}`}
            time={3}
            type={notifiType}
          />
        )}
        <h2 className={classes["tickets__title"]}>Update Ticket</h2>
        <FormTicket ticket={data} onSubmit={handleUpdate} />
      </div>
    </section>
  );
}
