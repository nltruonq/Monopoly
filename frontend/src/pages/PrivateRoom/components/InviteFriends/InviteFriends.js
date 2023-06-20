import styles from "./InviteFriends.module.scss";
import classNames from "classnames/bind";
import FriendItem from "./../FriendItem/FriendItem";

import Swal from "sweetalert2";

const cx = classNames.bind(styles);

function InviteFriends({ host, friends, socket, players, user }) {
    const handleInvite = (e) => {
        if (host !== user.username) {
            return;
        }
        if (players.length === 4) {
            return;
        }
        for (let i = 0; i < players.length; i++) {
            if (players[i].username === e) {
                return;
            }
        }
        Swal.fire({
            title: `Mời ${e} vào phòng?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Mời",
            cancelButtonText: `Hủy`,
        }).then((result) => {
            if (result.isConfirmed) {
                socket.emit("invite-private-room", { from: host, to: e, players });
                Swal.fire("Mời thành công!", "", "success");
            }
        });
    };

    const handleInviteWorld = () => {
        if (players.length === 4) {
            return;
        }
        Swal.fire({
            title: `Mời mọi người vào phòng?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Mời",
            cancelButtonText: `Hủy`,
        }).then((result) => {
            if (result.isConfirmed) {
                socket.emit("invite-world", { from: host, players });
                Swal.fire("Mời thành công!", "", "success");
            }
        });
    };

    return (
        <div className={cx("wrapper")}>
            <div className={cx("header")}>
                <div className={cx("title")}>Bạn bè</div>
            </div>
            <div className={cx("main")}>
                {friends.map((e, i) => {
                    return <FriendItem handleInvite={handleInvite} key={i} {...e} />;
                })}
            </div>
            {host === user.username && (
                <div onClick={handleInviteWorld} className={cx("world")}>
                    Mời thế giới
                </div>
            )}
        </div>
    );
}

export default InviteFriends;
