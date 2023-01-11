import React from "react";
// import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

import classes from "../TicketPage.module.sass";
import FormEditTicket from "./FormEditTicket";

function EditTicket() {
  const { ticketId } = useParams();

  return (
    <section className={classes["tickets"]}>
      <span className={classes["tickets__title"]}>
        <h2 className={classes["title"]}>Update Ticket</h2>
      </span>
      <FormEditTicket ticketId={ticketId} />
    </section>
  );
}

EditTicket.propTypes = {};

export default EditTicket;
