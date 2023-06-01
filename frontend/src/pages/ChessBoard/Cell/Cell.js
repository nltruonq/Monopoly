import { useEffect } from "react"
import { cells } from "../constants/cell"
import { types } from "../constants/locations/type"
import { City } from "../class/city"
import { Sea } from "../class/sea"
import { Chance } from "../class/chance"
import { Tax } from "../class/tax"

function Cell({socket,changeShow}){
    useEffect(()=>{
        
        socket.on("moved-result",(data)=>{
            const {possition,turnOfUser}=data
            const cell = cells[possition[turnOfUser]]
            if(cell instanceof City){
                changeShow(true)
            }
            else if(cell instanceof Sea){
                
            }
            else if(cell instanceof Chance){

            }
            else if(cell instanceof Tax){

            }
            else {

            }
        })

    },[socket])
    return (
        <>
        </>
    )
}

export default Cell