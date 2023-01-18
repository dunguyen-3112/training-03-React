import PropTypes from "prop-types";
import React, { useState, memo, useCallback, useEffect } from "react";

import { validate } from "@utils/validate";
import { rules } from "./LoginRules";
import { Input, Button } from "@components";
import classes from "./index.module.sass";

const FormLogin = ({ onSubmit }) => {
  const [formData, setFormData] = useState();
  const [formValid, setFormValid] = useState();
  const [disable, setDisable] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    setDisable(true);
    const errorMessage = validate.validateForm(formData, rules);
    let currentErrorMessage = { ...formValid, ...errorMessage };
    if (
      formData &&
      Object.values(currentErrorMessage).every((item) => item === undefined)
    ) {
      const loginMessage = await onSubmit(formData);
      if (loginMessage)
        currentErrorMessage = { ...errorMessage, ...loginMessage };
    }
    setDisable(false);
    setFormValid(currentErrorMessage);
  };

  useEffect(() => {
    formValid &&
      Object.values(formValid).every((item) => item === undefined) &&
      setDisable(false);
  }, [formValid]);

  const handleChangeInput = useCallback((value, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const handleValidInput = useCallback((value, field) => {
    const errorMessage = validate.validateField(value, rules[field]);
    errorMessage &&
      setFormValid((prev) => ({ ...prev, [field]: errorMessage }));
  }, []);

  const handleBlurInput = useCallback(
    (value, field) => {
      handleValidInput(value, field);
    },
    [handleValidInput]
  );

  const handleFocusInput = useCallback((value, field) => {
    setFormValid((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  return (
    <form className={`${classes["form-login"]} flex`}>
      <Input
        message=""
        placeholder="Email address"
        label="Email"
        value={formData?.email}
        type="email"
        field="email"
        tabIndex={1}
        onFocus={handleFocusInput}
        onChange={handleChangeInput}
        onBlur={handleBlurInput}
        errorMessage={formValid?.email}
      />

      <Input
        message=""
        placeholder="Password"
        label="Password"
        field="password"
        value={formData?.password}
        type="password"
        tabIndex={2}
        onChange={handleChangeInput}
        onFocus={handleFocusInput}
        onBlur={handleBlurInput}
        errorMessage={formValid?.password}
      />
      <Button onClick={handleLogin} tabIndex={3} disabled={disable}>
        Log In
      </Button>
    </form>
  );
};

FormLogin.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default memo(FormLogin);
