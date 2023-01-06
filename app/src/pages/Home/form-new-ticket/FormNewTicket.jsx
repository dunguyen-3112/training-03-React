import React, { useRef } from "react";
import PropTypes from "prop-types";
import { Input } from "../../../components/Forms/Input";
import { DropDown } from "../../../components/Forms/DropDown";
import { TextReal } from "../../../components/Forms/TextArea";

import classes from "./FormNewTicket.module.sass";

import "../base/FormTicket.sass";
function FormNewTicket(props) {
    const statuses = [
        {
            value: 0,
            label: "Done",
        },
        {
            value: 1,
            label: "In Progress",
        },
        {
            value: 2,
            label: "Review",
        },
        {
            value: 3,
            label: "To do",
        },
    ];

    return (
        <form className="form__Ticket">
            <span className="form__Ticket--row">
                <Input
                    title="Name"
                    value=""
                    message=""
                    placeholder=""
                    onChange={() => {}}
                    type="text"
                />
                <Input
                    title="Due Date"
                    value=""
                    message=""
                    placeholder=""
                    onChange={() => {}}
                    type="date"
                />
            </span>
            <span className="form__Ticket--row">
                <DropDown
                    label="Status"
                    options={statuses}
                    onChange={() => {}}
                />
                <DropDown
                    label="Priority"
                    options={statuses}
                    onChange={() => {}}
                />
            </span>
            <span className="form__Ticket--row">
                <TextReal label="Description" />
            </span>
        </form>
    );
}

FormNewTicket.propTypes = {};

export default FormNewTicket;
