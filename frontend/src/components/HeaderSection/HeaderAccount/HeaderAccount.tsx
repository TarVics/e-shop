import React from "react";
import { Link, useLocation } from "react-router-dom";

import { useAppSelector, useAuth } from "../../../hooks";
import { uriService } from "../../../services";

const HeaderAccount: React.FC = () => {
  const location = useLocation();
  const { i18n } = useAppSelector(state => state.i18nReducer);
  const { cart } = useAppSelector(state => state.cartsReducer);
  const { ctx, api } = useAuth();

  const onLogout = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    await api.logout();
  };
  return (
    <>
      {/* <!-- Account --> */}
      <li className="header-account dropdown default-dropdown">
        <div className="dropdown-toggle" role="button" data-toggle="dropdown"
             aria-expanded="true">
          <div className="header-btns-icon">
            <i className="fa fa-user-o"></i>
          </div>
          <strong className="text-uppercase">{i18n.value.MY_ACCOUNT} <i
            className="fa fa-caret-down"></i></strong>
        </div>
        {ctx.token ?
          <Link to="." className="text-uppercase" onClick={onLogout}>
            {i18n.value.LOGOUT}
          </Link> :
          <Link to={uriService.uriLogin()} state={location} className="text-uppercase">
            {i18n.value.LOGIN}
          </Link>
        }
        /
        <Link to={uriService.uriRegister()} className="text-uppercase">
          {i18n.value.JOIN}
        </Link>
        <ul className="custom-menu">
          {ctx.token &&
            <li>
              <Link to={uriService.uriAccount()}>
                <i className="fa fa-user-o"></i> {i18n.value.MY_ACCOUNT}
              </Link>
            </li>
          }
          <li><a href="."><i className="fa fa-heart-o"></i> {i18n.value.MY_WISHLIST}</a></li>
          <li><a href="."><i className="fa fa-exchange"></i> {i18n.value.COMPARE}</a></li>
          {cart?.items.length ?
            <li>
              <Link to={uriService.uriCheckout()}>
                <i className="fa fa-check"></i> {i18n.value.CHECKOUT}
              </Link>
            </li> : null
          }
          {ctx.token ?
            <li>
              <Link to="." onClick={onLogout}>
                <i className="fa fa-lock"></i>  &nbsp;{i18n.value.LOGOUT}
              </Link>
            </li> :
            <li>
              <Link to={uriService.uriLogin()} state={location}>
                <i className="fa fa-unlock-alt"></i>  &nbsp;{i18n.value.LOGIN}
              </Link>
            </li>
          }
          <li>
            <Link to={uriService.uriRegister()}>
              <i className="fa fa-user-plus"></i> {i18n.value.NEW_ACCOUNT}
            </Link>
          </li>
        </ul>
      </li>
      {/* <!-- /Account --> */}
    </>
  );
};

export { HeaderAccount };
