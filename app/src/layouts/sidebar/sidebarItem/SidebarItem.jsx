import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import classes from './SidebarItem.module.sass'
import Text from '../../../components/ui/text/Text';

import Type from '../../../data/TextType.json'
import { Context } from '../../../context/Context';
import { Icon } from '../../../components/ui/icon';

const SidebarItem = ({ title, pos, path, index }) => {

    const { page, setPage } = useContext(Context);

    const handleClick = event => {
        event.preventDefault();
        setPage(index)
    };

    return (
        <a className={classes.sidebar__item}
            href={path}
            data-active={index === page}
            onClick={handleClick}
        >
            <Icon pos={pos} />
            <Text font={Type[400][16]} >
                {title}
            </Text>
        </a>
    );
};


SidebarItem.propTypes = {
    title: PropTypes.string.isRequired,
    pos: PropTypes.number.isRequired,
    path: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired
};


export default SidebarItem;
