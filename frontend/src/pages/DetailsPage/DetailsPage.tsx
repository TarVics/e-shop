import React, { useCallback, useState } from "react";
import { useParams } from "react-router-dom";

import { Breadcrumb, PickedProducts, ProductQuick } from "../../components";
import { useAppSelector, useRefs } from "../../hooks";
import { uriService } from "../../services";
import { BreadcrumbType, ProductType } from "../../interface";

type BreadcrumbDrawType = {
  name: string;
  items: Array<BreadcrumbType>;
}

const BreadcrumbDrawInit: BreadcrumbDrawType = { name: "", items: [] };

const DetailsPage: React.FC = () => {
  const { i18n } = useAppSelector(state => state.i18nReducer);
  const { api } = useRefs();
  const { uid } = useParams();

  const [
    breadcrumbs,
    setBreadcrumbs
  ] = useState<BreadcrumbDrawType>(BreadcrumbDrawInit);

  const onLoad = useCallback((product: ProductType): void => {
    const name = product?.name || "";
    const items: Array<BreadcrumbType> = [];

    const collection = product.collectionId ? api.getCollectionById(product.collectionId) : null;
    const category = product.categoryId ? api.getCategoryById(product.categoryId) : null;

    items.push({
      id: "PRODUCTS",
      name: i18n.value.PRODUCTS,
      uri: uriService.uriProducts()
    });

    if (collection) {
      items.push({
        id: "COLLECTION",
        name: collection.name,
        uri: uriService.uriProductsByCollectionId(collection.id)
      });
    }

    if (category) {
      items.push({
        id: "CATEGORY",
        name: category.name,
        uri: uriService.uriProductsByCategoryId(category.id)
      });
    }

    setBreadcrumbs({ name, items });
  }, [api, i18n.value.PRODUCTS]);

  return (
    <>
      <Breadcrumb items={breadcrumbs.items} active={breadcrumbs.name} />

      {/* <!-- section --> */}
      <div className="section">
        {/* <!-- container --> */}
        <div className="container">
          {uid && <ProductQuick uid={uid} fullView={true} onLoad={onLoad} />}
        </div>
        {/* <!-- /container --> */}
      </div>
      {/* <!-- /section --> */}

      {/* <!-- section --> */}
      <div className="section">
        {/* <!-- container --> */}
        <div className="container">
          <PickedProducts />
        </div>
        {/* <!-- /container --> */}
      </div>
      {/* <!-- /section --> */}
    </>
  );
};

export { DetailsPage };
