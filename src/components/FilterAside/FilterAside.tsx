import React, {FC, useEffect, useRef} from 'react';
import {Link, useSearchParams} from "react-router-dom";
import noUiSlider, {target, API} from "nouislider";

import {summaryActions} from "../../redux";
import {refsService} from "../../services";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {ProductWidget} from "..";

type FilterPropType = "colors" | "sizes" | "brands" | "min" | "max" | "genders";

const FilterAside: FC = () => {
    const FILTER_PARAM_DELIM = ',';
    const FILTER_PRICE_RANGE_MIN = 0;
    const FILTER_PRICE_RANGE_MAX = 100000;

    const dispatch = useAppDispatch();
    const [params, setParams] = useSearchParams({});
    const {i18n} = useAppSelector(state => state.i18nReducer);
    const {colors, brands, genders, sizes, activeCurrency} = useAppSelector(state => state.refsReducer);
    const {picked} = useAppSelector(state => state.summaryReducer);
    const sliderRef = useRef(null);

    useEffect(() => {
        if (!picked) {
            dispatch(summaryActions.loadSummary(i18n.encode));
        }
    }, [dispatch, i18n.encode, picked]);

    const getItems: (name: FilterPropType) => Array<string> = (name) => {
        return params.get(name)?.split(FILTER_PARAM_DELIM) || [];
    }

    const setItems: (name: FilterPropType, items: Array<string>) => void = (name, items) => {
        setParams(prevState => {
            prevState.set(name, items.join(FILTER_PARAM_DELIM));
            return prevState;
        });
    }

    const onAddFilter = (e: React.MouseEvent<HTMLAnchorElement>, name: FilterPropType, value: string) => {
        const items = getItems(name);
        if (!items.includes(value)) {
            items.push(value);
            setItems(name, items);
        }
        e.preventDefault();
    };

    const onDelFilter = (e: React.MouseEvent<HTMLAnchorElement>, name: FilterPropType, value: string) => {
        const items = getItems(name);
        const index = items.findIndex(item => item === value);
        if (~index) {
            items.splice(index, 1);
            setItems(name, items);
        }
        e.preventDefault();
    };

    const onDelPriceRange = (e: React.MouseEvent<HTMLAnchorElement>, index: number) => {
        if (sliderRef.current && (sliderRef.current as target).noUiSlider) {
            const sliderControl: target = sliderRef.current;
            const values = sliderControl.noUiSlider?.get() as number[];
            values[index] = index ? FILTER_PRICE_RANGE_MAX : FILTER_PRICE_RANGE_MIN;
            sliderControl.noUiSlider?.set(values);
        }

        setParams(prevState => {
            prevState.delete((index ? "max" : "min") as FilterPropType);
            return prevState;
        });

        e.preventDefault();
    };

    const clearAll = () => {
        setParams(prevState => {
            prevState.delete("colors" as FilterPropType);
            prevState.delete("sizes" as FilterPropType);
            prevState.delete("brands" as FilterPropType);
            prevState.delete("min" as FilterPropType);
            prevState.delete("max" as FilterPropType);
            prevState.delete("genders" as FilterPropType);
            return prevState;
        });
    };

    useEffect(() => {
        if (!sliderRef.current || (sliderRef.current as target).noUiSlider) return;

        const sliderControl: target = sliderRef.current;

        // PRICE SLIDER
        const api: API = noUiSlider.create(sliderControl, {
            start: [
                Number(params.get("min" as FilterPropType)) || FILTER_PRICE_RANGE_MIN,
                Number(params.get("max" as FilterPropType)) || FILTER_PRICE_RANGE_MAX
            ],
            connect: true,
            tooltips: [true, true],
            format: {
                to: function (value: number) {
                    return value.toFixed(2);
                },
                from: function (value: string): number {
                    return parseFloat(value);
                }
            },
            range: {
                'min': FILTER_PRICE_RANGE_MIN,
                'max': FILTER_PRICE_RANGE_MAX,
            }
        });

        let timerID: any = null;
        const callback = (values: (number | string)[]) => {
            const valMin = parseFloat(values[0] as string) > FILTER_PRICE_RANGE_MIN ? values[0] as string : null;
            const valMax = parseFloat(values[1] as string) < FILTER_PRICE_RANGE_MAX ? values[1] as string : null;

            if (valMin !== params.get("min" as FilterPropType) || valMax !== params.get("max" as FilterPropType)) {
                if (timerID) clearTimeout(timerID);

                timerID = setTimeout(() => setParams(prevState => {
                    if (valMin) {
                        prevState.set("min", valMin)
                    } else {
                        prevState.delete("min");
                    }

                    if (valMax) {
                        prevState.set("max", valMax)
                    } else {
                        prevState.delete("max");
                    }

                    return prevState;
                }), 1000);
            }
        }

        api.on('change', callback);

        return () => {
            api.off('change');
            api.destroy();
            delete sliderControl.noUiSlider;
        }
    }, [params, setParams]);

    useEffect(() => {
        if (!sliderRef.current || !(sliderRef.current as target).noUiSlider) return;

        const sliderControl: target = sliderRef.current;

        sliderControl.noUiSlider?.set([
            Number(params.get("min" as FilterPropType)) || FILTER_PRICE_RANGE_MIN,
            Number(params.get("max" as FilterPropType)) || FILTER_PRICE_RANGE_MAX
        ]);
    }, [params]);

    const filterColors = getItems("colors");
    const filterSizes = getItems("sizes");
    const filterBrands = getItems("brands");
    const filterPrices = [params.get("min"), params.get("max")];
    const filterGenders = getItems("genders");

    return (
        <>
            {/* <!-- ASIDE --> */}
            <div id="aside" className="col-md-3">
                {/* <!-- aside widget --> */}
                <div className="aside">
                    <h3 className="aside-title">{i18n.value.SHOP_BY}:</h3>

                    {
                        filterColors.length ?
                            <ul className="filter-list">
                                <li><span className="text-uppercase">color:</span></li>
                                {colors.filter(item => filterColors.includes(item.id)).map(item =>
                                    <li key={item.id}>
                                        <Link to={"."} style={{color: "#FFF", backgroundColor: item.color}}
                                              onClick={e => onDelFilter(e, "colors", item.id)}>{item.name}</Link>
                                    </li>
                                )}
                            </ul> : null
                    }

                    {
                        filterSizes.length ?
                            <ul className="filter-list">
                                <li><span className="text-uppercase">Size:</span></li>
                                {sizes.filter(item => filterSizes.includes(item.id)).map(item =>
                                    <li key={item.id}>
                                        <Link to={"."}
                                              onClick={e => onDelFilter(e, "sizes", item.id)}>{item.name}</Link>
                                    </li>
                                )}
                            </ul> : null
                    }

                    {
                        filterBrands.length ?
                            <ul className="filter-list">
                                <li><span className="text-uppercase">Brand:</span></li>
                                {brands.filter(item => filterBrands.includes(item.id)).map(item =>
                                    <li key={item.id}>
                                        <Link to={"."}
                                              onClick={e => onDelFilter(e, "brands", item.id)}>{item.name}</Link>
                                    </li>
                                )}
                            </ul> : null
                    }

                    {
                        (filterPrices[0] || filterPrices[1]) ?
                            <ul className="filter-list">
                                <li><span className="text-uppercase">Price:</span></li>
                                {['MIN', 'MAX'].map((label, index) =>
                                    filterPrices[index] ?
                                        <li key={index}>
                                            <Link to={"."} onClick={e => onDelPriceRange(e, index)}>
                                                {label}: {refsService.getCurrencyText(activeCurrency, Number(filterPrices[index]))}
                                            </Link>
                                        </li> : null
                                )}
                            </ul> : null
                    }

                    {
                        filterGenders.length ?
                            <ul className="filter-list">
                                <li><span className="text-uppercase">Gender:</span></li>
                                {genders.filter(item => filterGenders.includes(item.id)).map(item =>
                                    <li key={item.id}>
                                        <Link to={"."}
                                              onClick={e => onDelFilter(e, "genders", item.id)}>{item.name}</Link>
                                    </li>
                                )}
                            </ul> : null
                    }

                    <button className="primary-btn" onClick={() => clearAll()}>{i18n.value.CLEAR_ALL}</button>
                </div>
                {/* <!-- /aside widget --> */}

                {/* <!-- aside widget --> */}
                <div className="aside">
                    <h3 className="aside-title">{i18n.value.FILTER_BY_PRICE}:</h3>
                    <div id="price-slider" ref={sliderRef}></div>
                </div>
                {/* <!-- aside widget --> */}

                {/* <!-- aside widget --> */}
                <div className="aside">
                    <h3 className="aside-title">{i18n.value.FILTER_BY_COLOR}:</h3>
                    <ul className="color-option">
                        {colors.map(item =>
                            <li key={item.id} className={filterColors.includes(item.id) ? "active" : ""}>
                                <Link to={"."}
                                      onClick={e => onAddFilter(e, "colors", item.id)}
                                      style={{backgroundColor: item.color}}
                                      title={item.name}
                                />
                            </li>
                        )}
                    </ul>
                </div>
                {/* <!-- /aside widget --> */}

                {/* <!-- aside widget --> */}
                <div className="aside">
                    <h3 className="aside-title">{i18n.value.FILTER_BY_SIZE}:</h3>
                    <ul className="size-option">
                        {sizes.map(item =>
                            <li key={item.id} className={filterSizes.includes(item.id) ? "active" : ""}>
                                <Link to={"."} onClick={e => onAddFilter(e, "sizes", item.id)}>{item.name}</Link>
                            </li>
                        )}
                    </ul>
                </div>
                {/* <!-- /aside widget --> */}

                {/* <!-- aside widget --> */}
                <div className="aside">
                    <h3 className="aside-title">{i18n.value.FILTER_BY_BRAND}</h3>
                    <ul className="list-links">
                        {brands.map(item =>
                            <li key={item.id} className={filterBrands.includes(item.id) ? "active" : ""}>
                                <Link to={"."} onClick={e => onAddFilter(e, "brands", item.id)}>{item.name}</Link>
                            </li>
                        )}
                    </ul>
                </div>
                {/* <!-- /aside widget --> */}

                {/* <!-- aside widget --> */}
                <div className="aside">
                    <h3 className="aside-title">{i18n.value.FILTER_BY_GENDER}</h3>
                    <ul className="list-links">
                        {genders.map(item =>
                            <li key={item.id} className={filterGenders.includes(item.id) ? "active" : ""}>
                                <Link to={"."} onClick={e => onAddFilter(e, "genders", item.id)}>{item.name}</Link>
                            </li>
                        )}
                    </ul>
                </div>
                {/* <!-- /aside widget --> */}

                {/* <!-- aside widget --> */}
                <div className="aside">
                    <h3 className="aside-title">{i18n.value.TOP_RATED_PRODUCTS}</h3>
                    {picked && picked?.length > 0 ? <ProductWidget {...picked[0]}/> : null}
                    {picked && picked?.length > 1 ? <ProductWidget {...picked[1]}/> : null}
                </div>
                {/* <!-- /aside widget --> */}
            </div>
            {/* <!-- /ASIDE --> */}
        </>
    );
};

export {FilterAside}