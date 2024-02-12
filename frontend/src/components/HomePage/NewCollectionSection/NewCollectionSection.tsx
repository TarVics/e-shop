import React from "react";
import { useNavigate } from "react-router-dom";

import { useRefs } from "../../../hooks";
import { uriService } from "../../../services";
import { SectionBanner } from "../../SectionBanner";
import { BannerKind } from "../../../enum";

const NewCollectionSection: React.FC = () => {
  const navigate = useNavigate();
  const { api, refs: { summary } } = useRefs();
  return (
    <>
      {/* <!-- NewCollection --> */}
      <div className="section">
        {/* <!-- container --> */}
        <div className="container">
          {/* <!-- row --> */}
          <div className="row">
            {summary?.homeCollectionNormal.map(collectionId => {
              const collection = api.getCollectionById(collectionId);

              if (!collection) return null;
              const bannerNormal = collection.banners
                .find(item => item.kind === BannerKind.homeNormal);

              if (!bannerNormal) return null;

              return (
                <div className="col-md-4 col-sm-6" key={collectionId}>
                  {/* <!-- banner --> */}
                  <SectionBanner
                    className="banner-1"
                    image={uriService.uriCollectionBanner(bannerNormal.banner)}
                    centered={true}
                    onClick={() => {
                      navigate(uriService.uriProductsByCollectionId(collection.id));
                    }}>
                    <h2 className="white-color">{collection.name}</h2>
                  </SectionBanner>
                  {/* <!-- /banner --> */}
                </div>
              );
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

export { NewCollectionSection };
