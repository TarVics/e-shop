import React from "react";

import { useAppSelector } from "../../hooks";
import { Breadcrumb, OrderSummary } from "../../components";

const CartPage: React.FC = () => {
  const { i18n } = useAppSelector(state => state.i18nReducer);
  const { cart } = useAppSelector(state => state.cartsReducer);

  return (
    <>
      <Breadcrumb active={i18n.value.ORDER_REVIEW} />
      {/* <!-- section --> */}
      <div className="section">
        {/* <!-- container --> */}
        <div className="container">
          {/* <!-- row --> */}
          <div className="row">
            <div className="col-md-12">
              <OrderSummary cart={cart} />
            </div>
          </div>
          {/* <!-- /row --> */}
        </div>
        {/* <!-- /container --> */}
      </div>
      {/* <!-- /section --> */}
    </>
  );
};

export { CartPage };
