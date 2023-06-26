import { useNavigate } from "react-router-dom";
import styles from "./NavProfile.module.scss";
import classNames from "classnames/bind";
import { useContext } from "react";
import { SocketContext } from "../../../../SocketService";

const cx = classNames.bind(styles);

function NavProfile({ setNav, nav, user }) {
    const navigate = useNavigate();
    const socket = useContext(SocketContext);
    const handleLogout = () => {
        localStorage.removeItem("user-monopoly");
        navigate("/login");
        socket.emit("offline", { username: user.username });
    };
    return (
        <div className={cx("wrapper")}>
            <div onClick={() => setNav("information")} className={cx("item", { active: nav === "information" })}>
                Thông tin
            </div>
            <div onClick={() => setNav("history")} className={cx("item", { active: nav === "history" })}>
                Lịch sử đấu
            </div>
            {/* <div onClick={() => setNav("character")} className={cx("item", { active: nav === "character" })}>
                Nhân vật
            </div> */}
            <div onClick={handleLogout} className={cx("item")}>
                Đăng xuất
            </div>
        </div>
    );
}

export default NavProfile;
