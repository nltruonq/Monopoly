import {useSelector} from "react-redux"
import { useContext, useState } from "react"
import {ImPlus} from "react-icons/im"
import {BiMinus} from "react-icons/bi"

import styles from "./UserZone.module.scss"
import classNames from "classnames/bind"
import avatarDefault from "../../../../../src/assets/images/avatar_default.jpg"
import { colors } from "../../constants/Color/color"
import { selectUser} from "../../../../redux/userSlice"

const cx=classNames.bind(styles)

function UserZone({index,change}){
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
