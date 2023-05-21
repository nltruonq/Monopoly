import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import classNames from "classnames/bind";
import styles from "./BuySelection.module.scss";
import { RiCoinFill } from "react-icons/ri";
import { colors } from "../Color/color";
const cx = classNames.bind(styles);

function BuySelection({ show, setShow, title, images,turnOfUser }) {
  const handleClose = () => {
    setShow(false);
  };
  const [select,setSelect]=useState()

  // sau này sẽ lấy từ server
  const priceDefault=200000

  return (
    <Modal show={show}>
      <Modal.Header closeButton style={{backgroundColor:colors[turnOfUser],color:"white"}}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={cx("house-all")}>
          {[...Array(3)].map((_,index)=>{
              return (
                <div className={cx("house",select===index?"active":"")} key={index} onMouseMove={()=>{setSelect(index)}}>
                  <Image src={images[index]} style={{ width: "150px" }} />
                </div>
              )
          })}

        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button 
          onClick={()=>{
            
            handleClose()
          }} 
          variant="secondary">
          Buy {priceDefault} <RiCoinFill color="yellow" />
        </Button>
        <Button onClick={handleClose} variant="secondary">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default BuySelection;
