import CustomJoi from "joi";

const Joi = CustomJoi.extend(require("joi-phone-number"));

const messages = {
  "string.pattern.base": "JOI_W20",
  "string.empty": "JOI_EMPTY",
  "string.email": "JOI_EMAIL",
  "number.base": "JOI_NUMBER",
  "phoneNumber.invalid": "JOI_PHONE"
};

const userValidator = Joi.object({
  firstName: Joi.string().regex(/^[a-zA-ZА-яёЁіІїЇҐґєЄ\s\-'()]{1,20}$/).required().messages(messages),
  lastName: Joi.string().regex(/^[a-zA-ZА-яёЁіІїЇҐґєЄ\s\-'()]{1,20}$/).required().messages(messages),
  email: Joi.string().email({ tlds: {} }).required().messages(messages),
  address: Joi.string().allow("").messages(messages),
  city: Joi.string().allow("").messages(messages),
  country: Joi.string().allow("").messages(messages),
  zipCode: Joi.string().allow("").regex(/^[0-9]{5,6}$/).messages({ ...messages, "string.pattern.base": "JOI_ZIP" }),
  tel: Joi.string().phoneNumber({ strict: true, format: "international" }).required().messages(messages),
  register: Joi.boolean(),
  password: Joi.alternatives().conditional("register", {
    is: true,
    then: Joi.string().min(4).max(40).required().messages({
      ...messages,
      "string.min": "JOI_PASSWORD",
      "string.max": "JOI_PASSWORD"
    }),
    otherwise: Joi.string().allow("").messages(messages)
  }),
  passwordConfirm: Joi.alternatives().conditional("register", {
    is: true,
    then: Joi.any().equal(Joi.ref("password")).required().messages({
      ...messages,
      "any.only": "JOI_PASSWORD_CONFIRM"
    }),
    otherwise: Joi.string().allow("").messages(messages)
  }),
  shippingMethodId: Joi.number().integer().required().messages(messages),
  paymentMethodId: Joi.number().integer().required().messages(messages)
});

const loginValidator = Joi.object({
  email: Joi.string().email({ tlds: {} }).required().messages(messages),
  // password: Joi.alternatives().conditional("register", {
  //   is: true,
  //   then: Joi.string().min(4).max(20).required().messages({
  //     ...messages,
  //     "string.min": "JOI_PASSWORD",
  //     "string.max": "JOI_PASSWORD"
  //   }),
  //   otherwise: Joi.string().allow("").messages(messages)
  // })
  password: Joi.string().required().messages(messages)
});

const recoverValidator = Joi.object({
  email: Joi.string().email({ tlds: {} }).required().messages(messages)
});

const registerValidator = Joi.object({
  firstName: Joi.string().regex(/^[a-zA-ZА-яёЁіІїЇҐґєЄ\s\-'()]{1,20}$/).required().messages(messages),
  lastName: Joi.string().regex(/^[a-zA-ZА-яёЁіІїЇҐґєЄ\s\-'()]{1,20}$/).required().messages(messages),
  email: Joi.string().email({ tlds: {} }).required().messages(messages),
  // password: Joi.alternatives().conditional("register", {
  //   is: true,
  //   then: Joi.string().min(4).max(20).required().messages({
  //     ...messages,
  //     "string.min": "JOI_PASSWORD",
  //     "string.max": "JOI_PASSWORD"
  //   }),
  //   otherwise: Joi.string().allow("").messages(messages)
  // })
  password: Joi.string()
    .min(4).max(20)
    .regex(/(?=.*\d)(?=.*\W+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/).required().messages({
      ...messages,
      "string.min": "JOI_PASSWORD",
      "string.max": "JOI_PASSWORD"
    }).messages(messages),
  passwordConfirm: Joi.any().equal(Joi.ref("password")).required().messages({
    ...messages,
    "any.only": "JOI_PASSWORD_CONFIRM"
  })
});

const reLoginValidator = Joi.object({
  email: Joi.string().email({ tlds: {} }).required().messages(messages),
  password: Joi.string()
    .min(4).max(20)
    .regex(/(?=.*\d)(?=.*\W+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/).required().messages({
      ...messages,
      "string.min": "JOI_PASSWORD",
      "string.max": "JOI_PASSWORD"
    }).messages(messages),
  passwordConfirm: Joi.any().equal(Joi.ref("password")).required().messages({
    ...messages,
    "any.only": "JOI_PASSWORD_CONFIRM"
  })
});

const changePasswordValidator = Joi.object({
  oldPassword: Joi.string().required().messages(messages),
  newPassword: Joi.string()
    .min(4).max(20)
    .regex(/(?=.*\d)(?=.*\W+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/).required().messages({
      ...messages,
      "string.min": "JOI_PASSWORD",
      "string.max": "JOI_PASSWORD"
    }).messages(messages),
  newPasswordConfirm: Joi.any().equal(Joi.ref("newPassword")).required().messages({
    ...messages,
    "any.only": "JOI_PASSWORD_CONFIRM"
  })
});

export {
  changePasswordValidator,
  loginValidator,
  userValidator,
  registerValidator,
  reLoginValidator,
  recoverValidator
};
