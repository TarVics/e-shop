import React from 'react';

import css from "./NoPage.module.css"
// import {Breadcrumb} from "../../components";
import {useAppSelector} from "../../hooks";

const NoPage = () => {
    const {i18n} = useAppSelector(state => state.i18nReducer);
    return (
        <>
            {/*<Breadcrumb active={'Page not found'}/>*/}
            {/* <!-- section --> */}
            <div className="section">
                {/* <!-- container --> */}
                <div className={"container " + css.wrapper}>
                    {/* <!-- row --> */}
                    <div className={"row " + css.content}>
                        <h1 className={css.title}>{i18n.value.PAGE_NOT_FOUND}</h1>
                    </div>
                    {/* <!-- /row --> */}
                </div>
                {/* <!-- /container --> */}
            </div>
            {/* <!-- /section --> */}
        </>
    );
};

export {NoPage}