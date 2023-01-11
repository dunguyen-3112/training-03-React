import React, { useState, useEffect, memo } from "react";
import PropTypes from "prop-types";

import { useSearch } from "../../../hooks";
import { Input } from "../Input";
import classes from "./Search.module.sass";
import { Info } from "../../Uis/Info";

function Search({ onSearch, title, onSelect }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(false);
  const [loading, results, error] = useSearch(query, onSearch);

  const handleClick = (id) => {
    onSelect(id);
    setActive(false);
  };

  return (
    <form className={classes.form__search}>
      <Input
        onChange={(event) => setQuery(event.target.value)}
        value={query}
        placeholder="Search"
        type="text"
        title={title}
        onFocus={() => setActive((prev) => !prev)}
      />
      <ul className={classes.result} data-active={active}>
        {results?.map((result, index) => (
          <li key={index} onClick={() => handleClick(result.id)}>
            <Info data={result} key={result.id} />
          </li>
        ))}
      </ul>
    </form>
  );
}

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
  title: PropTypes.string,
  onSelect: PropTypes.func,
};

export default memo(Search);
