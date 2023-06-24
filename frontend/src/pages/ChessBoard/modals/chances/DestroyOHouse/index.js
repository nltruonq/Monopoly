import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { colors } from "../../../constants/Color/color";
import dhImg from "../../../../../assets/images/destroy_house.png"
// numberuser sau này sẽ update thành số user còn tài sản 
function DestroyOtherHouse({ show, changeShow,turnOfUser,socket,gameRoom}) {

  const handleClose = () => {
    changeShow(false);
    socket.emit("destroy-house",{gameRoom,turnOfUser})

    // socket.emit("close",{gameRoom})
    // socket.emit("turn",{gameRoom})
  };

  return (
    <Modal show={show}>
      <Modal.Header closeButton onClick={handleClose} style={{backgroundColor:colors[turnOfUser],color:"white"}}>
        <Modal.Title>PHÁ NHÀ NGƯỜI KHÁC</Modal.Title>
      </Modal.Header>
      <Modal.Body>
            <div className="col" 
                style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}
            >
                <img src= {dhImg} width={200}/>
                <div>
            Chọn một ngôi nhà bất kỳ của người chơi khác và phá hủy nó.
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

export default DestroyOtherHouse;
