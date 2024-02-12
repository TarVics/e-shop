import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { uriService } from "../../services";
import { useAppSelector, useAuth } from "../../hooks";
import { Breadcrumb } from "../../components";
import { getErrorMessage } from "../../utils";

const RegisterConfirmPage: React.FC = () => {
  // http://localhost/register/confirm?token=.....
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { i18n } = useAppSelector(state => state.i18nReducer);
  const { ctx, api } = useAuth();

  useEffect(() => {
    const token = params.get("token");
    token && api.signInConfirm(token);
  }, [params, api]);

  useEffect(() => {
    ctx.token && navigate(uriService.uriAccount(), { replace: true });
  }, [ctx, navigate]);

  const getError = () => {
    const token = params.get("token");
    const msg = !token ? i18n.value.TOKEN_ERROR : getErrorMessage(i18n, ctx.error);
    return msg && (
      <p>
        <span className="primary-color">{i18n.value.CONFIRM_ERROR + ": " + msg}</span>
      </p>
    );
  };

  return (
    <>
      <Breadcrumb active={i18n.value.USER_NEW} />
      {/* <!-- section --> */}
      <div className="section">
        {/* <!-- container --> */}
        <div className="container">
          {/* <!-- row --> */}
          <div className="row">
            <div className="col-md-6 col-md-offset-3">
              <div className="billing-details">
                <div className="section-title">
                  <h3 className="title">{i18n.value.NEW_ACCOUNT_CONFIRM}</h3>
                </div>
                {getError()}
              </div>
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

export { RegisterConfirmPage };
