import React, { useRef, useState, memo } from "react";
import PropTypes from "prop-types";

import classes from "./Navbar.module.sass";
import { Modal } from "../../components/Uis/Modal";
import { Button } from "../../components/Uis/Button";
import { SearchIcon } from "../../components/Uis/Icon";
import { routes } from "../../routes/routes";
import useSearch from "../../hooks/useSearch";

const NavBar = ({ handleLogout }) => {
    const [isActive, setIsActive] = useState(false);

    const user = JSON.parse(localStorage.getItem("user"));

    const searchRef = useRef();

    // const { results, loading, error } = useSearch(
    //     "",
    //     async function search(query) {
    //         const response = await fetch(`/search?q=${query}`);
    //         const results = await response.json();
    //         return results;
    //     }
    // );

    const [isSearch, setIsSearch] = useState(false);

    const handleClick = () => {
        setIsSearch((prev) => !prev);
    };

    const handleSearch = (event) => {
        const query = event.target.value;
    };

    if (isSearch && searchRef.current) searchRef.current.focus();

    const handleSubmit = (event) => {
        event.preventDefault();
        searchRef.current.value = "";
    };

    const handleShowInfo = () => setIsActive((prev) => !prev);

    return (
        <span className={classes.navbar}>
            <h1 className={classes["nav__title"]}>
                {routes.find((item) => location.href.includes(item.path)).title}
            </h1>
            <span className={classes["nav-menu"]}>
                {isSearch && (
                    <form
                        className={classes["form-search"]}
                        onSubmit={handleSubmit}
                    >
                        <input
                            ref={searchRef}
                            type="search"
                            onKeyUp={handleSearch}
                            className={classes["search-control"]}
                        />
                    </form>
                )}
                <span className={classes["menu-icon"]} onClick={handleClick}>
                    <SearchIcon />
                </span>
                <div className={classes.line}></div>
                <span
                    className={classes["menu-info"]}
                    onClick={handleShowInfo}
                    onMouseLeave={() => setIsActive(false)}
                >
                    <h3 className={classes["userName"]}>{`${user.name}`}</h3>
                    <figure className={classes.avatar}>
                        <img src={user.avatarUrl} alt="avatar" />
                    </figure>
                    <Modal active={isActive}>
                        <Button outline>
                            <img src={user.avatarUrl} alt="avatar" width={20} />
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

export default memo(NavBar);
