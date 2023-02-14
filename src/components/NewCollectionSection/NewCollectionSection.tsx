import React from 'react';

import {SectionBanner} from "../SectionBanner";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../hooks";
import {refsService, uriService} from "../../services";

const NewCollectionSection = () => {
    const navigate = useNavigate();
    const {home} = useAppSelector(state => state.summaryReducer);
    const {collections} = useAppSelector(state => state.refsReducer);
    return (
        <>
            {/* <!-- NewCollection --> */}
            <div className="section">
                {/* <!-- container --> */}
                <div className="container">
                    {/* <!-- row --> */}
                    <div className="row">
                        {home?.collectionNormal.map(collectionId => {
                            const collection = refsService.getCollectionById(collections, collectionId);

                            if (!collection || !collection.banner.normal) return null;

                            return (
                                <div className="col-md-4 col-sm-6" key={collectionId}>
                                    {/* <!-- banner --> */}
                                    <SectionBanner
                                        className="banner-1"
                                        image={collection.banner.normal}
                                        centered={true}
                                        onClick={()=>{
                                            navigate(uriService.uriProductsByCollectionId(collection.id));
                                        }}>
                                        <h2 className="white-color">{collection.name}</h2>
                                    </SectionBanner>
                                    {/* <!-- /banner --> */}
                                </div>
                            )
                        })}
                    </div>
                    {/* <!-- /row --> */}
                </div>
                {/* <!-- /container --> */}
            </div>
            {/* <!-- /NewCollection --> */}
        </>
    );
};

export {NewCollectionSection}