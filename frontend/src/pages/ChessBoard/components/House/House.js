import { useEffect, useState } from "react"
import {setBalance, updateBalance } from "../../../../redux/slices/userSlice"
import {useDispatch, useSelector} from "react-redux"
import { buyHouse, destroyHouse, selectCell } from "../../../../redux/slices/cellSlice"
import { destroySeagame, selectGame } from "../../../../redux/slices/gameSlice"


function House({houses,houseRefs,cx,socket,possition,turnOfUser,cellRefs,gameRoom,seagameRef,userRef}){
    const dispatch=useDispatch()
    
    const houseOwner = useSelector(selectCell)
    const game = useSelector(selectGame)

    useEffect(()=>{
        
        socket.on("bought-result",(data)=>{
            dispatch(updateBalance({amount:-data.price,turnOfUser}))
            dispatch(buyHouse({
                boardIndex:possition[turnOfUser],
                level:data?.select,
                turnOfUser
            }))
            const inuse=data.inuse
            const houseNode=houseRefs?.current[cityBoardIndex.indexOf(inuse)]?.current

            // có level là City, không có level là Sea
            if(data?.select){
                houseNode.firstChild.src=houses[`house${turnOfUser}_${data.select}`]
            }
            else {
                houseNode.firstChild.src= houses[`sea${turnOfUser}`]
            }
            
            cellRefs.current[possition[turnOfUser]].current.appendChild(houseNode)

            houseNode.style.display="block"
            if(data?.select){

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
                    houseNode.style.left="-20px"
                }
            }
            else {
                if ( possition[turnOfUser] ===4 ) {
                    houseNode.style.top="0px"
                    houseNode.style.left="30px"
                } 
                else if (possition[turnOfUser] ===12) {
                    houseNode.style.top="-20px"
                    houseNode.style.left="-10px"
                } 
                else if (possition[turnOfUser] ===20) {
                    houseNode.style.top="0px"
                    houseNode.style.left="30px"
                } 
                else if ( possition[turnOfUser] ===28) {
                    houseNode.style.top="-15px"
                    houseNode.style.left="-10px"
                }
            }
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
            dispatch(buyHouse({turnOfUser,boardIndex:inuse,level:currentLevel}))
            const houseNode=houseRefs.current[cityBoardIndex.indexOf(inuse)].current

            // có level là city, không có là sea
            if(currentLevel){
                houseNode.firstChild.src=houses[`house${turnOfUser}_${currentLevel}`]
            }
            else {
                houseNode.firstChild.src=houses[`sea${turnOfUser}`]
            }
        })


        socket.on("destroy-select-result",(data)=>{
            houseRefs.current[cityBoardIndex.indexOf(data.index)].current.style.display="none";
            dispatch(destroyHouse({boardIndex:data.index}))
            
            // nhà này đang tổ chức seagame
            if(game.seagame === data.index){
                seagameRef.current.style.display = "none"
                dispatch(destroySeagame())
            }
            socket.emit("reset-destroy",{gameRoom})
        })

        socket.on("sell-click-result",data=>{
            const {listSell,user,owner,amountUser,amountOwner} = data
            console.log(data)
            for(let i=0;i<listSell.length;++i){
                houseRefs.current[cityBoardIndex.indexOf(listSell[i])].current.style.display="none";
                dispatch(destroyHouse({boardIndex:listSell[i]}))
            }
            dispatch(setBalance({amount:amountUser,turnOfUser: user}))
            dispatch(updateBalance({amount:amountOwner,turnOfUser: owner}))
        })


        socket.on("loss-reset",(data)=>{
            const owner = data.owner

            //ẩn người chơi
            userRef.current[turnOfUser].current.style.display="none"   
            
            // ẩn nhà

            for(let i = 0; i<houseOwner.length;i++){
                if(houseOwner[i].owner === turnOfUser){
                    houseRefs.current[cityBoardIndex.indexOf(houseOwner[i].boardIndex)].current.style.display="none"
                }
            }
            dispatch(setBalance({turnOfUser,amount:"Phá sản"}))

            // chuyển tiền 

        })
        return ()=>{
            socket.off("upgrade-result")
            socket.off("bought-result")
            socket.off("pay-result")
            socket.off("re-bought-result")
            socket.off("destroy-select-result")
            socket.off("sell-click-result")
            socket.off("loss-reset")
        }
    // },[turnOfUser,possition,seagameRef])
    },[turnOfUser,possition,seagameRef,game,houseOwner])
    return(
        <>
        {
         [...Array(24)].map((_,index)=>{
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

const cityBoardIndex=[1,2,3,4,5,7,9,10,12,13,14,15,17,19,20,21,22,23,25,26,27,28,30,31]