const Validation = (options) => {
    this.options = options;
    const rules = this.options.rules;

    for (let rule of rules) {
        if (rule.validate(rule) === undefined) return false;
    }

    return true;
};

Validation.isNumber = ({ value, min, max, ...rule }) =>
    typeof value === 'number' && value >= min && value <= max;

Validation.isEmail = ({ value, ...rule }) => {
    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (value.trim().length > 0 && regex.test(value)) return;
    return 'Email valid!';
};

console.log(
    'Valid: ',
    Validation({
        rules: [
            {
                validate: Validation.isNumber,
                min: 1,
                max: 5,
                value: 2,
            },
            {
                validate: Validation.isEmail,
                value: 'huuduv2gmail.com',
                message: 'Email valid!',
            },
        ],
    })
);

console.log(process.env.ACCESS_TOKEN_SECRET);
