import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import classNames from "classnames/bind";
import styles from "./UpgradeHouse.module.scss";
import { RiCoinFill } from "react-icons/ri";
import { colors } from "../../constants/Color/color";
import houses from "../../constants/houses";
import {cells} from "../../constants/cell/index"
import { City } from "../../class/city";
import { useSelector } from "react-redux";
import { selectCell } from "../../../../redux/cellSlice";

const cx = classNames.bind(styles);

function UpgradeHouse({ show, changeShow, possition,title,turnOfUser,socket,gameRoom }) {

  const house = useSelector(selectCell);
  const [select,setSelect]=useState(3)

  const handleClose = () => {
    changeShow(false);
    socket.emit("close",{gameRoom})
    //  sau này sẽ thế thành giá trị 2 xúc xắc để xét double
    socket.emit("turn",{gameRoom})
  };
  
  const currentCell=house?.find((elm)=>{
      return elm.boardIndex === possition[turnOfUser]
  })
  const currentLevel= currentCell.level
  const currentCity = cells[possition[turnOfUser]]
  const upgradeHouse=()=>{
     socket.emit("upgrade",
          {gameRoom
            ,select,
            price:currentCity.fPriceToUpgrade(currentLevel,select),
            inuse: cells.indexOf(currentCity)
          })
    socket.emit("change-balance",{gameRoom,
      amount:currentCity.fPriceToUpgrade(currentLevel,select),
      user:currentCell.owner,
      type:"minus"
    })
  }

  return (
    <Modal show={show}>
      <Modal.Header closeButton onClick={handleClose} style={{backgroundColor:colors[turnOfUser],color:"white"}}>
        <Modal.Title>{currentCity.city}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={cx("house-all")}>
          {[...Array(3-currentLevel)].map((_,index)=>{
              return (
                <div className={cx("house",select===index+currentLevel+1?"active":"")} key={index} onClick={()=>{setSelect(index+1+currentLevel)}}>
                  <Image src={houses[`house${turnOfUser}_${index+currentLevel+1}`]} style={{ width: "150px" }} />
                </div>
              )
          })}

        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button 
          onClick={()=>{
            upgradeHouse()
            handleClose()
          }} 
          variant="secondary">
          Upgrade {currentCity instanceof City 
          ? currentCity.fPriceToUpgrade(currentLevel,select)
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

export default UpgradeHouse;
