import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { colors } from "../../../constants/Color/color";
import shipImg from "../../../../../assets/images/ship.png"
// numberuser sau này sẽ update thành số user còn tài sản 
function WorldTour({ show, changeShow,turnOfUser,socket,gameRoom}) {

  const handleClose = () => {
    changeShow(false);
    socket.emit("world-tour",{gameRoom})
  };

  return (
    <Modal show={show}>
      <Modal.Header closeButton onClick={handleClose} style={{backgroundColor:colors[turnOfUser],color:"white"}}>
        <Modal.Title>WORLD TOUR</Modal.Title>
      </Modal.Header>
      <Modal.Body>
            <div className="col" 
                style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}
            >
                <img src= {shipImg} width={200}/>
                <div>
            Chọn một nơi bất kì để đi đến.
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

export default WorldTour;
