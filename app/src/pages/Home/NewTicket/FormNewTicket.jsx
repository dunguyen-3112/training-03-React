import React, { useRef, useEffect } from "react";
import { Input } from "../../../components/Forms/Input";
import { DropDown } from "../../../components/Forms/DropDown";
import { TextReal } from "../../../components/Forms/TextArea";

// import classes from "./FormNewTicket.module.sass";
import "../base/FormTicket.sass";
import { getFormData } from "../../../utils/form";
import { validate } from "../../../utils/validate";
function FormNewTicket() {
    const formRef = useRef(null);

    useEffect(() => {
        const form = formRef.current;
        if (form) {
            const formData = getFormData(form);

            if (formData) {
                validate(form, [
                    {
                        selector: "name",
                        parentSelector: ".form-group",
                        messageSelector: ".form-message",
                        rules: [
                            {
                                validator: (value) =>
                                    validate.isRequired(value),
                                message: "Name is required",
                            },
                            {
                                validator: (value) =>
                                    validate.minLength(value, 6),
                                message: "Name min length is 6 characters!",
                            },
                        ],
                    },
                    {
                        selector: "description",
                        parentSelector: ".form-group",
                        messageSelector: ".form-message",
                        rules: [
                            {
                                validator: (value) =>
                                    validate.isRequired(value),
                                message: "Description is required",
                            },
                            {
                                validator: (value) =>
                                    validate.minLength(value, 20),
                                message:
                                    "Description min length is 20 characters!",
                            },
                        ],
                    },
                    {
                        selector: "status",
                        parentSelector: ".form-group",
                        messageSelector: ".form-message",
                        rules: [
                            {
                                validator: (value) =>
                                    validate.isRequired(value),
                                message: "Status is required",
                            },
                        ],
                    },
                    {
                        selector: "priority",
                        parentSelector: ".form-group",
                        messageSelector: ".form-message",
                        rules: [
                            {
                                validator: (value) =>
                                    validate.isRequired(value),
                                message: "Priority is required",
                            },
                        ],
                    },
                    {
                        selector: "due_date",
                        parentSelector: ".form-group",
                        messageSelector: ".form-message",
                        rules: [
                            {
                                validator: (value) =>
                                    validate.isRequired(value),
                                message: "Due date is required",
                            },
                            {
                                validator: (value) => validate.isDate(value),
                                message: "Date is Invalid",
                            },
                        ],
                    },
                ]);
            }
        }
    }, [formRef]);

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
        <form className="form__Ticket" ref={formRef}>
            <span className="form__Ticket--row">
                <Input
                    title="Name"
                    value=""
                    message=""
                    placeholder=""
                    type="text"
                />
                <Input
                    title="Due Date"
                    value=""
                    message=""
                    placeholder=""
                    type="date"
                />
            </span>
            <span className="form__Ticket--row">
                <DropDown title="Status" options={statuses} />
                <DropDown title="Priority" options={statuses} />
            </span>
            <span className="form__Ticket--row">
                <TextReal title="Description" />
            </span>
        </form>
    );
}

FormNewTicket.propTypes = {};

export default FormNewTicket;
