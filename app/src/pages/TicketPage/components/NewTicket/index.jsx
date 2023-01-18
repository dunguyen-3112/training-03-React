import { useNavigate } from "react-router-dom";
import React, { memo, useCallback, useContext } from "react";

import { Context } from "@src/context";
import { CREATED_SUCCESS, TICKET_ROUTE } from "@constants";
import * as API from "@utils/api";
import FormTicket from "../FormTicket";
import classes from "../../index.module.sass";

function NewTicket() {
  const navigate = useNavigate();
  const { setNotifi } = useContext(Context);

  const handleNew = useCallback(
    async function (data) {
      const response = await API.create(`${TICKET_ROUTE}`, data);
      if (response.status === CREATED_SUCCESS) {
        navigate(`/${TICKET_ROUTE}`);
        setNotifi({
          type: "success",
          message: "New Ticket successfully.",
          time: 3,
        });
      } else
        setNotifi({
          type: "error",
          message: "New Ticket Failed!",
          time: 3,
        });
    },
    [navigate, setNotifi]
  );

  return (
    <section className={classes["tickets__page"]}>
      <div className={`${classes["tickets__content"]} flex`}>
        <span className={classes["tickets__header"]}>
          <h2 className={classes["tickets-header__title"]}>New Ticket</h2>
        </span>
        <FormTicket onSubmit={handleNew} />
      </div>
    </section>
  );
}

NewTicket.propTypes = {};

export default memo(NewTicket);
