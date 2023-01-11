import React from "react";
import { useEffect } from "react";
// import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useFetch } from "../../../hooks";

import classes from "../TicketPage.module.sass";
import FormEditTicket from "./FormEditTicket";

function EditTicket() {
  const { ticketId } = useParams();
  const [loading, data, error] = useFetch(`/tickets?_ticketId=${ticketId}`);

  console.log(data);

  return (
    <section className={classes["tickets"]}>
      <span className={classes["tickets__title"]}>
        <h2 className={classes["title"]}>Update Ticket</h2>
      </span>
      <FormEditTicket data={data} />
    </section>
  );
}

EditTicket.propTypes = {};

export default EditTicket;
