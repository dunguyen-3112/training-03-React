import React, { useContext, useRef, useState } from "react";
import PropTypes from "prop-types";

import { Context } from "../../context/Context";

import { PAGES } from "../../data/constants";

import classes from "./Navbar.module.sass";
import { Modal } from "../../components/ui/modal";
import { Button } from "../../components/ui/button";

const NavBar = ({ handleLogout }) => {
    const { page } = useContext(Context);

    const [isActive, setIsActive] = useState(false);

    const searchRef = useRef();

    const [isSearch, setIsSearch] = useState(false);

    const handleClick = () => {
        setIsSearch((prev) => !prev);
    };

    if (isSearch && searchRef.current) searchRef.current.focus();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(searchRef.current.value);
        searchRef.current.value = "";
    };

    const handleShowInfo = () => setIsActive((prev) => !prev);

    return (
        <span className={classes.navbar}>
            <h1 className={classes["nav__title"]}>{PAGES[page].label}</h1>
            <span className={classes["nav-menu"]}>
                {isSearch && (
                    <form
                        className={classes["form-search"]}
                        onSubmit={handleSubmit}
                    >
                        <input
                            ref={searchRef}
                            type="search"
                            className={classes["search-control"]}
                        />
                    </form>
                )}
                <span className={classes["menu-icon"]} onClick={handleClick}>
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle
                            cx="6.5"
                            cy="6.5"
                            r="5.75"
                            stroke="#C5C7CD"
                            strokeWidth="1.5"
                        />
                        <path
                            d="M11 11L15 15"
                            stroke="#C5C7CD"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                        />
                    </svg>
                </span>
                <div className={classes.line}></div>
                <span
                    className={classes["menu-info"]}
                    onClick={handleShowInfo}
                    onMouseLeave={() => setIsActive(false)}
                >
                    <h3 className={classes["userName"]}>Jones Ferdinand</h3>
                    <figure className={classes.avatar}>
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
                            <span className={classes["menu__item__title"]}>
                                Profile
                            </span>
                        </Button>
                        <Button outline onClick={handleLogout}>
                            <span className={classes["menu__item__title"]}>
                                Logout
                            </span>
                        </Button>
                    </Modal>
                </span>
            </span>
        </span>
    );
};

NavBar.propTypes = {
    handleLogout: PropTypes.func,
};

export default NavBar;
