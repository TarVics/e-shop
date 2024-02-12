import React from "react";
import { useNavigate } from "react-router-dom";

import { useAppSelector, useRefs } from "../../../../hooks";
import { uriService } from "../../../../services";
import { SectionTitle, ProductSingle, SectionBanner, PrimaryButton } from "../../..";
import { BannerKind } from "../../../../enum";

const LatestProducts: React.FC = () => {
  const navigate = useNavigate();
  const { i18n } = useAppSelector(state => state.i18nReducer);
  const { api, refs: { summary } } = useRefs();
  const collection = summary?.latestCollectionColumn.length ?
    api.getCollectionById(summary?.latestCollectionColumn[0]) : null;
  const collectionBanner = collection?.banners
    .find(item => item.kind === BannerKind.latestColumn);

  return (
    <>
      {/* <!-- Latest Products --> */}
      {/* <!-- row --> */}
      <div className="row">
        <div className="col-md-12">
          <SectionTitle caption={i18n.value.LATEST_PRODUCTS} />
        </div>

        {[0, 1, 2, 3].map(value =>
          summary?.latestProducts[value] ?
            <div key={value} className="col-md-3 col-sm-6 col-xs-6">
              <ProductSingle product={summary?.latestProducts[value]} />
            </div> : null
        )}
      </div>
      {/* <!-- /row --> */}

      {/* <!-- row --> */}
      <div className="row">
        <div className="col-md-3 col-sm-6 col-xs-6">
          {collection && collectionBanner ?
            <SectionBanner
              className="banner-2"
              image={uriService.uriCollectionBanner(collectionBanner.banner)}
            >
              <h2 className="white-color">{collection.name}</h2>
              <PrimaryButton onClick={() => {
                navigate(uriService.uriProductsByCollectionId(collection.id));
              }}>{i18n.value.SHOP_NOW}</PrimaryButton>
            </SectionBanner> : null
          }
        </div>

        {[4, 5, 6].map(value =>
          summary?.latestProducts[value] ?
            <div key={value} className="col-md-3 col-sm-6 col-xs-6">
              <ProductSingle product={summary?.latestProducts[value]} />
            </div> : null
        )}
      </div>
      {/* <!-- /row --> */}
      {/* <!-- /LatestProducts --> */}
    </>
  );
};

export { LatestProducts };
