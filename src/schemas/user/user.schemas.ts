import * as yup from "yup";

export const createUserSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/([a-zA_Z]){1,}([\s]){0,}([a-zA_Z]){0,}/, "name must be a string")
    .required("name is a required field"),
  email: yup.string().email().required("email is a required field"),
  password: yup.string().required("password is a required field"),
  isAdmin: yup.boolean().default(false).optional(),
});

export const loginUserSchema = yup.object().shape({
  email: yup.string().email().required("email is a required field"),
  password: yup.string().required("password is a required field"),
});
