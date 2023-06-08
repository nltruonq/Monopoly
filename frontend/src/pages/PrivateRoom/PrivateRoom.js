import styles from "./PrivateRoom.module.scss";
import classNames from "classnames/bind";

import { AiOutlineCloseCircle } from "react-icons/ai";
import { Row, Col } from "react-bootstrap";
import UserItem from "./components/UserItem/UserItem";
import InviteFriends from "./components/InviteFriends/InviteFriends";

import { colors } from "../../pages/ChessBoard/constants/Color/color";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../SocketService";
import axios from "axios";

const cx = classNames.bind(styles);

function PrivateRoom() {
    const [friends, setFriends] = useState([]);
    const location = useLocation();
    const [players, setPlayers] = useState(location.state || [JSON.parse(localStorage.getItem("user-monopoly"))]);
    const user = JSON.parse(localStorage.getItem("user-monopoly"));
    const navigate = useNavigate();
    const params = useParams();
    const handleGoBackHome = () => {
        if (params.username === user.username) {
            socket.emit("delete-private-room", { roomName: user.username });
        } else {
            socket.emit("leave-private-room", { roomName: params.username, ...user });
        }
        navigate("/");
    };
    const getFriends = async () => {
        const rs = await axios.get(`${process.env.REACT_APP_SERVER_API}/api/friend/list-friends/${user.username}`);
        setFriends(rs.data);
    };

    const socket = useContext(SocketContext);

    socket.on("user-join-private-room", (data) => {
        const { player } = data;
        const newPlayers = [...players];
        newPlayers.push(player);
        setPlayers(newPlayers);
    });

    socket.on("user-leave-private-room", (data) => {
        const { player } = data;
        const newPlayers = players.filter((e) => e.username !== player.username);
        setPlayers(newPlayers);
    });

    socket.on("user-disconnect", (data) => {
        const { username } = data;
        if (params.username === username) {
            socket.emit("delete-private-room", { roomName: user.username });
        }
        const newPlayers = players.filter((e) => e.username !== username);
        setPlayers(newPlayers);
    });

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
                <UserItem player={players[0]} color={colors[0]} />
                <UserItem player={players.length > 1 && players[1]} color={colors[1]} />
                <UserItem player={players.length > 2 && players[2]} color={colors[2]} />
                <UserItem player={players.length > 3 && players[3]} color={colors[3]} />
                <InviteFriends host={params.username} players={[...players]} socket={socket} friends={friends} />
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
