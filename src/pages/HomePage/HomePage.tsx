import React, {useEffect} from 'react';

import {useAppDispatch, useAppSelector} from "../../hooks";
import {summaryActions} from "../../redux";
import {DayDealsSection, HomeSection, HotDealSection, LatestPickedSection, NewCollectionSection} from "../../components";

const HomePage = () => {
    const dispatch = useAppDispatch();
    const {i18n} = useAppSelector(state => state.i18nReducer);

    useEffect(() => {
        dispatch(summaryActions.loadSummary(i18n.encode));
    }, [dispatch, i18n.encode]);

    return (
        <>
            <HomeSection/>
            <NewCollectionSection/>
            <DayDealsSection/>
            <HotDealSection/>
            <LatestPickedSection/>
        </>
    );
};

export {HomePage}