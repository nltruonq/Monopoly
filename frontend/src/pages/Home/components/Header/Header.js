import styles from "./Header.module.scss";
import classNames from "classnames/bind";

import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { DiRuby } from "react-icons/di";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function Header({ user }) {
    const navigate = useNavigate();
    const handleGoProfile = () => {
        navigate(`/profile/${user.username}`);
    };
    return (
        <div className={cx("wrapper")}>
            <div onClick={handleGoProfile} className={cx("avatar")}>
                <img src={user?.avatar || "https://i.pinimg.com/564x/e8/9d/29/e89d292e76d2ffee19e7f17f7f9c6734.jpg" } alt="avatar" />
            </div>
            <div className={cx("right")}>
                <div className={cx("resources")}>
                    <div className={cx("group")}>
                        <RiMoneyDollarCircleLine size={20} color="yellow" />
                        <span>{user?.gold}</span>
                    </div>
                    <div className={cx("group")}>
                        <DiRuby size={20} color="red" />
                        <span>{user?.ruby}</span>
                    </div>
                </div>
                {/* <div className={cx("others")}></div> */}
            </div>
        </div>
    );
}

export default Header;
