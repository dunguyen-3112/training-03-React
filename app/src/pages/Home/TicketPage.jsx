import React from "react";

import classes from "./TicketPage.module.sass";
import { TicketRow } from "./TicketRow";
import { Button } from "../../components/Uis/Button";
import { FilterIcon, NewIcon, SortIcon } from "../../components/Uis/Icon";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks";
import ContextProvider from "../../context/Context";

export default function TicketPage() {
  const [loading, tickets, error] = useFetch("/tickets");
  const [loading1, statuses, error1] = useFetch("/statuses");
  const [loading2, priorities, error2] = useFetch("/priorities");

  const navigate = useNavigate();

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
        <p>{error.message}</p>
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
            {tickets &&
              tickets.length > 0 &&
              tickets.map((ticket, index) => {
                return (
                  <TicketRow
                    index={index}
                    key={ticket.id}
                    ticket={ticket}
                    onEdit={() => navigate(`/tickets/edit_ticket/${ticket.id}`)}
                  />
                );
              })}
          </tbody>
        </table>
      </section>
    </ContextProvider>
  );
}
