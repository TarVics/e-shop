import React, { useEffect } from "react";
import { SubmitHandler } from "react-hook-form/dist/types/form";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi/dist/joi";

import { UserRegisterFormType } from "../../interface";
import { useAppSelector } from "../../hooks";
import { registerValidator } from "../../validators";
import { FieldErrorMessage, PrimaryButton } from "..";
import { Link, useLocation } from "react-router-dom";
import { uriService } from "../../services";

interface UserRegisterPropsType {
  onSubmit: SubmitHandler<UserRegisterFormType>;
}

const defaultUserRegisterType: Partial<UserRegisterFormType> = {};

const UserRegForm: React.FC<UserRegisterPropsType> = (
  {
    onSubmit
  }
) => {
  const location = useLocation();
  const { i18n } = useAppSelector(state => state.i18nReducer);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm<UserRegisterFormType>({
    resolver: joiResolver(registerValidator),
    mode: "all"
  });

  useEffect(() => {
    reset(defaultUserRegisterType);
  }, [reset]);

  return (
    <form id="checkout-form" className="clearfix" onSubmit={handleSubmit(onSubmit)}>
      <div className="col-md-6 col-md-offset-3">
        <div className="billing-details">
          <div className="section-title">
            <h3 className="title">{i18n.value.USER_NEW}</h3>
          </div>
          <div className="form-group">
            {i18n.value.REGISTER_LETTER_INFO}
          </div>
          <div className="form-group">
            <input className="input" type="email"
                   placeholder={i18n.value.FORM_EMAIL}
                   {...register("email")}
            />
            <FieldErrorMessage error={errors["email"]} />
          </div>
          <div className="form-group">
            <input className="input" type="password"
                   placeholder={i18n.value.ENTER_YOUR_PASSWORD}
                   {...register("password")}
            />
            <FieldErrorMessage error={errors["password"]} />
          </div>
          <div className="form-group">
            <input className="input" type="password"
                   placeholder={i18n.value.REENTER_YOUR_PASSWORD}
                   {...register("passwordConfirm")}
            />
            <FieldErrorMessage error={errors["passwordConfirm"]} />
          </div>
          <div className="form-group">
            <input className="input" type="text"
                   placeholder={i18n.value.FORM_FIRST_NAME}
                   {...register("firstName")}
            />
            <FieldErrorMessage error={errors["firstName"]} />
          </div>
          <div className="form-group">
            <input className="input" type="text"
                   placeholder={i18n.value.FORM_LAST_NAME}
                   {...register("lastName")}
            />
            <FieldErrorMessage error={errors["lastName"]} />
          </div>
        </div>

        <p>
          {i18n.value.ACCOUNT_EXISTS_QUESTION}&nbsp;
          <Link to={uriService.uriLogin()} state={location}>{i18n.value.USER_LOGIN}</Link>
        </p>

        <div className="pull-right">
          <PrimaryButton onClick={() => handleSubmit(onSubmit)} disabled={!isValid}>
            {i18n.value.SUBMIT}
          </PrimaryButton>
        </div>

      </div>

    </form>
  );
};

export { UserRegForm };
