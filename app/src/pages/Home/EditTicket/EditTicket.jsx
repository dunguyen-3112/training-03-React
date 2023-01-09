import React from "react";
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";

import classes from "../TicketPage.module.sass";
import { Button } from "../../../components/Uis/Button";
import FormEditTicket from "./FormEditTicket";

function EditTicket() {
    const navigate = useNavigate();
    const { ticketId } = useParams();

    return (
        <section className={classes["list__ticket"]}>
            <span className={classes["list__ticket__nav"]}>
                <h2 className={classes["title"]}>Update Ticket</h2>
                <span className={classes["nav__action"]}>
                    <Button onClick={() => navigate("/tickets")}>
                        <span className={classes["item__title"]}>Edit</span>
                    </Button>
                    <Button onClick={() => navigate("/tickets")}>
                        <span className={classes["item__title"]}>Cancel</span>
                    </Button>
                </span>
            </span>
            <FormEditTicket ticketId={ticketId} />
        </section>
    );
}

EditTicket.propTypes = {};

export default EditTicket;
