import React, { FC } from "react";
import { Link } from "react-router-dom";

import { BreadcrumbType } from "../../interface";
import { uriService } from "../../services";
import { useAppSelector } from "../../hooks";

export interface BreadcrumbProps {
  active: string;
  items?: Array<BreadcrumbType>;
  onActivate?: (id: string, index?: number) => boolean;
}

const Breadcrumb: FC<BreadcrumbProps> = ({ items, active, onActivate }) => {

  const { i18n } = useAppSelector(state => state.i18nReducer);

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>, index: number) => {
    if (onActivate && items && !onActivate(items[index].id, index)) {
      e.preventDefault();
    }
  };

  return (
    <>
      {/* <!-- BREADCRUMB --> */}
      <div id="breadcrumb">
        <div className="container">
          <ul className="breadcrumb">
            <li><Link to={uriService.uriHome()}>{i18n.value.HOME}</Link></li>
            {
              items?.map((item, index) =>
                <li key={item.id}><Link to={item.uri} onClick={e => onClick(e, index)}>{item.name}</Link></li>
              )
            }
            <li className="active">{active}</li>
          </ul>
        </div>
      </div>
      {/* <!-- /BREADCRUMB --> */}
    </>
  );
};

export { Breadcrumb };
