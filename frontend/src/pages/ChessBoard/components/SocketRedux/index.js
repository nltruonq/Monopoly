import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectUser, setActive, setUnActive, updateBalance, updatePrison } from "../../../../redux/slices/userSlice"

function SocketRedux({socket,gameRoom,turnOfUser}){
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
                    dispatch(updateBalance({amount:-Math.round(0.1*userInGame[i].balance),turnOfUser:i}))
                }
            }
        })
        socket.on("jail-count",data=>{
            dispatch(updatePrison({turnOfUser:data.user,turns:data.turns}))
        })

        socket.on("loss-result",()=>{
            console.log("lost")
            dispatch(setUnActive({yourTurn:turnOfUser}))
            let isEnded = 0

            // loss -> userRef -> none
            // house -> quy ra tiền
            // balance -> 0
            // + vào balance chủ nợ

            // kiểm tra thắng thua mỗi khi có ngườithua
            let winner 
            for(let i =0;i< userInGame.length;i++){
               if(userInGame[i].active === true && i!==turnOfUser){
                isEnded+=1
                winner = userInGame[i] 
               } 
            }
            if(isEnded===1){
                console.log("end")
                socket.emit("winner",{gameRoom, winner})
            }
        })
        
        return ()=>{
            socket.off("start-result")
            socket.off("pay-tax-result")
            socket.off("receive-birthday-result")
            socket.off("pay-birthday-result")
            socket.off("loss-result")
            socket.off("jail-count")
        }
    },[socket,turnOfUser,userInGame,gameRoom])

    return (
        <>
        </>
    )
}

export default SocketRedux