import React, { MouseEventHandler } from "react";
import { NavLink } from "react-router-dom";

import { uriHeader } from "../../../services";
import { NavigationCategoryMenu } from "../NavigationCategoryMenu";
import { useAppSelector, useRefs } from "../../../hooks";

export interface NavigationMenuProps {
  active: boolean;
  onClick: MouseEventHandler<HTMLElement>;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ active, onClick }) => {
  const { i18n } = useAppSelector(state => state.i18nReducer);
  const { api } = useRefs();
  return (
    <>
      {/* <!-- menu nav --> */}
      <div className="menu-nav">
        <span className="menu-header" onClick={onClick}>Menu <i className="fa fa-bars"></i></span>
        <ul className={"menu-list" + (active ? " open" : "")}>
          {uriHeader.map(header => {
            const category = header.category ? api.getCategoryById(header.category) : null;
            return (header.items.length ?
                <li key={header.id} className="dropdown default-dropdown">
                  <div className="dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
                    <>{header.name[i18n.encode]}&nbsp;<i className="fa fa-caret-down"></i></>
                  </div>
                  <ul className="custom-menu">
                    {header.items.map(item => <li key={item.id}><NavLink
                      to={item.uri || ""}>{item.name[i18n.encode]}</NavLink></li>)}
                  </ul>
                </li> :
                category ?
                  <li key={header.id} className="dropdown mega-dropdown full-width">
                    <div className="dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
                      <>{header.name[i18n.encode]}&nbsp;<i className="fa fa-caret-down"></i></>
                    </div>
                    <NavigationCategoryMenu wide={true} category={category} />
                  </li> :
                  <li key={header.id}>
                    <NavLink to={header.uri || ""}>{header.name[i18n.encode]}</NavLink>
                  </li>
            );
          })}
        </ul>
      </div>
      {/* <!-- menu nav --> */}
    </>
  );
};

export { NavigationMenu };
