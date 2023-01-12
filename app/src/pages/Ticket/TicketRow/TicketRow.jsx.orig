import React, { useState, memo, useContext } from "react";
import PropTypes from "prop-types";

import classes from "./TicketRow.module.sass";
import {
  getDateFormat,
  getTimeString,
  getTimeAgo,
} from "../../../helpers/date";
import { Modal } from "../../../components/Uis/Modal";
import { Button } from "../../../components/Uis/Button";
import { DeleteIcon, EditIcon, ViewIcon } from "../../../components/Uis/Icon";
import { Context } from "../../../context/Context";

const TicketRow = ({ ticket, onEdit, onDelete }) => {
  const [isActive, setIsActive] = useState(false);
  const { priorities } = useContext(Context);
  const handleClick = () => setIsActive((prev) => !prev);

  const handleMouseleave = () => setIsActive(false);

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
            src={
              ticket.customerAvatar ||
              "https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg"
            }
            alt="avatar"
          />
          <div className={classes["tdata-content"]}>
            <span className={classes["tdata__title"]}>
              {ticket.description.length > 100
                ? ticket.description.substring(0, 100) + "..."
                : ticket.description}
            </span>
            <span className={classes["tdata__subtitle"]}>{`updated ${getTimeAgo(
              ticket.createDate
            )}`}</span>
          </div>
        </div>
      </td>
      <td className={classes.tdata}>
        <span className={classes["tdata__title"]}>{ticket.customerName}</span>
      </td>
      <td className={classes.tdata}>
        <div className={classes["tdata-content"]}>
          <span className={classes["tdata__title"]}>
            {getDateFormat(ticket.createDate)}
          </span>
          <span className={classes["tdata__subtitle"]}>
            {getTimeString(ticket.createDate)}
          </span>
        </div>
      </td>
      <td className={classes.tdata}>
        <span className={classes.priority} data-id={ticket.priority - 1}>
          {priorities.find((item) => item.value === ticket.priority)?.text}
        </span>
      </td>
      <td className={classes.tdata}>
        <div className={classes["tdata--menu"]} onClick={handleClick}>
          <span className={classes.point}></span>
          <span className={classes.point}></span>
          <span className={classes.point}></span>
          <Modal active={isActive}>
            <Button outline onClick={onEdit}>
              <EditIcon />
              <span className={classes["item__title"]}>Edit ticket</span>
            </Button>
            <Button outline onClick={onDelete}>
              <DeleteIcon />
              <span className={classes["item__title"]}>Delete ticket</span>
            </Button>
            <Button outline>
              <ViewIcon />
              <span className={classes["item__title"]}>View ticket</span>
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
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default memo(TicketRow);
