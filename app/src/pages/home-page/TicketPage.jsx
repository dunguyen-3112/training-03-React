import React, { useState, useEffect } from "react";

import classes from "./TicketPage.module.sass";

import { TicketRow } from "./ticket-row";
import { Button } from "../../components/ui/button";
import { FormNewTicket } from "./form-new-ticket";

import { FormEditTicket } from "./form-edit-ticket";

const TicketPage = () => {
    const [tickets, setTickets] = useState([]);

    const [isNew, setIsNew] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
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
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19Z"
                                fill="#C5C7CD"
                            />
                            <path
                                d="M17 13H13V17H11V13H7V11H11V7H13V11H17V13Z"
                                fill="#C5C7CD"
                            />
                        </svg>

                        <span className={classes["item__title"]}>
                            Add Ticket
                        </span>
                    </Button>
                    <span className={classes["nav__action__item"]}>
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M1.12857 4.26839L3.31563 2.12548C3.48647 1.95815 3.7636 1.9582 3.93434 2.12548L6.12132 4.26839C6.39667 4.53812 6.20059 5.00001 5.81195 5.00001H4.5V13.5714C4.5 13.8081 4.30414 14 4.0625 14H3.1875C2.94586 14 2.75 13.8081 2.75 13.5714V5.00001H1.43794C1.04853 5.00001 0.853791 4.53758 1.12857 4.26839V4.26839ZM7.5625 3.7143H14.5625C14.8041 3.7143 15 3.52243 15 3.28573V2.42858C15 2.19188 14.8041 2.00001 14.5625 2.00001H7.5625C7.32086 2.00001 7.125 2.19188 7.125 2.42858V3.28573C7.125 3.52243 7.32086 3.7143 7.5625 3.7143ZM7.125 6.71429V5.85715C7.125 5.62045 7.32086 5.42858 7.5625 5.42858H12.8125C13.0541 5.42858 13.25 5.62045 13.25 5.85715V6.71429C13.25 6.951 13.0541 7.14286 12.8125 7.14286H7.5625C7.32086 7.14286 7.125 6.951 7.125 6.71429ZM7.125 13.5714V12.7143C7.125 12.4776 7.32086 12.2857 7.5625 12.2857H9.3125C9.55414 12.2857 9.75 12.4776 9.75 12.7143V13.5714C9.75 13.8081 9.55414 14 9.3125 14H7.5625C7.32086 14 7.125 13.8081 7.125 13.5714ZM7.125 10.1429V9.28572C7.125 9.04901 7.32086 8.85715 7.5625 8.85715H11.0625C11.3041 8.85715 11.5 9.04901 11.5 9.28572V10.1429C11.5 10.3796 11.3041 10.5714 11.0625 10.5714H7.5625C7.32086 10.5714 7.125 10.3796 7.125 10.1429Z"
                                fill="#C5C7CD"
                            />
                        </svg>

                        <span className={classes["item__title"]}>Sort</span>
                    </span>
                    <span className={classes["nav__action__item"]}>
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M13.4369 2H2.56315C2.06351 2 1.8114 2.60623 2.16542 2.96026L6.5 7.29549V12.125C6.5 12.3085 6.58955 12.4805 6.73993 12.5858L8.61493 13.8979C8.98484 14.1568 9.5 13.8944 9.5 13.437V7.29549L13.8347 2.96026C14.188 2.60694 13.9376 2 13.4369 2Z"
                                fill="#C5C7CD"
                            />
                        </svg>

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
};

TicketPage.propTypes = {};

export default TicketPage;
