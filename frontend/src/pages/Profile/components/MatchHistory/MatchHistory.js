import { useRef, useState } from "react";
import styles from "./MatchHistory.module.scss";
import classNames from "classnames/bind";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../../../Loading/Loading";

const cx = classNames.bind(styles);

function MatchHistory({ user }) {
    const [loading, setLoading] = useState(false);
    const [matchs, setMatchs] = useState([
        {
            isRank: false,
            winner: user.username,
            time: new Date(Date.now()),
        },
        {
            isRank: true,
            winner: "abcd",
            time: new Date(Date.now()),
        },
        {
            isRank: false,
            winner: "abcde",
            time: new Date(Date.now()),
        },
    ]);

    return (
        <div className={cx("wrapper")}>
            {!loading &&
                matchs.map((e, i) => {
                    return (
                        <div key={i} className={cx("item")}>
                            <div className={cx("avt")}>
                                <img src="https://cdn-icons-png.flaticon.com/512/1729/1729456.png" />
                            </div>
                            <div className={cx("result")}>
                                {e.winner === user.username ? (
                                    <p className={cx("victory")}>Victory</p>
                                ) : (
                                    <p className={cx("defeat")}>Defeat</p>
                                )}
                            </div>
                            <div className={cx("rank")}>{e.isRank ? "Đấu hạng" : "Đấu thường"}</div>
                        </div>
                    );
                })}
            {loading && <Loading />}
        </div>
    );
}

export default MatchHistory;
