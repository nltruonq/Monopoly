import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { RiCoinFill } from "react-icons/ri";

import { colors } from "../../../constants/Color/color";
import { selectUser } from "../../../../../redux/userSlice";
import { useSelector } from "react-redux";
import { cells } from "../../../constants/cell";
import { Tax } from "../../../class/tax";
import taxImg  from "../../../../../assets/images/tax.png"

function TaxComponent({ show, changeShow,turnOfUser,socket,gameRoom,possition }) {

  const user = useSelector(selectUser)
  const cell = cells[possition[turnOfUser]]
  const taxValue= cell instanceof Tax
                  ?cell?.payTax(user[turnOfUser].balance)
                  :-0.1*user[turnOfUser].balance
  

  // chỉ để test
  // const affortToPay = user[turnOfUser].balance - 400



  const handleClose = () => {
    // if(affortToPay<0)
    // {
    //   socket.emit("sell-house",{gameRoom,affortToPay})
    // }
    // else{
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
    // }
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
            <img src= {taxImg} width={200} />
            Bạn bị trừ 10% tài sản: {- taxValue} <RiCoinFill color="yellow" />
      </Modal.Body>
      <Modal.Footer>
        <Button 
          onClick={()=>{
            handleClose()
          }} 
          variant="secondary">
         Oke
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default TaxComponent;
