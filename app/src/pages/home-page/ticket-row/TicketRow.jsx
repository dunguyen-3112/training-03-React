import React, { useState } from 'react';
import PropTypes from 'prop-types';

import classes from './TicketRow.module.sass'
import { Proritys } from '../../../data/constants';
import { Modal } from '../../../components/ui/modal';
import { Button } from '../../../components/ui/button';

import { Icon } from '../../../components/ui/icon';

const TicketRow = ({ ticket, index }) => {

    const d = new Date().getDate() - ticket.date.getDate()

    const [isActive, setIsActive] = useState(false);

    const handleClick = () => setIsActive(prev => !prev)

    const handleMouseleave = () => setIsActive(false)

    return (
        <tr key={ticket.id} className={classes.trow} onMouseLeave={handleMouseleave}>
            <td className={classes.tdata}>
                <div className='flex' style={{ gap: '24px' }}>
                    <img className={classes.avatar} src={ticket.avatar} alt="avatar" />
                    <div className={classes['tdata-content']}>
                        <span className={classes['tdata__title']} >{ticket.details}</span>
                        <span className={classes['tdata__subtitle']} >{`updated ${d} days ago `}</span>
                    </div>
                </div>
            </td>
            <td className={classes.tdata}>
                <span className={classes['tdata__title']} >{ticket.customer_name}</span>
            </td>
            <td className={classes.tdata}>
                <div className={classes['tdata-content']}>
                    <span className={classes['tdata__title']} >
                        {ticket.date.toUTCString().split(',')[1].trim().substring(0, 12)}
                    </span>
                    <span className={classes['tdata__subtitle']} >
                        {ticket.date.toLocaleTimeString().slice(0, 5) + ' ' + ticket.date.toLocaleTimeString().slice(9, 12)}
                    </span>
                </div>
            </td>
            <td className={classes.tdata}>
                <span className={classes.prority} data-id={ticket.prority}>
                    {Proritys.find(item => item.id === ticket.prority).value}
                </span>
            </td>
            <td className={classes.tdata}>
                <div className={classes['tdata--menu']} onClick={handleClick}>
                    <span className={classes.point}></span>
                    <span className={classes.point}></span>
                    <span className={classes.point}></span>
                    <Modal active={isActive}>
                        <Button outline>
                            <Icon pos={2} />
                            <span className={classes['item__title']}>
                                Edit ticket
                            </span>
                        </Button>
                        <Button outline>
                            <Icon pos={1} />
                            <span className={classes['item__title']}>
                                Delete ticket
                            </span>
                        </Button>
                        <Button outline>
                            <Icon pos={3} />
                            <span className={classes['item__title']}>
                                View ticket
                            </span>
                        </Button>
                    </Modal>
                </div>
            </td>
        </tr>);

};


TicketRow.propTypes = {
    ticket: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired
};


export default TicketRow;
