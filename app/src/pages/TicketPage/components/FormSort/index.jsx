import React, { useCallback, useState, memo } from "react";
import PropTypes from "prop-types";
import { Button, Input } from "@src/components";

import classes from "../index.module.sass";

function FormSort({ onSubmit }) {
  const [formData, setFormData] = useState();

  const handleClear = useCallback((event) => {
    event.preventDefault();
    setFormData(undefined);
  }, []);

  const handleChangeControl = useCallback((value, field) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  return (
    <form className={`${classes.form} flex`}>
      <a href="" onClick={handleClear}>
        clear
      </a>
    </form>
  );
}

FormSort.propTypes = {
  onSubmit: PropTypes.func,
};

export default memo(FormSort);
