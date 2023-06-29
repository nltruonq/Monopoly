import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { colors } from "../../../constants/Color/color";

function Lost({ show, changeShow,socket,gameRoom,turnOfUser}) {
  
  const handleClose = () => {
    changeShow(false);
    socket.emit("loss",{gameRoom})
    socket.emit("close",{gameRoom})
    //  sau này sẽ thế thành giá trị 2 xúc xắc để xét double
    socket.emit("turn",{gameRoom})
  };

  return (
    <Modal show={show}>
      <Modal.Header style={{backgroundColor:colors[turnOfUser],color:"white"}}>
        <Modal.Title>BẠN ĐÃ THUA</Modal.Title>
      </Modal.Header>
      <Modal.Body>
            <div className="col" 
                style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}
            >
                <div style={{marginTop:20}}>
                    Tổng số tài sản bạn không đủ.
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

export default Lost;
