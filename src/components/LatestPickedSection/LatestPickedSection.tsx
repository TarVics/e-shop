import React from 'react';

import {LatestProducts, PickedProducts} from ".";

const LatestPickedSection = () => {
    return (
        <>
            {/* <!-- LatestPicked --> */}
            <div className="section">
                {/* <!-- container --> */}
                <div className="container">
                    <LatestProducts/>
                    <PickedProducts/>
                </div>
                {/* <!-- /container --> */}
            </div>
            {/* <!-- /LatestPicked --> */}
        </>
    );
};

export {LatestPickedSection}
