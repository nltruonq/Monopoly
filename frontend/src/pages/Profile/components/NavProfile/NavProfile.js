import styles from "./NavProfile.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function NavProfile({ setNav, nav }) {
    return (
        <div className={cx("wrapper")}>
            <div onClick={() => setNav("information")} className={cx("item", {"active": nav === "information"})}>
                Thông tin
            </div>
            <div onClick={() => setNav("history")} className={cx("item", {"active": nav === "history"})}>
                Lịch sử đấu
            </div>
            <div onClick={() => setNav("character")} className={cx("item", {"active": nav === "character"})}>
                Nhân vật
            </div>
        </div>
    );
}

export default NavProfile;
