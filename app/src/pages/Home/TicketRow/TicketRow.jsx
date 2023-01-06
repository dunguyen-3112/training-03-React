import React, { useState } from "react";
import PropTypes from "prop-types";

import classes from "./TicketRow.module.sass";
import { Modal } from "../../../components/Uis/Modal";
import { Button } from "../../../components/Uis/Button";

const TicketRow = ({ ticket, index, onEdit }) => {
    const d = new Date().getDate() - ticket.date.getDate();

    const [isActive, setIsActive] = useState(false);

    const handleClick = () => setIsActive((prev) => !prev);

    const handleMouseleave = () => setIsActive(false);

    const handleBtnEdit = () => {
        onEdit(ticket.id);
    };

    const Proritys = [
        {
            id: 0,
            value: "High",
        },
        {
            id: 1,
            value: "Low",
        },
        {
            id: 2,
            value: "Normal",
        },
    ];

    return (
        <tr
            key={ticket.id}
            className={classes.trow}
            onMouseLeave={handleMouseleave}
        >
            <td className={classes.tdata}>
                <div className="flex" style={{ gap: "24px" }}>
                    <img
                        className={classes.avatar}
                        src={ticket.avatar}
                        alt="avatar"
                    />
                    <div className={classes["tdata-content"]}>
                        <span className={classes["tdata__title"]}>
                            {ticket.details}
                        </span>
                        <span
                            className={classes["tdata__subtitle"]}
                        >{`updated ${d} days ago `}</span>
                    </div>
                </div>
            </td>
            <td className={classes.tdata}>
                <span className={classes["tdata__title"]}>
                    {ticket.customer_name}
                </span>
            </td>
            <td className={classes.tdata}>
                <div className={classes["tdata-content"]}>
                    <span className={classes["tdata__title"]}>
                        {ticket.date
                            .toUTCString()
                            .split(",")[1]
                            .trim()
                            .substring(0, 12)}
                    </span>
                    <span className={classes["tdata__subtitle"]}>
                        {ticket.date.toLocaleTimeString().slice(0, 5) +
                            " " +
                            ticket.date.toLocaleTimeString().slice(9, 12)}
                    </span>
                </div>
            </td>
            <td className={classes.tdata}>
                <span className={classes.prority} data-id={ticket.prority}>
                    {Proritys.find((item) => item.id === ticket.prority).value}
                </span>
            </td>
            <td className={classes.tdata}>
                <div className={classes["tdata--menu"]} onClick={handleClick}>
                    <span className={classes.point}></span>
                    <span className={classes.point}></span>
                    <span className={classes.point}></span>
                    <Modal active={isActive}>
                        <Button outline onClick={handleBtnEdit}>
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6 20.71 5.63L18.37 3.29C17.98 2.9 17.42 2.9 17.03 3.29L15.34 5L18.15 7.81L20.71 5.63C21.1 5.24 21.1 4.6 20.71 4.21L18.37 1.86C17.98 1.47 17.42 1.47 17.03 1.86L15.34 4.67L13.5 2.83L3.44 12.88L5.19 15.63L20.71 7.04Z"
                                    fill="#C5C7CD"
                                />
                            </svg>

                            <span className={classes["item__title"]}>
                                Edit ticket
                            </span>
                        </Button>
                        <Button outline>
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM8 9H16V19H8V9ZM15.5 4L14.5 3H9.5L8.5 4H5V6H19V4H15.5Z"
                                    fill="#C5C7CD"
                                />
                            </svg>

                            <span className={classes["item__title"]}>
                                Delete ticket
                            </span>
                        </Button>
                        <Button outline>
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M21 3H3C2 3 1 4 1 5V19C1 20 2 21 3 21H21C22 21 23 20 23 19V5C23 4 22 3 21 3ZM21 19H3V5H21V19ZM9 17H7V7H9V17ZM13 17H11V7H13V17ZM17 17H15V7H17V17Z"
                                    fill="#000000"
                                />
                            </svg>

                            <span className={classes["item__title"]}>
                                View ticket
                            </span>
                        </Button>
                    </Modal>
                </div>
            </td>
        </tr>
    );
};

TicketRow.propTypes = {
    ticket: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    onEdit: PropTypes.func.isRequired,
};

export default TicketRow;
