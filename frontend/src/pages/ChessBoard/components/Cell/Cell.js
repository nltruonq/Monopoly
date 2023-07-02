import { useEffect } from "react"
import { useSelector } from "react-redux"

import { cells } from "../../constants/cell"
import modalConstant from "../../constants/modal"

import { City } from "../../class/city"
import { Sea } from "../../class/sea"
import { Chance } from "../../class/chance"
import { Tax } from "../../class/tax"
import { Corner } from "../../class/corner"

import { selectCell } from "../../../../redux/slices/cellSlice"
import { selectUser } from "../../../../redux/slices/userSlice"

function Cell({socket,changeShow,gameRoom,yourTurn}){
    const buyHouse = useSelector(selectCell)
    const user = useSelector(selectUser)

    useEffect(()=>{
        socket.on("moved-result",(data)=>{
            const {possition,turnOfUser}=data
            
            // possition là mảng khi di chuyển bình thường 
            // là 1 số khi di chuyển qua world tour
            const userIndex = possition[turnOfUser] || possition  
            console.log(userIndex)
            const cell = cells[userIndex]
            console.log(cell)
            //dùng để test modal
            // changeShow(modalConstant.PAY_TAX)
            console.log(data,"move")
            if(cell instanceof City){
                const house = buyHouse?.find((elm)=>{
                    return elm.boardIndex === userIndex
                })
                if(!house) {
                    changeShow(modalConstant.BUY_HOUSE)
                    //vào ô trống
                }
                else if(house.owner===turnOfUser){
                    console.log("a")
                    changeShow(modalConstant.UPGRADE_HOUSE)
                    //vào nhà mình"
                    
                }
                else {
                    changeShow(modalConstant.RE_BUY_HOUSE)
                    //Vào nhà người khác
                }
            }
            // else if(1){
            //     changeShow(modalConstant.SEAGAME)
            // }
            else if(cell instanceof Sea){

                // chỉ dùng để test
                // changeShow(modalConstant.DESTROY_HOUSE)
                 const sea = buyHouse?.find(elm=>{
                    return elm.boardIndex === userIndex
                 })
                 
                 if(!sea){
                    //vào ô trống
                    changeShow(modalConstant.BUY_SEA)
                 }
                 else if(sea.owner === turnOfUser){
                    console.log("oke")
                    if(yourTurn){
                        socket.emit("turn",{gameRoom})
                    }
                
                 }
                 else {
                    changeShow(modalConstant.OTHER_SEA)
                 }
            }
            // else if(1){
            //     changeShow(modalConstant.SEAGAME)
            // }
            else if(cell instanceof Chance){
                changeShow(modalConstant.CHANGES)

                // chỉ để test
                // changeShow(modalConstant.HOST_BIRTHDAY)
            }
            else if(cell instanceof Tax){
                changeShow(modalConstant.PAY_TAX)            
            }
            else if(userIndex === 8) {
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
                
                else {
    
    
                // other cells  -> turn -> chuyển lượt ++ -> đổi yourTurn -> setClick
                // start -> không chuyển lượt -> yourTurn không đổi -> không setClick
                if(yourTurn) {
                    socket.emit("turn",{gameRoom})
                }

            }
            
        })
        return ()=>{
            socket.off("moved-result")
            socket.off("turn")
        }
    },[socket,buyHouse,yourTurn])
    return (
        <>
        </>
    )
}

export default Cell