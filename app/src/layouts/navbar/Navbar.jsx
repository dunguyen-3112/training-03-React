import React, { useContext, useRef, useState } from 'react';
import PropTypes from 'prop-types';

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
            <h1 className={classes['nav__title']}>{PAGES[page].label}</h1>
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
                    <h3 className={classes['userName']}>Jones Ferdinand</h3>
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
                            <span className={classes['menu__item__title']}>Profile</span>
                        </Button>
                        <Button outline onClick={handleLogout}>
                            <Icon pos={16} />
                            <span className={classes['menu__item__title']}>Logout</span>
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
