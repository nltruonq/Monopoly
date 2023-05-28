import { useEffect, useState } from "react"

function House({houses,houseRefs,cx,socket,possition,turnOfUser,cellRefs}){
    const [inuse,setInuse]=useState(0)
    useEffect(()=>{
        socket.on("bought-result",(data)=>{
            houseRefs.current[inuse].current.firstChild.src=houses[`house${turnOfUser}_1`]
            const houseNode=houseRefs.current[inuse].current
            cellRefs.current[possition[turnOfUser]].current.appendChild(houseNode)

            houseNode.style.display="block"
            if (0 < possition[turnOfUser] && possition[turnOfUser] <= 8) {
                houseNode.style.top="-20px"
                houseNode.style.left="20px"
            } 
            else if (8 < possition[turnOfUser] && possition[turnOfUser] < 16) {
                houseNode.style.top="-20px"
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
        return ()=>{
            socket.off("bought-result")
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