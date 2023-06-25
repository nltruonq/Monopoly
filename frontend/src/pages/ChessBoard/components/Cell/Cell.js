import { useEffect } from "react"
import { useSelector } from "react-redux"

import { cells } from "../../constants/cell"
import modalConstant from "../../constants/modal"

import { City } from "../../class/city"
import { Sea } from "../../class/sea"
import { Chance } from "../../class/chance"
import { Tax } from "../../class/tax"
import { Corner } from "../../class/corner"

import cellSlice, { selectCell } from "../../../../redux/cellSlice"
import { selectUser } from "../../../../redux/userSlice"

function Cell({socket,changeShow}){
    const buyHouse = useSelector(selectCell)
    const user = useSelector(selectUser)



    useEffect(()=>{
        socket.on("moved-result",(data)=>{
            const {possition,turnOfUser}=data
            
            // possition là mảng khi di chuyển bình thường 
            // là 1 số khi di chuyển qua world tour
            const userIndex = possition[turnOfUser] || possition  
            const cell = cells[userIndex]
            //dùng để test modal
            // changeShow(modalConstant.HOST_BIRTHDAY)

            if(cell instanceof City){
                const house = buyHouse?.find((elm)=>{
                    return elm.boardIndex === userIndex
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
                 const sea = buyHouse?.find(elm=>{
                    return elm.boardIndex === userIndex
                 })
                 
                 if(!sea){
                    //vào ô trống
                    changeShow(modalConstant.BUY_SEA)
                 }
                 else if(sea.owner === turnOfUser){
                    console.log("oke")
                 }
                 else {
                    changeShow(modalConstant.OTHER_SEA)
                 }
            }
            else if(cell instanceof Chance){
                changeShow(modalConstant.CHANGES)
            }
            else if(cell instanceof Tax){
                changeShow(modalConstant.PAY_TAX)            
            }
            else if(cell instanceof Corner){
                if(userIndex === 8) {
                    if(user[turnOfUser].prison === 0){
                        changeShow(modalConstant.JAIL)
                    }
                }
                else if(userIndex === 16)
                {
                    changeShow(modalConstant.SEAGAME)
                }
                else if(userIndex === 24){
                    changeShow(modalConstant.WORLD_TOUR)
                }
            }
        })
        return ()=>{
            socket.off("moved-result")
        }
    },[socket,buyHouse])
    return (
        <>
        </>
    )
}

export default Cell