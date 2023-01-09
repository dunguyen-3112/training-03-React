import React from "react";
// import PropTypes from "prop-types";

import FormNewTicket from "./FormNewTicket";
import classes from "../TicketPage.module.sass";

function NewTicket() {
    return (
        <section className={classes["tickets"]}>
            <span className={classes["tickets__title"]}>
                <h2 className={classes["title"]}>New Ticket</h2>
            </span>
            <FormNewTicket />
        </section>
    );
}

NewTicket.propTypes = {};

export default NewTicket;
