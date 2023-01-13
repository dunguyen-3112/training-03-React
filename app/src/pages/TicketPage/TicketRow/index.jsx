import PropTypes from "prop-types";
import React, { useState, memo, useContext } from "react";

import classes from "./index.module.sass";
import { getDateFormat, getTimeString, getTimeAgo } from "@helpers/date";
import { Button, Modal } from "@components/Uis";
import { DeleteIcon, EditIcon, ViewIcon } from "@components/Uis/Icon";
import { Context } from "@context/ContextProvider";
import { AVATAR_DEFAULT } from "@src/constants/default";
import Status from "@src/components/Uis/Status";

const TicketRow = ({ ticket, onEdit, onDelete }) => {
  const [isActive, setIsActive] = useState(false);
  const { priorities } = useContext(Context);
  const handleClick = () => setIsActive((prev) => !prev);

  const handleMouseleave = () => setIsActive(false);

  return (
    <tr
      key={ticket.id}
      className={classes.ticket__row}
      onMouseLeave={handleMouseleave}
    >
      <td className={classes.ticket__column}>
        <div className={`flex ${classes["tdata"]}`} style={{ gap: "24px" }}>
          <img
            className={classes.avatar}
            src={ticket.customerAvatar || AVATAR_DEFAULT}
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

      <td className={classes.ticket__column}>
        <span className={classes["tdata__title"]}>{ticket.customerName}</span>
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
          {priorities.find((item) => item.value === ticket.priority)?.text}
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
