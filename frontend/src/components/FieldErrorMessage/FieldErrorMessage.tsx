import React from "react";
import { FieldError } from "react-hook-form";

import { useAppSelector } from "../../hooks";
import { I18nKey } from "../../data";

const FieldErrorMessage: React.FC<{ error?: FieldError }> = ({ error }) => {
  const { i18n } = useAppSelector(state => state.i18nReducer);
  if (!error) return null;
  const message = error.message && (i18n.value[error.message as I18nKey] || error.message);
  return message ? <span className={"error"}>{message}</span> : null;
};

export { FieldErrorMessage };
