import styles from "./InviteFriends.module.scss";
import classNames from "classnames/bind";
import FriendItem from "./../FriendItem/FriendItem";

const cx = classNames.bind(styles);

function InviteFriends({ friends }) {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("header")}>
                <div className={cx("title")}>Bạn bè</div>
            </div>
            <div className={cx("main")}>
                {friends.map((e, i) => {
                    return <FriendItem key={i} {...e} />;
                })}
            </div>
        </div>
    );
}

export default InviteFriends;
