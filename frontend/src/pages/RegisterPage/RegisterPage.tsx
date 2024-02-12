import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SubmitHandler } from "react-hook-form/dist/types/form";

import { UserRegisterFormType } from "../../interface";
import { uriService } from "../../services";
import { useAppSelector, useAuth } from "../../hooks";
import { Breadcrumb, UserRegForm } from "../../components";
import { getErrorMessage } from "../../utils";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { i18n } = useAppSelector(state => state.i18nReducer);
  const { ctx, api } = useAuth();
  const onSubmit: SubmitHandler<UserRegisterFormType> = async (data) => {
    const { passwordConfirm, ...user } = data;
    api.signIn(user, i18n.encode).then((result) =>
      result && navigate(uriService.uriAccount(), { replace: true })
    );
  };

  useEffect(() => {
    api.reset();
  }, [api]);

  return (
    <>
      <Breadcrumb active={i18n.value.NEW_ACCOUNT} />
      {/* <!-- section --> */}
      <div className="section">
        {/* <!-- container --> */}
        <div className="container">
          {/* <!-- row --> */}
          <div className="row">
            <UserRegForm onSubmit={onSubmit} />
            {ctx.error &&
              <p>
                <span className="primary-color">{i18n.value.ERROR + ": " + getErrorMessage(i18n, ctx.error)}</span>
              </p>}
          </div>
          {/* <!-- /row --> */}
        </div>
        {/* <!-- /container --> */}
      </div>
      {/* <!-- /section --> */}
    </>
  );
};

export { RegisterPage };
