import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import classNames from "classnames/bind";
import styles from "../UpgradeHouse/UpgradeHouse.module.scss";
import { RiCoinFill } from "react-icons/ri";
import { colors } from "../../../constants/Color/color";
import houses from "../../../constants/houses";
import {cells} from "../../../constants/cell/index"
import { City } from "../../../class/city";
import { useSelector } from "react-redux";
import { selectCell } from "../../../../../redux/slices/cellSlice";
import { selectGame } from "../../../../../redux/slices/gameSlice";
import { selectUser } from "../../../../../redux/slices/userSlice";
import modalConstant from "../../../constants/modal";

const cx = classNames.bind(styles);

function OtherHouse({ show, changeShow, possition,title,turnOfUser,socket,gameRoom }) {

  const house = useSelector(selectCell);
  const game = useSelector(selectGame)
  const userInGame = useSelector(selectUser)

  const handleClose = () => {
    changeShow(false);
    socket.emit("close",{gameRoom})
    //  sau này sẽ thế thành giá trị 2 xúc xắc để xét double
    socket.emit("turn",{gameRoom})
  };
  
  const currentCell=house?.find((elm)=>{
      return elm.boardIndex === possition[turnOfUser]
  })
  const currentLevel= currentCell.level
  const currentCity = cells[possition[turnOfUser]]

  const isSeagame =  possition[turnOfUser]===game.seagame ? 5 : 1

  let allBalance = userInGame[turnOfUser].balance

  const affortToPay = allBalance - currentCity.fPriceToPay(currentLevel)* isSeagame
  const affortToBuy = allBalance - currentCity.fPriceToBuy(currentLevel)* isSeagame

  console.log(affortToBuy,affortToPay)

  // tính tổng tài sản kể cả nhà
  for(let i=0;i<house.length;++i){

    // so sánh phải nhà người chơi này không
    if(house[i].owner === turnOfUser){
        allBalance += cells[house[i].boardIndex].fPriceToSell(house[i].level)
    } 
  }


  const isLoss = allBalance + affortToPay -userInGame[turnOfUser].balance <0 ? true: false


  const handlePay=()=>{
    
    if(affortToPay >=0){

      let amount = currentCity.fPriceToPay(currentLevel)
      if(game.seagame === possition[turnOfUser]){
        amount *=5
      }
      
      socket.emit("pay",{gameRoom,price:amount,owner:currentCell.owner})
      socket.emit("change-balance",{gameRoom,
        amount:amount,
        user:turnOfUser,
        type:"minus"
      })
      socket.emit("change-balance",{gameRoom,
        amount:amount,
        user:currentCell.owner,
        type:"plus"
      })
      handleClose()
    }
  }

  setTimeout(()=>{
    if(isLoss){
      changeShow(modalConstant.LOSS)
    }
  },2000)

  const handleReBought=()=>{

    if(affortToBuy >=0 ) {

      let amount = currentCity.fRedemptionPrice(currentLevel)
      if(game.seagame === possition[turnOfUser]){
        amount *=5
      }
      socket.emit("re-bought",
      {gameRoom,
        price: amount,
        owner:currentCell.owner,
        inuse:cells.indexOf(currentCity),
        currentLevel
      })
      socket.emit("change-balance",{gameRoom,
        amount:amount,
        user:turnOfUser,
        type:"minus"
      })
      socket.emit("change-balance",{gameRoom,
        amount:amount,
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
        <Modal.Title>{currentCity.city}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={cx("house-all")}>
                <div className={cx("house","active")} >
                  <Image src={houses[`house${currentCell.owner}_${currentLevel}`]} style={{ width: "150px" }} />
                </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button 
          onClick={handlePay} 
          variant="secondary"
          style={{opacity:`${affortToPay < 0 ? "0.5" :"1"}`}}
          >
          Trà tiền {currentCity instanceof City 
          ? currentCity.fPriceToPay(currentLevel)* isSeagame
          : ""
        } <RiCoinFill color="yellow" />
        </Button>
        <Button 
            onClick={handleReBought} 
            variant="secondary"
            style={{opacity:`${affortToBuy < 0 ? "0.5" :"1"}`}}
        >
            Mua lại {currentCity instanceof City 
            ? currentCity.fRedemptionPrice(currentLevel)* isSeagame
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

export default OtherHouse;
