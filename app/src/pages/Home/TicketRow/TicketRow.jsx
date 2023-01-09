import React, { useState, memo } from "react";
import PropTypes from "prop-types";

import classes from "./TicketRow.module.sass";
import { Modal } from "../../../components/Uis/Modal";
import { Button } from "../../../components/Uis/Button";
import { DeleteIcon, EditIcon, ViewIcon } from "../../../components/Uis/Icon";

const TicketRow = ({ ticket, onEdit }) => {
    const d = new Date().getDate() - ticket.createDate.getDate();

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

    const url =
        ticket.customerAvatar ||
        "https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg";

    return (
        <tr
            key={ticket.id}
            className={classes.trow}
            onMouseLeave={handleMouseleave}
        >
            <td className={classes.tdata}>
                <div className="flex" style={{ gap: "24px" }}>
                    <img className={classes.avatar} src={url} alt="avatar" />
                    <div className={classes["tdata-content"]}>
                        <span className={classes["tdata__title"]}>
                            {ticket.description}
                        </span>
                        <span
                            className={classes["tdata__subtitle"]}
                        >{`updated ${d} days ago `}</span>
                    </div>
                </div>
            </td>
            <td className={classes.tdata}>
                <span className={classes["tdata__title"]}>
                    {ticket.customerName}
                </span>
            </td>
            <td className={classes.tdata}>
                <div className={classes["tdata-content"]}>
                    <span className={classes["tdata__title"]}>
                        {ticket.createDate
                            .toUTCString()
                            .split(",")[1]
                            .trim()
                            .substring(0, 12)}
                    </span>
                    <span className={classes["tdata__subtitle"]}>
                        {/* {ticket.date.toLocaleTimeString().slice(0, 5) +
                            " " +
                            ticket.date.toLocaleTimeString().slice(9, 12)} */}
                    </span>
                </div>
            </td>
            <td className={classes.tdata}>
                <span className={classes.priority} data-id={ticket.priority}>
                    {Proritys.find((item) => item.id === ticket.priority).value}
                </span>
            </td>
            <td className={classes.tdata}>
                <div className={classes["tdata--menu"]} onClick={handleClick}>
                    <span className={classes.point}></span>
                    <span className={classes.point}></span>
                    <span className={classes.point}></span>
                    <Modal active={isActive}>
                        <Button outline onClick={handleBtnEdit}>
                            <EditIcon />
                            <span className={classes["item__title"]}>
                                Edit ticket
                            </span>
                        </Button>
                        <Button outline>
                            <DeleteIcon />
                            <span className={classes["item__title"]}>
                                Delete ticket
                            </span>
                        </Button>
                        <Button outline>
                            <ViewIcon />
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

export default memo(TicketRow);
