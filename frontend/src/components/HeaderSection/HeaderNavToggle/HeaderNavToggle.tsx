import React from "react";

import { MainButton } from "../..";

const HeaderNavToggle: React.FC = () => {
  return (
    <>
      {/* <!-- Mobile nav toggle--> */}
      <li className="nav-toggle">
        <MainButton className="nav-toggle-btn icon-btn">
          <i className="fa fa-bars"></i>
        </MainButton>
      </li>
      {/* <!-- / Mobile nav toggle --> */}
    </>
  );
};

export { HeaderNavToggle };
