import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { colors } from "../../../constants/Color/color";
import { useSelector } from "react-redux";
import { selectCell } from "../../../../../redux/slices/cellSlice";

function Lost({ show, changeShow,socket,gameRoom,turnOfUser,possition}) {
  
  const houseOwner = useSelector(selectCell)

  const currentCell=houseOwner?.find((elm)=>{
    return elm.boardIndex === possition[turnOfUser]
  })
  const owner = currentCell.owner

  const handleClose = () => {
    changeShow(false);
    socket.emit("loss",{gameRoom,owner})
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
