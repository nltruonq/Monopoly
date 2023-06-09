import styles from "./InviteFriends.module.scss";
import classNames from "classnames/bind";
import FriendItem from "./../FriendItem/FriendItem";

import Swal from "sweetalert2";

const cx = classNames.bind(styles);

function InviteFriends({ host, friends, socket, players }) {
    const handleInvite = (e) => {
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
        </div>
    );
}

export default InviteFriends;
