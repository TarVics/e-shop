import React from "react";

import {
  DayDealsSection,
  HomeSection,
  HotDealSection,
  LatestPickedSection,
  NewCollectionSection
} from "../../components";

const HomePage: React.FC = () => (
  <>
    <HomeSection />
    <NewCollectionSection />
    <DayDealsSection />
    <HotDealSection />
    <LatestPickedSection />
  </>
);


export { HomePage };