import React, { Fragment, ReactElement, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import { SectionBanner } from "../..";
import { uriService } from "../../../services";
import { CategoryType } from "../../../interface";
import { useRefs } from "../../../hooks";
import { BannerKind } from "../../../enum";

export interface NavigationCategoryMenuType {
  category: CategoryType,
  wide?: boolean;
}

const NavigationCategoryMenu: React.FC<NavigationCategoryMenuType> = ({ category, wide }) => {
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const { refs, api } = useRefs();

  const items = refs.categories.find(item => item.id === category.id)?.children || [];

  const collection = category.collectionId ? api.getCollectionById(category.collectionId) : null;
  const bannerColumn = collection?.banners
    .find(item => item.kind === BannerKind.navigationColumn);
  const bannerRow = collection?.banners
    .find(item => item.kind === BannerKind.navigationRow);

  const dataColumnsCount = (bannerColumn ? 2 : 3) + Number(items.length > 3 && (wide || false));
  const dataRowCount = Math.ceil(items.length / dataColumnsCount);

  useEffect(() => {
    if (menuRef.current && dataColumnsCount <= 3) {
      const el = (menuRef.current as HTMLElement).closest("li");
      el && el.classList.remove("full-width");
    }
  }, [dataColumnsCount]);

  // Розбиваємо категорії за стовпцями
  const dataColumns = items.reduce<Array<CategoryType[]>>((acc, val, index) => {
    const columnIndex = Math.trunc(index / dataRowCount);
    if (acc.length <= columnIndex) acc[columnIndex] = [];
    const columns = acc[columnIndex];
    columns.push(val);
    return acc;
  }, []);

  const realColumns = bannerColumn ? dataColumns.length + 1 : dataColumns.length;
  const cssWidth = Math.ceil(12 / realColumns);

  const links: ReactElement[] = [];

  dataColumns.forEach((column, columnIndex) => {
    const data = column.map((category, categoryIndex) => {
      const res = [<li key={category.id}><h3 className="list-links-title">{category.name}</h3></li>];
      category.children.forEach(item => {
        res.push(
          <li key={item.id}>
            <Link to={uriService.uriProductsByCategoryId(item.id)}>{item.name}</Link>
          </li>
        );
      });

      return (
        <Fragment key={category.id}>
          {category.bannerImage ?
            <>
              <div className="hidden-sm hidden-xs">
                {/* <!-- banner --> */}
                <SectionBanner
                  className="banner-1"
                  image={uriService.uriCategoryBanner(category.bannerImage)}
                  centered={true}
                  onClick={() => {
                    navigate(uriService.uriProductsByParentCategoryId(category.id));
                  }}>
                  <h3 className="white-color text-uppercase">{category.bannerName}</h3>
                </SectionBanner>
                {/* <!-- /banner --> */}
              </div>
              <hr />
            </> : null
          }
          <ul className="list-links">{res}</ul>
          {
            (categoryIndex < column.length - 1) ? <hr /> :
              (columnIndex < dataColumns.length - 1) ? <hr className="hidden-md hidden-lg" /> : null
          }
        </Fragment>
      );
    });

    links.push(<div className={"col-md-" + cssWidth} key={columnIndex}>{data}</div>);
  });

  if (collection && bannerColumn) {
    links.push(
      <div className={"col-md-" + cssWidth + " hidden-sm hidden-xs"} key={links.length}>
        {/* <!-- banner --> */}
        <SectionBanner
          className="banner-2"
          image={uriService.uriCollectionBanner(bannerColumn.banner)}
          onClick={() => {
            navigate(uriService.uriProductsByCollectionId(collection.id));
          }}
        >
          <h3 className="white-color">{collection?.name}</h3>
          {collection?.description ?
            <h3 className="white-color font-weak">{collection?.description}</h3> : null
          }
        </SectionBanner>
        {/* <!-- /banner --> */}
      </div>
    );
  }

  return (
    <>
      <div className="custom-menu" ref={menuRef}>
        <div className="row">{links}</div>
        {collection && bannerRow &&
          <div className="row hidden-sm hidden-xs">
            <div className="col-md-12">
              <hr />
              {/* <!-- banner --> */}
              <SectionBanner
                className="banner-1"
                image={uriService.uriCollectionBanner(bannerRow.banner)}
                centered={true}
                onClick={() => {
                  navigate(uriService.uriProductsByCollectionId(collection.id));
                }}
              >
                <h2 className="white-color">{collection.name}</h2>
                {collection?.description ?
                  <h3 className="white-color font-weak">{collection?.description}</h3> : null
                }
              </SectionBanner>
              {/* <!-- /banner --> */}
            </div>
          </div>
        }
      </div>
    </>
  );
};

export { NavigationCategoryMenu };
