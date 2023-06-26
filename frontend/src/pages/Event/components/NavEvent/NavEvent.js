import { useNavigate } from "react-router-dom";
import styles from "./NavEvent.module.scss";
import classNames from "classnames/bind";
import { useContext } from "react";
import { SocketContext } from "../../../../SocketService";

const cx = classNames.bind(styles);

function NavEvent({ setNav, nav, user }) {
    const navigate = useNavigate();
    return (
        <div className={cx("wrapper")}>
            <div onClick={() => setNav("eventLogin")} className={cx("item", { active: nav === "eventLogin" })}>
                Sự kiện hằng ngày
            </div>
            {/* <div onClick={() => setNav("character")} className={cx("item", { active: nav === "character" })}>
                Nhân vật
            </div> */}
        </div>
    );
}

export default NavEvent;
