import styles from "./Header.module.scss";
import classNames from "classnames/bind";

import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { DiRuby } from "react-icons/di";

const cx = classNames.bind(styles);

function Header() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("avatar")}>
                <img src="https://i.pinimg.com/564x/e8/9d/29/e89d292e76d2ffee19e7f17f7f9c6734.jpg" alt="avatar" />
            </div>
            <div className={cx("right")}>
                <div className={cx("resources")}>
                    <div className={cx("group")}>
                        <RiMoneyDollarCircleLine size={20} color="yellow"/>
                        <span>123456</span>
                    </div>
                    <div className={cx("group")}>
                        <DiRuby size={20} color="red" />
                        <span>1234</span>
                    </div>
                </div>
                {/* <div className={cx("others")}></div> */}
            </div>
        </div>
    );
}

export default Header;
