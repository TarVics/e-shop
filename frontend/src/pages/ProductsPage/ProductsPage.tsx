import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { Breadcrumb, FilterAside, ProductSingle, StoreFilter } from "../../components";
import { useAppDispatch, useAppSelector, useRefs } from "../../hooks";
import { productsActions } from "../../redux";
import { BreadcrumbType, ProductQueryType } from "../../interface";
import { PageTakeEnum, SortOrderEnum, SortKindEnum } from "../../enum";
import { uriService } from "../../services";

const ProductsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { i18n } = useAppSelector(state => state.i18nReducer);
  const { refs, api } = useRefs();
  const { products } = useAppSelector(state => state.productsReducer);
  const [params, setParams] = useSearchParams({});

  useEffect(() => {
    if (!refs.activeCurrency) return;

    const queryParams: ProductQueryType = {
      lang: i18n.encode || undefined,
      // currency: refs.activeCurrency.id,
      order: (params.get("order") || SortOrderEnum.ASC) as SortOrderEnum,
      brands: params.get("brands"),
      category: params.get("category"),
      collection: params.get("collection"),
      colors: params.get("colors"),
      genders: params.get("genders"),
      min: params.get("min") ? String(Number(params.get("min") || "0") * refs.activeCurrency.rate) : null,
      max: params.get("min") ? String(Number(params.get("max") || "0") * refs.activeCurrency.rate) : null,
      page: Number(params.get("page") || "1"),
      query: params.get("query"),
      sizes: params.get("sizes"),
      sort: Number(params.get("sort") || "0") as SortKindEnum,
      take: Number(params.get("take") || "0") as PageTakeEnum,
      wide: !!(params.get("wide") || false),
      sale: !!(params.get("sale") || false)
    };

    dispatch(productsActions.loadProducts(queryParams));
  }, [dispatch, params, i18n.encode, refs.activeCurrency]);

  const wideWidth = !!(params.get("wide") || false);

  const collectionId = params.get("collection");
  const collection = collectionId ? api.getCollectionById(parseInt(collectionId)) : null;

  const categoryId = params.get("category");
  const category = categoryId ? api.getCategoryById(parseInt(categoryId)) : null;

  const active = category ? category.name :
    collection ? collection.name : i18n.value.PRODUCTS;

  const breadcrumbs: Array<BreadcrumbType> = [];

  if (category || collection) {
    breadcrumbs.push({
      id: "PRODUCTS",
      name: i18n.value.PRODUCTS,
      uri: uriService.uriProducts()
    });
  }

  if (category && collection) {
    breadcrumbs.push({
      id: "COLLECTION",
      name: collection.name,
      uri: uriService.uriProductsByCollectionId(collection.id)
    });
  }

  const onActivateCollection = (id: string) => {
    let result = false;
    if (id === "COLLECTION") {
      setParams(prevState => {
        prevState.delete("category");
        return prevState;
      });
      result = true;
    } else if (id === "PRODUCTS") {
      setParams(prevState => {
        prevState.delete("category");
        prevState.delete("collection");
        return prevState;
      });
      result = true;
    }

    return result;
  };

  return (
    <>
      <Breadcrumb items={breadcrumbs} active={active} onActivate={onActivateCollection} />
      {/* <!-- section --> */}
      <div className="section">
        {/* <!-- container --> */}
        <div className="container">
          {/* <!-- row --> */}
          <div className="row">
            <FilterAside />
            {/* <!-- MAIN --> */}
            <div id="main" className="col-md-9">
              <StoreFilter />
              {/* <!-- STORE --> */}
              <div id="store">
                {/* <!-- row --> */}
                <div className="row">
                  {products?.data.map((value, index) => {
                    let className = "";
                    if (index > 0 && index % 2 === 0) className += " visible-sm visible-xs";
                    if (index > 0 && index % 3 === 0) className += " visible-md visible-lg";
                    const itemClass = (!wideWidth) ? "col-md-4 col-sm-6 col-xs-6" : "col-md-12 col-sm-12 col-xs-12";
                    return (
                      <React.Fragment key={value.uid}>
                        {(className && !wideWidth) ? <div className={"clearfix " + className}></div> : null}
                        <div className={itemClass}>
                          <ProductSingle product={value} wideWidth={wideWidth} />
                        </div>
                      </React.Fragment>
                    );
                  })}
                </div>
                {/* <!-- /row --> */}
              </div>
              {/* <!-- /STORE --> */}
              <StoreFilter />
            </div>
            {/* <!-- /MAIN --> */}
          </div>
          {/* <!-- /row --> */}
        </div>
        {/* <!-- /container --> */}
      </div>
      {/* <!-- /section --> */}
    </>
  );
};

export { ProductsPage };
