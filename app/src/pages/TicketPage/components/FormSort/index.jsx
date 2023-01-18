import React, { useCallback, useState, memo } from "react";
import PropTypes from "prop-types";
import { Button, Input } from "@components";

import classes from "../index.module.sass";

function FormSort({ onSubmit }) {
  const [option, setOption] = useState();

  const handleClear = useCallback((event) => {
    event.preventDefault();
    setOption(undefined);
  }, []);

  const handleChangeControl = useCallback((value) => {
    setOption(value);
  }, []);

  return (
    <form className={`${classes.form} flex`}>
      <a href="" onClick={handleClear}>
        clear
      </a>
      <Input
        type="radio"
        field="option"
        label="Due Date"
        value="1"
        onChange={handleChangeControl}
      />

      <Input
        type="radio"
        field="option"
        label="Create Date"
        value="2"
        onChange={handleChangeControl}
      />
    </form>
  );
}

FormSort.propTypes = {
  onSubmit: PropTypes.func,
};

export default memo(FormSort);
