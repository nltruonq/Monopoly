import { useState } from "react"
import axios from "axios";


import styles from "./InviteFriend.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function ListInvites() {
    return (
        <>
            <div className={cx("container")}>
                <div className={cx("text")}>
                    <h2>Danh Sách Lời Mời</h2>
                </div>
            </div>
        </>
    )
}


export default ListInvites
