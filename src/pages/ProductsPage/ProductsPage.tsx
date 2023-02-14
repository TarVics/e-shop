import React, {useEffect} from 'react';
import {useSearchParams} from "react-router-dom";

import {Breadcrumb, FilterAside, ProductSingle, StoreFilter} from "../../components";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {productsActions} from "../../redux";
import {BreadcrumbType, ProductListQueryType} from "../../interface";
import {PageLimitEnum, SortDirectionEnum, SortKindEnum} from "../../enum";
import {refsService, uriService} from "../../services";

const ProductsPage = () => {
    const dispatch = useAppDispatch();
    const {i18n} = useAppSelector(state => state.i18nReducer);
    const {activeCurrency, categories, collections} = useAppSelector(state => state.refsReducer);
    const {results} = useAppSelector(state => state.productsReducer);
    const [params, setParams] = useSearchParams({});

    useEffect(() => {
        if (!activeCurrency) return;
        const queryParams: ProductListQueryType = {
            encode: i18n.encode,
            currency: activeCurrency.id,
            direction: Number(params.get("direction") || '0') as SortDirectionEnum,
            brands: params.get("brands"),
            category: params.get("category"),
            collection: params.get("collection"),
            colors: params.get("colors"),
            genders: params.get("genders"),
            min: params.get("min"),
            max: params.get("max"),
            page: Number(params.get("page") || '1'),
            query: params.get("query"),
            sizes: params.get("sizes"),
            sort: Number(params.get("sort") || '0') as SortKindEnum,
            show: Number(params.get("show") || '0') as PageLimitEnum,
        };

        console.log(queryParams);
        dispatch(productsActions.loadProducts(queryParams));
    }, [dispatch, params, i18n.encode, activeCurrency]);


    const collectionId = params.get("collection");
    const collection = collectionId && refsService.getCollectionById(collections, collectionId);

    const categoryId = params.get("category");
    const category = categoryId && refsService.getCategoryById(categories, categoryId);

    const active = category ? category.name :
        collection ? collection.name : i18n.value.PRODUCTS;

    const breadcrumbs: Array<BreadcrumbType> = [];

    if (category || collection) {
        breadcrumbs.push({
            id: 'PRODUCTS',
            name: i18n.value.PRODUCTS,
            uri: uriService.uriProducts(),
        });
    }

    if (category && collection) {
        breadcrumbs.push({
            id: 'COLLECTION',
            name: collection.name,
            uri: uriService.uriProductsByCollectionId(collection.id),
        });
    }

    const onActivateCollection = (id: string) => {
        let result = false;
        if (id === 'COLLECTION') {
            setParams(prevState => {
                prevState.delete("category");
                return prevState;
            });
            result = true;
        } else if (id === 'PRODUCTS') {
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
            <Breadcrumb items={breadcrumbs} active={active} onActivate={onActivateCollection}/>
            {/* <!-- section --> */}
            <div className="section">
                {/* <!-- container --> */}
                <div className="container">
                    {/* <!-- row --> */}
                    <div className="row">
                        <FilterAside/>
                        {/* <!-- MAIN --> */}
                        <div id="main" className="col-md-9">
                            <StoreFilter/>
                            {/* <!-- STORE --> */}
                            <div id="store">
                                {/* <!-- row --> */}
                                <div className="row">
                                    {results?.map((value, index) => {
                                        let className = '';
                                        if (index > 0 && index % 2 === 0) className += ' visible-sm visible-xs';
                                        if (index > 0 && index % 3 === 0) className += ' visible-md visible-lg';
                                        return (
                                            <React.Fragment key={value.id}>
                                                {className ? <div className={"clearfix " + className}></div> : null}
                                                <div className="col-md-4 col-sm-6 col-xs-6"><ProductSingle {...value}/>
                                                </div>
                                            </React.Fragment>
                                        )
                                    })}
                                </div>
                                {/* <!-- /row --> */}
                            </div>
                            {/* <!-- /STORE --> */}
                            <StoreFilter/>
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

export {ProductsPage};