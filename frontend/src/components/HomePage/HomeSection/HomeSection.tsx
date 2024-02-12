import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppSelector, useRefs } from "../../../hooks";
import { uriService } from "../../../services";
import { PrimaryButton, SectionBanner } from "../..";
import { BannerKind } from "../../../enum";

const HomeSection: React.FC = () => {
  const navigate = useNavigate();
  const { i18n } =
    useAppSelector(state => state.i18nReducer);
  const { api, refs: { summary } } = useRefs();
  const slidesRef = React.useRef(null);

  useEffect(() => {
    if (!summary?.homeCollectionLarge) return;

    const { $ } = window as any;
    // HOME SLICK
    const slides = $(slidesRef.current);

    slides.slick({
      autoplay: true,
      infinite: true,
      speed: 300,
      arrows: true,
      accessibility: false
    });


    return () => {
      slides.slick("unslick");
      delete slides.slick;
    };

  }, [summary]);

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
              {
              summary?.homeCollectionLarge.map(collectionId => {
                const collection = api.getCollectionById(collectionId);

                if (!collection) return null;

                const bannerLarge = collection?.banners
                  .find(item => item.kind === BannerKind.homeLarge);

                if (!bannerLarge) return null;

                return (
                  <SectionBanner key={collectionId} className="banner-1"
                                 image={uriService.uriCollectionBanner(bannerLarge.banner)}>
                    {!collection.isHot && collection.description ?
                      <h1 className="primary-color">
                        {collection.name}
                        {collection.description ?
                          <>
                            <br />
                            <span
                              className="white-color font-weak">{collection.description}</span>
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
                    <PrimaryButton onClick={() => {
                      navigate(uriService.uriProductsByCollectionId(collection.id));
                    }}>{i18n.value.SHOP_NOW}</PrimaryButton>
                  </SectionBanner>
                );
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

export { HomeSection };
