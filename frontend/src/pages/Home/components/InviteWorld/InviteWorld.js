import classNames from "classnames/bind";
import styles from "./InviteWorld.module.scss";

import { HiChatAlt } from "react-icons/hi";

const cx = classNames.bind(styles);

function InviteWorld() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("invite")}>
                <HiChatAlt size={26} color="yellow"/>
                <div className={cx('chat')}>
                    <span>AAAAAAAAAAAAAAAAAAA</span>
                </div>
            </div>
        </div>
    );
}

export default InviteWorld;
