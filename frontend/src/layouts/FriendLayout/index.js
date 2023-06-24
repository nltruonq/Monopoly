import classNames from "classnames/bind"
import styles from "./FriendLayout.module.scss"
import Sidebar from "../components/Sidebar"

const cx = classNames.bind(styles)

function FriendLayout({ children }) {
    return (
        <>
            <div className={cx("container")}>
                <div className={cx("wrapper")}>
                    <div className={cx("text")}>
                        <h2>THÔNG TIN BẠN BÈ</h2>
                    </div>
                    <div className={cx("sidebar")}>
                        <Sidebar ></Sidebar>
                    </div>
                </div>
                <div className={cx("content")}>
                    {children}
                </div>
            </div >
        </>
    )
}

export default FriendLayout