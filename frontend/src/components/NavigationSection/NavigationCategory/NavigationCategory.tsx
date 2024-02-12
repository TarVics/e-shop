import React, { MouseEventHandler } from "react";
import { Link, useLocation } from "react-router-dom";

import { NavigationCategoryMenu } from "..";
import { uriService } from "../../../services";
import { useAppSelector, useRefs } from "../../../hooks";

export interface NavigationCategoryProps {
  active: boolean;
  onClick: MouseEventHandler<HTMLElement>;
}

const NavigationCategory: React.FC<NavigationCategoryProps> = ({ active, onClick }) => {
  const { i18n } = useAppSelector(state => state.i18nReducer);
  const location = useLocation();
  const { refs } = useRefs();

  return (
    <>
      {/* <!-- category nav --> */}
      <div className={"category-nav" + (location.pathname === uriService.uriHome() ? "" : " show-on-click")}>
        <span className="category-header" onClick={onClick}>{i18n.value.CATEGORIES} <i
          className="fa fa-list"></i></span>
        <ul className={"category-list" + (active ? " open" : "")}>
          {refs.categories.map(category =>
            category.children?.length ?
              <li key={category.id} className="dropdown side-dropdown">
                <div className="dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
                  <>{category.name}&nbsp;<i className="fa fa-angle-right"></i></>
                </div>
                <NavigationCategoryMenu category={category} />
              </li> :
              <li key={category.id}>
                <Link to={uriService.uriProductsByCategoryId(category.id)}>{category.name}</Link>
              </li>
          )}
          <li><a href={uriService.uriProductsByCategoryId()}>{i18n.value.VIEW_ALL}</a></li>
        </ul>
      </div>
      {/* <!-- /category nav --> */}
    </>
  );
};

export { NavigationCategory };
