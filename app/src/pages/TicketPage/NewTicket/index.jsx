import React, { memo } from "react";

import classes from "../index.module.sass";
import FormTicket from "../FormTicket/Index";
import * as API from "@utils/api";
import { CREATED_SUCCESS, TICKET_ROUTE } from "@src/constants";
import { useCallback } from "react";

function NewTicket() {
  const handleNew = useCallback(async function (data) {
    const response = await API.create(`/${TICKET_ROUTE}`, data);
    if (response.status === CREATED_SUCCESS) alert("Updated Ticket Success!");
    else console.log("Error updating Ticket Success!");
  }, []);

  return (
    <section className={classes["tickets"]}>
      <span className={classes["tickets__header"]}>
        <h2 className={classes["tickets-header__title"]}>New Ticket</h2>
      </span>
      <FormTicket callback={handleNew} />
    </section>
  );
}

NewTicket.propTypes = {};

export default memo(NewTicket);
