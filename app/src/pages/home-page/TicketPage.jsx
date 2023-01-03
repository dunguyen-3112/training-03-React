import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Text } from '../../components/ui/text';

import Type from '../../data/TextType.json'
import { Icon } from '../../components/ui/icon';

import classes from './TicketPage.module.sass';

import { TicketRow } from './ticket-row';

const TicketPage = () => {

    const [tickets, setTickets] = useState([])

    useEffect(() => {
        const data = [
            {
                id: '121sw3aw',
                "details": 'Contact Email not Linked',
                customer_name: 'Tom Cruise',
                date: new Date(),
                prority: 0,
                avatar: "https://firebasestorage.googleapis.com/v0/b/react-my-example.appspot.com/o/3.png?alt=media&token=ccd72ac2-bf82-486a-a061-053469da01d1"
            },
            {
                id: 'dddf323d',
                "details": 'Adding Images to Featured Posts',
                customer_name: 'Matt Damon',
                date: new Date(),
                prority: 1,
                avatar: "https://firebasestorage.googleapis.com/v0/b/react-my-example.appspot.com/o/7.png?alt=media&token=7b82a80a-bbff-4563-a9f3-1e788815065b"
            },
            {
                id: 'dsdsds2322',
                "details": 'When will I be changed this month?',
                customer_name: 'Robert Downey',
                date: new Date(),
                prority: 0,
                avatar: "https://firebasestorage.googleapis.com/v0/b/react-my-example.appspot.com/o/61.png?alt=media&token=dbdea90f-e0d2-424d-a507-0e277adb9a9b"
            },
            {
                id: 'e423ddfee',
                "details": 'Payment not add through',
                customer_name: 'Henry Cavil',
                date: new Date(),
                prority: 1,
                avatar: "https://firebasestorage.googleapis.com/v0/b/react-my-example.appspot.com/o/6.png?alt=media&token=88ce7ed1-8a43-457e-9fa0-ec308dee345b"
            },
            {
                id: 'da2dfdf3',
                "details": 'Downtime since last week',
                customer_name: 'Chris Evans',
                date: new Date(),
                prority: 2,
                avatar: "https://firebasestorage.googleapis.com/v0/b/react-my-example.appspot.com/o/51.png?alt=media&token=44df5ae7-810a-4ba0-a684-9987f3c9e2c6"
            },
            {
                id: 'sddrvdvfe',
                "details": 'How do I change my password?',
                customer_name: 'Steve Rogers',
                date: new Date(),
                prority: 2,
                avatar: "https://firebasestorage.googleapis.com/v0/b/react-my-example.appspot.com/o/4.png?alt=media&token=66494660-5a85-4469-b89c-503e389e204b"
            }
        ]
        setTickets(data);
    }, []);
    return (
        <section className={classes['list__ticket']}>
            <span className={classes['list__ticket-nav']}>
                <Text font={Type[700][19]} tag="h2">All tickets</Text>
                <span className={classes['nav-action']}>
                    <span className={classes['nav-action--item']}>
                        <Icon pos={7} />
                        <Text
                            font={Type[600][14]}
                            gray
                        >Sort</Text>
                    </span>
                    <span className={classes['nav-action--item']}>
                        <Icon pos={12} />
                        <Text
                            font={Type[600][14]}
                            gray>
                            Filter
                        </Text>
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
                            ticket={ticket} />
                    ))}
                </tbody>
            </table>
        </section>
    );
};


TicketPage.propTypes = {

};


export default TicketPage;
