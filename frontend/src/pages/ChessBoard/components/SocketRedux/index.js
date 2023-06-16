import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { updateBalance } from "../../../../redux/userSlice"

function SocketRedux({socket}){
    const dispatch =useDispatch()

    useEffect(()=>{
        socket.on("start-result",(data)=>{
            dispatch(updateBalance({amount:data.amount,turnOfUser:data.user}))
        })
        socket.on("pay-tax-result",data=>{
            dispatch(updateBalance({amount:data.amount,turnOfUser:data.user}))
        })   
        
        return ()=>{
            socket.off("start-result")
            socket.off("pay-tax-result")
        }
    },[socket])

    return (
        <>
        </>
    )
}

export default SocketRedux