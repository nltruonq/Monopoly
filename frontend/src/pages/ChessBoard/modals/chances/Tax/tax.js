import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import classNames from "classnames/bind";
// import styles from "./Tax.module.scss";
import { RiCoinFill } from "react-icons/ri";
import { colors } from "../../../constants/Color/color";
import { selectUser } from "../../../../../redux/userSlice";
import { useSelector } from "react-redux";
import { cells } from "../../../constants/cell";
// const cx = classNames.bind(styles);

function Tax({ show, changeShow,turnOfUser,socket,gameRoom,possition }) {

  const user = useSelector(selectUser)
  const cell = cells[possition[turnOfUser]]
  const taxValue= cell.payTax(user[turnOfUser].balance)
  
  const handleClose = () => {
    socket.emit("pay-tax",{
        user:turnOfUser,
        amount:taxValue,
        gameRoom   
    })

    socket.emit("change-balance",{
        gameRoom,
        amount:taxValue,
        user:turnOfUser,
        type:"minus"
    })
    changeShow(false);
    socket.emit("close",{gameRoom})
    //  sau này sẽ thế thành giá trị 2 xúc xắc để xét double
    socket.emit("turn",{gameRoom})
  };

  return (
    <Modal show={show}>
      <Modal.Header closeButton onClick={handleClose} style={{backgroundColor:colors[turnOfUser],color:"white"}}>
        <Modal.Title>ĐÓNG THUẾ</Modal.Title>
      </Modal.Header>
      <Modal.Body>
            bạn bị trừ {- taxValue} 
      </Modal.Body>
      <Modal.Footer>
        <Button 
          onClick={()=>{
            handleClose()
          }} 
          variant="secondary">
         <RiCoinFill color="yellow" />
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Tax;
