import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { uriService } from "../../services";
import { useAppSelector, useAuth } from "../../hooks";
import { Breadcrumb, FieldErrorMessage, PrimaryButton } from "../../components";
import { SubmitHandler } from "react-hook-form/dist/types/form";
import { UserReLoginFormType } from "../../interface";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi/dist/joi";
import { reLoginValidator } from "../../validators";
import { getErrorMessage } from "../../utils";

const defaultUserReLoginType: Partial<UserReLoginFormType> = {};

const RecoverConfirmPage: React.FC = () => {
  // http://localhost/recover/confirm?token=.....
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { i18n } = useAppSelector(state => state.i18nReducer);
  const { ctx, api } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm<UserReLoginFormType>({
    resolver: joiResolver(reLoginValidator),
    mode: "all"
  });

  useEffect(() => {
    reset(defaultUserReLoginType);
  }, [reset]);

  const onSubmit: SubmitHandler<UserReLoginFormType> = async (data) => {
    const token = params.get("token");
    if (!token) return;

    const { passwordConfirm, ...user } = data;
    api.recoverConfirm(token, user).then((result) =>
      result && navigate(uriService.uriAccount(), { replace: true })
    );
  };

  const getError = () => {
    const token = params.get("token");
    const msg = !token ? i18n.value.TOKEN_ERROR : getErrorMessage(i18n, ctx.error);
    return msg && (
      <p>
        <span className="primary-color">{i18n.value.ERROR + ": " + msg}</span>
      </p>
    );
  };

  return (
    <>
      <Breadcrumb active={i18n.value.USER_RECOVER} />
      {/* <!-- section --> */}
      <div className="section">
        {/* <!-- container --> */}
        <div className="container">
          {/* <!-- row --> */}
          <div className="row">
            <form id="checkout-form" className="clearfix" onSubmit={handleSubmit(onSubmit)}>
              <div className="col-md-6 col-md-offset-3">
                <div className="billing-details">
                  <div className="section-title">
                    <h3 className="title">{i18n.value.ACCOUNT_CONFIRM}</h3>
                  </div>
                  <div className="form-group">
                    {i18n.value.USER_RECOVER_INFO}
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
                  {getError()}
                </div>
                <div className="pull-right">
                  <PrimaryButton onClick={() => handleSubmit(onSubmit)} disabled={!isValid || !params.get("token")}>
                    {i18n.value.SUBMIT}
                  </PrimaryButton>
                </div>

              </div>
            </form>
          </div>
          {/* <!-- /row --> */}
        </div>
        {/* <!-- /container --> */}
      </div>
      {/* <!-- /section --> */}
    </>
  );
};

export { RecoverConfirmPage };
