import React, { useState, useRef } from "react";
import PropTypes from "prop-types";

import { useSearch } from "@hooks";
import { Input } from "@components/Forms";
import classes from "./index.module.sass";
import Info from "@components/Uis/Info";
import { SearchIcon } from "@src/components/Uis";

function Search({ onSearch, title, onSelect }) {
  const [query, setQuery] = useState("");
  const [loading, results, error] = useSearch(query, onSearch);
  const searchRef = useRef();

  const handleClick = (id) => {
    onSelect(id);
  };

  return (
    <form className={classes.form__search}>
      <label className={`flex ${classes.search}`}>
        <Input
          onChange={(event) => setQuery(event.target.value)}
          value={query}
          placeholder="Search"
          type="search"
          inputRef={searchRef}
          title={title}
        />
        {/* <input type="checkbox" id="" /> */}
        <SearchIcon />
      </label>
      <ul className={classes.result}>
        {results?.map((result, index) => (
          <li key={index} onClick={() => handleClick(result?.id)}>
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
  searchRef: PropTypes.object,
};

export default Search;
