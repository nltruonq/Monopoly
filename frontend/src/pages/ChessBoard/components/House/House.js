import { useEffect, useState } from "react"
import {updateBalance } from "../../../../redux/userSlice"
import {useDispatch} from "react-redux"
import { buyHouse } from "../../../../redux/cellSlice"


function House({houses,houseRefs,cx,socket,possition,turnOfUser,cellRefs}){
    const [inuse,setInuse]=useState(0)
    const dispatch=useDispatch()
    
    useEffect(()=>{
        socket.on("bought-result",(data)=>{
            dispatch(updateBalance({amount:-data.price,turnOfUser}))
            dispatch(buyHouse({
                boardIndex:possition[turnOfUser],
                level:data.select,
                turnOfUser
            }))
            houseRefs.current[inuse].current.firstChild.src=houses[`house${turnOfUser}_${data.select}`]
            const houseNode=houseRefs.current[inuse].current
            cellRefs.current[possition[turnOfUser]].current.appendChild(houseNode)

            houseNode.style.display="block"
            if (0 < possition[turnOfUser] && possition[turnOfUser] <= 8) {
                houseNode.style.top="-20px"
                houseNode.style.left="30px"
            } 
            else if (8 < possition[turnOfUser] && possition[turnOfUser] < 16) {
                houseNode.style.top="-30px"
                houseNode.style.left="-20px"
            } 
            else if (16 < possition[turnOfUser] && possition[turnOfUser] < 24) {
              houseNode.style.top="-20px"
              houseNode.style.left="40px"
            } 
            else if (24 < possition[turnOfUser] && possition[turnOfUser] < 32) {
              houseNode.style.top="-40px"
              houseNode.style.left="-20px"}
            setInuse(inuse+1)

        })

        socket.on("pay-result",(data)=>{
            dispatch(updateBalance({amount:-data.price,turnOfUser}))
            dispatch(updateBalance({amount:data.price,turnOfUser: data.owner}))
        })

        socket.on("re-bought-result",(data)=>{
            console.log(data.price)
            dispatch(updateBalance({amount:-data.price,turnOfUser}))
            dispatch(updateBalance({amount:data.price,turnOfUser: data.owner}))
        })

        return ()=>{
            socket.off("bought-result")
            socket.off("pay-result")
            socket.off("re-bought-result")
        }
    },[inuse,turnOfUser,possition])
    return(
        <>
        {
         [...Array(20)].map((_,index)=>{
            return(
                <div key={index} className={cx("house")} ref={houseRefs.current[index]} style={{display:"none"}}>
                    <img src={houses.house0_1} width="100px"/>
                </div>
            )
         })   
        }
        </>
    )
}

export default House