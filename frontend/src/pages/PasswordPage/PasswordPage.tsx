import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAuth } from "../../hooks";
import { useForm } from "react-hook-form";
import { UserChangePasswordFormType } from "../../interface";
import { joiResolver } from "@hookform/resolvers/joi/dist/joi";
import { changePasswordValidator } from "../../validators";
import { SubmitHandler } from "react-hook-form/dist/types/form";
import { uriService } from "../../services";
import { getErrorMessage } from "../../utils";
import { Breadcrumb, FieldErrorMessage, PrimaryButton } from "../../components";

const PasswordPage = () => {
  const navigate = useNavigate();
  const { i18n } = useAppSelector(state => state.i18nReducer);
  const { ctx, api } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm<UserChangePasswordFormType>({
    resolver: joiResolver(changePasswordValidator),
    mode: "all"
  });

  useEffect(() => {
    api.resetError();
    reset();
  }, [reset, api]);

  const onSubmit: SubmitHandler<UserChangePasswordFormType> = async (data) => {
    const { newPasswordConfirm, ...user } = data;
    api.changePassword(user).then((result) =>
      result && navigate(uriService.uriAccount(), { replace: true })
    );
  };

  return (
    <>
      <Breadcrumb
        items={[{
          id: "ACCOUNT",
          name: i18n.value.MY_ACCOUNT,
          uri: uriService.uriAccount()
        }]}
        active={i18n.value.USER_NEW_PASSWORD} />
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
                    <h3 className="title">{i18n.value.USER_NEW_PASSWORD}</h3>
                  </div>
                  <div className="form-group">
                    {i18n.value.USER_NEW_PASSWORD_INFO}
                  </div>
                  <div className="form-group">
                    <input className="input" type="password"
                           placeholder={i18n.value.ENTER_OLD_PASSWORD}
                           {...register("oldPassword")}
                    />
                    <FieldErrorMessage error={errors["oldPassword"]} />
                  </div>
                  <div className="form-group">
                    <input className="input" type="password"
                           placeholder={i18n.value.ENTER_NEW_PASSWORD}
                           {...register("newPassword")}
                    />
                    <FieldErrorMessage error={errors["newPassword"]} />
                  </div>
                  <div className="form-group">
                    <input className="input" type="password"
                           placeholder={i18n.value.REENTER_YOUR_PASSWORD}
                           {...register("newPasswordConfirm")}
                    />
                    <FieldErrorMessage error={errors["newPasswordConfirm"]} />
                  </div>
                  {ctx.error && (
                    <p>
                      <span className="primary-color">{i18n.value.ERROR + ": " + getErrorMessage(i18n, ctx.error)}</span>
                    </p>)}
                </div>
                <div className="pull-right">
                  <PrimaryButton onClick={() => handleSubmit(onSubmit)} disabled={!isValid}>
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

export { PasswordPage };