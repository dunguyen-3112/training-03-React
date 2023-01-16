export function validate() {
  console.log("Validate");
}

validate.validateField = (fieldValue, rules) => {
  for (const rule of rules) {
    const isValid = rule.validator(fieldValue);
    if (!isValid) return rule.message;
  }
  return;
};

validate.validateForm = (formData, formRules) => {
  let value;
  let errorMessage = {};
  for (const field in formRules) {
    let message;
    const rules = formRules[field];
    value = formData[field];
    message = validate.validateField(value, rules);

    if (message) errorMessage[field] = message;
  }
  return errorMessage;
};

/**
 *
 * @param {string} value
 * @returns boolean
 */
validate.isEmail = (value) => {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(value);
};

validate.maxLength = (value, maxLength) => {
  return value?.length <= maxLength;
};

validate.minLength = (value, minLength) => {
  return value?.length >= minLength;
};

validate.isRequired = (value) => {
  return value !== "";
};

validate.isDate = (value) => {
  return new Date().getTime() - new Date(value).getTime() < 0;
};
