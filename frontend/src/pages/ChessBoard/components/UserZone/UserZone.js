import styles from "./UserZone.module.scss"
import classNames from "classnames/bind"
import avatarDefault from "../../../../../src/assets/images/avatar_default.jpg"
import { colors } from "../../constants/Color/color"
import { selectUser} from "../../../../redux/userSlice"
import {useSelector} from "react-redux"
const cx=classNames.bind(styles)

function UserZone({index}){
    const user= useSelector(selectUser)
    
    return (
        <>
            <div className={cx("wrapper")}>
            <div className={cx("player-card")}>
                <div className={cx("avatar")} >
                    <img src={avatarDefault} width="50px" height="50px"  alt="Avatar" className="avatar" />
                </div>
                <div className={cx("info")}>
                    <h3 className={cx("name")} style={{backgroundColor:colors[index]}}>name</h3>
                    <p className={cx("score")} style={{color:colors[index]}}>Score: {user[index].balance}</p>
                </div>
            </div>
            </div>
        </>
    )
}
export default UserZone
