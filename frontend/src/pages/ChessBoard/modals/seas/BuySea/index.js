import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import { RiCoinFill } from "react-icons/ri";
import { colors } from "../../../constants/Color/color";
import houses from "../../../constants/houses";
import {cells} from "../../../constants/cell/index"
import { Sea } from "../../../class/sea";


function BuySea({ show, changeShow, possition,turnOfUser,socket,gameRoom }) {
  const handleClose = () => {
    changeShow(false);
    socket.emit("close",{gameRoom})
    //  sau này sẽ thế thành giá trị 2 xúc xắc để xét double
    socket.emit("turn",{gameRoom})
  };
  const currentSea= cells[possition[turnOfUser]]
  
  const buySea=()=>{
      socket.emit("buy-sea",{
        gameRoom,
        price:currentSea.basePrice,
        inuse:cells.indexOf(currentSea)})
      socket.emit("change-balance",
      {gameRoom,
        amount:currentSea.basePrice,
        user:turnOfUser,
        type:"minus"
      })
  }

  return (
    <Modal show={show}>
      <Modal.Header closeButton onClick={handleClose} style={{backgroundColor:colors[turnOfUser],color:"white"}}>
        <Modal.Title>MUA BIỂN</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div >
            {
                <div style={{display:"flex",justifyContent:"center",height:"300px",alignItems:"center"}} >
                    <div>
                        <Image src={houses[`sea${turnOfUser}`]} style={{ width: "300px" }} />
                    </div>
                </div>
            }

        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button 
          onClick={()=>{
            buySea()
            handleClose()
          }} 
          variant="secondary">
          Buy {currentSea instanceof Sea
          ? currentSea.basePrice
          : ""
        } <RiCoinFill color="yellow" />
        </Button>
        <Button onClick={handleClose} variant="secondary">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default BuySea;
