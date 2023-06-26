import { useEffect, useState } from "react";
import axios from "axios";

import Button from "@mui/material/Button";

import styles from "./SearchFriend.module.scss";
import classNames from "classnames/bind";

import Swal from "sweetalert2";

const cx = classNames.bind(styles);

function SearchFriend() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user-monopoly")) || null);
    const [friends, setFriends] = useState([]);
    const [friendrequests, setFriendRequests] = useState([]);
    const [value, setValue] = useState("");
    const [list, setList] = useState([]);
    const handleClickSearch = () => {
        axios
            .get(`${process.env.REACT_APP_SERVER_API}/api/user/search-friend/${value}`, {
                headers: {
                    ContentType: "application/json",
                },
            })
            .then((res) => {
                res.data.listPropose = res.data.listPropose.filter((e) => e.username !== user.username);
                setList(res.data.listPropose);
            })
            .catch((error) => {
                console.log(error);
            });
        // Perform login logic here

        // Reset form fields
        setValue("");
    };

    useEffect(() => {
        const getFriends = async () => {
            const rs = await axios.get(`${process.env.REACT_APP_SERVER_API}/api/friend/list-friends/${user.username}`);
            setFriends(rs.data);
        };
        const getFriendRequests = async () => {
            const rs = await axios.get(`${process.env.REACT_APP_SERVER_API}/api/friend-request/get-send/${user.username}`);
            setFriendRequests(rs.data);
        };

        getFriends();
        getFriendRequests();
    }, []);

    const handleAddFriend = async (e) => {
        await Swal.fire({
            title: `Gửi lời mời kết bạn cho ${e.username}`,
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Đồng ý",
            cancelButtonText: `Hủy`,
        }).then(async (result) => {
            if (result.isConfirmed) {
                const rs = await axios.post(`${process.env.REACT_APP_SERVER_API}/api/friend-request/send`, {
                    sender: user.username,
                    receiver: e.username,
                });
                if (rs.data.status === 200) {
                    await Swal.fire({
                        title: `Gửi lời mời kết bạn cho ${e.username} thành công`,
                        icon: "success",
                        confirmButtonText: "Đồng ý",
                    });
                    const newFq = [
                        ...friendrequests,
                        {
                            sender: user.username,
                            receiver: e.username,
                        },
                    ];
                    console.log(newFq);
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

    return (
        <>
            <div className={cx("container")}>
                <div className={cx("form")}>
                    <div className={cx("input-form")}>
                        <input
                            type="text"
                            value={value}
                            onChange={(e) => {
                                setValue(e.target.value);
                            }}
                        ></input>
                    </div>
                    <div className="btn-search">
                        <Button className={cx("search")} onClick={handleClickSearch} variant="outlined">
                            Tìm kiếm
                        </Button>
                    </div>
                </div>

                <div className={cx("list-friends-search")}>
                    {list.map((e, i) => {
                        return (
                            <div key={i} className={cx("item")}>
                                <div className={cx("avt")}>
                                    <img src={e.avatar} />
                                </div>
                                <div className={cx("des")}>
                                    <div className={cx("name")}>{e.username}</div>
                                    <div className={cx("online")}>{e.isOnline ? "✅ Trực tuyến" : "❌ Ngoại tuyến"}</div>
                                    {friendrequests.filter((f) => f.receiver === e.username).length === 1 ? (
                                        <span className={cx("friended")}>Đã gửi lời mời kết bạn</span>
                                    ) : friends.filter((f) => f.username === e.username).length === 0 ? (
                                        <button onClick={() => handleAddFriend(e)} className={cx("make-friend")}>
                                            Kết bạn
                                        </button>
                                    ) : (
                                        <span className={cx("friended")}>Đã là bạn bè</span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default SearchFriend;
