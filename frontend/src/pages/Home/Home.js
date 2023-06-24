import ActionUser from "./components/ActionUser/ActionUser";
import Event from "./components/Event/Event";
import Friend from "./components/Friend/Friend";
import Header from "./components/Header/Header";
import InviteWorld from "./components/InviteWorld/InviteWorld";
import Waitting from "./components/Waitting/Waitting";
import styles from "./Home.module.scss";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { SocketContext } from "../../SocketService";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import axios from "axios";

const cx = classNames.bind(styles);

function Home() {
    const [waitting, setWaitting] = useState(false);
    const [inviteWorld, setInviteWorld] = useState([]);

    const navigate = useNavigate();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user-monopoly")));
    const [friends, setFriends] = useState([]);

    const socket = useContext(SocketContext);

    const changeWaitting = (value) => {
        setWaitting(value);
    };

    const getFriends = async () => {
        const rs = await axios.get(`${process.env.REACT_APP_SERVER_API}/api/friend/list-friends/${user.username}`);
        setFriends(rs.data);
    };

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
        socket.emit("online", { username: user?.username });

        socket.on("invite-private-room", (data) => {
            const { from, players } = data;
            Swal.fire({
                title: `${from} đã mời bạn vào phòng`,
                icon: "info",
                showCancelButton: true,
                confirmButtonText: "Đồng ý",
                cancelButtonText: `Hủy`,
            }).then((result) => {
                if (result.isConfirmed) {
                    socket.emit("join-private-room", { roomName: from, ...user });
                    socket.on("full-player-private-room", () => {
                        Swal.fire({
                            title: `Phòng đã đầy!`,
                            icon: "info",
                            confirmButtonText: "HỦY",
                        });
                        return;
                    });
                    socket.on("can-join-private-room", () => {
                        players.push(user);
                        navigate(`/private-room/${from}`, { state: players });
                        socket.off("can-join-private-room");
                    });
                }
            });
        });

        getFriends();
        return () => {
            socket.off("invite-private-room");
        };
    }, []);

    return (
        <div className={cx("wrapper")}>
            {waitting && <Waitting socket={socket} changeWaitting={changeWaitting}></Waitting>}
            <Header user={user} />
            <div className={cx("f-e")}>
                <Friend friends={friends} />
                <Event />
            </div>
            <InviteWorld inviteWorld={inviteWorld} setInviteWorld={setInviteWorld} user={user} socket={socket} />
            <ActionUser changeWaitting={changeWaitting} socket={socket} user={user} />
        </div>
    );
}

export default Home;
