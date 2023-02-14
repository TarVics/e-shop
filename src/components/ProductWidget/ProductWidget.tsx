import React, {FC} from 'react';
import {Link} from "react-router-dom";

import {StarsRating} from "..";
import {ProductType} from "../../interface";
import {refsService, uriService} from "../../services";
import {useAppSelector} from "../../hooks";

const ProductWidget: FC<ProductType> = (props) => {
    const {activeCurrency} = useAppSelector(state => state.refsReducer);
    return (
        <>
            {/* <!-- widget product --> */}
            <div className="product product-widget">
                <div className="product-thumb">
                    <img src={props.image.column} alt=""/>
                </div>
                <div className="product-body">
                    <h2 className="product-name"><Link to={uriService.uriProductById(props.id)}>{props.name}</Link></h2>
                    <h3 className="product-price">
                        {props.sale ?
                            refsService.getCurrencyText(activeCurrency, props.price - (props.price * props.sale / 100)) :
                            refsService.getCurrencyText(activeCurrency, props.price)}
                        {props.sale ?
                            <del className="product-old-price">{refsService.getCurrencyText(activeCurrency, props.price)}</del> : null}
                    </h3>
                    <div className="product-rating">
                        <StarsRating value={props.rating || 0}/>
                    </div>
                </div>
            </div>
            {/* <!-- /widget product --> */}
        </>
    );
};

export {ProductWidget}