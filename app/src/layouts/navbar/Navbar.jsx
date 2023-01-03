import React, { useContext, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Text } from '../../components/ui/text';

import Type from '../../data/TextType.json'
import { Context } from '../../context/Context';

import { PAGES } from '../../data/constants';
import { Icon } from '../../components/ui/icon';

import classes from './Navbar.module.sass'
import { Modal } from '../../components/ui/modal';
import { Button } from '../../components/ui/button';

const NavBar = ({ handleLogout }) => {

    const { page } = useContext(Context);

    const [isActive, setIsActive] = useState(false);

    const searchRef = useRef();

    const [isSearch, setIsSearch] = useState(false);

    const handleClick = () => {
        setIsSearch(prev => !prev)
    };

    const handleSubmit = event => {
        event.preventDefault();
        console.log(searchRef.current.value)
        searchRef.current.value = '';
    };

    const handleShowInfo = () => setIsActive(prev => !prev)


    return (
        <span className={classes.navbar}>
            <Text tag="h1" font={Type[700][24]}>{PAGES[page].label}</Text>
            <span className={classes['nav-menu']}>
                {isSearch && <form className={classes['form-search']} onSubmit={handleSubmit}>
                    <input
                        ref={searchRef}
                        type="search"
                        className={classes['search-control']
                        }

                    />
                </form>}
                <span className={classes['menu-icon']}>
                    <Icon pos={9} onClick={handleClick} />
                    <Icon pos={4} />
                </span>
                <div className={classes.line}></div>
                <span
                    className={classes['menu-info']}
                    onClick={handleShowInfo}
                    onMouseLeave={() => setIsActive(false)}
                >
                    <Text tag="p" font={Type[600][14]}>Jones Ferdinand</Text>
                    <figure className={classes.avatar} >
                        <img
                            src="https://firebasestorage.googleapis.com/v0/b/react-my-example.appspot.com/o/12.png?alt=media&token=fa3462cd-96dc-4abf-bf8a-2c444266d0bc"
                            alt="avatar"
                        />
                    </figure>
                    <Modal active={isActive}>
                        <Button outline>
                            <img
                                src="https://firebasestorage.googleapis.com/v0/b/react-my-example.appspot.com/o/12.png?alt=media&token=fa3462cd-96dc-4abf-bf8a-2c444266d0bc"
                                alt="avatar"
                                width={20}
                            />
                            <Text font={Type[700][14]}>Profile</Text>
                        </Button>
                        <Button outline onClick={handleLogout}>
                            <Icon pos={16} />
                            <Text font={Type[700][14]}>Logout</Text>
                        </Button>
                    </Modal>
                </span>
            </span>
        </span>
    );
};


NavBar.propTypes = {
    handleLogout: PropTypes.func
};


export default NavBar;
