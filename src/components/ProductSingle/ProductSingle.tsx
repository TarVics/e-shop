import React, {FC, useEffect, useState} from 'react';
import {Link} from "react-router-dom";

import {StarsRating} from "../StarsRating";
import {ProductType} from "../../interface";
import {refsService, uriService} from "../../services";
import {useAppSelector, useToggle} from "../../hooks";
import {Modal} from "../Modal";
import {ProductQuick} from "../ProductQuick";

const ProductSingle: FC<ProductType> = (props) => {
    const [visibleModal, toggleModal] = useToggle();
    const {i18n} = useAppSelector(state => state.i18nReducer);
    const {activeCurrency} = useAppSelector(state => state.refsReducer);
    const [stopTimer, setStopTimer] = useState({days: "00", hours: "00", minutes: "00"});

    useEffect(() => {
        if (props.saleStop) {
            const countDownDate = new Date(props.saleStop).getTime();
            let timerID: ReturnType<typeof setInterval> | undefined;
            const timerFn = () => {
                const now = new Date().getTime();
                let distance = countDownDate - now;

                if (distance < 0) {
                    clearInterval(timerID);
                    timerID = undefined;
                    distance = 0;
                }

                let days = Math.floor(distance / (1000 * 60 * 60 * 24));
                let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

                setStopTimer({
                    days: days < 10 ? "0" + days.toString() : days.toString(),
                    hours: hours < 10 ? "0" + hours.toString() : hours.toString(),
                    minutes: minutes < 10 ? "0" + minutes.toString() : minutes.toString()
                })
            }
            timerFn();
            timerID = setInterval(timerFn, 60000);

            return () => timerID && clearInterval(timerID);
        }
    }, [props.saleStop]);

    return (
        <>
            {/* <!-- Product Single --> */}
            <div className={props.isHot ? "product product-single product-hot" : "product product-single"}>
                <div className="product-thumb">
                    <div className="product-label">
                        {props.isNew ? <span>{i18n.value.NEW}</span> : null}
                        {props.sale ? <span className="sale">-{props.sale}%</span> : null}
                    </div>
                    {props.saleStop ?
                        <ul className="product-countdown">
                            <li><span>{stopTimer.days} D</span></li>
                            <li><span>{stopTimer.hours} H</span></li>
                            <li><span>{stopTimer.minutes} M</span></li>
                        </ul> : null
                    }
                    <button className="main-btn quick-view" onClick={toggleModal}>
                        <i className="fa fa-search-plus"></i> {i18n.value.QUICK_VIEW}
                    </button>
                    <Modal
                        visible={visibleModal}
                        title={props.name}
                        content={<ProductQuick/>}
                        footer={<button className="primary-btn" onClick={toggleModal}>{i18n.value.OK}</button>}
                        onClose={toggleModal}
                    />
                    <img src={props.image.column} alt=""/>
                </div>
                <div className="product-body">
                    <h3 className="product-price">
                        {props.sale ? refsService.getCurrencyText(activeCurrency,
                                props.price - (props.price * props.sale / 100)) :
                            refsService.getCurrencyText(activeCurrency, props.price)}&nbsp;
                        {props.sale ? <del className="product-old-price">
                            {refsService.getCurrencyText(activeCurrency, props.price)}</del> : null }
                    </h3>
                    <div className="product-rating">
                        <StarsRating value={props.rating || 0}/>
                    </div>
                    <h2 className="product-name">
                        <Link to={uriService.uriProductById(props.id)}>{props.name}</Link>
                    </h2>
                    <div className="product-btns">
                        <button className="main-btn icon-btn">
                            <i className="fa fa-heart"></i>
                        </button>
                        <button className="main-btn icon-btn">
                            <i className="fa fa-exchange"></i>
                        </button>
                        <button className="primary-btn add-to-cart">
                            <i className="fa fa-shopping-cart"></i> {i18n.value.ADD_TO_CART}
                        </button>
                    </div>
                </div>
            </div>
            {/* <!-- /Product Single --> */}
        </>
    );
};

export {ProductSingle}