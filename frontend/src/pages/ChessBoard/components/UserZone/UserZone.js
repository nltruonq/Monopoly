import {useDispatch, useSelector} from "react-redux"
import {ImPlus} from "react-icons/im"
import {BiMinus} from "react-icons/bi"

import styles from "./UserZone.module.scss"
import classNames from "classnames/bind"
import avatarDefault from "../../../../../src/assets/images/avatar_default.jpg"
import { colors } from "../../constants/Color/color"
import { selectUser, updateBalance} from "../../../../redux/userSlice"
import { socket } from "../../../../SocketService"
const cx=classNames.bind(styles)

function UserZone({index,change}){
    const user= useSelector(selectUser)
    // const dispatch= useDispatch()
    
    // socket.on("start-result",(data)=>{
    //     dispatch(updateBalance({amount:data.amount,turnOfUser:data.user}))
    // })

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
                    {change && change.user===index&&  
                    <div className={cx("change-balance")} style={{color:change.type==="minus" ?"red":"green"}}>
                        {change.type==="plus"? <ImPlus size="30" />:<BiMinus size="30" /> } 
                        <div style={{fontSize:40}}>
                     {change.amount}
                        </div>
                    </div>}
                </div>
            </div>
        </>
    )
}
export default UserZone
