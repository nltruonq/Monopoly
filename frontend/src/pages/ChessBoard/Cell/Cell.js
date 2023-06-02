import { useEffect } from "react"
import { cells } from "../constants/cell"
import { types } from "../constants/locations/type"
import { City } from "../class/city"
import { Sea } from "../class/sea"
import { Chance } from "../class/chance"
import { Tax } from "../class/tax"
import { useSelector } from "react-redux"
import { selectCell } from "../../../redux/cellSlice"

function Cell({socket,changeShow,show}){
    const buyHouse = useSelector(selectCell)
    
    useEffect(()=>{
        socket.on("moved-result",(data)=>{
            const {possition,turnOfUser}=data
            const cell = cells[possition[turnOfUser]]
            
            if(cell instanceof City){   
                const house = buyHouse?.find((elm)=>{
                    return elm.boardIndex === possition[turnOfUser]
            
                })
                if(!house) {
                    changeShow(true)
                }
                else if(house.turnOfUser===turnOfUser){
                    changeShow(false)
                    console.log("vào nhà mình")
                    
                }
                else {
                    changeShow(false)
                    console.log("Vào nhà người khác")
                }
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

    },[socket,buyHouse])
    return (
        <>
        </>
    )
}

export default Cell