import PropTypes from "prop-types";
import React, { useState, memo } from "react";

import { AVATAR_DEFAULT } from "@src/constants";
import { getDateFormat, getTimeString, getTimeAgo } from "@helpers/date";
import { Button, Modal, Status } from "@components";
import { DeleteIcon, EditIcon } from "@components/Icon";
import classes from "./index.module.sass";

const TicketRow = ({ ticket, onEdit, onDelete }) => {
  const [isActive, setIsActive] = useState(false);
  const handleClick = () => setIsActive((prev) => !prev);

  const handleMouseleave = () => setIsActive(false);

  const priorities = JSON.parse(localStorage.getItem("priorities"));

  return (
    <tr
      key={ticket.id}
      className={classes.ticket__row}
      onMouseLeave={handleMouseleave}
    >
      <td className={classes.ticket__column}>
        <div className={`flex ${classes["tdata"]}`}>
          <img
            className={classes.avatar}
            src={ticket.avatar || AVATAR_DEFAULT}
            alt="avatar"
          />
          <div className={classes["tdata-content"]}>
            <span className={classes["tdata__title"]}>
              {ticket.name.length >= 50
                ? ticket.name.substring(0, 50) + "..."
                : ticket.name}
            </span>
            <span className={classes["tdata__subtitle"]}>{`updated ${getTimeAgo(
              ticket.createDate
            )}`}</span>
          </div>
        </div>
      </td>

      <td className={classes.ticket__column}>
        <span className={classes["tdata__title"]}>{ticket.assignByName}</span>
      </td>

      <td className={classes.ticket__column}>
        <div className={classes["tdata-content"]}>
          <span className={classes["tdata__title"]}>
            {getDateFormat(ticket.createDate)}
          </span>
          <span className={classes["tdata__subtitle"]}>
            {getTimeString(ticket.createDate)}
          </span>
        </div>
      </td>

      <td className={classes.ticket__column}>
        <Status status={ticket.priority - 1}>
          {priorities?.find((item) => item.value === ticket.priority)?.text}
        </Status>
      </td>

      <td className={classes.ticket__column}>
        <div className={classes.points} onClick={handleClick}>
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
