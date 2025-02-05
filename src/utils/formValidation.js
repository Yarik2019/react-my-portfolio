import * as Yup from "yup";
import i18next from "i18next";

const lazyT = (key) => () => i18next.t(key);

const emailValid = Yup.string()
  .email(() => i18next.t("validation.email.invalid"))
  .min(3, () => i18next.t("validation.email.min"))
  .max(50, () => i18next.t("validation.email.max"))
  .required(() => i18next.t("validation.email.required"));

const passwordValid = Yup.string()
  .min(3, lazyT("validation.password.min"))
  .max(50, lazyT("validation.password.max"))
  .matches(/[a-zA-Z]/, lazyT("validation.password.letter"))
  .matches(/[0-9]/, lazyT("validation.password.number"))
  .required(lazyT("validation.password.required"));

const nameValid = Yup.string()
  .nullable()
  .transform((value) => {
    if (value === "") return null;
    return value;
  })
  .test("is-null-or-valid", lazyT("validation.name.min"), (value) => {
    if (value === null) return true;
    return value.length >= 2;
  })
  .test("is-max-length", lazyT("validation.name.max"), (value) => {
    if (value === null) return true;
    return value.length <= 16;
  });

const activityTimeValid = Yup.number()
  .typeError(lazyT("validation.activityTime.typeError"))
  .min(0, lazyT("validation.activityTime.min"))
  .max(12, lazyT("validation.activityTime.max"));

const weightValid = Yup.number()
  .min(0, lazyT("validation.weight.min"))
  .max(200, lazyT("validation.weight.max"))
  .typeError(lazyT("validation.weight.typeError"));

const waterIntakeValid = Yup.number()
  .min(0.5, lazyT("validation.waterIntake.min"))
  .max(15, lazyT("validation.waterIntake.max"))
  .typeError(lazyT("validation.waterIntake.typeError"))
  .test("one-decimal-place", lazyT("validation.waterIntake.test"), (value) => {
    if (value === undefined || value === null) return true;
    return /^\d+(\.\d{1})?$/.test(String(value));
  });

export const orderSchemaLogin = Yup.object({
  email: emailValid,
  password: passwordValid,
});

export const orderSchemaReg = Yup.object({
  email: emailValid,
  password: passwordValid,
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], lazyT("validation.password.match"))
    .required(lazyT("validation.password.confirmRequired")),
});

export const userSettingsSchema = Yup.object().shape({
  avatar: Yup.mixed().default((obj) =>
    obj.name ? obj.name.charAt(0).toUpperCase() : ""
  ),
  gender: Yup.string(),
  name: nameValid,
  email: emailValid,
  weight: weightValid,
  timeActive: activityTimeValid,
  dailyNorma: waterIntakeValid,
});

export const validationSchemaWaterChange = Yup.object().shape({
  amount: Yup.number()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    )
    .nullable()
    .required(lazyT("validation.amount.required"))
    .positive(lazyT("validation.amount.positive"))
    .integer(lazyT("validation.amount.integer"))
    .min(50, lazyT("validation.amount.min"))
    .max(2000, lazyT("validation.amount.max")),
  time: Yup.string()
    .required(lazyT("validation.time.required"))
    .matches(
      /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
      lazyT("validation.time.format")
    ),
});
