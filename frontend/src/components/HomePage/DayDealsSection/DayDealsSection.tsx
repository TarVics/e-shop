import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppSelector, useRefs } from "../../../hooks";
import { uriService } from "../../../services";
import { PrimaryButton, ProductSingle, SectionBanner, SectionTitle } from "../..";
import { BannerKind } from "../../../enum";

const DayDealsSection: React.FC = () => {
  const { i18n } = useAppSelector(state => state.i18nReducer);
  const navigate = useNavigate();
  const { api, refs: { summary } } = useRefs();
  const slides1Ref = React.useRef(null);
  const slides2Ref = React.useRef(null);

  const dealsCollection = summary?.dealsCollectionColumn.length ?
    api.getCollectionById(summary?.dealsCollectionColumn[0]) : null;

  const dealsBanner = dealsCollection?.banners
    .find(item => item.kind === BannerKind.dealsColumn);

  useEffect(() => {
    if (!summary?.dealsProducts.length) return;

    // PRODUCTS SLICK
    const { $ } = window as any;

    const slides1 = $(slides1Ref.current);
    slides1.slick({
      slidesToShow: 3,
      slidesToScroll: 2,
      autoplay: true,
      infinite: true,
      speed: 300,
      dots: true,
      arrows: false,
      appendDots: ".product-slick-dots-1",
      responsive: [{
        breakpoint: 991,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
        {
          breakpoint: 480,
          settings: {
            dots: false,
            arrows: true,
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ],
      accessibility: false
    });

    // $('#product-slick-2').slick({
    const slides2 = $(slides2Ref.current);
    slides2.slick({
      slidesToShow: 3,
      slidesToScroll: 2,
      autoplay: true,
      infinite: true,
      speed: 300,
      dots: true,
      arrows: false,
      appendDots: ".product-slick-dots-2",
      responsive: [{
        breakpoint: 991,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
        {
          breakpoint: 480,
          settings: {
            dots: false,
            arrows: true,
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ],
      accessibility: false
    });

    return () => {
      slides1.slick("unslick");
      delete slides1.slick;

      slides2.slick("unslick");
      delete slides2.slick;
    };

  }, [summary]);

  return (
    <>
      {/* <!-- DealsOfTheDay --> */}
      <div className="section">
        {/* <!-- container --> */}
        <div className="container">
          {/* <!-- row --> */}
          <div className="row">
            <div className="col-md-12">
              <SectionTitle caption={i18n.value.DEALS_OF_DAY} slickClass={"product-slick-dots-1"} />
            </div>

            <div className="col-md-3 col-sm-6 col-xs-6">
              {dealsCollection && dealsBanner ?
                <>
                  {/* <!-- banner --> */}
                  <SectionBanner
                    className="banner-2"
                    image={uriService.uriCollectionBanner(dealsBanner.banner)}
                  >
                    <h2 className="white-color">{dealsCollection.name}</h2>
                    <PrimaryButton onClick={() => {
                      navigate(uriService.uriProductsByCollectionId(dealsCollection?.id));
                    }}>{i18n.value.SHOP_NOW}</PrimaryButton>
                  </SectionBanner>
                  {/* <!-- /banner --> */}
                </> : null
              }
            </div>

            {/* <!-- Product Slick --> */}
            <div className="col-md-9 col-sm-6 col-xs-6">
              <div className="row">
                <div id="product-slick-1" className="product-slick" ref={slides1Ref}>
                  {
                    [1, 2, 3, 4].map(index => summary?.dealsProducts[index] ?
                      <ProductSingle key={index} product={summary?.dealsProducts[index]} /> : null)
                  }
                </div>
              </div>
            </div>
            {/* <!-- /Product Slick --> */}
          </div>
          {/* <!-- /row --> */}

          {/* <!-- row --> */}
          <div className="row">
            <div className="col-md-12">
              <SectionTitle caption={i18n.value.DEALS_OF_DAY} slickClass={"product-slick-dots-2"} />
            </div>

            {/* <!-- Product Single --> */}
            <div className="col-md-3 col-sm-6 col-xs-6">
              {summary?.dealsProducts[0] ? <ProductSingle product={summary?.dealsProducts[0]} /> : null}
            </div>
            {/* <!-- /Product Single --> */}

            {/* <!-- Product Slick --> */}
            <div className="col-md-9 col-sm-6 col-xs-6">
              <div className="row">
                <div id="product-slick-2" className="product-slick" ref={slides2Ref}>
                  {
                    [5, 6, 7, 8].map(index => summary?.dealsProducts[index] ?
                      <ProductSingle key={index} product={summary?.dealsProducts[index]} /> : null)
                  }
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

export { DayDealsSection };
