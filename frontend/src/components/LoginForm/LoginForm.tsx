import React, { useEffect } from "react";
import { SubmitHandler } from "react-hook-form/dist/types/form";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi/dist/joi";

import { uriService } from "../../services";
import { useAppSelector, useAuth } from "../../hooks";
import { loginValidator } from "../../validators";
import { FieldErrorMessage, PrimaryButton } from "..";
import { getErrorMessage } from "../../utils";
import { UserLoginType } from "../../interface";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [query] = useSearchParams();
  const { state } = useLocation();
  const { ctx: { token, error }, api } = useAuth();
  const { i18n } = useAppSelector(state => state.i18nReducer);
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors, isValid }
  } = useForm<UserLoginType>({
    resolver: joiResolver(loginValidator),
    mode: "all"
  });

  const onSubmit: SubmitHandler<UserLoginType> = async ({ email, password }) => {
    api.login({ email, password }).then(() => resetField("password"));
  };

  useEffect(() => {
    const expSession = query.get("expSession");
    if (expSession) {
      api.reset(i18n.value.SESSION_EXPIRED);
      query.delete("expSession");
    }
  }, [query, i18n.value.SESSION_EXPIRED, api]);

  useEffect(() => {
    if (token) {
      if (state?.pathname) {
        navigate(state.pathname, { replace: true });
      } else {
        navigate(uriService.uriAccount(), { replace: true });
      }
    }
  }, [state?.pathname, navigate, token]);

  return (
    <div className="col-md-6 col-md-offset-3">
      <form id="login-form" className="clearfix" onSubmit={handleSubmit(onSubmit)}>

        <div className="billing-details">
          <div className="section-title">
            <h3 className="title">{i18n.value.USER_LOGIN}</h3>
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

          {error &&
            <p>
              <span className="primary-color">{i18n.value.ERROR + ": " + getErrorMessage(i18n, error)}</span>
            </p>}

          <p>
            {i18n.value.NEED_ACCOUNT_QUESTION}&nbsp;
            <Link to={uriService.uriRegister()}>{i18n.value.SIGN_UP_HERE}</Link>
          </p>
          <p>
            <Link to={uriService.uriRecover()}>{i18n.value.FORGOT_QUESTION}</Link>
          </p>

        </div>

        <div className="pull-right">
          <PrimaryButton onClick={() => handleSubmit(onSubmit)} disabled={!isValid}>
            {i18n.value.SUBMIT}
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
};

export { LoginForm };
