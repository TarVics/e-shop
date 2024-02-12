import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector, useRefs, useToggle } from "../../hooks";
import { ProductType } from "../../interface";
import { productsService, uriService } from "../../services";
import { MainButton, Modal, PrimaryButton, ProductQuick, StarsRating } from "..";
import { cartsActions } from "../../redux";

const ProductSingle: React.FC<{ product: ProductType, wideWidth?: boolean }> = (
  {
    product,
    wideWidth = false
  }
) => {
  const dispatch = useAppDispatch();
  const [visibleModal, toggleModal] = useToggle();
  const [stopTimer, setStopTimer] =
    useState({ days: "00", hours: "00", minutes: "00" });
  const { i18n } = useAppSelector(state => state.i18nReducer);
  const { api } = useRefs();

  useEffect(() => {
    if (product.saleStop) {
      let timerID: ReturnType<typeof setInterval> | undefined;
      const timerFn = () => {
        const distance = productsService.getSaleOffTime(product);

        if (distance <= 0) {
          clearInterval(timerID);
          timerID = undefined;
        }

        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        setStopTimer({
          days: days < 10 ? "0" + days.toString() : days.toString(),
          hours: hours < 10 ? "0" + hours.toString() : hours.toString(),
          minutes: minutes < 10 ? "0" + minutes.toString() : minutes.toString()
        });
      };
      timerFn();
      timerID = setInterval(timerFn, 60000);

      return () => timerID && clearInterval(timerID);
    }
  }, [product]);

  function onClickAddToCart(product: ProductType) {
    dispatch(cartsActions.putCartItem({
      lang: i18n.encode,
      product,
      quantity: 1,
      append: true
    }));
  }

  return (
    <>
      {/* <!-- Product Single --> */}
      <div
        className={
          productsService.hasSale(product) && product.sale > 50 ?
            "product product-single product-hot" : "product product-single"
        }
        style={wideWidth ? { display: "flex" } : {}}
      >
        <div className={"product-thumb"}
             style={wideWidth ? { flexBasis: "31%" } : {}}>
          <div className="product-label">
            {product.isNew ? <span>{i18n.value.NEW}</span> : null}
            {product.sale && productsService.hasSale(product) ? <span className="sale">-{product.sale}%</span> : null}
          </div>
          {productsService.getSaleOffTime(product) ?
            <ul className="product-countdown">
              <li><span>{stopTimer.days} D</span></li>
              <li><span>{stopTimer.hours} H</span></li>
              <li><span>{stopTimer.minutes} M</span></li>
            </ul> : null
          }
          <MainButton className="quick-view" onClick={toggleModal}>
            <i className="fa fa-search-plus"></i> {i18n.value.QUICK_VIEW}
          </MainButton>
          {visibleModal ? <Modal
            visible={visibleModal}
            title={product.name}
            content={<ProductQuick uid={product.uid} />}
            footer={<PrimaryButton onClick={toggleModal}>{i18n.value.OK}</PrimaryButton>}
            onClose={toggleModal}
          /> : null}
          <img src={uriService.uriProductImage(product.imageColumn)} alt="" />
        </div>
        <div className={"product-body"}
             style={wideWidth ? { display: "flex", flexBasis: "69%", flexDirection: "column" } : {}}>
          {wideWidth ?
            <>
              <h2 className="product-name">
                <Link to={uriService.uriProductByUid(product.uid)}>{product.name}</Link>
              </h2>
              <h3 className="product-price">
                {api.getCurrencyText(productsService.getFinalPrice(product))}
                {productsService.hasSale(product) ?
                  <>
                    &nbsp;
                    <del className="product-old-price">
                      {api.getCurrencyText(product.price)}
                    </del>
                  </> : null
                }
              </h3>

              <div className="product-rating">
                <StarsRating value={product.rating || 0} />
              </div>

              <p>
                <strong>{i18n.value.AVAILABLE}:</strong> {product.quantity ? i18n.value.IN_STOCK : i18n.value.NOT_IN_STOCK}
              </p>
              <p><strong>{i18n.value.BRAND}:</strong> {
                product.brandId && api.getBrandById(product.brandId)?.name
              }</p>

              <p>{product.brief}</p>

              <div className="product-btns">
                <MainButton className="icon-btn">
                  <i className="fa fa-heart"></i>
                </MainButton>
                <MainButton className="icon-btn">
                  <i className="fa fa-exchange"></i>
                </MainButton>
                <PrimaryButton className="add-to-cart" onClick={() => onClickAddToCart(product)}>
                  <i className="fa fa-shopping-cart"></i> {i18n.value.ADD_TO_CART}
                </PrimaryButton>
              </div>
            </> :
            <>
              <h3 className="product-price">
                {api.getCurrencyText(productsService.getFinalPrice(product))}
                {productsService.hasSale(product) ?
                  <>
                    &nbsp;
                    <del className="product-old-price">
                      {api.getCurrencyText(product.price)}
                    </del>
                  </> : null
                }
              </h3>
              <div className="product-rating">
                <StarsRating value={product.rating || 0} />
              </div>
              <h2 className="product-name">
                <Link to={uriService.uriProductByUid(product.uid)}>{product.name}</Link>
              </h2>
              <div className="product-btns">
                <MainButton className="icon-btn">
                  <i className="fa fa-heart"></i>
                </MainButton>
                <MainButton className="icon-btn">
                  <i className="fa fa-exchange"></i>
                </MainButton>
                <PrimaryButton className="add-to-cart"
                               onClick={() => onClickAddToCart(product)}>
                  <i className="fa fa-shopping-cart"></i> {i18n.value.ADD_TO_CART}
                </PrimaryButton>
              </div>
            </>
          }
        </div>
      </div>
      {/* <!-- /Product Single --> */}
    </>
  );
};

export { ProductSingle };
