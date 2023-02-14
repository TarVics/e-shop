import React, {useEffect} from 'react';
import {Link} from "react-router-dom";

import imagesData from "../../data/db/images.data";

const ProductQuick = () => {

    useEffect(() => {
        const {$} = window as any;
        // PRODUCT DETAILS SLICK
        $('#product-main-view').slick({
            infinite: true,
            speed: 300,
            dots: false,
            arrows: true,
            fade: true,
            asNavFor: '#product-view',
        });

        $('#product-view').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: true,
            centerMode: true,
            focusOnSelect: true,
            asNavFor: '#product-main-view',
        });

        // PRODUCT ZOOM
        $('#product-main-view .product-view').zoom();

        return
    }, []);

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
                                <div id="product-main-view">
                                    <div className="product-view">
                                        <img src={imagesData.mainProduct01} alt=""/>
                                    </div>
                                    <div className="product-view">
                                        <img src={imagesData.mainProduct02} alt=""/>
                                    </div>
                                    <div className="product-view">
                                        <img src={imagesData.mainProduct03} alt=""/>
                                    </div>
                                    <div className="product-view">
                                        <img src={imagesData.mainProduct04} alt=""/>
                                    </div>
                                </div>
                                <div id="product-view">
                                    <div className="product-view">
                                        <img src={imagesData.thumbProduct01} alt=""/>
                                    </div>
                                    <div className="product-view">
                                        <img src={imagesData.thumbProduct02} alt=""/>
                                    </div>
                                    <div className="product-view">
                                        <img src={imagesData.thumbProduct03} alt=""/>
                                    </div>
                                    <div className="product-view">
                                        <img src={imagesData.thumbProduct04} alt=""/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="product-body">
                                    <div className="product-label">
                                        <span>New</span>
                                        <span className="sale">-20%</span>
                                    </div>
                                    <h2 className="product-name">Product Name Goes Here</h2>
                                    <h3 className="product-price">$32.50 <del className="product-old-price">$45.00</del></h3>
                                    <div>
                                        <div className="product-rating">
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star-o empty"></i>
                                        </div>
                                        <a href=".">3 Review(s) / Add Review</a>
                                    </div>
                                    <p><strong>Availability:</strong> In Stock</p>
                                    <p><strong>Brand:</strong> E-SHOP</p>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                                        dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                    <div className="product-options">
                                        <ul className="size-option">
                                            <li><span className="text-uppercase">Size:</span></li>
                                            <li className="active"><a href=".">S</a></li>
                                            <li><a href=".">XL</a></li>
                                            <li><a href=".">SL</a></li>
                                        </ul>
                                        <ul className="color-option">
                                            <li><span className="text-uppercase">Color:</span></li>
                                            <li className="active"><Link to="." style={{backgroundColor: "#475984"}}></Link></li>
                                            <li><Link to="." style={{backgroundColor: "#8A2454"}}></Link></li>
                                            <li><Link to="." style={{backgroundColor: "#BF6989"}}></Link></li>
                                            <li><Link to="." style={{backgroundColor: "#9A54D8"}}></Link></li>
                                        </ul>
                                    </div>

                                    <div className="product-btns">
                                        <div className="qty-input">
                                            <span className="text-uppercase">QTY: </span>
                                            <input className="input" type="number"/>
                                        </div>
                                        <button className="primary-btn add-to-cart"><i className="fa fa-shopping-cart"></i> Add to Cart</button>
                                        <div className="pull-right">
                                            <button className="main-btn icon-btn"><i className="fa fa-heart"></i></button>
                                            <button className="main-btn icon-btn"><i className="fa fa-exchange"></i></button>
                                            <button className="main-btn icon-btn"><i className="fa fa-share-alt"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- /Product Details --> */}
                    </div>
                    {/* <!-- /row --> */}
                {/*</div>*/}
                {/* <!-- /container --> */}
            {/* </div>*/}
            {/* <!-- /section --> */}
        </>
    );
};

export {ProductQuick}