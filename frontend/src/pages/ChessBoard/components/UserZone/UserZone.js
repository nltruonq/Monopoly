import {useSelector} from "react-redux"
import {ImPlus} from "react-icons/im"
import {BiMinus} from "react-icons/bi"
import { useState } from "react"
import classNames from "classnames/bind"

import styles from "./UserZone.module.scss"
import avatarDefault from "../../../../../src/assets/images/avatar_default.jpg"
import { colors } from "../../constants/Color/color"
import { selectUser} from "../../../../redux/slices/userSlice"
import { socket } from "../../../../SocketService"
import jailedImg from "../../../../assets/images/jailed.png"

const cx=classNames.bind(styles)

function UserZone({index}){
    const user= useSelector(selectUser)

    const [change,setChangeBalance] =useState(false)
    const [changes,setChangeBalances]=useState(false)

    const turns = user[index].prison
    socket.on("change-balance-result",(data)=>{
        setChangeBalance( {amount:data.amount, user:data.user,type:data.type})
        setTimeout(()=>{
            setChangeBalance(false)
        },1000)
    })

    socket.on("change-balance-users-result",data=>{
        setChangeBalances( {amount:data.amount, user:data.user,type:data.type})
        setTimeout(()=>{
            setChangeBalances(false)
        },1000)
    })

    return (
        <>
            <div className={cx("wrapper")}>
                <div className={cx("player-card")}>
                    <div className={cx("avatar")} >
                        <img src={turns ===0 ? user[index].avatar:jailedImg} 
                        width="50px" height="50px"  alt="Avatar" className="avatar" 
                        style={{backgroundColor:`${turns !==0 ? "black" : ""}`}}
                        />
                        <div style={{
                            position:"absolute",
                            top:-20 ,
                            left:40,
                            color:"white",
                            fontSize:30
                        }}>
                            {turns>0 ? turns: ''}
                        </div>
                    </div>
                    <div className={cx("info")}>
                        <h3 className={cx("name")} style={{backgroundColor:colors[index]}}>{user[index].username || `player${index +1 }`}</h3>
                        <p className={cx("score")} style={{color:colors[index]}}>Tiền mặt: {user[index].balance}</p>
                    </div>
                    {change && change.user===index&&  
                    <div className={cx("change-balance")} style={{color:change.type==="minus" ?"red":"green"}}>
                        {change.type==="plus"? <ImPlus size="30" />:<BiMinus size="30" /> }
                        <div style={{fontSize:40}}>
                     {Math.abs(change.amount)}
                        </div>
                    </div>}
                    {changes && changes.user!==index&&  
                    <div className={cx("change-balance")} style={{color:changes.type==="minus" ?"red":"green"}}>
                        {changes.type==="plus"? <ImPlus size="30" />:<BiMinus size="30" /> }
                        <div style={{fontSize:40}}>
                     {Math.abs(changes.amount)}
                        </div>
                    </div>}
                </div>
            </div>
        </>
    )
}
export default UserZone
