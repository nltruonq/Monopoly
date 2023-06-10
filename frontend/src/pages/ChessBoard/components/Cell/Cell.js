import { useEffect } from "react"
import { cells } from "../../constants/cell"
import { types } from "../../constants/locations/type"
import { City } from "../../class/city"
import { Sea } from "../../class/sea"
import { Chance } from "../../class/chance"
import { Tax } from "../../class/tax"
import { useSelector } from "react-redux"
import { selectCell } from "../../../../redux/cellSlice"

function Cell({socket,changeShow}){
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
                    changeShow(1)
                    //vào ô trống
                }
                else if(house.owner===turnOfUser){
                    changeShow(2)
                    //vào nhà mình"
                    
                }
                else {
                    changeShow(3)
                    //Vào nhà người khác

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