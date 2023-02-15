import React from 'react';

import {useAppSelector} from "../../../hooks";

const HeaderAccount = () => {
    const {i18n} = useAppSelector(state => state.i18nReducer);
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
                <a href="." className="text-uppercase">{i18n.value.LOGIN}</a> / <a href="."
                                                                      className="text-uppercase">{i18n.value.JOIN}</a>
                <ul className="custom-menu">
                    <li><a href="."><i className="fa fa-user-o"></i> {i18n.value.MY_ACCOUNT}</a></li>
                    <li><a href="."><i className="fa fa-heart-o"></i> {i18n.value.MY_WISHLIST}</a></li>
                    <li><a href="."><i className="fa fa-exchange"></i> {i18n.value.COMPARE}</a></li>
                    <li><a href="."><i className="fa fa-check"></i> {i18n.value.CHECKOUT}</a></li>
                    <li><a href="."><i className="fa fa-unlock-alt"></i> {i18n.value.LOGIN}</a></li>
                    <li><a href="."><i className="fa fa-user-plus"></i> {i18n.value.CREATE_ACCOUNT}</a></li>
                </ul>
            </li>
            {/* <!-- /Account --> */}
        </>
    );
};

export {HeaderAccount}