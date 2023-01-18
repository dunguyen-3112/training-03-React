import React, { useState, useRef, memo, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

import { useSearch } from "@hooks";
import classes from "./index.module.sass";
import { Info, Input } from "@components";
import { SearchIcon } from "@components/Icon";
import { Loading } from "..";

function Search({
  onSearch,
  label,
  onSelect,
  isIcon,
  value,
  errorMessage,
  onBlur,
  onFocus,
  field,
}) {
  const [query, setQuery] = useState(value);
  const [loading, results] = useSearch(query, onSearch);
  const searchRef = useRef();

  const [isVisible, setIsVisible] = useState(!isIcon);

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
    setIsVisible((prev) => !prev);
  }, []);

  const handleBlur = useCallback((value, field) => {
    onBlur && onBlur(value, field);
    if (isIcon) {
      setQuery("");
      setIsVisible(false);
    }
  }, []);

  const handleFocus = useCallback((value, field) => {
    onFocus && onFocus(value, field);
  }, []);

  return (
    <div className={classes.form__search}>
      <label className={`flex ${classes.search}`}>
        {isVisible && (
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
        {loading && <Loading />}
        {isIcon && <SearchIcon onClick={handleDisplaySearchInput} />}
      </label>
      {!isIcon && results && (
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
  isIcon: PropTypes.bool,
  value: PropTypes.string,
  field: PropTypes.string,
  errorMessage: PropTypes.string,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
};

export default memo(Search);
