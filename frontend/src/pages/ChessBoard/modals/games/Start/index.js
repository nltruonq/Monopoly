import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { colors } from "../../../constants/Color/color";
import { RiCoinFill } from "react-icons/ri";
// numberuser sau này sẽ update thành số user còn tài sản 
function Start({ show, changeShow,turnOfUser,socket,gameRoom}) {

  const handleClose = () => {
    changeShow(false);
    socket.emit("close",{gameRoom})
    socket.emit("turn",{gameRoom})
  };

  return (
    <Modal show={show}>
      <Modal.Header closeButton onClick={handleClose} style={{backgroundColor:colors[turnOfUser],color:"white"}}>
        <Modal.Title>Ô START</Modal.Title>
      </Modal.Header>
      <Modal.Body>
            {/* Bạn được nhận 300 <RiCoinFill color="yellow" /> */}
            
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

export default Start;
