import React, { FC, PropsWithChildren } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App } from "../App";

const opts = {
  basename: (process.env.NODE_ENV === "production" ? process.env.REACT_APP_BASENAME : "")
};

const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
  // match everything with "*"
  { path: "*", element: <App /> }
], opts);

const AppRouter: FC<PropsWithChildren> = () => <RouterProvider router={router} />;

export { AppRouter, router };
