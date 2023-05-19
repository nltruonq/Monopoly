import styles from "./UserZone.module.scss"
import classNames from "classnames/bind"
import avatarDefault from "../../../../src/assets/images/avatar_default.jpg"
const cx=classNames.bind(styles)

function UserZone(){
    return (
        <>
            <div className={cx("wrapper")}>
            <div className={cx("player-card")}>
                <div className={cx("avatar")}>
                    <img src={avatarDefault} width="50px" height="50px"  alt="Avatar" className="avatar" />
                </div>
                <div className={cx("info")}>
                    <h3 className={cx("name")}>name</h3>
                    <p className={cx("score")}>Score: </p>
                </div>
            </div>
            </div>
        </>
    )
}
export default UserZone
