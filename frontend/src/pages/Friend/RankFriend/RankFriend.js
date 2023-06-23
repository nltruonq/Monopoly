import { useState } from "react"
import axios from "axios";


import styles from "./RankFriend.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function RankFriends() {
    return (
        <>
            <div className={cx("container")}>
                <div className={cx("text")}>
                    <h2>Xếp Hạng Bạn Bè</h2>
                </div>
            </div>
        </>
    )
}


export default RankFriends
