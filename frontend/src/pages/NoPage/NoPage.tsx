import React from "react";

import css from "./NoPage.module.css";
import { useAppSelector } from "../../hooks";
import { Breadcrumb } from "../../components";

const NoPage: React.FC = () => {
  const { i18n } = useAppSelector(state => state.i18nReducer);
  return (
    <>
      <Breadcrumb active={i18n.value.PAGE_NOT_FOUND} />
      {/* <!-- section --> */}
      <div className="section">
        {/* <!-- container --> */}
        <div className={"container " + css.wrapper}>
          {/* <!-- row --> */}
          <div className={"row " + css.content}>
            <h1 className={css.title}>{i18n.value.PAGE_NOT_FOUND}</h1>
          </div>
          {/* <!-- /row --> */}
        </div>
        {/* <!-- /container --> */}
      </div>
      {/* <!-- /section --> */}
    </>
  );
};

export { NoPage };
