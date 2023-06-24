import { useEffect } from "react"
import { useSelector } from "react-redux"

import { cells } from "../../constants/cell"
import modalConstant from "../../constants/modal"

import { City } from "../../class/city"
import { Sea } from "../../class/sea"
import { Chance } from "../../class/chance"
import { Tax } from "../../class/tax"
import { Corner } from "../../class/corner"

import { selectCell } from "../../../../redux/cellSlice"
import { selectUser } from "../../../../redux/userSlice"

function Cell({socket,changeShow}){
    const buyHouse = useSelector(selectCell)
    const user = useSelector(selectUser)



    useEffect(()=>{
        socket.on("moved-result",(data)=>{
            const {possition,turnOfUser}=data
            const cell = cells[possition[turnOfUser]]
            
            //dùng để test modal
            // changeShow(modalConstant.HOST_BIRTHDAY)

            if(cell instanceof City){
                const house = buyHouse?.find((elm)=>{
                    return elm.boardIndex === possition[turnOfUser]
            
                })
                if(!house) {
                    changeShow(modalConstant.BUY_HOUSE)
                    //vào ô trống
                }
                else if(house.owner===turnOfUser){
                    changeShow(modalConstant.UPGRADE_HOUSE)
                    //vào nhà mình"
                    
                }
                else {
                    changeShow(modalConstant.RE_BUY_HOUSE)
                    //Vào nhà người khác
                }
            }
            else if(cell instanceof Sea){
                
            }
            else if(cell instanceof Chance){
                changeShow(modalConstant.CHANGES)
            }
            else if(cell instanceof Tax){
                changeShow(modalConstant.PAY_TAX)            
            }
            else if(cell instanceof Corner){
                if(possition[turnOfUser] === 8) {
                    if(user[turnOfUser].prison === 0){
                        changeShow(modalConstant.JAIL)
                    }
                }
                else if(possition[turnOfUser] === 16)
                {
                    changeShow(modalConstant.SEAGAME)
                }
                else if(possition[turnOfUser] === 24){
                    changeShow(modalConstant.WORLD_TOUR)
                }
            }
        })

    },[socket,buyHouse])
    return (
        <>
        </>
    )
}

export default Cell