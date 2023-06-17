import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { RiCoinFill } from "react-icons/ri";
import { colors } from "../../../constants/Color/color";

// numberuser sau này sẽ update thành số user còn tài sản 
function Birthday({ show, changeShow,turnOfUser,socket,gameRoom,yourTurn,numberUser }) {

  const amount = 100*(numberUser-1)
  
  const handleClose = () => {
    if(yourTurn===turnOfUser) {
        socket.emit("receive-birthday",{
            user:turnOfUser,
            amount:amount ,
            gameRoom   
        })
        socket.emit("change-balance",{
            gameRoom,
            amount:amount,
            user:turnOfUser,
            type:"plus"
        })
        const users =[]
        for(let i=0 ; i <numberUser;i++){
            if(yourTurn!==i){
                users.push(i)
            }
        }
        socket.emit("pay-birthday",{
            users:users,
            amount:-amount ,
            gameRoom 
        })
        socket.emit("change-balance-users",{
            gameRoom,
            amount:-amount ,
            user:turnOfUser,
            type:"minus"
        })
    }
    changeShow(false);
    socket.emit("close",{gameRoom})
    //  sau này sẽ thế thành giá trị 2 xúc xắc để xét double
    socket.emit("turn",{gameRoom})
  };

  return (
    <Modal show={show}>
      <Modal.Header closeButton onClick={handleClose} style={{backgroundColor:colors[turnOfUser],color:"white"}}>
        <Modal.Title>MỪNG SINH NHẬT</Modal.Title>
      </Modal.Header>
      <Modal.Body>
            Bạn nhận được  {amount } <RiCoinFill color="yellow" /> từ những người chơi khác
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

export default Birthday;
