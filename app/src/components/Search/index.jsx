import React, { useState, useRef, memo, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

import { useSearch } from "@hooks";
import classes from "./index.module.sass";
import { Info, Input } from "@components";
import { SearchIcon } from "@components/Icon";

function Search({
  onSearch,
  label,
  onSelect,
  isVisible,
  value,
  errorMessage,
  onBlur,
  onFocus,
  field,
}) {
  const [query, setQuery] = useState(value);
  const [loading, results, error] = useSearch(query, onSearch);
  const searchRef = useRef();

  const [hiden, setHiden] = useState(isVisible);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  const handleSelect = useCallback((data) => {
    onSelect(data);
    setQuery("");
  }, []);

  const handleChangeInput = useCallback((value) => {
    setQuery(value);
  }, []);

  const handleDisplaySearchInput = useCallback(() => {
    setHiden((prev) => !prev);
  }, []);

  const handleBlur = useCallback((value, field) => {
    onBlur && onBlur(value, field);
  }, []);

  const handleFocus = useCallback((value, field) => {
    onFocus && onFocus(value, field);
  }, []);

  return (
    <div className={classes.form__search}>
      <label className={`flex ${classes.search}`}>
        {!hiden && (
          <Input
            onChange={handleChangeInput}
            onBlur={handleBlur}
            onFocus={handleFocus}
            value={query}
            placeholder="Search"
            type="search"
            field={field}
            errorMessage={errorMessage}
            inputRef={searchRef}
            label={label}
          />
        )}
        {isVisible && <SearchIcon onClick={handleDisplaySearchInput} />}
      </label>
      {loading && <span>Loading...</span>}
      {error && <span>Error</span>}
      {!hiden && results && (
        <div className={classes.result}>
          {results?.map((result) => (
            <Info data={result} key={result.id} onClick={handleSelect} />
          ))}
        </div>
      )}
    </div>
  );
}

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
  label: PropTypes.string,
  onSelect: PropTypes.func,
  searchRef: PropTypes.object,
  isVisible: PropTypes.bool,
  value: PropTypes.string,
  field: PropTypes.string,
  errorMessage: PropTypes.string,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
};

export default memo(Search);
