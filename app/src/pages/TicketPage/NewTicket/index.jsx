import React, { memo } from "react";

import classes from "../index.module.sass";
import FormTicket from "../FormTicket/Index";
import * as API from "@utils/api";
import { OK, TICKET_ROUTE } from "@src/constants";

function NewTicket() {
  const handleNew = async (data) => {
    const response = await API.update(`/${TICKET_ROUTE}`, data);
    if (response.status === OK) alert("Updated Ticket Success!");
    else console.log("Error updating Ticket Success!");
  };

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
