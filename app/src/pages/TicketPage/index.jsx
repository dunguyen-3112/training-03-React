import React, { useState, useCallback, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import {
  EDIT_TICKET_ROUTE,
  PRIORIRY_ROUTE,
  STATUS_ROUTE,
  TICKET_ROUTE,
} from "@constants/routes";
import * as API from "@utils/api";
import { useFetch } from "@hooks";
import TicketRow from "./components/TicketRow";
import { Button, Alert } from "@components";
import classes from "./index.module.sass";
import ContextProvider, { Context } from "@context/ContextProvider";
import { FilterIcon, NewIcon, SortIcon } from "@components/Icon";
import { Loading, Pagination } from "@src/components";

export default function TicketPage() {
  const [pageTicket, setPageTicket] = useState(1);
  const { setNotifi } = useContext(Context);
  // Manage state of Ticket id select
  const [selectTicket, setSelectTicket] = useState();

  // Init navigate
  const navigate = useNavigate();
  let [loading1, dataStatuses] = useFetch(`${STATUS_ROUTE}`);
  const [loading2, dataPriorities] = useFetch(`${PRIORIRY_ROUTE}`);
  const [loading, dataTickets] = useFetch(
    `${TICKET_ROUTE}?_page=${pageTicket}`
  );

  const [tickets, setTickets] = useState(dataTickets?.data);
  const [ticketsMeta, setTicketsMeta] = useState(dataTickets?.meta);
  const [priorities, setPriorities] = useState(dataPriorities);
  const [statuses, setStatuses] = useState(dataStatuses);

  useEffect(() => {
    // Save status and priority values to local storage
    priorities !== undefined &&
      localStorage.setItem("priorities", JSON.stringify(priorities));
    statuses !== undefined &&
      localStorage.setItem("statuses", JSON.stringify(statuses));
  }, [priorities, statuses]);

  useEffect(() => {
    dataPriorities && setPriorities(dataPriorities);
    dataStatuses && setStatuses(dataStatuses);
    if (dataTickets) {
      setTickets(dataTickets?.data);
      setTicketsMeta(dataTickets?.meta);
    }
  }, [dataPriorities, dataTickets, dataStatuses]);

  // Implement function delete Ticket
  const handleDelete = useCallback(
    async (status) => {
      if (status > 0) {
        const response = await API.remove(`${TICKET_ROUTE}/${selectTicket}`);
        if (response.status == 200) {
          setNotifi({
            type: "success",
            message: "Success to delete!",
            time: 3,
          });
          setTickets((listTicket) =>
            listTicket.filter((ticket) => ticket.id !== selectTicket)
          );
          setSelectTicket(undefined);
          return;
        }
        setNotifi({
          type: "error",
          message: "Error to delete",
          time: 3,
        });
      }
      setSelectTicket(undefined);
    },
    [selectTicket, setNotifi]
  );

  const handleChangePageTicketpage = useCallback((page) => {
    setPageTicket(page);
  }, []);

  const handleNewTicket = useCallback(() => {
    navigate("/tickets/new_ticket");
  }, [navigate]);

  const handleUpdate = useCallback(
    (id) => {
      navigate(`/${EDIT_TICKET_ROUTE}/${id}`);
    },
    [navigate]
  );

  // Handle data loading
  if (
    loading ||
    loading1 ||
    loading2 ||
    tickets === undefined ||
    priorities === undefined ||
    statuses === undefined
  )
    return <Loading />;

  return (
    <ContextProvider value={{ statuses, priorities }}>
      <section className={classes["tickets__page"]}>
        <div className={classes["tickets__content"]}>
          <span className={classes["tickets__header"]}>
            <h2 className={classes["tickets-header__title"]}>All tickets</h2>
            <span className={classes["tickets-header__action"]}>
              <Button onClick={handleNewTicket}>
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

          <table className={classes.tickets__table}>
            <thead>
              <tr>
                <th>Ticket Details </th>
                <th>User</th>
                <th>Date</th>
                <th>Priority</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {tickets?.map((ticket, index) => {
                return (
                  <TicketRow
                    index={index}
                    key={ticket.id}
                    ticket={ticket}
                    onEdit={() => handleUpdate(ticket.id)}
                    onDelete={() => setSelectTicket(ticket.id)}
                  />
                );
              })}
            </tbody>
          </table>
          <Pagination
            counterItems={ticketsMeta?.total_items}
            counterPages={ticketsMeta?.total_pages}
            page={pageTicket}
            onSelect={handleChangePageTicketpage}
          />

          {selectTicket !== undefined && (
            <Alert
              title="Are you sure you want to delete?"
              message="If you really want to delete this ticket please select Confirm, to return please Cancel."
              onConfirm={handleDelete}
            />
          )}
        </div>
      </section>
    </ContextProvider>
  );
}
