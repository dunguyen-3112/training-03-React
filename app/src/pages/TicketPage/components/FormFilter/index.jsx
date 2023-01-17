import React, { useCallback, useState, memo } from "react";
import PropTypes from "prop-types";

import classes from "../index.module.sass";
import { Button, DropDown } from "@components";

function FormFilter({ onSubmit }) {
  const [formData, setFormData] = useState();

  const statuses = JSON.parse(localStorage.getItem("statuses"));
  const priorities = JSON.parse(localStorage.getItem("priorities"));

  const handleChangeControl = useCallback(
    (value, field) => {
      value = parseInt(value, 10);
      onSubmit({ [field]: value });
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    [onSubmit]
  );

  const handleClear = useCallback((event) => {
    event.preventDefault();
    onSubmit();
    setFormData(undefined);
  }, []);

  return (
    <form className={`${classes.form} flex`}>
      <a href="" onClick={handleClear}>
        clear
      </a>
      <DropDown
        label="Status"
        options={statuses}
        value={formData?.status || 0}
        field="status"
        onChange={handleChangeControl}
      />
      <DropDown
        label="Priority"
        options={priorities}
        value={formData?.priority || 0}
        field="priority"
        onChange={handleChangeControl}
      />
    </form>
  );
}

FormFilter.propTypes = {
  onSubmit: PropTypes.func,
};

export default memo(FormFilter);
