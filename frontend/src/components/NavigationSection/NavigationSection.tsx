import React, { useEffect, useState } from "react";

import { NavigationCategory, NavigationMenu } from ".";

const NavigationSection: React.FC = () => {
  const [active, setActive] = useState(false);
  const [categoryActive, setCategoryActive] = useState(false);
  const [menuActive, setMenuActive] = useState(false);

  useEffect(() => {
    const onClickGlobal: EventListener = (e) => {
      const target: HTMLElement = e.target as HTMLElement;
      if (target && target.closest<HTMLElement>(".category-list .custom-menu")) {
        setCategoryActive(false);
      }
      if (active) {
        if (!target || !target.closest<HTMLElement>("#responsive-nav")) {
          setActive(false);
        }
      } else {
        if (target && target.closest<HTMLElement>(".nav-toggle > button")) {
          if (!menuActive && !categoryActive) {
            setMenuActive(true);
          }
          setActive(true);
        }
      }
    };

    document.body.addEventListener("click", onClickGlobal);

    return () => {
      document.body.removeEventListener("click", onClickGlobal);
    };
  });

  const handleCategoryClick = () => {
    setMenuActive(false);
    setCategoryActive(prevState => !prevState);
  };

  const handleMenuClick = () => {
    setCategoryActive(false);
    setMenuActive(prevState => !prevState);
  };

  return (
    <>
      {/* <!-- NAVIGATION --> */}
      <div id="navigation" className={active ? "shadow" : ""}>
        {/* <!-- container --> */}
        <div className="container">
          <div id="responsive-nav" className={active ? "open" : ""}>
            <NavigationCategory onClick={handleCategoryClick} active={categoryActive} />
            <NavigationMenu onClick={handleMenuClick} active={menuActive} />
          </div>
        </div>
        {/* <!-- /container --> */}
      </div>
      {/* <!-- /NAVIGATION --> */}
    </>
  );
};

export { NavigationSection };