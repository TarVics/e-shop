import React from "react";

import { HeaderAccount, HeaderCart, HeaderLogo, HeaderNavToggle, HeaderSearch, HeaderTop } from ".";
import { getErrorMessage } from "../../utils";
import { useAppSelector } from "../../hooks";

const HeaderSection: React.FC = () => {
  const { error: cartsError } = useAppSelector(state => state.cartsReducer);
  const { i18n } = useAppSelector(state => state.i18nReducer);
  return (
    <>
      {/* <!-- HEADER --> */}
      <header>
        <HeaderTop />
        {/* <!-- header --> */}
        <div id="header">
          {/* <!-- container --> */}
          <div className="container">
            <div className="pull-left">
              <HeaderLogo />
              <HeaderSearch />
            </div>
            <div className="pull-right">
              <ul className="header-btns">
                <HeaderAccount />
                <HeaderCart />
                <HeaderNavToggle />
              </ul>
              {cartsError &&
                <div>
                  <span className="primary-color">{i18n.value.ERROR + ": " + getErrorMessage(i18n, cartsError)}</span>
                </div>
              }
            </div>

          </div>


          {/* <!-- /container --> */}
        </div>

        {/* <!-- /header --> */}
      </header>
      {/* <!-- /HEADER --> */}
    </>
  );
};

export { HeaderSection };