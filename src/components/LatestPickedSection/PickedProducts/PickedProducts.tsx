import React from 'react';

import {SectionTitle, ProductSingle} from "../..";
import {useAppSelector} from "../../../hooks";

const PickedProducts = () => {
    const {picked} = useAppSelector(state => state.summaryReducer);
    return (
        <>
            {/* <!-- PickedForYou --> */}
            {/* <!-- row --> */}
            <div className="row">
                <div className="col-md-12">
                    <SectionTitle caption={'Picked For You'}/>
                </div>

                {picked?.map(value =>
                    <div key={value.id} className="col-md-3 col-sm-6 col-xs-6">
                        <ProductSingle {...value}/>
                    </div>
                )}
            </div>
            {/* <!-- /row --> */}
            {/* <!-- /PickedForYou --> */}
        </>
    );
};

export {PickedProducts}