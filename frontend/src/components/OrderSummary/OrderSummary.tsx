import React, { MouseEventHandler } from "react";
import { Link } from "react-router-dom";

import { productsService, uriService } from "../../services";
import { useAppDispatch, useAppSelector, useRefs } from "../../hooks";
import { cartsActions } from "../../redux";
import { CartItemType, CartType } from "../../interface";
import { PrimaryButton } from "../Buttons";
import { getErrorMessage } from "../../utils";

interface OrderSummaryPropsType {
  cart?: CartType;
  error?: object,
  makeOrder?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onCheckValid?: () => boolean;
}

const OrderSummary: React.FC<OrderSummaryPropsType> = (
  {
    cart,
    error,
    makeOrder,
    onClick,
    onCheckValid
  }
) => {
  const dispatch = useAppDispatch();
  const { i18n } = useAppSelector(state => state.i18nReducer);
  const { refs, api } = useRefs();

  const onDeleteItem = (e: React.MouseEvent<HTMLButtonElement>, item: CartItemType) => {
    dispatch(cartsActions.deleteCartItem({ lang: i18n.encode, item }));
    e.preventDefault();
  };

  function onChangeQuantity(e: React.ChangeEvent<HTMLInputElement>, cartItem: CartItemType) {
    dispatch(cartsActions.putCartItem({
      lang: i18n.encode,
      product: cartItem.product,
      quantity: Number(e.target.value),
      append: false
    }));
    e.preventDefault();
  }

  return (
    <div className="order-summary clearfix">
      <div className="section-title">
        <h3 className="title">{i18n.value.ORDER_REVIEW}</h3>
      </div>
      <table className="shopping-cart-table table">
        <thead>
        <tr>
          <th>{i18n.value.ORDER_PRODUCT}</th>
          <th></th>
          <th className="text-center">{i18n.value.ORDER_PRICE}</th>
          <th className="text-center">{i18n.value.ORDER_QUANTITY}</th>
          <th className="text-center">{i18n.value.ORDER_TOTAL}</th>
          <th className="text-right"></th>
        </tr>
        </thead>
        <tbody>
        {cart?.items.map(cartItem =>
          <tr key={cartItem.product.uid}>
            <td className="thumb">
              {
                cartItem.product.images.length ?
                  <img src={uriService.uriProductImage(cartItem.product.images[0].imageThumb)} alt="" /> : null
              }
            </td>
            <td className="details">
              <Link to={uriService.uriProductByUid(cartItem.product.uid)}>
                {cartItem.product.name}
              </Link>
              <ul>
                {cartItem.product.sizeId ?
                  <li>
                    <span>
                        {`${i18n.value.SIZE}: ${api.getSizeById(cartItem.product.sizeId)?.name}`}
                    </span>
                  </li> : null
                }
                {cartItem.product.colorId ?
                  <li>
                    <span>
                        {`${i18n.value.COLOR}: ${api.getColorById(cartItem.product.colorId)?.name}`}
                    </span>
                  </li> : null
                }
              </ul>
            </td>
            <td className="price text-center">
              <strong>{api.getCurrencyText(productsService.getFinalPrice(cartItem.product))}</strong>
              {productsService.hasSale(cartItem.product) ?
                <>
                  <br />
                  <del className="font-weak">
                    <small>{api.getCurrencyText(cartItem.product.price)}</small>
                  </del>
                </> : null
              }
            </td>
            <td className="qty text-center">
              <input className="input" type="number"
                     value={cartItem.quantity}
                     onChange={e => onChangeQuantity(e, cartItem)}
              />
            </td>
            <td className="total text-center">
              <strong className="primary-color">
                {api.getCurrencyText(cartItem.quantity *
                  productsService.getFinalPrice(cartItem.product))}
              </strong>
            </td>
            <td className="text-right">
              <button className="main-btn icon-btn"
                      onClick={e => onDeleteItem(e, cartItem)}>
                <i className="fa fa-close"></i>
              </button>
            </td>
          </tr>
        )}
        </tbody>
        {makeOrder && cart?.items.length ?
          <tfoot>
          <tr>
            <th className="empty" colSpan={6}></th>
          </tr>
          <tr>
            <th className="empty" colSpan={3}></th>
            <th>{i18n.value.SUBTOTAL}</th>
            <th colSpan={2} className="sub-total">
              {api.getCurrencyText(cart.total)}
            </th>
          </tr>
          <tr>
            <th className="empty" colSpan={3}></th>
            <th>{i18n.value.SHIPPING}</th>
            <td colSpan={2}>{
              refs.activeShipping ?
                refs.activeShipping.name +
                (refs.activeShipping.price ?
                    " - " + api.getCurrencyText(refs.activeShipping.price) : ""
                ) : ""
            }
            </td>
          </tr>
          <tr>
            <th className="empty" colSpan={3}></th>
            <th>{i18n.value.TOTAL}</th>
            <th colSpan={2} className="total">
              {api.getCurrencyText(cart.total + (refs.activeShipping?.price || 0))}
            </th>
          </tr>
          </tfoot> : null
        }
      </table>

      {error &&
        <div className={"pull-left"}>
          <span className="primary-color">{i18n.value.ERROR + ": " + getErrorMessage(i18n, error)}</span>
        </div>}

      {makeOrder ?
        <div className="pull-right">
          <PrimaryButton onClick={onClick} disabled={!cart?.items.length || (onCheckValid && !onCheckValid())}>
            {i18n.value.PLACE_ORDER}
          </PrimaryButton>
        </div> : null
      }
    </div>
  );
};

export { OrderSummary };
