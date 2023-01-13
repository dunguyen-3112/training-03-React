import { SELECT_OPTIONS_DEFAULT } from "@src/constants/default";
import { validate } from "@src/utils/validate";

export const rules = {
  name: [
    {
      validator: (value) => validate.isRequired(value),
      message: "Field name is required!",
    },
    {
      validator: (value) => validate.minLength(value, 6),
      message: "Field name minimum 6 characters!",
    },
  ],
  description: [
    {
      validator: (value) => validate.isRequired(value),
      message: "Field description is required!",
    },
    {
      validator: (value) => validate.minLength(value, 20),
      message: "Field description minimum 20 characters!",
    },
  ],
  status: [
    {
      validator: (value) => parseInt(value) !== SELECT_OPTIONS_DEFAULT,
      message: "Field status is required!",
    },
  ],
  priority: [
    {
      validator: (value) => parseInt(value) !== SELECT_OPTIONS_DEFAULT,
      message: "Field priority is required!",
    },
  ],
  dueDate: [
    {
      validator: (value) => validate.isDate(value),
      message: "Field date is required!",
    },
  ],
  assignBy: [
    {
      validator: (value) => validate.isRequired(value),
      message: "Field assign by is required!",
    },
  ],
};
