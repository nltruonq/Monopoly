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
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user-monopoly")));
    const location = useLocation();
    const [players, setPlayers] = useState(location.state || [JSON.parse(localStorage.getItem("user-monopoly"))]);
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

    const handleKick = (player) => {
        if (params.username === user.username) {
            socket.emit("kick-user-private-room", { roomName: user.username, player: player });
        }
    };

    const getFriends = async () => {
        const rs = await axios.get(`${process.env.REACT_APP_SERVER_API}/api/friend/list-friends/${user.username}`);
        setFriends(rs.data);
    };

    const socket = useContext(SocketContext);

    socket.on("host-delete-room", () => {
        navigate("/");
    });

    socket.on("kick-private-room", (data) => {
        const { player } = data;
        if (player.username === user.username) {
            socket.emit("leave-private-room", { roomName: params.username, ...user });
            navigate("/");
        }
        // const newPlayers = players.filter((e) => e.username !== player.username);
        // setPlayers(newPlayers);
    });

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
                    <div className={cx("name")}>{user.username}</div>
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
                <UserItem host={params.username} user={user} player={players[0]} color={colors[0]} />
                <UserItem
                    host={params.username}
                    user={user}
                    player={players.length > 1 && players[1]}
                    color={colors[1]}
                    handleKick={handleKick}
                />
                <UserItem
                    host={params.username}
                    user={user}
                    player={players.length > 2 && players[2]}
                    color={colors[2]}
                    handleKick={handleKick}
                />
                <UserItem
                    host={params.username}
                    user={user}
                    player={players.length > 3 && players[3]}
                    color={colors[3]}
                    handleKick={handleKick}
                />
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
