export function validate(form, rules, onSubmit) {
    const getParentSelector = function (element, parentSelector) {
        parentSelector = parentSelector.replace(".", "");
        while (element) {
            let className = element.className.split(" ")[0];
            if (className === parentSelector) return element;
            element = element.parentElement;
        }
        return null;
    };

    const validator = () => {
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
                    elementMessage.classList.add("invalid");
                }
            }
        }
    };

    const errors = {};

    for (const rule of rules) {
        const element = form[rule.selector];
        const parent = getParentSelector(element, rule.parentSelector);
        const elementMessage = parent.querySelector(rule.messageSelector);
        element.addEventListener("blur", () => {
            const fieldRules = rule.rules;
            for (const fieldRule of fieldRules) {
                const value = element.value;

                if (!fieldRule.validator(value)) {
                    elementMessage.innerHTML = fieldRule.message;
                    errors[rule.selector] = true;
                    elementMessage.classList.add("invalid");
                    break;
                }
                elementMessage.innerHTML = "";
                errors[rule.selector] = false;
                elementMessage.classList.remove("invalid");
            }
        });

        element.addEventListener("keydown", () => {
            elementMessage.innerHTML = "";
            errors[rule.selector] = false;
            elementMessage.classList.remove("invalid");
        });
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        validator();
        Object.values(errors).every((item) => item === false) && onSubmit();
    });
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
