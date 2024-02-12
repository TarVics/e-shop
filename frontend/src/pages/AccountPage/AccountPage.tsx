import React from "react";
import { SubmitHandler } from "react-hook-form/dist/types/form";

import { useAppSelector, useAuth } from "../../hooks";
import { Breadcrumb, UserForm } from "../../components";
import { UserType } from "../../interface";

const AccountPage: React.FC = () => {
  const { i18n } = useAppSelector(state => state.i18nReducer);
  const { api } = useAuth();

  const onSubmit: SubmitHandler<UserType> = async (postUser) => {
    await api.saveProfile(postUser);
  };

  return (
    <>
      <Breadcrumb active={i18n.value.MY_ACCOUNT} />
      {/* <!-- section --> */}
      <div className="section">
        {/* <!-- container --> */}
        <div className="container">
          {/* <!-- row --> */}
          <div className="row">
            <UserForm onSubmit={onSubmit} />
          </div>
          {/* <!-- /row --> */}
        </div>
        {/* <!-- /container --> */}
      </div>
      {/* <!-- /section --> */}
    </>
  );
};

export { AccountPage };
