import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { colors } from "../../../constants/Color/color";
// numberuser sau này sẽ update thành số user còn tài sản 
function YourSea({ show, changeShow,turnOfUser,socket,gameRoom}) {

  const handleClose = () => {
    changeShow(false);
    socket.emit("close",{gameRoom})
    socket.emit("turn",{gameRoom})
  };

  return (
    <Modal show={show}>
      <Modal.Header closeButton onClick={handleClose} style={{backgroundColor:colors[turnOfUser],color:"white"}}>
        <Modal.Title>BIỂN</Modal.Title>
      </Modal.Header>
      <Modal.Body>
            Bạn đã sở hữu biển này rồi.

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

export default YourSea;
