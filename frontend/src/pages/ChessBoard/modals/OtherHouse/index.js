import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import classNames from "classnames/bind";
import styles from "../UpgradeHouse/UpgradeHouse.module.scss";
import { RiCoinFill } from "react-icons/ri";
import { colors } from "../../constants/Color/color";
import houses from "../../constants/houses";
import {cells} from "../../constants/cell/index"
import { City } from "../../class/city";
import { useSelector } from "react-redux";
import { selectCell } from "../../../../redux/cellSlice";

const cx = classNames.bind(styles);

function OtherHouse({ show, changeShow, possition,title,turnOfUser,socket,gameRoom }) {

  const house = useSelector(selectCell);
  
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
  console.log(currentCell)
  const handlePay=()=>{
     socket.emit("pay",{gameRoom,price:currentCity.fPriceToPay(currentLevel),owner:currentCell.owner})
     socket.emit("change-balance",{gameRoom,
      amount:currentCity.fPriceToPay(currentLevel),
      user:turnOfUser,
      type:"minus"
    })
    socket.emit("change-balance",{gameRoom,
      amount:currentCity.fPriceToPay(currentLevel),
      user:currentCell.owner,
      type:"plus"
    })

  }

  const handleReBought=()=>{
    socket.emit("re-bought",
        {gameRoom,
          price: currentCity.fRedemptionPrice(currentLevel),
          owner:turnOfUser,
          inuse:cells.indexOf(currentCity),
          currentLevel
        })
        socket.emit("change-balance",{gameRoom,
          amount:currentCity.fRedemptionPrice(currentLevel),
          user:turnOfUser,
          type:"minus"
        })
        socket.emit("change-balance",{gameRoom,
          amount:currentCity.fRedemptionPrice(currentLevel),
          user:currentCell.owner,
          type:"plus"
        })
    
  }

  return (
    <Modal show={show}>
      <Modal.Header closeButton onClick={handleClose} style={{backgroundColor:colors[turnOfUser],color:"white"}}>
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
          onClick={()=>{
            handlePay()
            handleClose()
          }} 
          variant="secondary">
          Pay {currentCity instanceof City 
          ? currentCity.fPriceToPay(currentLevel)
          : ""
        } <RiCoinFill color="yellow" />
        </Button>
        <Button 
            onClick={()=>{
                handleReBought()
                handleClose()
            }} 
            variant="secondary"
        >
            Buy {currentCity instanceof City 
            ? currentCity.fRedemptionPrice(currentLevel)
            : ""
            } <RiCoinFill color="yellow" />
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default OtherHouse;
