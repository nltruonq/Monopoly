import { useEffect, useState } from "react";
import axios from "axios";

import styles from "./InviteFriend.module.scss";
import classNames from "classnames/bind";

import Swal from "sweetalert2";

const cx = classNames.bind(styles);

function ListInvites() {
    const [friendrequests, setFriendRequests] = useState([]);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user-monopoly")) || null);

    const handleAcceptFriend = async (e) => {
        await Swal.fire({
            title: `Đồng ý kết bạn với ${e.username}`,
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Đồng ý",
            cancelButtonText: `Hủy`,
        }).then(async (result) => {
            if (result.isConfirmed) {
                const rs = await axios.post(`${process.env.REACT_APP_SERVER_API}/api/friend-request/accept`, {
                    username_2: user.username,
                    username_1: e.username,
                });
                if (rs.data.status === 200) {
                    const newFq = friendrequests.filter((f) => f.sender !== e.username);
                    setFriendRequests(newFq);
                    return;
                } else {
                    await Swal.fire({
                        title: `Đã xảy ra lỗi!`,
                        icon: "error",
                        confirmButtonText: "Đồng ý",
                    });
                    return;
                }
            }
        });
    };

    useEffect(() => {
        const getFriendRequests = async () => {
            const rs = await axios.get(`${process.env.REACT_APP_SERVER_API}/api/friend-request/get/${user.username}`);
            setFriendRequests(rs.data);
        };
        getFriendRequests();
    }, []);
    return (
        <>
            <div className={cx("container")}>
                <div className={cx("text")}>
                    <h2>Danh Sách Lời Mời</h2>
                </div>
                <div className={cx("main")}>
                    {friendrequests.map((e, i) => {
                        return (
                            <div key={i} className={cx("item")}>
                                <div className={cx("avt")}>
                                    <img src={e.user.avatar} />
                                </div>
                                <div className={cx("des")}>
                                    <div className={cx("name")}>{e.user.username}</div>
                                    <button onClick={() => handleAcceptFriend(e.user)} className={cx("make-friend")}>
                                        Chấp nhận
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default ListInvites;
