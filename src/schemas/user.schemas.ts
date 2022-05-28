import * as yup from "yup";

export const createUserSchema = yup.object().shape({
  name: yup.string().required("name is a required field"),
  email: yup.string().email().required("email is a required field"),
  password: yup.string().required("password is a required field"),
  isAdmin: yup.boolean().default(false).optional(),
});

export const loginUserSchema = yup.object().shape({
  email: yup.string().email().required("email is a required field"),
  password: yup.string().required("password is a required field"),
});

export const serializedUserSchema = yup.object().shape({
  id: yup.string().uuid().required(),
  name: yup.string().required("name is a required field"),
  email: yup.string().email().required("email is a required field"),
  isAdmin: yup.boolean().default(false).optional(),
});
