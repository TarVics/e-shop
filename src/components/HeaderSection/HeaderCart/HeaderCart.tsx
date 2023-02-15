import React from 'react';

import imagesData from "../../../data/db/images.data";
import {useAppSelector} from "../../../hooks";

const HeaderCart = () => {
    const {i18n} = useAppSelector(state => state.i18nReducer);
    return (
        <>
            {/* <!-- Cart --> */}
            <li className="header-cart dropdown default-dropdown">
                <div className="dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
                    <div className="header-btns-icon">
                        <i className="fa fa-shopping-cart"></i>
                        <span className="qty">3</span>
                    </div>
                    <strong className="text-uppercase">{i18n.value.MY_CART}:</strong>
                    <br/>
                    <span>35.20$</span>
                </div>
                <div className="custom-menu">
                    <div id="shopping-cart">
                        <div className="shopping-cart-list">
                            <div className="product product-widget">
                                <div className="product-thumb">
                                    <img src={imagesData.thumbProduct01} alt=""/>
                                </div>
                                <div className="product-body">
                                    <h3 className="product-price">$32.50 <span
                                        className="qty">x3</span></h3>
                                    <h2 className="product-name"><a href=".">Product Name Goes
                                        Here</a></h2>
                                </div>
                                <button className="cancel-btn"><i className="fa fa-trash"></i>
                                </button>
                            </div>
                            <div className="product product-widget">
                                <div className="product-thumb">
                                    <img src={imagesData.thumbProduct01} alt=""/>
                                </div>
                                <div className="product-body">
                                    <h3 className="product-price">$32.50 <span
                                        className="qty">x3</span></h3>
                                    <h2 className="product-name"><a href=".">Product Name Goes
                                        Here</a></h2>
                                </div>
                                <button className="cancel-btn"><i className="fa fa-trash"></i>
                                </button>
                            </div>
                        </div>
                        <div className="shopping-cart-btns">
                            <button className="main-btn">{i18n.value.VIEW_CART}</button>
                            <button className="primary-btn">{i18n.value.CHECKOUT} <i
                                className="fa fa-arrow-circle-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </li>
            {/* <!-- /Cart --> */}
        </>
    );
};

export {HeaderCart}