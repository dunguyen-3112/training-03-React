import React, { memo, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import classes from "../../index.module.sass";
import * as API from "@utils/api";
import { CREATED_SUCCESS, TICKET_ROUTE } from "@constants";
import FormTicket from "../FormTicket";
import { Notification } from "@components";

function NewTicket() {
  const navigate = useNavigate();
  const [notifiType, setNotifiType] = useState();

  const handleNew = useCallback(
    async function (data) {
      const response = await API.create(`${TICKET_ROUTE}`, data);
      if (response.status === CREATED_SUCCESS) {
        let tickets = JSON.parse(localStorage.getItem("tickets"));
        tickets = [response.data, ...tickets];
        tickets.pop();
        console.log(tickets);
        localStorage.setItem("tickets", JSON.stringify(tickets));
        navigate(`/${TICKET_ROUTE}`);
      } else setNotifiType("error");
    },
    [navigate]
  );

  return (
    <section className={classes["tickets"]}>
      <span className={classes["tickets__header"]}>
        {notifiType && (
          <Notification
            message={`Update Ticket ${notifiType}`}
            time={3}
            type={notifiType}
          />
        )}
        <h2 className={classes["tickets-header__title"]}>New Ticket</h2>
      </span>
      <FormTicket onSubmit={handleNew} />
    </section>
  );
}

NewTicket.propTypes = {};

export default memo(NewTicket);
