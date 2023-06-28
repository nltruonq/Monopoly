import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import { RiCoinFill } from "react-icons/ri";
import { colors } from "../../../constants/Color/color";
import houses from "../../../constants/houses";
import {cells} from "../../../constants/cell/index"
import { useSelector } from "react-redux";
import { selectCell } from "../../../../../redux/slices/cellSlice";
import { Sea } from "../../../class/sea";


function OtherSea({ show, changeShow, possition,turnOfUser,socket,gameRoom }) {

  const house = useSelector(selectCell);
  
  const handleClose = () => {
    changeShow(false);
    socket.emit("close",{gameRoom})
    //  sau này sẽ thế thành giá trị 2 xúc xắc để xét double
    socket.emit("turn",{gameRoom})
  };
  
  const currentCell=house?.find((elm)=>{
      return elm.boardIndex === possition[turnOfUser]
  })
  const currentSea = cells[possition[turnOfUser]]
  console.log(currentCell)
  const handlePay=()=>{
     socket.emit("pay",{gameRoom,price:currentSea.priceToPay,owner:currentCell.owner})
     socket.emit("change-balance",{gameRoom,
      amount:currentSea.priceToPay,
      user:turnOfUser,
      type:"minus"
    })
    socket.emit("change-balance",{gameRoom,
      amount:currentSea.priceToPay,
      user:currentCell.owner,
      type:"plus"
    })

  }

  const handleReBought=()=>{
        socket.emit("re-bought",
        {gameRoom,
          price: currentSea.priceToBuy,
          owner:turnOfUser,
          inuse:cells.indexOf(currentSea),
        })
        socket.emit("change-balance",{gameRoom,
          amount:currentSea.priceToBuy,
          user:turnOfUser,
          type:"minus"
        })
        socket.emit("change-balance",{gameRoom,
          amount:currentSea.priceToBuy,
          user:currentCell.owner,
          type:"plus"
        })
    
  }

  return (
    <Modal show={show}>
      <Modal.Header closeButton onClick={handleClose} style={{backgroundColor:colors[turnOfUser],color:"white"}}>
        <Modal.Title>BIỂN</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"300px"}}>
                <div >
                  <Image src={houses[`sea${currentCell.owner}`]} style={{ width: "200px" }} />
                </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button 
          onClick={()=>{
            handlePay()
            handleClose()
          }} 
          variant="secondary">
          Pay {currentSea instanceof Sea
          ? currentSea.priceToPay
          : ""
        } <RiCoinFill color="yellow" />
        </Button>
        <Button 
            onClick={()=>{
                handleReBought()
                handleClose()
            }} 
            variant="secondary"
        >
            Buy {currentSea instanceof Sea
            ? currentSea.priceToBuy
            : ""
            } <RiCoinFill color="yellow" />
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default OtherSea;
