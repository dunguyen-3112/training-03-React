import { useNavigate } from "react-router-dom";
import React, { useState, useCallback, useEffect, useContext } from "react";

import {
  EDIT_TICKET_ROUTE,
  PRIORIRY_ROUTE,
  STATUS_ROUTE,
  TICKET_ROUTE,
} from "@constants";
import * as API from "@utils/api";
import { useFetch } from "@hooks";
import ContextProvider, { Context } from "@context";
import TicketRow from "./components/TicketRow";
import { FilterIcon, NewIcon, SortIcon } from "@components/Icon";
import { Loading, Modal, Pagination, Button, Alert } from "@components";
import FormSort from "./components/FormSort";
import FormFilter from "./components/FormFilter";
import classes from "./index.module.sass";

export default function TicketPage() {
  const [pageTicket, setPageTicket] = useState(1);
  const { setNotifi, inputSearch } = useContext(Context);
  const [query, setQuery] = useState(`page=${pageTicket}`);
  const [dataQuery, setDataQuery] = useState();

  // Manage state of Ticket id select
  const [selectTicket, setSelectTicket] = useState();
  const [isVisibleSort, setVisibleSort] = useState(false);
  const [isVisibleFilter, setVisibleFilter] = useState(false);

  // Init navigate
  const navigate = useNavigate();
  let [loading1, statuses] = useFetch(`${STATUS_ROUTE}`);
  const [loading2, priorities] = useFetch(`${PRIORIRY_ROUTE}`);
  const [loading, dataTickets] = useFetch(`${TICKET_ROUTE}?${query}`);

  const [tickets, setTickets] = useState(dataTickets?.data);
  const [ticketsMeta, setTicketsMeta] = useState(dataTickets?.meta);

  useEffect(() => {
    // Save status and priority values to local storage
    priorities !== undefined &&
      localStorage.setItem("priorities", JSON.stringify(priorities));
    statuses !== undefined &&
      localStorage.setItem("statuses", JSON.stringify(statuses));
  }, [priorities, statuses]);

  useEffect(() => {
    if (dataTickets) {
      setTickets(dataTickets?.data);
      setTicketsMeta(dataTickets?.meta);
    }
  }, [dataTickets]);

  useEffect(() => {
    if (inputSearch && inputSearch !== "") {
      const stringQuery = `page=${pageTicket}&name=${inputSearch}`;
      setQuery(stringQuery);
    } else if (dataQuery) {
      const keys = Object.keys(dataQuery);
      const stringQuery =
        `page=${pageTicket}` +
        keys.map((key) => `&${[key]}=${dataQuery[key]}`).join("");
      setQuery(stringQuery);
    } else setQuery(`page=${pageTicket}`);
  }, [dataQuery, pageTicket, inputSearch]);

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

  const handleSortTicket = useCallback(({ action }) => {
    setQuery((prev) => prev + `&sort=${action}&order=asc`);
  }, []);

  const handleFilterTicket = useCallback((data) => {
    if (data) setDataQuery((prev) => ({ ...prev, ...data }));
    else setDataQuery(undefined);
  }, []);

  const handleBtnSortTicket = useCallback(() => {
    setVisibleSort((prev) => !prev);
  }, []);

  const handleBtnFilterTicket = useCallback(() => {
    setVisibleFilter((prev) => !prev);
  }, []);

  const handleClearFormFilter = useCallback(() => {
    setDataQuery(undefined);
  }, []);

  const handleMouseDownOutSideFilter = useCallback(() => {
    setVisibleFilter(false);
  }, []);

  const handleMouseDownOutSideSort = useCallback(() => {
    setVisibleSort(false);
  }, []);

  return (
    <ContextProvider value={{ statuses, priorities }}>
      <section className={classes["tickets__page"]}>
        <div className={`${classes["tickets__content"]} flex`}>
          <span className={classes["tickets__header"]}>
            <h2 className={classes["tickets-header__title"]}>All tickets</h2>
            <span className={classes["tickets-header__action"]}>
              <Button onClick={handleNewTicket}>
                <NewIcon />
                <span className={classes["item__title"]}>Add Ticket</span>
              </Button>

              <div className={classes.nav__item}>
                <Button onClick={handleBtnSortTicket} outline>
                  <SortIcon />
                  <span className={classes["item__title"]}>Sort</span>
                </Button>
                <Modal
                  active={isVisibleSort}
                  onMouseDownOutSide={handleMouseDownOutSideSort}
                >
                  <FormSort
                    onSubmit={handleSortTicket}
                    onClear={handleClearFormFilter}
                  />
                </Modal>
              </div>
              <div className={classes.nav__item}>
                <Button onClick={handleBtnFilterTicket} outline>
                  <FilterIcon />
                  <span className={classes["item__title"]}>Filter</span>
                </Button>
                <Modal
                  active={isVisibleFilter}
                  onMouseDownOutSide={handleMouseDownOutSideFilter}
                >
                  <FormFilter onSubmit={handleFilterTicket} />
                </Modal>
              </div>
            </span>
          </span>
          {loading && loading1 && loading2 && <Loading />}
          <table className={classes.tickets__table}>
            <thead>
              <tr>
                <th>Ticket Details </th>
                <th>User</th>
                <th>Due Date</th>
                <th>Priority</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {tickets === undefined && (
                <tr>
                  <td></td>
                  <td></td>
                  <td>Not content</td>
                  <td></td>
                </tr>
              )}
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
            page={pageTicket}
            counterPages={ticketsMeta?.total_pages}
            counterItems={ticketsMeta?.total_items}
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
