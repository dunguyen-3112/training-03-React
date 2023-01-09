import React, {
    useState,
    useEffect,
    useContext,
    useRef,
    memo,
    useCallback,
} from "react";
import { PropTypes } from "prop-types";
import { useNavigate } from "react-router-dom";

import "../base/FormTicket.sass";
import { Input } from "../../../components/Forms/Input";
import { DropDown } from "../../../components/Forms/DropDown";
import { TextReal } from "../../../components/Forms/TextArea";
import { useFetch } from "../../../hooks";
import classes from "../TicketPage.module.sass";
import { getDateISOSString } from "../../../helpers/date";
import { Button } from "../../../components/Uis/Button";
import { Context } from "../../../context/Context";
import { validate } from "../../../utils/validate";
import { getFormData } from "../../../utils/form";

function FormEditTicket({ ticketId }) {
    const [loading, data, error] = useFetch(`/tickets?_ticketId=${ticketId}`);
    const [ticket, setTicket] = useState(data);
    const formRef = useRef(null);

    let { statuses, priorities } = useContext(Context);
    statuses = statuses || JSON.parse(localStorage.getItem("statuses"));
    priorities = priorities || JSON.parse(localStorage.getItem("priorities"));
    const navigate = useNavigate();

    useEffect(() => {
        setTicket(data);
    }, [data]);

    const handleEdit = useCallback(() => {
        const formData = getFormData(formRef.current);
        console.log(formData);
    }, []);

    useEffect(() => {
        const form = formRef.current;
        if (form) {
            const formData = getFormData(form);

            if (formData) {
                validate(
                    form,
                    [
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
                                    validator: (value) =>
                                        validate.isDate(value),
                                    message: "Date is Invalid",
                                },
                            ],
                        },
                    ],
                    handleEdit
                );
            }
        }
    }, [formRef, handleEdit, data]);

    if (loading || ticket === null)
        return (
            <div>
                <p>Loading...</p>
            </div>
        );
    if (
        error ||
        ticket === null ||
        statuses === undefined ||
        priorities === undefined
    )
        return (
            <div>
                <p>{error.message}</p>
            </div>
        );
    return (
        <form className="form__ticket" ref={formRef}>
            <span className="form__ticket--row">
                <Input
                    title="Name"
                    value={`${ticket?.name}`}
                    message=""
                    placeholder=""
                    type="text"
                    onChange={(event) =>
                        setTicket({ ...ticket, name: event.target.value })
                    }
                    tabIndex={1}
                />
                <Input
                    title="Due Date"
                    value={getDateISOSString(ticket?.dueDate)}
                    message=""
                    placeholder=""
                    type="date"
                    onChange={(event) =>
                        setTicket({ ...ticket, dueDate: event.target.value })
                    }
                    tabIndex={2}
                />
            </span>
            <span className="form__ticket--row">
                <DropDown
                    title="Status"
                    options={statuses}
                    value={ticket?.status}
                    onChange={(event) =>
                        setTicket({ ...ticket, status: event.target.value })
                    }
                    tabIndex={3}
                />
                <DropDown
                    title="Priority"
                    options={priorities}
                    value={ticket?.priority}
                    onChange={(event) =>
                        setTicket({ ...ticket, priority: event.target.value })
                    }
                    tabIndex={4}
                />
            </span>
            <span className="form__ticket--row">
                <TextReal
                    title="Description"
                    value={ticket?.description}
                    onChange={(event) =>
                        setTicket({
                            ...ticket,
                            description: event.target.value,
                        })
                    }
                    tabIndex={5}
                />
            </span>
            <span className={classes["nav__action"]}>
                <Button tabIndex={6}>
                    <span className={classes["item__title"]}>Save</span>
                </Button>
                <Button onClick={() => navigate("/tickets")} tabIndex={6}>
                    <span className={classes["item__title"]}>Cancel</span>
                </Button>
            </span>
        </form>
    );
}

FormEditTicket.propTypes = {
    onSubmit: PropTypes.func,
    ticketId: PropTypes.string,
};

export default memo(FormEditTicket);
