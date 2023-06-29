import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import classNames from "classnames/bind";
import styles from "./BuySelection.module.scss";
import { RiCoinFill } from "react-icons/ri";
import { colors } from "../../../constants/Color/color";
import houses from "../../../constants/houses";
import {cells} from "../../../constants/cell/index"
import { City } from "../../../class/city";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../../redux/slices/userSlice";

const cx = classNames.bind(styles);

function BuySelection({ show, changeShow, possition,turnOfUser,socket,gameRoom }) {
  const handleClose = () => {
    changeShow(false);
    socket.emit("close",{gameRoom})
    //  sau này sẽ thế thành giá trị 2 xúc xắc để xét double
    socket.emit("turn",{gameRoom})
  };

  
  const [select,setSelect]=useState(1)
  const currentCity= cells[possition[turnOfUser]]
  
  const userInGame = useSelector(selectUser)
  const [affortToPay,setAffort]=useState(userInGame[turnOfUser].balance - currentCity.fPriceToBuy(1))

  
  const handleSelect = (index)=>{
    setSelect(index+1)
    setAffort( userInGame[turnOfUser].balance - currentCity.fPriceToBuy(index+1))
  }

  const buyHouse=()=>{
    if(select && affortToPay >=0){
      socket.emit("bought",{
        gameRoom,
        select,
        price:currentCity.fPriceToBuy(select),
        inuse:cells.indexOf(currentCity)})
      socket.emit("change-balance",
      {gameRoom,
        amount:currentCity.fPriceToBuy(select),
        user:turnOfUser,
        type:"minus"
      })
      handleClose()
    }
  }

  return (
    <Modal show={show}>
      <Modal.Header closeButton style={{backgroundColor:colors[turnOfUser],color:"white"}}>
        <Modal.Title>{currentCity.city}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={cx("house-all")}>
          {[...Array(2)].map((_,index)=>{
              return (
                <div className={cx("house",select===index+1?"active":"")} key={index} onClick={()=>handleSelect(index)}>
                  <Image src={houses[`house${turnOfUser}_${index+1}`]} style={{ width: "150px" }} />
                </div>
              )
          })}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button 
          onClick={buyHouse} 
          variant="secondary" style={{opacity:`${affortToPay<0 ? "0.5":"1"}`}}>
          Mua {currentCity instanceof City 
          ? currentCity.fPriceToBuy(select)
          : ""
        } <RiCoinFill color="yellow" />
        </Button>
        <Button onClick={handleClose} variant="secondary">
          Hủy
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default BuySelection;
