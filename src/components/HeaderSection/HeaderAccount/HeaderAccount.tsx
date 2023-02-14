import React from 'react';

const HeaderAccount = () => {
    return (
        <>
            {/* <!-- Account --> */}
            <li className="header-account dropdown default-dropdown">
                <div className="dropdown-toggle" role="button" data-toggle="dropdown"
                     aria-expanded="true">
                    <div className="header-btns-icon">
                        <i className="fa fa-user-o"></i>
                    </div>
                    <strong className="text-uppercase">My Account <i
                        className="fa fa-caret-down"></i></strong>
                </div>
                <a href="." className="text-uppercase">Login</a> / <a href="."
                                                                      className="text-uppercase">Join</a>
                <ul className="custom-menu">
                    <li><a href="."><i className="fa fa-user-o"></i> My Account</a></li>
                    <li><a href="."><i className="fa fa-heart-o"></i> My Wishlist</a></li>
                    <li><a href="."><i className="fa fa-exchange"></i> Compare</a></li>
                    <li><a href="."><i className="fa fa-check"></i> Checkout</a></li>
                    <li><a href="."><i className="fa fa-unlock-alt"></i> Login</a></li>
                    <li><a href="."><i className="fa fa-user-plus"></i> Create An Account</a></li>
                </ul>
            </li>
            {/* <!-- /Account --> */}
        </>
    );
};

export {HeaderAccount}