import React from 'react';
import {Outlet} from "react-router-dom";

import {FooterSection, HeaderSection, NavigationSection} from "../../components";

const MainLayout = () => {
    return (
        <>
            <HeaderSection/>
            <NavigationSection/>
            <Outlet/>
            <FooterSection/>
        </>
    );
};

export {MainLayout}