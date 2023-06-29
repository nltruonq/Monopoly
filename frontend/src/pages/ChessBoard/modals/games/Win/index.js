import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { colors } from "../../../constants/Color/color";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../../redux/slices/userSlice";

function Win({ show, changeShow,winner,turnOfUser}) {

  const userInGame= useSelector(selectUser)

  console.log(winner)

  const index = userInGame.indexOf(winner)

  console.log(index)
  const handleClose = () => {
    changeShow(false);
    //  sau này sẽ thế thành giá trị 2 xúc xắc để xét double
  };

  return (
    <Modal show={show}>
      <Modal.Header closeButton onClick={handleClose} style={{backgroundColor:colors[index],color:"white"}}>
        <Modal.Title>{ "NGƯỜI THẮNG"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
            <div className="col" 
                style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}
            >
                <div style={{marginTop:20}}>
                    Chúc mừng người chơi thắng cuộc.
                </div>
                <img src ={winner.avatar} width={200} />
                {winner.username}
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

export default Win;
