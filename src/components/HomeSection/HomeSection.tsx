import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";

import {useAppSelector} from "../../hooks";
import {refsService, uriService} from "../../services";
import {SectionButton, SectionBanner} from "..";

const HomeSection = () => {
    const navigate = useNavigate();
    const {home} = useAppSelector(state => state.summaryReducer);
    const {collections} = useAppSelector(state => state.refsReducer);
    const slidesRef = React.useRef(null);

    useEffect(() => {
        if (home) {
            const {$} = window as any;
            // HOME SLICK
            // $('#home-slick').slick({
            $(slidesRef.current).slick({
                autoplay: true,
                infinite: true,
                speed: 300,
                arrows: true,
                accessibility: false,
            });
        }
    }, [home]);

    return (
        <>
            {/* <!-- HOME --> */}
            <div id="home">
                {/* <!-- container --> */}
                <div className="container">
                    {/* <!-- home wrap --> */}
                    <div className="home-wrap">
                        {/* <!-- home slick --> */}
                        <div id="home-slick" ref={slidesRef}>
                            {home?.collectionLarge.map(collectionId => {
                                const collection = refsService.getCollectionById(collections, collectionId);

                                if (!collection || !collection.banner.large) return null;

                                return (
                                    <SectionBanner key={collectionId} className="banner-1" image={collection.banner.large}>
                                        {!collection.isHot && collection.description ?
                                            <h1 className="primary-color">
                                                {collection.name}
                                                {collection.description ?
                                                    <>
                                                        <br/>
                                                        <span className="white-color font-weak">{collection.description}</span>
                                                    </> : null
                                                }
                                            </h1> :
                                            collection.description ?
                                                <>
                                                    <h1>{collection.name}</h1>
                                                    <h3 className="white-color font-weak">{collection.description}</h3>
                                                </> :
                                                <h1 className="white-color">{collection.name}</h1>
                                        }
                                        <SectionButton onClick={() => {
                                            navigate(uriService.uriProductsByCollectionId(collection.id));
                                        }}>Shop Now</SectionButton>
                                    </SectionBanner>
                                )
                            })}
                        </div>
                        {/* <!-- /home slick --> */}
                    </div>
                    {/* <!-- /home wrap --> */}
                </div>
                {/* <!-- /container --> */}
            </div>
            {/* <!-- /HOME --> */}
        </>
    );
};

export {HomeSection}