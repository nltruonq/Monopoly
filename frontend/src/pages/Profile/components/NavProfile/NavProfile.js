import { useNavigate } from "react-router-dom";
import styles from "./NavProfile.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function NavProfile({ setNav, nav }) {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("user-monopoly");
        navigate("/login");
    };
    return (
        <div className={cx("wrapper")}>
            <div onClick={() => setNav("information")} className={cx("item", { active: nav === "information" })}>
                Thông tin
            </div>
            <div onClick={() => setNav("history")} className={cx("item", { active: nav === "history" })}>
                Lịch sử đấu
            </div>
            <div onClick={() => setNav("character")} className={cx("item", { active: nav === "character" })}>
                Nhân vật
            </div>
            <div onClick={handleLogout} className={cx("item")}>
                Đăng xuất
            </div>
        </div>
    );
}

export default NavProfile;
