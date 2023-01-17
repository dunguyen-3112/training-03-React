import React, { useCallback, useContext } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useFetch } from "@hooks";
import classes from "../../index.module.sass";
import FormTicket from "../FormTicket";
import * as API from "@utils/api";
import { OK, TICKET_ROUTE } from "@src/constants";
import { Context } from "@src/context";

export default function EditTicket() {
  const { ticketId } = useParams();
  const { setNotifi } = useContext(Context);
  const [loading, data, error] = useFetch(
    `${TICKET_ROUTE}?_ticket_id=${ticketId}`
  );

  const navigate = useNavigate();
  const handleUpdate = useCallback(
    async function (data) {
      const response = await API.update(`${TICKET_ROUTE}`, data);
      if (response.status === OK) {
        navigate(`/${TICKET_ROUTE}`);
        setNotifi({
          type: "success",
          message: "Edited Ticket successfully.",
          time: 3,
        });
      } else
        setNotifi({
          type: "error",
          message: "Update Ticket Failed!",
          time: 3,
        });
    },
    [navigate, setNotifi]
  );

  if (error) return <span>Error...</span>;
  if (loading) return <span>Loading...</span>;

  return (
    <section className={classes["tickets__page"]}>
      <div className={classes["tickets__content"]}>
        <h2 className={classes["tickets__title"]}>Update Ticket</h2>
        <FormTicket ticket={data} onSubmit={handleUpdate} />
      </div>
    </section>
  );
}
