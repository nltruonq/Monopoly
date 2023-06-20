import classNames from "classnames/bind";
import styles from "./InviteWorld.module.scss";

import { HiChatAlt } from "react-icons/hi";
import Swal from "sweetalert2";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};

const cx = classNames.bind(styles);

function InviteWorld({ user, inviteWorld, setInviteWorld, socket }) {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const handleJoin = (e) => {
        socket.emit("join-private-room", { roomName: e.roomName, ...user });
        socket.on("full-player-private-room", () => {
            Swal.fire({
                title: `Phòng đã đầy!`,
                icon: "info",
                confirmButtonText: "HỦY",
            });
            return;
        });

        socket.on("played-private-room", () => {
            Swal.fire({
                title: `Phòng đang chơi!`,
                icon: "info",
                confirmButtonText: "HỦY",
            });
            return;
        })

        socket.on("can-join-private-room", () => {
            navigate(`/private-room/${e.roomName}`);
            socket.off("can-join-private-room");
        });
    };

    useEffect(() => {
        socket.on("invite-world", (data) => {
            const { from, players, time } = data;
            const newInvite = [{ roomName: from, time }, ...inviteWorld];
            // newInvite.unshift({ roomName: from, time });
            setInviteWorld(newInvite);
            console.log(newInvite);
        });
        return () => {
            socket.off("invite-world");
        };
    }, [inviteWorld]);
    return (
        <div className={cx("wrapper")}>
            <div onClick={openModal} className={cx("invite")}>
                <HiChatAlt size={26} color="yellow" />
                <div className={cx("chat")}>
                    <span>MỜI VÀO PHÒNG - KÊNH THẾ GIỚI</span>
                </div>
            </div>
            <Modal ariaHideApp={false} isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
                <div className={cx("world")}>
                    <div className={cx("header")}>KÊNH THẾ GIỚI</div>
                    <div className={cx("main")}>
                        {inviteWorld?.map((e, i) => (
                            <div onClick={() => handleJoin(e)} key={i} className={cx("item")}>
                                <div className={cx("img")}>
                                    <img src="https://img.freepik.com/free-vector/joystick-game-sport-technology_138676-2045.jpg" />
                                </div>
                                <div className={cx("room")}>
                                    Vào phòng cờ tỷ phú của <span style={{ color: "red", marginLeft: 4 }}>{e.roomName}</span>
                                </div>
                                <div className={cx("time")}>{new Date(e.time).toLocaleTimeString()}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default InviteWorld;
