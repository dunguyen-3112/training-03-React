import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import { Button } from "../../../components/Uis/Button";
import FormNewTicket from "./FormNewTicket";
import classes from "../TicketPage.module.sass";

function NewTicket(props) {
    const navigate = useNavigate();

    return (
        <section className={classes["list__ticket"]}>
            <span className={classes["list__ticket__nav"]}>
                <h2 className={classes["title"]}>New Ticket</h2>
                <span className={classes["nav__action"]}>
                    <Button
                        onClick={() => {
                            navigate("/tickets");
                        }}
                    >
                        <span className={classes["item__title"]}>Add</span>
                    </Button>
                    <Button onClick={() => navigate("/tickets")}>
                        <span className={classes["item__title"]}>Cancel</span>
                    </Button>
                </span>
            </span>
            <FormNewTicket />
        </section>
    );
}

NewTicket.propTypes = {};

export default NewTicket;
