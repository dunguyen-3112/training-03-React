import React, { useState } from 'react';
import PropTypes from 'prop-types';

import classes from './TicketRow.module.sass'
import { Flex } from '../../../layouts/flex';
import { Text } from '../../../components/ui/text';
import { Proritys } from '../../../data/constants';
import { Modal } from '../../../components/ui/modal';
import { Button } from '../../../components/ui/button';

import Type from '../../../data/TextType.json'
import { Icon } from '../../../components/ui/icon';

const TicketRow = ({ ticket, index }) => {

    const d = new Date().getDate() - ticket.date.getDate()

    const [isActive, setIsActive] = useState(false);

    const handleClick = () => setIsActive(prev => !prev)

    const handleMouseleave = () => setIsActive(false)

    return (
        <tr key={ticket.id} className={classes.trow} onMouseLeave={handleMouseleave}>
            <td className={classes.tdata}>
                <Flex gap={24}>
                    <img className={classes.avatar} src={ticket.avatar} alt="avatar" />
                    <div className={classes['tdata-content']}>
                        <Text font={Type[600][14]}>{ticket.details}</Text>
                        <Text font={Type[400][12]} gray>{`updated ${d} days ago `}</Text>
                    </div>
                </Flex>
            </td>
            <td className={classes.tdata}>{ticket.customer_name}</td>
            <td className={classes.tdata}>
                <div className={classes['tdata-content']}>
                    <Text font={Type[600][14]} >
                        {ticket.date.toUTCString().split(',')[1].trim().substring(0, 12)}
                    </Text>
                    <Text font={Type[400][12]} gray>
                        {ticket.date.toLocaleTimeString().slice(0, 5) + ' ' + ticket.date.toLocaleTimeString().slice(9, 12)}
                    </Text>
                </div>
            </td>
            <td className={classes.tdata}>
                <span className={classes.prority} data-id={ticket.prority}>
                    <Text font={Type[700][11]}>{Proritys.find(item => item.id === ticket.prority).value}</Text>
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
                            <Text font={Type[600][14]} tag="span">
                                Edit ticket
                            </Text>
                        </Button>
                        <Button outline>
                            <Icon pos={1} />
                            <Text font={Type[600][14]} tag="span">
                                Delete ticket
                            </Text>
                        </Button>
                        <Button outline>
                            <Icon pos={3} />
                            <Text font={Type[600][14]} tag="span">
                                View ticket
                            </Text>
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
