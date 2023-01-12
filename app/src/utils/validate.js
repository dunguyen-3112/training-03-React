export function validate(form, rules, onSubmit) {
  const errors = {};

  function getParentSelector(element, parentSelector) {
    parentSelector = parentSelector.replace(".", "");
    while (element) {
      let className = element.className.split(" ")[0];
      if (className === parentSelector) return element;
      element = element.parentElement;
    }
    return null;
  }

  function validator() {
    for (const rule of rules) {
      const element = form[rule.selector];
      const parent = getParentSelector(element, rule.parentSelector);
      const elementMessage = parent.querySelector(rule.messageSelector);
      const fieldRules = rule.rules;
      for (const fieldRule of fieldRules) {
        let value = element.value;
        if (!fieldRule.validator(value)) {
          elementMessage.innerHTML = fieldRule.message;
          errors[rule.selector] = true;
          parent.classList.add("invalid");
        }
      }
    }
  }

  function handleBlur(event) {
    const element = event.target;
    const fieldRules = element.rules;
    for (const fieldRule of fieldRules) {
      const value = element.value;

      if (!fieldRule.validator(value)) {
        element.elementMessage.innerHTML = fieldRule.message;
        errors[element.name] = true;
        element.parent.classList.add("invalid");
        break;
      }
      element.elementMessage.innerHTML = "";
      errors[element.name] = false;
      element.parent.classList.remove("invalid");
    }
  }

  function handleKeydown(event) {
    const element = event.target;
    element.elementMessage.innerHTML = "";
    errors[element.name] = false;
    element.parent.classList.remove("invalid");
  }

  function initEvents() {
    form.addEventListener("submit", handleSubmit);
    for (const rule of rules) {
      const element = form[rule.selector];
      element.parent = getParentSelector(element, rule.parentSelector);
      element.elementMessage = element.parent.querySelector(
        rule.messageSelector
      );
      element.rules = rule.rules;
      element.addEventListener("blur", handleBlur);
      element.addEventListener("keydown", handleKeydown);
    }
  }

  function destroyEvents() {
    form.removeEventListener("submit", handleSubmit);
    for (const rule of rules) {
      const element = form[rule.selector];
      element.parent = getParentSelector(element, rule.parentSelector);
      element.elementMessage = element.parent.querySelector(
        rule.messageSelector
      );
      element.rules = rule.rules;
      element.removeEventListener("blur", handleBlur);
      element.removeEventListener("keydown", handleKeydown);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    validator();
    Object.values(errors).every((item) => item === false) && onSubmit();
  }

  initEvents();

  return () => destroyEvents();
}
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
