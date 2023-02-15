import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";

import {SectionTitle, SectionButton, SectionBanner, ProductSingle} from "..";
import {useAppSelector} from "../../hooks";
import {refsService, uriService} from "../../services";

const DayDealsSection = () => {
    const {i18n} = useAppSelector(state => state.i18nReducer);
    const navigate = useNavigate();
    const {deals} = useAppSelector(state => state.summaryReducer);
    const {collections} = useAppSelector(state => state.refsReducer);
    const slides1Ref = React.useRef(null);
    const slides2Ref = React.useRef(null);

    const dealsCollection = deals?.collectionColumn ? refsService.getCollectionById(collections, deals?.collectionColumn) : null;

    useEffect(() => {
        if (!deals?.products.length) return;

        // PRODUCTS SLICK
        const {$} = window as any;

        // $('#product-slick-1').slick({

        $(slides1Ref.current).slick({
            slidesToShow: 3,
            slidesToScroll: 2,
            autoplay: true,
            infinite: true,
            speed: 300,
            dots: true,
            arrows: false,
            appendDots: '.product-slick-dots-1',
            responsive: [{
                breakpoint: 991,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
                {
                    breakpoint: 480,
                    settings: {
                        dots: false,
                        arrows: true,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                },
            ],
            accessibility: false,
        });

        // $('#product-slick-2').slick({
        $(slides2Ref.current).slick({
            slidesToShow: 3,
            slidesToScroll: 2,
            autoplay: true,
            infinite: true,
            speed: 300,
            dots: true,
            arrows: false,
            appendDots: '.product-slick-dots-2',
            responsive: [{
                breakpoint: 991,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
                {
                    breakpoint: 480,
                    settings: {
                        dots: false,
                        arrows: true,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                },
            ],
            accessibility: false,
        });

    }, [deals]);

    return (
        <>
            {/* <!-- DealsOfTheDay --> */}
            <div className="section">
                {/* <!-- container --> */}
                <div className="container">
                    {/* <!-- row --> */}
                    <div className="row">
                        <div className="col-md-12">
                            <SectionTitle caption={i18n.value.DEALS_OF_DAY} slickClass={'product-slick-dots-1'}/>
                        </div>

                        <div className="col-md-3 col-sm-6 col-xs-6">
                            {dealsCollection && dealsCollection.banner.column ?
                                <>
                                    {/* <!-- banner --> */}
                                    <SectionBanner className="banner-2" image={dealsCollection.banner.column}>
                                        <h2 className="white-color">{dealsCollection.name}</h2>
                                        <SectionButton onClick={() => {
                                            navigate(uriService.uriProductsByCollectionId(dealsCollection?.id))
                                        }}>{i18n.value.SHOP_NOW}</SectionButton>
                                    </SectionBanner>
                                    {/* <!-- /banner --> */}
                                </> : null
                            }
                        </div>

                        {/* <!-- Product Slick --> */}
                        <div className="col-md-9 col-sm-6 col-xs-6">
                            <div className="row">
                                <div id="product-slick-1" className="product-slick" ref={slides1Ref}>
                                    {[1,2,3,4].map(index => deals?.products[index] ?
                                        <ProductSingle key={index} {...deals?.products[index]}/> : null)}
                                </div>
                            </div>
                        </div>
                        {/* <!-- /Product Slick --> */}
                    </div>
                    {/* <!-- /row --> */}

                    {/* <!-- row --> */}
                    <div className="row">
                        <div className="col-md-12">
                            <SectionTitle caption={i18n.value.DEALS_OF_DAY} slickClass={'product-slick-dots-2'}/>
                        </div>

                        {/* <!-- Product Single --> */}
                        <div className="col-md-3 col-sm-6 col-xs-6">
                            {deals?.products[0] ? <ProductSingle {...deals?.products[0]}/> : null}
                        </div>
                        {/* <!-- /Product Single --> */}

                        {/* <!-- Product Slick --> */}
                        <div className="col-md-9 col-sm-6 col-xs-6">
                            <div className="row">
                                <div id="product-slick-2" className="product-slick" ref={slides2Ref}>
                                    {[5,6,7,8].map(index => deals?.products[index] ?
                                        <ProductSingle key={index} {...deals?.products[index]}/> : null)}
                                </div>
                            </div>
                        </div>
                        {/* <!-- /Product Slick --> */}
                    </div>
                    {/* <!-- /row --> */}

                </div>
                {/* <!-- /container --> */}
            </div>
            {/* <!-- /DealsOfTheDay --> */}
        </>
    );
};

export {DayDealsSection}