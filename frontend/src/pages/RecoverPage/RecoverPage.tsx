import React, { useEffect } from "react";
import { joiResolver } from "@hookform/resolvers/joi/dist/joi";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { SubmitHandler } from "react-hook-form/dist/types/form";

import { UserRecoverPasswordType } from "../../interface";
import { useAppSelector, useAuth } from "../../hooks";
import { Breadcrumb, FieldErrorMessage, PrimaryButton } from "../../components";
import { recoverValidator } from "../../validators";
import { getErrorMessage } from "../../utils";
import { uriService } from "../../services";

const RecoverPage: React.FC = () => {
  const navigate = useNavigate();
  const { ctx: { error }, api } = useAuth();
  const { i18n } = useAppSelector(state => state.i18nReducer);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<UserRecoverPasswordType>({
    resolver: joiResolver(recoverValidator),
    mode: "all"
  });

  useEffect(() => {
    api.resetError();
  }, [api]);

  const onSubmit: SubmitHandler<UserRecoverPasswordType> = async ({ email }) => {
    api.recover({ email }, i18n.encode).then((result) =>
      result && navigate(uriService.uriAccount(), { replace: true }));
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
            <div className="col-md-6 col-md-offset-3">
              <form id="login-form" className="clearfix" onSubmit={handleSubmit(onSubmit)}>

                <div className="billing-details">
                  <div className="section-title">
                    <h3 className="title">{i18n.value.RECOVER_PASSWORD}</h3>
                  </div>
                  <div className="form-group">
                    {i18n.value.RECOVER_LETTER_INFO}
                  </div>
                  <div className="form-group">
                    <input className="input" type="email"
                           placeholder={i18n.value.FORM_EMAIL}
                           {...register("email")}
                    />
                    <FieldErrorMessage error={errors["email"]} />
                  </div>

                  {error &&
                    <p>
                      <span className="primary-color">{i18n.value.ERROR + ": " + getErrorMessage(i18n, error)}</span>
                    </p>}

                </div>

                <div className="pull-right">
                  <PrimaryButton onClick={() => handleSubmit(onSubmit)} disabled={!isValid}>
                    {i18n.value.SUBMIT}
                  </PrimaryButton>
                </div>
              </form>
            </div>

          </div>
          {/* <!-- /row --> */}
        </div>
        {/* <!-- /container --> */}
      </div>
      {/* <!-- /section --> */}
    </>
  );
};

export { RecoverPage };