import React, {FC, MouseEventHandler} from 'react';
import {Link, useLocation} from "react-router-dom";

import {NavigationCategoryMenu} from "..";
import {refsService, uriService} from "../../../services";
import {useAppSelector} from "../../../hooks";

export interface NavigationCategoryProps {
    active: boolean;
    onClick: MouseEventHandler<HTMLElement>;
}
const NavigationCategory: FC<NavigationCategoryProps> = ({active, onClick}) => {
    const location = useLocation();
    const {categories} = useAppSelector(state => state.refsReducer);
    return (
        <>
            {/* <!-- category nav --> */}
            <div className={"category-nav" + (location.pathname === uriService.uriHome() ? "" : " show-on-click")}>
                <span className="category-header" onClick={onClick}>Categories <i className="fa fa-list"></i></span>
                <ul className={"category-list" + (active ? " open" : "")}>
                    {refsService.getCategoryTree(categories).map(category =>
                        category.children.length ?
                            <li key={category.id} className="dropdown side-dropdown">
                                <div className="dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
                                    <>{category.name}&nbsp;<i className="fa fa-angle-right"></i></>
                                </div>
                                <NavigationCategoryMenu category={category}/>
                            </li> :
                            <li key={category.id}>
                                <Link to={uriService.uriProductsByCategoryId(category.id)}>{category.name}</Link>
                            </li>
                    )}
                    <li><a href={uriService.uriProductsByCategoryId('')}>View All</a></li>
                </ul>
            </div>
            {/* <!-- /category nav --> */}
        </>
    );
};

export {NavigationCategory}