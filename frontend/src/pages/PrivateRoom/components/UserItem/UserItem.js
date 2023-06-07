import styles from "./UserItem.module.scss";
import classNames from "classnames/bind";

import char from "../../../../assets/images/char.png";

import { GrSubtract } from "react-icons/gr";

const cx = classNames.bind(styles);

function UserItem({ color }) {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("header")} style={{ backgroundColor: `${color}` }}>
                <div className={cx("avatar")}>
                    <img src="https://i.pinimg.com/564x/e8/9d/29/e89d292e76d2ffee19e7f17f7f9c6734.jpg" alt="avatar" />
                </div>
                <div className={cx("name")}>PLAYERRRRRRR</div>
            </div>
            <div className={cx("main")}>
                <div className={cx("char")}>
                    <img src={char} alt="char" />
                </div>
            </div>
            <div className={cx("footer")}>
                <div className={cx("kick")} style={{ backgroundColor: `${color}` }}>
                    <GrSubtract size={30} color="white" />
                </div>
            </div>
        </div>
    );
}

export default UserItem;
