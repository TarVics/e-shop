import React from 'react';
import {useNavigate} from "react-router-dom";

import {useAppSelector} from "../../hooks";
import {refsService, uriService} from "../../services";
import {SectionBanner, SectionButton} from "..";

const HotDealSection = () => {
    const {i18n} = useAppSelector(state => state.i18nReducer);

    const navigate = useNavigate();
    const {hot} = useAppSelector(state => state.summaryReducer);
    const {collections} = useAppSelector(state => state.refsReducer);

    const largeCollection = hot ? refsService.getCollectionById(collections, hot.collectionLarge) : null;
    const normal1Collection = hot ? refsService.getCollectionById(collections, hot.collectionNormal[0]) : null;
    const normal2Collection = hot ? refsService.getCollectionById(collections, hot.collectionNormal[1]) : null;

    return (
        <>
            {/* <!-- HotDeal --> */}
            <div className="section section-grey">
                {/* <!-- container --> */}
                <div className="container">
                    {/* <!-- row --> */}
                    <div className="row">

                        {/* <!-- banner --> */}
                        <div className="col-md-8">

                            {largeCollection && largeCollection.banner.large ?
                                <>
                                    {/* <!-- banner --> */}
                                    <SectionBanner className="banner-1" image={largeCollection.banner.large}
                                                   centered={true}>
                                        <h1 className="primary-color">{largeCollection.name}<br/><span
                                            className="white-color font-weak">{largeCollection.description}</span></h1>
                                        <SectionButton onClick={() => {
                                            navigate(uriService.uriProductsByCollectionId(largeCollection.id))
                                        }}>{i18n.value.SHOP_NOW}</SectionButton>
                                    </SectionBanner>
                                    {/* <!-- /banner --> */}

                                </> : null
                            }
                        </div>
                        {/* <!-- /banner --> */}

                        {/* <!-- banner --> */}
                        <div className="col-md-4 col-sm-6">
                            {normal1Collection && normal1Collection.banner.normal ?
                                <>
                                    {/* <!-- banner --> */}
                                    <SectionBanner className="banner-1" image={normal1Collection.banner.normal}
                                                   centered={true}
                                                   onClick={() => {
                                                       navigate(uriService.uriProductsByCollectionId(normal1Collection.id))
                                                   }}>
                                        <h2 className="white-color">{normal1Collection.name}</h2>
                                    </SectionBanner>
                                    {/* <!-- /banner --> */}
                                </> : null
                            }
                        </div>
                        {/* <!-- /banner --> */}

                        {/* <!-- banner --> */}
                        <div className="col-md-4 col-sm-6">
                            {normal2Collection && normal2Collection.banner.normal ?
                                <>
                                    <SectionBanner className="banner-1" image={normal2Collection.banner.normal}
                                                   centered={true}
                                                   onClick={() => {
                                                       navigate(uriService.uriProductsByCollectionId(normal2Collection.id))
                                                   }}>
                                        <h2 className="white-color">{normal2Collection.name}</h2>
                                    </SectionBanner>
                                </> : null
                            }
                        </div>
                        {/* <!-- /banner --> */}
                    </div>
                    {/* <!-- /row --> */}
                </div>
                {/* <!-- /container --> */}
            </div>
            {/* <!-- /HotDeal --> */}
        </>
    );
};

export {HotDealSection}