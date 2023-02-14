import React from 'react';
import {Link} from "react-router-dom";

import imagesData from "../../../data/app/images.data";
import {uriService} from "../../../services";

const HeaderLogo = () => {
    return (
        <>
            {/* <!-- Logo --> */}

            <div className="header-logo">
                <Link className="logo" to={uriService.uriHome()}>
                    <img src={imagesData.logo} alt=""/>
                </Link>
            </div>
            {/* <!-- /Logo --> */}
        </>
    );
};

export {HeaderLogo}