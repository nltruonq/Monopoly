import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { colors } from "../../../constants/Color/color";
import seagameImg from "../../../../../assets/images/seagame.png"

// numberuser sau này sẽ update thành số user còn tài sản 
function Seagame({ show, changeShow,turnOfUser,socket,gameRoom}) {

  const handleClose = () => {
    changeShow(false);
    socket.emit("seagame",{gameRoom})
  };

  return (
    <Modal show={show}>
      <Modal.Header closeButton onClick={handleClose} style={{backgroundColor:colors[turnOfUser],color:"white"}}>
        <Modal.Title>SEAGAME</Modal.Title>
      </Modal.Header>
      <Modal.Body>
            <div className="col" 
                style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}
            >
                <img src= {seagameImg} width={200}/>
                <div>
            Chọn một thành phố để tổ chức Seagame.

                </div>
            </div>
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

export default Seagame;
