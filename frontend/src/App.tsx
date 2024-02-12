import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { refsActions } from "./redux";
import { useAppDispatch, useAppSelector } from "./hooks";
import { MainLayout } from "./layouts";
import {
  AccountPage,
  CartPage,
  CheckoutPage,
  DetailsPage,
  HomePage,
  LoginPage,
  NoPage, PasswordPage,
  ProductsPage,
  RecoverConfirmPage, RecoverPage,
  RegisterConfirmPage,
  RegisterPage
} from "./pages";
import { RequireAuth } from "./hoc";

function App() {
  const dispatch = useAppDispatch();
  const { i18n } = useAppSelector(state => state.i18nReducer);

  useEffect(() => {
    dispatch(refsActions.loadRefs(i18n.encode));
  }, [dispatch, i18n.encode]);

  return (
    <Routes>
      <Route path={"/"} element={<MainLayout/>}>
        <Route index element={<Navigate to={"home"} />} />
        <Route path={"home"} element={<HomePage/>} />
        <Route path={"products"} element={<ProductsPage/>} />
        <Route path={"products/:uid/:tab?"} element={<DetailsPage/>} />
        <Route path={"register"} element={<RegisterPage/>} />
        <Route path={"recover"} element={<RecoverPage/>} />
        <Route path={"password"} element={<RequireAuth><PasswordPage/></RequireAuth>} />
        <Route path={"recover/confirm"} element={<RecoverConfirmPage/>} />
        <Route path={"register/confirm"} element={<RegisterConfirmPage/>} />
        <Route path={"cart"} element={<CartPage/>} />
        <Route path={"login"} element={<LoginPage/>} />
        <Route path={"checkout"} element={<RequireAuth><CheckoutPage/></RequireAuth>} />
        <Route path={"account"} element={<RequireAuth><AccountPage/></RequireAuth>} />
        <Route path={"*"} element={<NoPage/>} />
      </Route>
    </Routes>
  );
}

export { App };
