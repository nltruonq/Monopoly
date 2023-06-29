import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectUser, updateBalance, updatePrison } from "../../../../redux/slices/userSlice"

function SocketRedux({socket,yourTurn,turnOfUser}){
    const dispatch =useDispatch()

    const userInGame = useSelector(selectUser)

    useEffect(()=>{
        socket.on("start-result",(data)=>{
            dispatch(updateBalance({amount:data.amount,turnOfUser:data.user}))
        })
        socket.on("pay-tax-result",data=>{
            dispatch(updateBalance({amount:data.amount,turnOfUser:data.user}))
        })
        socket.on("receive-birthday-result",data=>{
                dispatch(updateBalance({amount:data.amount,turnOfUser:data.user}))
        })   
        socket.on("pay-birthday-result",data=>{
            for(let i = 0; i < userInGame.length ;++i ){
                if(i !== turnOfUser && userInGame[i].active === true){
                    dispatch(updateBalance({amount:-Math.round(0.05*userInGame[i].balance),turnOfUser:i}))
                }
            }
        })
        socket.on("jail-count",data=>{
            dispatch(updatePrison({turnOfUser:data.user,turns:data.turns}))
        })
        return ()=>{
            socket.off("start-result")
            socket.off("pay-tax-result")
            socket.off("receive-birthday-result")
            socket.off("pay-birthday-result")
        }
    },[socket,turnOfUser,userInGame])

    return (
        <>
        </>
    )
}

export default SocketRedux