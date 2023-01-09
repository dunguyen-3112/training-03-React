import React from "react";
import { PropTypes } from "prop-types";

import { Input } from "../../../components/Forms/Input";
import { DropDown } from "../../../components/Forms/DropDown";
import { TextReal } from "../../../components/Forms/TextArea";
import { useFetch } from "../../../hooks";
import { useState } from "react";
import { useEffect } from "react";

function FormEditTicket({ ticketId, onSubmit }) {
    const [loading, data, error] = useFetch(`/tickets?_ticketId=${ticketId}`);
    const [ticket, setTicket] = useState(data);

    useEffect(() => {
        setTicket(data);
    }, [data]);
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
        <form className="form__Ticket" onSubmit={() => onSubmit(this)}>
            <span className="form__Ticket--row">
                <Input
                    title="Name"
                    value={`${ticket?.name}`}
                    message=""
                    placeholder=""
                    type="text"
                    onChange={(event) =>
                        setTicket({ ...ticket, name: event.target.value })
                    }
                />
                <Input
                    title="Due Date"
                    value=""
                    message=""
                    placeholder=""
                    type="date"
                    onChange={(event) =>
                        setTicket({ ...ticket, dueDate: event.target.value })
                    }
                />
            </span>
            <span className="form__Ticket--row">
                <DropDown
                    title="Status"
                    options={statuses}
                    value={ticket?.status}
                    onChange={(event) =>
                        setTicket({ ...ticket, status: event.target.value })
                    }
                />
                <DropDown
                    title="Priority"
                    options={statuses}
                    value={ticket?.priority}
                    onChange={(event) =>
                        setTicket({ ...ticket, priority: event.target.value })
                    }
                />
            </span>
            <span className="form__Ticket--row">
                <TextReal
                    title="Description"
                    value={ticket?.description}
                    onChange={(event) =>
                        setTicket({
                            ...ticket,
                            description: event.target.value,
                        })
                    }
                />
            </span>
        </form>
    );
}

FormEditTicket.propTypes = {
    onSubmit: PropTypes.func,
};

export default FormEditTicket;
