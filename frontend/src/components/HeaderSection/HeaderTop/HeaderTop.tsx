import React from "react";

import { useAppDispatch, useAppSelector } from "../../../hooks";
import { i18nActions, refsActions } from "../../../redux";
import { i18nData } from "../../../data";
import { CurrencyType, I18nLanguage } from "../../../interface";

const HeaderTop: React.FC = () => {
  const dispatch = useAppDispatch();
  const { i18n } = useAppSelector(state => state.i18nReducer);
  const { activeCurrency, currencies } = useAppSelector(state => state.refsReducer);

  const changeLanguage = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, language: I18nLanguage) => {
    dispatch(i18nActions.setLanguage(language));
    e.preventDefault();
  };

  const changeCurrency = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, currency: CurrencyType) => {
    dispatch(refsActions.setActiveCurrency(currency));
    e.preventDefault();
  };
  return (
    <>
      {/* <!-- top Header --> */}
      <div id="top-header">
        <div className="container">
          <div className="pull-left">
            <span>{i18n.value.WELCOME}</span>
          </div>
          <div className="pull-right">
            <ul className="header-top-links">
              <li><a href=".">{i18n.value.STORE}</a></li>
              <li><a href=".">{i18n.value.NEWSLETTER}</a></li>
              <li><a href=".">FAQ</a></li>
              <li className="dropdown default-dropdown">
                <div className="dropdown-toggle" data-toggle="dropdown"
                     aria-expanded="true">{i18n.short} <i
                  className="fa fa-caret-down"></i></div>
                <ul className="custom-menu">
                  {Object.entries(i18nData).map(([language, data]) => {
                    return (
                      <li key={language}>
                        <a href="." onClick={e => changeLanguage(e, language as I18nLanguage)}>
                          {`${data.name} (${data.short})`}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </li>
              <li className="dropdown default-dropdown">
                <div className="dropdown-toggle" data-toggle="dropdown"
                     aria-expanded="true">{activeCurrency?.name} <i
                  className="fa fa-caret-down"></i></div>
                <ul className="custom-menu">
                  {currencies.map(currency => {
                    return (
                      <li key={currency.id}>
                        <a href="." onClick={e => changeCurrency(e, currency)}>
                          {`${currency.name} (${currency.sign})`}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* <!-- /top Header --> */}
    </>
  );
};

export { HeaderTop };