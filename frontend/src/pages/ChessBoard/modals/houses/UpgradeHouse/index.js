import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import classNames from "classnames/bind";
import styles from "./UpgradeHouse.module.scss";
import { RiCoinFill } from "react-icons/ri";
import { colors } from "../../../constants/Color/color";
import houses from "../../../constants/houses";
import {cells} from "../../../constants/cell/index"
import { City } from "../../../class/city";
import { useSelector } from "react-redux";
import { selectCell } from "../../../../../redux/slices/cellSlice";
import { selectUser } from "../../../../../redux/slices/userSlice";

const cx = classNames.bind(styles);

function UpgradeHouse({ show, changeShow, possition,title,turnOfUser,socket,gameRoom }) {

  const house = useSelector(selectCell);
  const [select,setSelect]=useState(3)
  const [affortToPay,setAffort] = useState(0)
  const userIngame= useSelector(selectUser)

  const userBalance = userIngame[turnOfUser].balance

  const currentCell=house?.find((elm)=>{
    return elm.boardIndex === possition[turnOfUser]
  })
  const currentLevel= currentCell.level
  
  const currentCity = cells[possition[turnOfUser]]

  

  const handleClose = () => {
    changeShow(false);
    socket.emit("close",{gameRoom})
    //  sau này sẽ thế thành giá trị 2 xúc xắc để xét double
    socket.emit("turn",{gameRoom})
  };
  
  const handleSelect=(index)=>{
    setSelect(index+1+currentLevel)
    setAffort(userBalance - currentCity.fPriceToUpgrade(currentLevel,index+1+currentLevel))
  }
  
  const upgradeHouse=()=>{
    if(affortToPay>= 0 ){
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
     handleClose()
    }

  }

  return (
    <Modal show={show}>
      <Modal.Header closeButton onClick={handleClose} style={{backgroundColor:colors[turnOfUser],color:"white"}}>
        <Modal.Title>{currentCity.city}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={cx("house-all")}>
          {[...Array(3-currentLevel)].map((_,index)=>{ // current = 1 thì  0-> 1 ==> 0 + 1 +1, 0+1+2
              return (
                <div className={cx("house",select===index+currentLevel+1?"active":"")} key={index} onClick={()=>handleSelect(index)}>
                  <Image src={houses[`house${turnOfUser}_${index+currentLevel+1}`]} style={{ width: "150px" }} />
                </div>
              )
          })}

          {currentLevel===3 && "Không thể nâng cấp được nữa!"}
        </div>
      </Modal.Body>
      <Modal.Footer>
        {currentLevel<3 &&<Button 
          onClick={upgradeHouse} 
          variant="secondary" 
          style={{opacity:`${affortToPay < 0 ? "0.5":"1"}`}}
          >
          Upgrade {currentCity instanceof City 
          ? currentCity.fPriceToUpgrade(currentLevel,select)
          : ""
        } <RiCoinFill color="yellow" />
        </Button>}
        <Button onClick={handleClose} variant="secondary">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UpgradeHouse;
