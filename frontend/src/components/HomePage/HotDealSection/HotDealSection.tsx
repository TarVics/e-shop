import React from "react";
import { useNavigate } from "react-router-dom";

import { useAppSelector, useRefs } from "../../../hooks";
import { uriService } from "../../../services";
import { SectionBanner, PrimaryButton } from "../..";
import { BannerKind } from "../../../enum";

const HotDealSection: React.FC = () => {
  const { i18n } = useAppSelector(state => state.i18nReducer);

  const navigate = useNavigate();
  const { api, refs: { summary } } = useRefs();

  const largeCollection = summary?.hotCollectionLarge.length ?
    api.getCollectionById(summary?.hotCollectionLarge[0]) : null;
  const largeBanner = largeCollection?.banners
    .find(item => item.kind === BannerKind.hotLarge);

  const normal1Collection = summary?.hotCollectionNormal.length ?
    api.getCollectionById(summary?.hotCollectionNormal[0]) : null;
  const normal1Banner = normal1Collection?.banners
    .find(item => item.kind === BannerKind.hotNormal);

  const normal2Collection = summary?.hotCollectionNormal ?
    api.getCollectionById(summary?.hotCollectionNormal[1]) : null;
  const normal2Banner = normal1Collection?.banners
    .find(item => item.kind === BannerKind.hotNormal);

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

              {largeCollection && largeBanner ?
                <>
                  {/* <!-- banner --> */}
                  <SectionBanner
                    className="banner-1"
                    image={uriService.uriCollectionBanner(largeBanner.banner)}
                    centered={true}
                  >
                    <h1 className="primary-color">{largeCollection.name}<br /><span
                      className="white-color font-weak">{largeCollection.description}</span></h1>
                    <PrimaryButton onClick={() => {
                      navigate(uriService.uriProductsByCollectionId(largeCollection.id));
                    }}>{i18n.value.SHOP_NOW}</PrimaryButton>
                  </SectionBanner>
                  {/* <!-- /banner --> */}

                </> : null
              }
            </div>
            {/* <!-- /banner --> */}

            {/* <!-- banner --> */}
            <div className="col-md-4 col-sm-6">
              {normal1Collection && normal1Banner ?
                <>
                  {/* <!-- banner --> */}
                  <SectionBanner
                    className="banner-1"
                    image={uriService.uriCollectionBanner(normal1Banner.banner)}
                    centered={true}
                    onClick={() => {
                      navigate(uriService.uriProductsByCollectionId(normal1Collection.id));
                    }}
                  >
                    <h2 className="white-color">{normal1Collection.name}</h2>
                  </SectionBanner>
                  {/* <!-- /banner --> */}
                </> : null
              }
            </div>
            {/* <!-- /banner --> */}

            {/* <!-- banner --> */}
            <div className="col-md-4 col-sm-6">
              {normal2Collection && normal2Banner ?
                <>
                  <SectionBanner
                    className="banner-1"
                    image={uriService.uriCollectionBanner(normal2Banner.banner)}
                    centered={true}
                    onClick={() => {
                      navigate(uriService.uriProductsByCollectionId(normal2Collection.id));
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

export { HotDealSection };
