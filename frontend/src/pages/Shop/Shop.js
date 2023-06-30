import React from 'react';

import styles from "./Shop.module.scss";
import classNames from "classnames/bind";

import char1 from "../../assets/images/char1.png"
import char2 from "../../assets/images/char2.png"
import char3 from "../../assets/images/char3.png"
import char4 from "../../assets/images/char4.png"
import { ArrowLeftOutlined } from '@ant-design/icons';



const cx = classNames.bind(styles);

const Shop = () => {
    return (
        <>
            <div className={cx("shop")}>
                <b className={cx("text-shop-char")} >
                    <p className={cx("shop-nhn-vt")}>{`Shop Nhân Vật `}</p>
                    <p className={cx("shop-nhn-vt")} >{` `}</p>
                </b>
                <img className={cx("char1")} alt="" src={char1} />
                <b className={cx("text-rate1")} >
                    <span>Giá: 1000</span>
                    <span className={cx("span1")} >{` `}</span>
                    <span className={cx("span2")}>$</span>
                </b>
                <button className={cx("btn-buy1")}>
                    Mua
                </button>
                <button className={cx("btn-back")}>
                    <div className={cx("icon-back")} >
                        <ArrowLeftOutlined />
                    </div>
                </button>
                <img className={cx("char2")} alt="" src={char2} />
                <b className={cx("text-rate2")}>
                    <span>Giá: 2000</span>
                    <span className={cx("span1")}>{` `}</span>
                    <span className={cx("span2")}>$</span>
                </b>
                <button className={cx("btn-buy2")}>
                    Mua
                </button>
                <img className={cx("char3")} alt="" src={char3} />
                <b className={cx("text-rate3")}>
                    <span>Giá: 1500</span>
                    <span className={cx("span1")}>{` `}</span>
                    <span className={cx("span2")}>$</span>
                </b>
                <button className={cx("btn-buy3")}>
                    Mua
                </button>
                <img className={cx("char4")} alt="" src={char4} />
                <b className={cx("text-rate4")}>
                    <span>Giá: 2500</span>
                    <span className={cx("span1")}>{` `}</span>
                    <span className={cx("span2")}>$</span>
                </b>
                <button className={cx("btn-buy4")}>
                    Mua
                </button>
            </div >
        </>
    );
};

export default Shop;