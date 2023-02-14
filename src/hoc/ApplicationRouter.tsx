import React, {FC, PropsWithChildren} from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom"

const ApplicationRouter: FC<PropsWithChildren> = ({children/*, ...props*/}) => {
    const router = createBrowserRouter([
        // match everything with "*"
        {path: "*", element: children}
    ], { basename: (process.env.NODE_ENV === 'production' ? process.env.REACT_APP_BASENAME : '')});

    return (
        <RouterProvider router={router}/>
    );
};

export {ApplicationRouter}
