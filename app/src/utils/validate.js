export function isRequired(value) {
    return value !== "";
}

export function isEmail(value) {
    const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(value);
}

export function validate(form, rules) {
    const errors = {};
    for (const field in rules) {
        const value = form[field];
        const fieldRules = rules[field];
        for (const rule of fieldRules) {
            if (!rule(value)) {
                errors[field] = true;
            }
        }
    }
    return errors;
}
