import styles from "./FriendItem.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function FriendItem({ isOnline = false, username, handleInvite }) {
    return (
        <div onClick={() => isOnline && handleInvite(username)} className={cx("wrapper")}>
            <div className={cx("avatar")}>
                <img src="https://i.pinimg.com/564x/e8/9d/29/e89d292e76d2ffee19e7f17f7f9c6734.jpg" alt="avatar" />
            </div>
            <div className={cx("title")}>
                <div className={cx("name")}>{username}</div>
                <div className={cx("status")}>{isOnline ? "✅ Online" : "❌ Offline"}</div>
            </div>
        </div>
    );
}

export default FriendItem;
