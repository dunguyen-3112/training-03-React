import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import classes from "./TicketPage.module.sass";
import TicketRow from "./TicketRow";
import { Button } from "@components/Uis";
import { FilterIcon, NewIcon, SortIcon } from "@components/Uis/Icon";
import { useFetch } from "@hooks";
import ContextProvider from "@context/ContextProvider";
import Alert from "@components/Uis/Alert";
import * as API from "@utils/api";
import {
  EDIT_TICKET_ROUTE,
  PRIORIRY_ROUTE,
  STATUS_ROUTE,
  TICKET_ROUTE,
} from "@constants/routes";

export default function TicketPage() {
  const [loading1, statuses, error1] = useFetch(`/${STATUS_ROUTE}`);
  const [loading2, priorities, error2] = useFetch(`/${PRIORIRY_ROUTE}`);
  const [loading, tickets, error] = useFetch(`/${TICKET_ROUTE}`);

  const [indexDelete, setIndexDelete] = useState();
  const [listTicket, setListTicket] = useState(tickets);

  const handleDelete = useCallback(
    async (status) => {
      if (status > 0) {
        const response = await API.remove(`/${TICKET_ROUTE}/${indexDelete}`);
        if (response.status == 200) {
          alert("Success to delete!");
          setListTicket((listTicket) =>
            listTicket.filter((ticket) => ticket.id !== indexDelete)
          );
          setIndexDelete(undefined);
          return;
        }
        alert("Error to delete");
      }
      setIndexDelete(undefined);
    },
    [indexDelete]
  );

  const navigate = useNavigate();

  useEffect(() => {
    setListTicket(tickets);
  }, [tickets]);

  localStorage.setItem("priorities", JSON.stringify(priorities));
  localStorage.setItem("statuses", JSON.stringify(statuses));

  if (loading || loading1 || loading2)
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  if (error || error1 || error2)
    return (
      <div>
        <p>Error...</p>
      </div>
    );
  return (
    <ContextProvider value={{ statuses, priorities }}>
      <section className={classes["tickets"]}>
        <span className={classes["tickets__title"]}>
          <h2 className={classes["title"]}>All tickets</h2>
          <span className={classes["nav__action"]}>
            <Button onClick={() => navigate("/tickets/new_ticket")}>
              <NewIcon />
              <span className={classes["item__title"]}>Add Ticket</span>
            </Button>
            <span className={classes["nav__action__item"]}>
              <SortIcon />
              <span className={classes["item__title"]}>Sort</span>
            </span>
            <span className={classes["nav__action__item"]}>
              <FilterIcon />
              <span className={classes["item__title"]}>Filter</span>
            </span>
          </span>
        </span>
        <table>
          <thead>
            <tr>
              <th>Ticket Details </th>
              <th>Customer name</th>
              <th>Date</th>
              <th>Priority</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {listTicket?.map((ticket, index) => {
              return (
                <TicketRow
                  index={index}
                  key={ticket.id}
                  ticket={ticket}
                  onEdit={() => navigate(`/${EDIT_TICKET_ROUTE}/${ticket.id}`)}
                  onDelete={() => setIndexDelete(ticket.id)}
                />
              );
            })}
          </tbody>
        </table>
        {indexDelete !== undefined && (
          <Alert
            title="Are you sure you want to delete this ticket?"
            message="If you do not want to delete this ticket please select Confirm, to return please Cancel."
            onConfirm={handleDelete}
          />
        )}
      </section>
    </ContextProvider>
  );
}
