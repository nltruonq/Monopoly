import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ListFriends.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function ListFriends() {
    const [friends, setFriends] = useState([]);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user-monopoly")) || null);

    useEffect(() => {
        const getFriends = async () => {
            const rs = await axios.get(`${process.env.REACT_APP_SERVER_API}/api/friend/list-friends/${user.username}`);
            setFriends(rs.data);
        };

        getFriends();
    }, []);
    return (
        <>
            <div className={cx("container")}>
                <div className={cx("text")}>
                    <h2>Danh Sách Bạn Bè</h2>
                </div>
                <div className={cx("main")}>
                    {friends.map((e, i) => {
                        return (
                            <div key={i} className={cx("item")}>
                                <div className={cx("avt")}>
                                    <img src={e.avatar} />
                                </div>
                                <div className={cx("des")}>
                                    <div className={cx("name")}>{e.username}</div>
                                    <div className={cx("online")}>{e.isOnline ? "✅ Trực tuyến" : "❌ Ngoại tuyến"}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default ListFriends;
