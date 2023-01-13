import React, { memo, useCallback } from "react";
// import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useFetch } from "@hooks";

import classes from "../index.module.sass";
import FormTicket from "../FormTicket/Index";
import * as API from "@utils/api";
import { OK, TICKET_ROUTE } from "@src/constants";

function EditTicket() {
  const { ticketId } = useParams();
  const [loading, data, error] = useFetch(`/tickets?_ticketId=${ticketId}`);

  if (error) return <span>Error...</span>;
  if (loading) return <span>Loading...</span>;

  const handleUpdate = async (data) => {
    console.log(data);
    // const response = await API.update(`/${TICKET_ROUTE}`, data);
    // if (response.status === OK) alert("Updated Ticket Success!");
    // else console.log("Error updating Ticket Success!");
  };

  return (
    <section className={classes["tickets"]}>
      <h2 className={classes["tickets__title"]}>Update Ticket</h2>
      <FormTicket ticket={data} callback={handleUpdate} />
    </section>
  );
}

EditTicket.propTypes = {};

export default memo(EditTicket);
