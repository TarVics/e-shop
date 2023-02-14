import React, {useEffect} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";

import {refsActions} from "./redux";
import {useAppDispatch, useAppSelector} from "./hooks";
import {MainLayout} from "./layouts";
import {HomePage, NoPage, ProductsPage} from "./pages";
import {DetailsPage} from "./pages/DetailsPage";

function App() {
    const dispatch = useAppDispatch();
    const {i18n} = useAppSelector(state => state.i18nReducer);

    useEffect(() => {
        dispatch(refsActions.loadRefs(i18n.encode));
    }, [dispatch, i18n.encode]);

    return (
        <Routes>
            <Route path={'/'} element={<MainLayout/>}>
                <Route index element={<Navigate to={'home'}/>}/>
                <Route path={'home'} element={<HomePage/>}/>
                <Route path={'products'} element={<ProductsPage/>}/>
                <Route path={'products/:id'} element={<DetailsPage/>}/>
                <Route path={'*'} element={<NoPage/>}/>
            </Route>
        </Routes>
    );
}

export {App}
