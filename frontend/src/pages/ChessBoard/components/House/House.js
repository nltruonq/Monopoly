import { useEffect, useState } from "react"
import {updateBalance } from "../../../../redux/userSlice"
import {useDispatch} from "react-redux"
import { buyHouse, destroyHouse } from "../../../../redux/cellSlice"


function House({houses,houseRefs,cx,socket,possition,turnOfUser,cellRefs,gameRoom}){
    const dispatch=useDispatch()
    
    useEffect(()=>{
        
        socket.on("bought-result",(data)=>{
            dispatch(updateBalance({amount:-data.price,turnOfUser}))
            dispatch(buyHouse({
                boardIndex:possition[turnOfUser],
                level:data.select,
                turnOfUser
            }))
            const inuse=data.inuse
            const houseNode=houseRefs.current[cityBoardIndex.indexOf(inuse)].current
            houseNode.firstChild.src=houses[`house${turnOfUser}_${data.select}`]
            
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

        })

        socket.on("upgrade-result",(data)=>{
            dispatch(updateBalance({amount:-data.price,turnOfUser}))
            dispatch(buyHouse({
                boardIndex:possition[turnOfUser],
                level:data.select,
                turnOfUser
            }))
            const inuse=data.inuse
            const houseNode=houseRefs.current[cityBoardIndex.indexOf(inuse)].current
            houseNode.firstChild.src=houses[`house${turnOfUser}_${data.select}`]
        })

        socket.on("pay-result",(data)=>{
            dispatch(updateBalance({amount:-data.price,turnOfUser}))
            dispatch(updateBalance({amount:data.price,turnOfUser: data.owner}))
        })

        socket.on("re-bought-result",(data)=>{
            const {inuse,owner,currentLevel,price} =data 
            dispatch(updateBalance({amount:-price,turnOfUser}))
            dispatch(updateBalance({amount:price,turnOfUser: owner}))
            
            const houseNode=houseRefs.current[cityBoardIndex.indexOf(inuse)].current
            houseNode.firstChild.src=houses[`house${owner}_${currentLevel}`]
        })


        socket.on("destroy-select-result",(data)=>{
            houseRefs.current[cityBoardIndex.indexOf(data.index)].current.style.display="none";
            dispatch(destroyHouse({boardIndex:data.index}))
            socket.emit("reset-destroy",{gameRoom})
        })

        return ()=>{
            socket.off("bought-result")
            socket.off("pay-result")
            socket.off("re-bought-result")
            socket.off("destroy-select-result")
        }
    },[turnOfUser,possition])
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

const cityBoardIndex=[1,2,3,5,7,9,10,13,14,15,17,19,21,23,25,26,27,30,31]