import React, { useState, useEffect } from "react";

import classes from "./TicketPage.module.sass";

import { TicketRow } from "./TicketRow";
import { Button } from "../../components/Uis/Button";
import { FormNewTicket } from "./form-new-ticket";

import { FormEditTicket } from "./form-edit-ticket";
import { FilterIcon, NewIcon, SortIcon } from "../../components/Uis/Icon";
import * as API from "../../utils/api";

export default function TicketPag() {
    const [tickets, setTickets] = useState([]);

    const [isNew, setIsNew] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        async function getData() {
            const response = await API.get("/tickets");
            const data = response.data;
            console.log(data);
            //setTickets(data);
        }

        getData();
        const data = [
            {
                id: "121sw3aw",
                details: "Contact Email not Linked",
                customer_name: "Tom Cruise",
                date: new Date(),
                prority: 0,
                avatar: "https://firebasestorage.googleapis.com/v0/b/react-my-example.appspot.com/o/3.png?alt=media&token=ccd72ac2-bf82-486a-a061-053469da01d1",
            },
            {
                id: "dddf323d",
                details: "Adding Images to Featured Posts",
                customer_name: "Matt Damon",
                date: new Date(),
                prority: 1,
                avatar: "https://firebasestorage.googleapis.com/v0/b/react-my-example.appspot.com/o/7.png?alt=media&token=7b82a80a-bbff-4563-a9f3-1e788815065b",
            },
            {
                id: "dsdsds2322",
                details: "When will I be changed this month?",
                customer_name: "Robert Downey",
                date: new Date(),
                prority: 0,
                avatar: "https://firebasestorage.googleapis.com/v0/b/react-my-example.appspot.com/o/61.png?alt=media&token=dbdea90f-e0d2-424d-a507-0e277adb9a9b",
            },
            {
                id: "e423ddfee",
                details: "Payment not add through",
                customer_name: "Henry Cavil",
                date: new Date(),
                prority: 1,
                avatar: "https://firebasestorage.googleapis.com/v0/b/react-my-example.appspot.com/o/6.png?alt=media&token=88ce7ed1-8a43-457e-9fa0-ec308dee345b",
            },
            {
                id: "da2dfdf3",
                details: "Downtime since last week",
                customer_name: "Chris Evans",
                date: new Date(),
                prority: 2,
                avatar: "https://firebasestorage.googleapis.com/v0/b/react-my-example.appspot.com/o/51.png?alt=media&token=44df5ae7-810a-4ba0-a684-9987f3c9e2c6",
            },
            {
                id: "sddrvdvfe",
                details: "How do I change my password?",
                customer_name: "Steve Rogers",
                date: new Date(),
                prority: 2,
                avatar: "https://firebasestorage.googleapis.com/v0/b/react-my-example.appspot.com/o/4.png?alt=media&token=66494660-5a85-4469-b89c-503e389e204b",
            },
        ];
        setTickets(data);
    }, []);

    const handleNew = () => {
        setIsNew(false);
    };

    const handleEdit = () => {
        setIsEdit(false);
    };

    if (isNew)
        return (
            <section className={classes["list__ticket"]}>
                <span className={classes["list__ticket__nav"]}>
                    <h2 className={classes["title"]}>New Ticket</h2>
                    <span className={classes["nav__action"]}>
                        <Button onClick={handleNew}>
                            <span className={classes["item__title"]}>Add</span>
                        </Button>
                        <Button onClick={() => setIsNew(false)}>
                            <span className={classes["item__title"]}>
                                Cancel
                            </span>
                        </Button>
                    </span>
                </span>
                <FormNewTicket />
            </section>
        );
    if (isEdit)
        return (
            <section className={classes["list__ticket"]}>
                <span className={classes["list__ticket__nav"]}>
                    <h2 className={classes["title"]}>Update Ticket</h2>
                    <span className={classes["nav__action"]}>
                        <Button onClick={handleEdit}>
                            <span className={classes["item__title"]}>Edit</span>
                        </Button>
                        <Button onClick={() => setIsEdit(false)}>
                            <span className={classes["item__title"]}>
                                Cancel
                            </span>
                        </Button>
                    </span>
                </span>
                <FormEditTicket ticketId={2} />
            </section>
        );

    return (
        <section className={classes["list__ticket"]}>
            <span className={classes["list__ticket__nav"]}>
                <h2 className={classes["title"]}>All tickets</h2>
                <span className={classes["nav__action"]}>
                    <Button onClick={() => setIsNew(true)}>
                        <NewIcon />
                        <span className={classes["item__title"]}>
                            Add Ticket
                        </span>
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
                    {tickets.map((ticket, index) => (
                        <TicketRow
                            index={index}
                            key={ticket.id}
                            ticket={ticket}
                            onEdit={() => setIsEdit(true)}
                        />
                    ))}
                </tbody>
            </table>
        </section>
    );
}
