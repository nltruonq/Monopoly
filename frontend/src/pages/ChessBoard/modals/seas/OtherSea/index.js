import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import { RiCoinFill } from "react-icons/ri";
import { colors } from "../../../constants/Color/color";
import houses from "../../../constants/houses";
import {cells} from "../../../constants/cell/index"
import { useSelector } from "react-redux";
import { selectCell } from "../../../../../redux/slices/cellSlice";
import { Sea } from "../../../class/sea";
import { selectGame } from "../../../../../redux/slices/gameSlice";
import { selectUser } from "../../../../../redux/slices/userSlice";


function OtherSea({ show, changeShow, possition,turnOfUser,socket,gameRoom }) {

  const house = useSelector(selectCell);
  const game = useSelector(selectGame);
  const userInGame = useSelector (selectUser)

  const isSeagame =  possition[turnOfUser]===game.seagame ? 5 : 1

  let allBalance = userInGame[turnOfUser].balance
  const currentCell=house?.find((elm)=>{
      return elm.boardIndex === possition[turnOfUser]
  })
  const currentSea = cells[possition[turnOfUser]]

  const affortToPay = allBalance - currentSea.priceToPay* isSeagame
  const affortToBuy = allBalance - currentSea.priceToBuy* isSeagame

  
  // tính tổng tài sản kể cả nhà
  for(let i=0;i<house.length;++i){

    // so sánh phải nhà người chơi này không
    if(house[i].owner === turnOfUser){
        allBalance += cells[house[i].boardIndex].fPriceToSell(house[i].level)
    } 
  }


  const isLoss = allBalance + affortToPay - userInGame[turnOfUser].balance <0 ? true: false
  
  const handleClose = () => {
    changeShow(false);
    socket.emit("close",{gameRoom})
    //  sau này sẽ thế thành giá trị 2 xúc xắc để xét double
    socket.emit("turn",{gameRoom})
  };
  


  const handlePay=()=>{
    if(affortToPay < 0){
      socket.emit("pay",{gameRoom,price:currentSea.priceToPay,owner:currentCell.owner})
      socket.emit("change-balance",{gameRoom,
        amount:currentSea.priceToPay,
        user:turnOfUser,
        type:"minus"
      })
      socket.emit("change-balance",{gameRoom,
        amount:currentSea.priceToPay,
        user:currentCell.owner,
        type:"plus"
      })
      handleClose()

    }

  }

  const handleReBought=()=>{
    if(affortToBuy){

      socket.emit("re-bought",
      {gameRoom,
        price: currentSea.priceToBuy,
        owner:turnOfUser,
        inuse:cells.indexOf(currentSea),
      })
      socket.emit("change-balance",{gameRoom,
        amount:currentSea.priceToBuy,
        user:turnOfUser,
        type:"minus"
      })
      socket.emit("change-balance",{gameRoom,
        amount:currentSea.priceToBuy,
        user:currentCell.owner,
        type:"plus"
        
      })
      handleClose()

    }
    
  }

  const handleSell =()=>{
    socket.emit("sell-house",{gameRoom,affortToPay,owner:currentCell.owner})
    socket.emit("close",{gameRoom})
  }

  return (
    <Modal show={show}>
      <Modal.Header closeButton style={{backgroundColor:colors[turnOfUser],color:"white"}}>
        <Modal.Title>BIỂN</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"300px"}}>
                <div >
                  <Image src={houses[`sea${currentCell.owner}`]} style={{ width: "200px" }} />
                </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button 
          onClick={handlePay} 
          variant="secondary"
          style={{opacity:`${affortToPay<0 ? "0.5" :"1"}`}}
          
          >
          Pay {currentSea instanceof Sea
          ? currentSea.priceToPay
          : ""
        } <RiCoinFill color="yellow" />
        </Button>
        <Button 
            onClick={handleReBought} 
            variant="secondary"
            style={{opacity:`${affortToBuy<0 ? "0.5" :"1"}`}}
        >
            Buy {currentSea instanceof Sea
            ? currentSea.priceToBuy
            : ""
            } <RiCoinFill color="yellow" />
        </Button>
        {
          affortToPay <0 && !isLoss&&
          <Button
            onClick={handleSell}
            variant="secondary"
          >
            Bán tài sản
          </Button>
        }
      </Modal.Footer>
    </Modal>
  );
}

export default OtherSea;
