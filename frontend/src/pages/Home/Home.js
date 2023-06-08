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

const cx = classNames.bind(styles);

function Home() {
    const [waitting, setWaitting] = useState(false);

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user-monopoly"));

    const socket = useContext(SocketContext);

    const changeWaitting = (value) => {
        setWaitting(value);
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
                    players.push(user);
                    navigate(`/private-room/${from}`, { state: players });
                }
            });
        });
    }, []);

    return (
        <div className={cx("wrapper")}>
            {waitting && <Waitting socket={socket} changeWaitting={changeWaitting}></Waitting>}
            <Header />
            <div className={cx("f-e")}>
                <Friend />
                <Event />
            </div>
            <InviteWorld />
            <ActionUser changeWaitting={changeWaitting} socket={socket} user={user} />
        </div>
    );
}

export default Home;
