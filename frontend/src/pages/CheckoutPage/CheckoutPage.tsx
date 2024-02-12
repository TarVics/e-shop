import React, { useEffect } from "react";
import { SubmitHandler } from "react-hook-form/dist/types/form";
import { useLocation, useNavigate, useNavigationType } from "react-router-dom";

import { OrderPostType, UserType } from "../../interface";
import { ordersActions } from "../../redux";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Breadcrumb, UserForm } from "../../components";
import { uriService } from "../../services";

const CheckoutPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const navType = useNavigationType();
  const { state } = useLocation();
  const { i18n } = useAppSelector(state => state.i18nReducer);
  const { cart} = useAppSelector(state => state.cartsReducer);
  const { order, error} = useAppSelector(state => state.ordersReducer);

  const onSubmit: SubmitHandler<UserType> = async (postUser) => {
    if (!cart) return;

    const order: OrderPostType = {
      // user: user?.id || postUser,
      zipCode: postUser.zipCode,
      country: postUser.country,
      city: postUser.city,
      address: postUser.address,
      shippingId: postUser.shippingMethodId,
      paymentId: postUser.paymentMethodId,
      cart: cart.uid
    };

    dispatch(ordersActions.createOrder({ lang: i18n.encode, order }));
  };

  useEffect(() => {
    if (!order) return;

    if (state?.pathname) {
      navigate(state.pathname, { replace: true });
    } else if (navType === "PUSH")
      navigate(-1);
    else
      navigate(uriService.uriProducts(), { replace: true });

  }, [order, navigate, navType, state?.pathname]);

  return (
    <>
      <Breadcrumb active={i18n.value.CHECKOUT} />
      {/* <!-- section --> */}
      <div className="section">
        {/* <!-- container --> */}
        <div className="container">
          {/* <!-- row --> */}
          <div className="row">
            <UserForm error={error} makeOrder={true} onSubmit={onSubmit} />
          </div>
          {/* <!-- /row --> */}
        </div>
        {/* <!-- /container --> */}
      </div>
      {/* <!-- /section --> */}
    </>
  );
};

export { CheckoutPage };
