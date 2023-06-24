import { useState } from "react"
import axios from "axios";


import styles from "./ListFriends.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function ListFriends() {
    return (
        <>
            <div className={cx("container")}>
                <div className={cx("text")}>
                    <h2>Danh Sách Bạn Bè</h2>
                </div>
            </div>
        </>
    )
}


export default ListFriends
