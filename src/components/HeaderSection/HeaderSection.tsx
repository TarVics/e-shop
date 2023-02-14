import React from 'react';

import {HeaderAccount, HeaderCart, HeaderLogo, HeaderNavToggle, HeaderSearch, HeaderTop} from ".";

const HeaderSection = () => {
    return (
        <>
            {/* <!-- HEADER --> */}
            <header>
                <HeaderTop/>
                {/* <!-- header --> */}
                <div id="header">
                    {/* <!-- container --> */}
                    <div className="container">
                        <div className="pull-left">
                            <HeaderLogo/>
                            <HeaderSearch/>
                        </div>
                        <div className="pull-right">
                            <ul className="header-btns">
                                <HeaderAccount/>
                                <HeaderCart/>
                                <HeaderNavToggle/>
                            </ul>
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

export {HeaderSection}