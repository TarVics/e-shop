import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { CartItemType } from "../../../interface";
import { cartsActions } from "../../../redux";
import { useAppDispatch, useAppSelector, useRefs } from "../../../hooks";
import { productsService, uriService } from "../../../services";
import { MainButton, PrimaryButton } from "../..";

const HeaderCart: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { api } = useRefs();
  const { i18n } = useAppSelector(state => state.i18nReducer);
  const { cart } = useAppSelector(state => state.cartsReducer);

  useEffect(() => {
    dispatch(cartsActions.loadCart({ lang: i18n.encode }));
  }, [dispatch, i18n.encode]);

  const onDeleteItem = (e: React.MouseEvent<HTMLButtonElement>, item: CartItemType) => {
    e.preventDefault();
    dispatch(cartsActions.deleteCartItem({ lang: i18n.encode, item }));
  };

  return (
    <>
      {/* <!-- Cart --> */}
      {cart && cart.items.length ? <li className="header-cart dropdown default-dropdown">
        <div className="dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
          <div className="header-btns-icon">
            <i className="fa fa-shopping-cart"></i>
            <span className="qty">{cart.items.reduce((acc, val) => acc + val.quantity, 0)}</span>
          </div>
          <div>
            <strong className="text-uppercase">{i18n.value.MY_CART}:</strong>
            <br />
            <span>{api.getCurrencyText(cart.total)}</span>
          </div>
        </div>
        <div className="custom-menu">
          <div id="shopping-cart">
            <div className="shopping-cart-list">
              {cart.items.map(item =>
                <div className="product product-widget" key={item.product.uid}>
                  <div className="product-thumb">
                    {item.product.images.length ?
                      <img src={uriService.uriProductImage(item.product.images[0].imageThumb)} alt="" /> : null}
                  </div>
                  <div className="product-body">
                    <h3 className="product-price">
                      {api.getCurrencyText(productsService.getFinalPrice(item.product))}
                      <span className="qty">x{item.quantity}</span>
                    </h3>
                    <h2 className="product-name">
                      <Link
                        to={uriService.uriProductByUid(item.product.uid)}>{item.product.name}</Link>
                    </h2>
                  </div>
                  <button className="cancel-btn" onClick={e => onDeleteItem(e, item)}>
                    <i className="fa fa-trash"></i>
                  </button>
                </div>
              )}
            </div>
            <div className="shopping-cart-btns">
              <MainButton
                onClick={() => navigate(
                  uriService.uriCart(), { state: location })}
              >{i18n.value.VIEW_CART}</MainButton>
              <PrimaryButton
                onClick={() => navigate(
                  uriService.uriCheckout(),
                  { state: location })}
              >{i18n.value.CHECKOUT} <i
                className="fa fa-arrow-circle-right"></i>
              </PrimaryButton>
            </div>
          </div>
        </div>
      </li> : null}
      {/* <!-- /Cart --> */}
    </>
  );
};

export { HeaderCart };
