import { useEffect } from "react"
import { cells } from "../constants/cell"
import { types } from "../constants/locations/type"
import { City } from "../class/city"

function Cell({socket,changeShow}){
    useEffect(()=>{
        
        socket.on("moved-result",(data)=>{
            const {possition,turnOfUser}=data
            if(cells[possition[turnOfUser]] instanceof City){
                changeShow(true)
            }
        })
        
    },[socket])
    return (
        <>
        </>
    )
}

export default Cell