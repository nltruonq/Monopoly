import { useState } from "react";
import Modal from 'react-modal';

import classNames from "classnames/bind";
import styles from "./Friend.module.scss";

import { CgUserList } from "react-icons/cg";
import { FaUserFriends } from "react-icons/fa";
import { BiWorld } from "react-icons/bi";
import { useNavigate } from "react-router-dom"

const cx = classNames.bind(styles);

function Friend() {

    const naviate = useNavigate()
    // logic
    const changePage = () => {
        naviate("/search-friend")
    }


    return (
        <div className={cx("wrapper")}>
            <div className={cx("header")}>
                <div className={cx("friends", "enable")}>
                    <CgUserList color="yellow" size={20} />
                </div>
                <div className={cx("world")}>
                    <BiWorld color="#ccc" size={20} />
                </div>
            </div>
            <div className={cx("body")}>
                <div className={cx("item")}>
                    <img src="https://i.pinimg.com/564x/f3/5b/5f/f35b5fc97d0ab92af45ac181021006cc.jpg" />
                    <span>Display Name1</span>
                </div>
                <div className={cx("item")}>
                    <img src="https://i.pinimg.com/564x/f3/5b/5f/f35b5fc97d0ab92af45ac181021006cc.jpg" />
                    <span>Display Name2</span>
                </div>
                <div className={cx("item")}>
                    <img src="https://i.pinimg.com/564x/f3/5b/5f/f35b5fc97d0ab92af45ac181021006cc.jpg" />
                    <span>Display Name3</span>
                </div>
                <div className={cx("item")}>
                    <img src="https://i.pinimg.com/564x/f3/5b/5f/f35b5fc97d0ab92af45ac181021006cc.jpg" />
                    <span>Display Name4</span>
                </div>
                <div className={cx("item")}>
                    <img src="https://i.pinimg.com/564x/f3/5b/5f/f35b5fc97d0ab92af45ac181021006cc.jpg" />
                    <span>Display Name5</span>
                </div>
                <div className={cx("item")}>
                    <img src="https://i.pinimg.com/564x/f3/5b/5f/f35b5fc97d0ab92af45ac181021006cc.jpg" />
                    <span>Display Name6</span>
                </div>
            </div>

            {/* btn Friend */}
            <div className={cx("friend")}>
                <div onClick={changePage} className={cx("btn_friend")}>
                    <FaUserFriends size={24} style={{ zIndex: 2 }} color="#ccc" />
                </div>

            </div>


        </div >
    );
}

export default Friend;
