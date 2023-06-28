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
import { useDispatch } from "react-redux";
import { setUsername } from "../../redux/slices/userSlice";

const cx = classNames.bind(styles);

function PrivateRoom() {
    const [friends, setFriends] = useState([]);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user-monopoly")));
    const location = useLocation();
    const [players, setPlayers] = useState(location.state || [JSON.parse(localStorage.getItem("user-monopoly"))]);
    const navigate = useNavigate();
    const params = useParams();
    const dispatch= useDispatch()


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

    const handleClickPlay=()=>{
        socket.emit("play-private-room",{roomName:user.username, players })
    }

    const getFriends = async () => {
        const rs = await axios.get(`${process.env.REACT_APP_SERVER_API}/api/friend/list-friends/${user.username}`);
        setFriends(rs.data);
    };

    const socket = useContext(SocketContext);

    socket.on("play-private-room-result",(data)=>{
        console.log(data)
        dispatch(setUsername({players}))
        navigate(`/game?room=${data.gameRoom}`)
    })

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
        if (user.username === params.username) {
            socket.emit("sync-player-private-room", { roomName: params.username, players: newPlayers });
        }
        setPlayers(newPlayers);
    });

    socket.on("sync-player-private-room", (data) => {
        const { players } = data;
        setPlayers(players);
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
                        <img src={user.avatar} alt="avatar" />
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
                {
                    [...Array(3)].map((_,index)=>{
                        return (
                            <UserItem
                                key={index}
                                host={params.username}
                                user={user}
                                player={players.length > index+1 && players[index+1]}
                                color={colors[index+1]}
                                handleKick={handleKick}
                            />
                        )
                    })
                }
                
                <InviteFriends user={user} host={params.username} players={[...players]} socket={socket} friends={friends} />
            </div>
            <div className={cx("footer")}>
                { user.username===params.username&& <div className={cx("play")} onClick={handleClickPlay}>
                    <button>PLAY</button>
                </div>}
            </div>
        </div>
    );
}

export default PrivateRoom;
