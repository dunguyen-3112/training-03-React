import { validate } from "@src/utils/validate";

export const rules = {
  email: [
    {
      validator: (value) => validate.isRequired(value),
      message: "Field Email is required!",
    },
    {
      validator: (value) => validate.isEmail(value),
      message: "This field is Email!",
    },
  ],
  password: [
    {
      validator: (value) => validate.isRequired(value),
      message: "Field Password is required!",
    },
    {
      validator: (value) => validate.minLength(value, 6),
      message: "Field Password minimum 6 characters!",
    },
  ],
};
