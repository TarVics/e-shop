import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector, useRefs } from "../../hooks";
import { ApiUid, DetailTabEnum, ProductQuickType, ProductType } from "../../interface";
import { cartsActions, productsActions } from "../../redux";
import { productsService, uriService } from "../../services";
import { MainButton, PrimaryButton, ProductReview, StarsRating } from "..";

interface ProductQuickPropsType {
  fullView?: boolean;
  uid: ApiUid;
  onLoad?: (product: ProductType) => void;
}

const ProductQuick: React.FC<ProductQuickPropsType> = (
  {
    fullView,
    uid,
    onLoad
  }
) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { product } = useAppSelector(state => state.productsReducer);
  const { refs, api } = useRefs();

  const { i18n } = useAppSelector(state => state.i18nReducer);
  const [reviewCount, setReviewCount] = useState(0);
  const [productCount, setProductCount] = useState(1);

  const params = useParams();

  const mainViewRef = useRef(null);
  const productViewRef = useRef(null);
  const reviewsRef = useRef(null);

  useEffect(() => {
    dispatch(productsActions.getProductByUid({ uid, encode: i18n.encode, models: true }));
  }, [dispatch, uid, i18n.encode]);

  useEffect(() => {
    onLoad && product && onLoad(product);

    if (!product?.images.length) return;

    const { $ } = window as any;
    // PRODUCT DETAILS SLICK
    // $('#product-main-view').slick({
    const mainView = $(mainViewRef.current);
    mainView.slick({
      infinite: true,
      speed: 300,
      dots: false,
      arrows: true,
      fade: true,
      asNavFor: "#product-view"
    });

    // $('#product-view').slick({
    const productView = $(productViewRef.current);
    productView.slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      centerMode: true,
      focusOnSelect: true,
      asNavFor: "#product-main-view"
    });

    // PRODUCT ZOOM
    $("#product-main-view .product-view").zoom();

    return () => {
      mainView.slick("unslick");
      delete mainView.slick;

      productView.slick("unslick");
      delete productView.slick;
    };

  }, [product, onLoad]);

  const sizesEl: Array<React.JSX.Element> = [];
  const colorsEl: Array<React.JSX.Element> = [];
  const byModel = product?.byModel || [];
  if (product) {
    const productSize = product.sizeId;
    const productColor = product.colorId;
    const onProductSwitchClick = (e: React.MouseEvent<HTMLAnchorElement>, value?: ProductQuickType) => {
      e.preventDefault();
      value && navigate(uriService.uriProductByUid(value.uid));
    };

    refs.sizes.forEach(sizeItem => {
      if (productSize === sizeItem.id) {
        sizesEl.push(
          <li key={product.uid} className="active">
            <a href={uriService.uriProductByUid(product.uid)}
               onClick={e => onProductSwitchClick(e)}
            >{sizeItem.name}</a>
          </li>
        );
      } else {
        const byModelSize = byModel
          .find(value => value.sizeId === sizeItem.id && value.colorId === productColor);
        byModelSize &&
        sizesEl.push(
          <li key={byModelSize.uid}>
            <a href={uriService.uriProductByUid(byModelSize.uid)}
               onClick={e => onProductSwitchClick(e, byModelSize)}
            >{sizeItem.name}</a>
          </li>
        );
      }
    });

    refs.colors.forEach(colorItem => {
      if (productColor === colorItem.id) {
        colorsEl.push(
          <li key={product.uid} className="active">
            <Link to={uriService.uriProductByUid(product.uid)}
                  onClick={e => onProductSwitchClick(e)}
                  style={{ backgroundColor: colorItem.color }}></Link>
          </li>
        );
      } else {
        const byModelColor = byModel
          .find(value => value.colorId === colorItem.id && value.sizeId === productSize);
        byModelColor &&
        colorsEl.push(
          <li key={byModelColor.uid}>
            <Link to={uriService.uriProductByUid(byModelColor.uid)}
                  onClick={e => onProductSwitchClick(e, byModelColor)}
                  style={{ backgroundColor: colorItem.color }}></Link>
          </li>
        );

      }
    });
  }

  const detailPage = Object.values(DetailTabEnum).find(
    value => value === params.tab) || DetailTabEnum.Description;

  const setDetailPage = (tab: DetailTabEnum) => {
    if (!product) return;
    navigate(uriService.uriProductByUid(product.uid, tab));
  };

  const scrollIntoReview = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setDetailPage(DetailTabEnum.Reviews);
    requestAnimationFrame(() => {
      if (!reviewsRef.current) return;
      const form: HTMLFormElement = reviewsRef.current;
      form.scrollIntoView({ block: "center", behavior: "smooth" });

      setTimeout(() => {
        form.elements.length && (form.elements[0] as HTMLInputElement).focus();
      }, 200);
    });
    e.preventDefault();
  };

  const onChangeProductCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: number = Number((e.target as HTMLInputElement).value);
    value >= 1 && value <= 10 && setProductCount(value);
  };

  const onClickAddToCart = (product: ProductType, quantity: number) => {
    dispatch(cartsActions.putCartItem({
      lang: i18n.encode,
      product,
      quantity,
      append: true
    }));
  };

  return (
    <>
      {/* <!-- section --> */}
      {/*<div className="section">*/}
      {/* <!-- container --> */}
      {/*<div className="container">*/}
      {/* <!-- row --> */}
      <div className="row">
        {/* <!--  Product Details --> */}
        <div className="product product-details clearfix">
          <div className="col-md-6">
            <div id="product-main-view" ref={mainViewRef}>
              {product?.images.map((image, index) =>
                <div key={index} className="product-view">
                  <img src={uriService.uriProductImage(image.imageMain)} alt="" />
                </div>)}
            </div>
            <div id="product-view" ref={productViewRef}>
              {product?.images.map((image, index) =>
                <div key={index} className="product-view">
                  <img src={uriService.uriProductImage(image.imageThumb)} alt="" />
                </div>)}
            </div>
          </div>
          <div className="col-md-6">
            <div className="product-body">
              <div className="product-label">
                {product?.isNew ? <span>{i18n.value.NEW}</span> : null}
                {product?.sale && productsService.hasSale(product) ?
                  <span className="sale">-{product.sale}%</span> : null}
              </div>
              <h2 className="product-name">{product?.name}</h2>
              <h3 className="product-price">
                {product && api.getCurrencyText(productsService.getFinalPrice(product))}
                {product?.sale && productsService.hasSale(product) ?
                  <>
                    &nbsp;
                    <del className="product-old-price">
                      {api.getCurrencyText(product.price || 0)}
                    </del>
                  </> : null
                }
              </h3>
              <div>
                <div className="product-rating">
                  <StarsRating value={product?.rating || 0} />
                </div>
                {fullView &&
                  <a href="." onClick={scrollIntoReview}>
                    {reviewCount ? `${reviewCount} ${i18n.value.REVIEWS_N} / ` : ""}
                    {i18n.value.ADD_REVIEW}
                  </a>
                }
              </div>
              <p>
                <strong>{i18n.value.AVAILABLE}:</strong> {product?.quantity ? i18n.value.IN_STOCK : i18n.value.NOT_IN_STOCK}
              </p>
              <p>
                <strong>{i18n.value.BRAND}:</strong> {product?.brandId && api.getBrandById(product.brandId)?.name}
              </p>
              <p>{product?.brief}</p>
              <div className="product-options">
                <ul className="size-option">
                  <li><span className="text-uppercase">{i18n.value.SIZE}:</span></li>
                  {sizesEl}
                </ul>
                <ul className="color-option">
                  <li><span className="text-uppercase">{i18n.value.COLOR}:</span></li>
                  {colorsEl}
                </ul>
              </div>

              <div className="product-btns">
                <div className="qty-input">
                  <span className="text-uppercase">{i18n.value.QTY}: </span>
                  <input className="input" type="number"
                         value={productCount} onChange={onChangeProductCount} />
                </div>
                <PrimaryButton className="add-to-cart"
                               disabled={!product?.quantity || productCount > product?.quantity}
                               onClick={() => product && onClickAddToCart(product, productCount)}
                ><i
                  className="fa fa-shopping-cart"></i> {i18n.value.ADD_TO_CART}</PrimaryButton>
                <div className="pull-right">
                  <MainButton className="icon-btn"><i className="fa fa-heart"></i></MainButton>
                  <MainButton className="icon-btn"><i className="fa fa-exchange"></i></MainButton>
                  <MainButton className="icon-btn"><i className="fa fa-share-alt"></i></MainButton>
                </div>
              </div>
            </div>
          </div>
          {fullView ?
            <div className="col-md-12">
              <div className="product-tab">
                <ul className="tab-nav">
                  <li className={detailPage === DetailTabEnum.Description ? "active" : ""}>
                    <a data-toggle="tab" href="#tab1" onClick={() => setDetailPage(DetailTabEnum.Description)}>
                      {i18n.value.DESCRIPTION}
                    </a>
                  </li>
                  <li className={detailPage === DetailTabEnum.Details ? "active" : ""}>
                    <a data-toggle="tab" href="#tab2" onClick={() => setDetailPage(DetailTabEnum.Details)}>
                      {i18n.value.DETAILS}
                    </a>
                  </li>
                  <li className={detailPage === DetailTabEnum.Reviews ? "active" : ""}>
                    <a data-toggle="tab" href="#tab3" onClick={() => setDetailPage(DetailTabEnum.Reviews)}>
                      {i18n.value.REVIEWS} ({reviewCount})
                    </a>
                  </li>
                </ul>
                <div className="tab-content">
                  <div id="tab1"
                       className={"tab-pane fade in " + (detailPage === DetailTabEnum.Description ? "active" : "")}>
                    <p>{product?.description}</p>
                  </div>

                  <div id="tab2"
                       className={"tab-pane fade in " + (detailPage === DetailTabEnum.Details ? "active" : "")}>
                    <p>{product?.details}</p>
                  </div>

                  <div id="tab3"
                       className={"tab-pane fade in " + (detailPage === DetailTabEnum.Reviews ? "active" : "")}>
                    {product &&
                      <ProductReview product={product}
                                     onTotal={setReviewCount}
                                     ref={reviewsRef}
                      />
                    }
                  </div>
                </div>
              </div>
            </div> : null
          }
        </div>
        {/* <!-- /Product Details --> */}
      </div>
      {/* <!-- /row --> */}
      {/*</div>*/}
      {/* <!-- /container --> */}
      {/*</div>*/}
      {/* <!-- /section --> */}
    </>
  );
};

export { ProductQuick };
