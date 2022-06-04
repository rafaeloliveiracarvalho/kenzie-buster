import * as yup from "yup";

export const serializedCartSchema = yup.object().shape({
  cart: yup.array().of(
    yup.object().shape({
      id: yup.string().uuid().required(),
      paid: yup.boolean().required(),
      total: yup.number().required(),
      dvds: yup
        .array()
        .of(
          yup.object().shape({
            id: yup.string().uuid().required(),
            quantity: yup.number().positive().required(),
            name: yup.string().required(),
            duration: yup.string().required(),
            price: yup.number().positive().required(),
          }),
        )
        .required(),
    }),
  ),
});

export const serializedAllCartSchema = yup.array().of(
  yup.object().shape({
    id: yup.string().uuid().required(),
    paid: yup.boolean().required(),
    total: yup.number().required(),
    dvds: yup
      .array()
      .of(
        yup.object().shape({
          id: yup.string().uuid().required(),
          quantity: yup.number().positive().required(),
          name: yup.string().required(),
          duration: yup.string().required(),
          price: yup.number().positive().required(),
        }),
      )
      .required(),
  }),
);
