import styles from "./PrivateRoom.module.scss";
import classNames from "classnames/bind";

import { AiOutlineCloseCircle } from "react-icons/ai";
import { Row, Col } from "react-bootstrap";
import UserItem from "./components/UserItem/UserItem";
import InviteFriends from "./components/InviteFriends/InviteFriends";

import { colors } from "../../pages/ChessBoard/constants/Color/color";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../SocketService";
import axios from "axios";

const cx = classNames.bind(styles);

function PrivateRoom() {
    const [friends, setFriends] = useState([]);
    const user = JSON.parse(localStorage.getItem("user-monopoly"));
    const navigate = useNavigate();
    const handleGoBackHome = () => {
        navigate("/");
    };
    const getFriends = async () => {
        const rs = await axios.get(`${process.env.REACT_APP_SERVER_API}/api/friend/list-friends/${user.username}`);
        console.log(rs.data);
        setFriends(rs.data);
    };

    const socket = useContext(SocketContext);

    socket.on("online", (data) => {
        const { username } = data;
        const updateFriends = friends.map((e) => {
            if (e.username === username) {
                e.isOnline = true;
            }
            return e;
        });
        setFriends(updateFriends);
    });

    socket.on("offline", (data) => {
        const { username } = data;
        const updateFriends = friends.map((e) => {
            if (e.username === username) {
                e.isOnline = false;
            }
            return e;
        });
        setFriends(updateFriends);
    });

    useEffect(() => {
        getFriends();
    }, []);
    return (
        <div className={cx("wrapper")}>
            {/* SHOW AVATAR + NAME */}
            <div className={cx("header")}>
                <div className={cx("profile")}>
                    <div className={cx("bow")}></div>
                    <div className={cx("bow2")}></div>
                    <div className={cx("name")}>NAMEEEEEEEEEEEEEEEEE</div>
                    <div className={cx("img")}>
                        <img src="https://i.pinimg.com/564x/e8/9d/29/e89d292e76d2ffee19e7f17f7f9c6734.jpg" alt="avatar" />
                    </div>
                    <div className={cx("bg")}></div>
                </div>
                {/* TITLE PRIVATE ROOM */}
                <div className={cx("title")}>
                    <div className={cx("bow")}></div>
                    <div className={cx("bow2")}></div>
                    <div className={cx("name")}>PRIVATE ROOM</div>
                </div>
                {/* BUTTON BACK HOME ... */}
                <div className={cx("actions")}>
                    <div onClick={handleGoBackHome} className={cx("close")}>
                        <AiOutlineCloseCircle size={40} color="white" style={{ backgroundColor: "red", borderRadius: "50%" }} />
                    </div>
                </div>
            </div>
            <div className={cx("main")}>
                <UserItem color={colors[0]} />
                <UserItem color={colors[1]} />
                <UserItem color={colors[2]} />
                <UserItem color={colors[3]} />
                <InviteFriends friends={friends} />
            </div>
            <div className={cx("footer")}>
                <div className={cx("play")}>
                    <button>PLAY</button>
                </div>
            </div>
        </div>
    );
}

export default PrivateRoom;
