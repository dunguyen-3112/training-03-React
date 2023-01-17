import React, { useCallback, useState, memo } from "react";
import PropTypes from "prop-types";

import classes from "../index.module.sass";
import { Button, DropDown } from "@components";

function FormFilter({ onSubmit }) {
  const [formData, setFormData] = useState();

  const statuses = JSON.parse(localStorage.getItem("statuses"));
  const priorities = JSON.parse(localStorage.getItem("priorities"));

  const handleChangeControl = useCallback(async (value, field) => {
    if (field === "status" || field === "priority") value = parseInt(value, 10);
    const data = { ...formData, [field]: value };
    await onSubmit(data);
    setFormData(data);
  }, []);

  const handleClear = useCallback((event) => {
    event.preventDefault();
    onSubmit();
    setFormData(undefined);
  }, []);

  return (
    <form className={`${classes.form} flex`}>
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
      <Button outline onClick={handleClear}>
        clear
      </Button>
    </form>
  );
}

FormFilter.propTypes = {
  onSubmit: PropTypes.func,
};

export default memo(FormFilter);
