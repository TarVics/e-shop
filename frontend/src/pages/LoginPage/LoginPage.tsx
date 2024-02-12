import React from "react";

import { useAppSelector } from "../../hooks";
import { Breadcrumb, LoginForm } from "../../components";

const LoginPage: React.FC = () => {
  const { i18n } = useAppSelector(state => state.i18nReducer);

  return (
    <>
      <Breadcrumb active={i18n.value.LOGIN} />
      {/* <!-- section --> */}
      <div className="section">
        {/* <!-- container --> */}
        <div className="container">
          {/* <!-- row --> */}
          <div className="row">
            <LoginForm />
          </div>
          {/* <!-- /row --> */}
        </div>
        {/* <!-- /container --> */}
      </div>
      {/* <!-- /section --> */}
    </>
  );
};

export { LoginPage };
