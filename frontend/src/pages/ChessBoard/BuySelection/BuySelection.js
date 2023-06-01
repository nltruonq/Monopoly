import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import classNames from "classnames/bind";
import styles from "./BuySelection.module.scss";
import { RiCoinFill } from "react-icons/ri";
import { colors } from "../constants/Color/color";
import houses from "../constants/houses";
import {cells} from "../constants/cell/index"

const cx = classNames.bind(styles);

function BuySelection({ show, setShow, possition,title,turnOfUser,socket,gameRoom }) {
  const handleClose = () => {
    setShow(false);
    socket.emit("close",{gameRoom})
    // {} sau này sẽ thế thành giá trị 2 xúc xắc để xét double
    socket.emit("turn",{gameRoom})
  };
  const [select,setSelect]=useState()

  const buyHouse=()=>{
      socket.emit("bought",{gameRoom,select,price:cells[possition[turnOfUser]]?.fPriceToBuy(select)})
  }

  return (
    <Modal show={show}>
      <Modal.Header closeButton onClick={handleClose} style={{backgroundColor:colors[turnOfUser],color:"white"}}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={cx("house-all")}>
          {[...Array(2)].map((_,index)=>{
              return (
                <div className={cx("house",select===index+1?"active":"")} key={index} onClick={()=>{setSelect(index+1)}}>
                  <Image src={houses[`house${turnOfUser}_${index+1}`]} style={{ width: "150px" }} />
                </div>
              )
          })}

        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button 
          onClick={()=>{
            buyHouse()
            handleClose()
          }} 
          variant="secondary">
          Buy {cells[possition[turnOfUser]].fPriceToBuy(select)} <RiCoinFill color="yellow" />
        </Button>
        <Button onClick={handleClose} variant="secondary">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default BuySelection;
