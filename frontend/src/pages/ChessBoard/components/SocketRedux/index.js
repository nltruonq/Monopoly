import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { updateBalance, updatePrison } from "../../../../redux/slices/userSlice"

function SocketRedux({socket,yourTurn,turnOfUser}){
    const dispatch =useDispatch()

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
            for(let i = 0; i < data.users.length; i++ ){
                dispatch(updateBalance({amount:data.amount,turnOfUser:data.users[i]}))
            }
        })
        socket.on("jail-count",data=>{
            dispatch(updatePrison({turnOfUser:data.user,turns:data.turns}))
        })
        return ()=>{
            socket.off("start-result")
            socket.off("pay-tax-result")
            // socket.off("receive-birthday-result")
            socket.off("pay-birthday-result")
        }
    },[socket])

    return (
        <>
        </>
    )
}

export default SocketRedux