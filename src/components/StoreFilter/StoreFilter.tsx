import React, {ChangeEventHandler, useEffect} from 'react';
import {useSearchParams} from "react-router-dom";

import {useAppSelector} from "../../hooks";
import {SortDirectionEnum} from "../../enum";
import {pageLimits, sortNames} from "../../data";
import {Pagination} from "../Pagination";

const StoreFilter = () => {
    const {i18n} = useAppSelector(state => state.i18nReducer);
    const {/*results, */total_pages} = useAppSelector(state => state.productsReducer);
    const [params, setParams] = useSearchParams({});

    useEffect(() => {
        if (!total_pages) return;

        if (Number(params.get('page') || '1') > (total_pages || 1)) {
            setParams(prevState => {
                prevState.set('page', String((total_pages || 1)));
                return prevState;
            });
        }

        if (Number(params.get('page') || '1') < 1) {
            setParams(prevState => {
                prevState.set('page', '1');
                return prevState;
            });
        }

    }, [total_pages, params, setParams])

    const isDescentSorting = () => Number(params.get('direction') || '0') as SortDirectionEnum
    const onSortClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        setParams(prevState => {
            prevState.set('direction',
                isDescentSorting() ? String(SortDirectionEnum.ascend) : String(SortDirectionEnum.descend));
            return prevState;
        });
        e.preventDefault();
    };

    const onSortKindChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
        setParams(prevState => {
            prevState.set('sort', e.target.value);
            return prevState;
        });
    }

    const onPageLimitChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
        setParams(prevState => {
            prevState.set('show', e.target.value);
            return prevState;
        });
    }

    const onPageChange = (page: number) => {
        setParams(prevState => {
            prevState.set('page', String(page));
            return prevState;
        });
    }

    return (
        <>
            {/* <!-- store top (bottom) filter --> */}
            <div className="store-filter clearfix">
                <div className="pull-left">
                    <div className="row-filter">
                        <a href="."><i className="fa fa-th-large"></i></a>
                        <a href="." className="active"><i className="fa fa-bars"></i></a>
                    </div>
                    <div className="sort-filter">
                        <span className="text-uppercase">{i18n.value.SORT_BY}:</span>
                        <select className="input" onChange={onSortKindChange} value={params.get('sort') || '0'}>
                            {sortNames.map(item => <option key={item.id} value={item.id}>{item.name[i18n.encode]}</option>)}
                        </select>
                        <a href="." onClick={onSortClick} className="main-btn icon-btn">
                            <i className={isDescentSorting() ? "fa fa-arrow-up" : "fa fa-arrow-down"}></i>
                        </a>
                    </div>
                </div>
                <div className="pull-right">
                    <div className="page-filter">
                        <span className="text-uppercase">{i18n.value.SHOW}:</span>
                        <select className="input" onChange={onPageLimitChange} value={params.get('show') || '0'}>
                            {pageLimits.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
                        </select>
                    </div>
                    <Pagination caption={i18n.value.PAGE}
                                linkCount={3}
                                startPage={Number(params.get("page") || '1')}
                                pageCount={total_pages || 1}
                                onChange={onPageChange}
                    />
                </div>
            </div>
            {/* <!-- /store top (bottom) filter --> */}
        </>
    );
};

export {StoreFilter}