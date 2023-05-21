import classNames from "classnames/bind";
import styles from "./ActionUser.module.scss";

import { HiShoppingCart } from "react-icons/hi";
import { FaFantasyFlightGames } from "react-icons/fa";
import { SiRiotgames } from "react-icons/si";

const cx = classNames.bind(styles);

function ActionUser() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("user")}>
                <div className={cx("item")}>
                    <HiShoppingCart size={30} color="yellow" />
                    <span className={cx("shop")}>Shop</span>
                </div>
                <div className={cx("item")}>
                    <HiShoppingCart size={30} color="#ccc" />
                    <span>Shop</span>
                </div>
                <div className={cx("item")}>
                    <HiShoppingCart size={30} color="#ccc" />
                    <span>Shop</span>
                </div>
            </div>
            <div className={cx("game")}>
                <div className={cx("normal")}>
                    <div className={cx("shape")}>
                        <FaFantasyFlightGames size={30} color="yellow" />
                    </div>
                    <span>Đấu với bạn bè</span>
                </div>
                <div className={cx("rank")}>
                    <div className={cx("shape")}>
                        <SiRiotgames size={30} color="yellow" />
                    </div>
                    <span>Đấu hạng</span>
                </div>
            </div>
        </div>
    );
}

export default ActionUser;
