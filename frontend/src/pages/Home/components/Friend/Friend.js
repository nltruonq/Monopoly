import { useState } from "react";
import Modal from "react-modal";

import classNames from "classnames/bind";
import styles from "./Friend.module.scss";

import { CgUserList } from "react-icons/cg";
import { FaUserFriends } from "react-icons/fa";
import { BiWorld } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function Friend({ friends }) {
    const naviate = useNavigate();
    // logic
    const changePage = () => {
        naviate("/list-friends");
    };

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
                {friends.map((e, i) => {
                    return (
                        <div key={i} className={cx("item")}>
                            <img src={e.avatar} />
                            <span>{e.username}</span>
                        </div>
                    );
                })}
            </div>

            {/* btn Friend */}
            <div className={cx("friend")}>
                <div onClick={changePage} className={cx("btn_friend")}>
                    <FaUserFriends size={24} style={{ zIndex: 2 }} color="#ccc" />
                </div>
            </div>
        </div>
    );
}

export default Friend;
