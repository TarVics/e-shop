import React from "react";
import { Link } from "react-router-dom";

import { StarsRating } from "..";
import { ProductType } from "../../interface";
import { productsService, uriService } from "../../services";
import { useRefs } from "../../hooks";

const ProductWidget: React.FC<ProductType> = (props) => {
  const { api } = useRefs();
  return (
    <>
      {/* <!-- widget product --> */}
      <div className="product product-widget">
        <div className="product-thumb">
          <img src={uriService.uriProductImage(props.imageColumn)} alt="" />
        </div>
        <div className="product-body">
          <h2 className="product-name"><Link to={uriService.uriProductByUid(props.uid)}>{props.name}</Link></h2>
          <h3 className="product-price">
            {api.getCurrencyText(productsService.getFinalPrice(props))}
            {productsService.hasSale(props) ?
              <>
                &nbsp;
                <del className="product-old-price">
                  {api.getCurrencyText(props.price)}
                </del>
              </> : null
            }
          </h3>
          <div className="product-rating">
            <StarsRating value={props.rating || 0} />
          </div>
        </div>
      </div>
      {/* <!-- /widget product --> */}
    </>
  );
};

export { ProductWidget };
