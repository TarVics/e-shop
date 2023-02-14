import React from 'react';

const HeaderNavToggle = () => {
    return (
        <>
            {/* <!-- Mobile nav toggle--> */}
            <li className="nav-toggle">
                <button className="nav-toggle-btn main-btn icon-btn">
                    <i className="fa fa-bars"></i>
                </button>
            </li>
            {/* <!-- / Mobile nav toggle --> */}
        </>
    );
};

export {HeaderNavToggle}