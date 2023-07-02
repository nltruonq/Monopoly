import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { colors } from "../../../constants/Color/color";
import { useDispatch, useSelector } from "react-redux";
import { resetUser, selectUser } from "../../../../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { resetGame, selectGame } from "../../../../../redux/slices/gameSlice";
import { resetHouse } from "../../../../../redux/slices/cellSlice";
import { socket } from "../../../../../SocketService";

function Win({ show, changeShow,winner,gameRoom}) {

  const userInGame= useSelector(selectUser)
  const navigate = useNavigate()
  const dispatch =useDispatch()
  const index = userInGame.indexOf(winner)
  const game = useSelector(selectGame)

  const handleClose = () => {
    
    changeShow(false);
    dispatch(resetGame())
    dispatch(resetHouse())
    dispatch(resetUser())
    socket.emit("leave-room",{gameRoom})
    
    navigate('/')
    window.location.reload();

    // if(game.type=== true){
    //   navigate(`/private-room/${game.host}`)
    // }
    // else{
    //   navigate('/')
    // }
    //  sau này sẽ thế thành giá trị 2 xúc xắc để xét double
  };

  return (
    <Modal show={show}>
      <Modal.Header closeButton onClick={handleClose} style={{backgroundColor:colors[index]||"red",color:"white"}}>
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
