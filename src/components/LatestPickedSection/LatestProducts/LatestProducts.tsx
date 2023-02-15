import React from 'react';
import {useNavigate} from "react-router-dom";

import {SectionTitle, ProductSingle, SectionBanner, SectionButton} from "../..";
import {useAppSelector} from "../../../hooks";
import {refsService, uriService} from "../../../services";

const LatestProducts = () => {
    const navigate = useNavigate();
    const {i18n} = useAppSelector(state => state.i18nReducer);
    const {latest} = useAppSelector(state => state.summaryReducer);
    const {collections} = useAppSelector(state => state.refsReducer);
    const collection = latest?.collectionColumn ? refsService.getCollectionById(collections, latest?.collectionColumn) : null;
    return (
        <>
            {/* <!-- Latest Products --> */}
            {/* <!-- row --> */}
            <div className="row">
                <div className="col-md-12">
                    <SectionTitle caption={i18n.value.LATEST_PRODUCTS}/>
                </div>

                {[0,1,2,3].map(value =>
                    latest?.products[value] ?
                        <div key={value} className="col-md-3 col-sm-6 col-xs-6">
                            <ProductSingle {...latest?.products[value]}/>
                        </div> : null
                )}
            </div>
            {/* <!-- /row --> */}

            {/* <!-- row --> */}
            <div className="row">
                <div className="col-md-3 col-sm-6 col-xs-6">
                    {collection && collection.banner.column ?
                        <SectionBanner className="banner-2" image={collection.banner.column}>
                            <h2 className="white-color">{collection.name}</h2>
                            <SectionButton onClick={()=>{
                                navigate(uriService.uriProductsByCollectionId(collection.id));
                            }}>{i18n.value.SHOP_NOW}</SectionButton>
                        </SectionBanner> : null
                    }
                </div>

                {[4,5,6].map(value =>
                    latest?.products[value] ?
                        <div key={value} className="col-md-3 col-sm-6 col-xs-6">
                            <ProductSingle {...latest?.products[value]}/>
                        </div> : null
                )}
            </div>
            {/* <!-- /row --> */}
            {/* <!-- /LatestProducts --> */}
        </>
    );
};

export {LatestProducts}