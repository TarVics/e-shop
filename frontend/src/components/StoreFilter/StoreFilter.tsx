import React, { MouseEvent, ChangeEventHandler, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { useAppSelector } from "../../hooks";
import { SortOrderEnum } from "../../enum";
import { pageLimits, sortNames } from "../../data";
import { Pagination, MainButton } from "..";

const StoreFilter: React.FC = () => {
  const { i18n } = useAppSelector(state => state.i18nReducer);
  const { products } = useAppSelector(state => state.productsReducer);
  const [params, setParams] = useSearchParams({});

  useEffect(() => {
    if (!products) return;

    if (Number(params.get("page") || "1") > products.meta.pageCount) {
      setParams(prevState => {
        prevState.set("page", String(products.meta.pageCount));
        return prevState;
      });
    }

    if (Number(params.get("page") || "1") < 1) {
      setParams(prevState => {
        prevState.set("page", "1");
        return prevState;
      });
    }

  }, [products, params, setParams]);

  const getSorting = () => Number(params.get("order") || SortOrderEnum.ASC);
  const isDescentSorting = () => getSorting() === SortOrderEnum.DESC;
  const onSortClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setParams(prevState => {
      prevState.set("order", String(getSorting() === SortOrderEnum.ASC ?
        SortOrderEnum.DESC : SortOrderEnum.ASC));
      return prevState;
    });
  };

  const onSortKindChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setParams(prevState => {
      prevState.set("sort", e.target.value);
      return prevState;
    });
  };

  const onPageLimitChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setParams(prevState => {
      prevState.set("take", e.target.value);
      return prevState;
    });
  };

  const onPageChange = (page: number) => {
    setParams(prevState => {
      prevState.set("page", String(page));
      return prevState;
    });
  };

  const wideWidth = !!(params.get("wide") || false);

  const onSetWideWidth = (e: MouseEvent<HTMLAnchorElement>, value: boolean) => {

    setParams(prevState => {
      if (value) {
        prevState.set("wide", "1");
      } else {
        prevState.delete("wide");
      }

      return prevState;
    });

    e.preventDefault();
  };

  return (
    <>
      {/* <!-- store top (bottom) filter --> */}
      <div className="store-filter clearfix">
        <div className="pull-left">
          <div className="row-filter">
            <a href="." onClick={e => onSetWideWidth(e, false)} className={!wideWidth ? "active" : ""}><i
              className="fa fa-th-large"></i></a>
            <a href="." onClick={e => onSetWideWidth(e, true)} className={wideWidth ? "active" : ""}><i
              className="fa fa-bars"></i></a>
          </div>
          <div className="sort-filter">
            <span className="text-uppercase">{i18n.value.SORT_BY}:</span>
            <select className="input" onChange={onSortKindChange} value={params.get("sort") || "0"}>
              {sortNames.map(item => <option key={item.id} value={item.id}>{item.name[i18n.encode]}</option>)}
            </select>
            <MainButton onClick={onSortClick} className="icon-btn">
              <i className={isDescentSorting() ? "fa fa-arrow-up" : "fa fa-arrow-down"}></i>
            </MainButton>
          </div>
        </div>
        <div className="pull-right">
          <div className="page-filter">
            <span className="text-uppercase">{i18n.value.SHOW}:</span>
            <select className="input" onChange={onPageLimitChange} value={params.get("take") || "0"}>
              {pageLimits.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
            </select>
          </div>
          <Pagination caption={i18n.value.PAGE}
                      linkCount={3}
                      startPage={Number(params.get("page") || "1")}
                      pageCount={products?.meta.pageCount || 1}
                      onChange={onPageChange}
          />
        </div>
      </div>
      {/* <!-- /store top (bottom) filter --> */}
    </>
  );
};

export { StoreFilter };
