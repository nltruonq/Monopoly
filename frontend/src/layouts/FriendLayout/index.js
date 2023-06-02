import classNames from "classnames/bind"
import styles from "./FriendLayout.module.scss"
import Sidebar from "../components/Sidebar"

const cx=classNames.bind(styles)

function FriendLayout({children}){
    return (
        <>
        <div className={cx("wrapper")}>
            <Sidebar></Sidebar>
            <div className={cx("content")}>
                {children}
            </div>
        </div>
        </>
    )
}

export default FriendLayout