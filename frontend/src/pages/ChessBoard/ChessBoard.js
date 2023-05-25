import styles from "./ChessBoard.module.scss";
import classNames from "classnames/bind";
import UserZone from "./UserZone/UserZone";
import { useEffect, useRef, createRef, useState, useContext } from "react";

import { SocketContext } from "../../SocketService";
import Board from "./Board/Board";

import house0_1 from "../../assets/images/house0-lv1.png"
import house0_2 from "../../assets/images/house0-lv2.png"
import house0_3 from "../../assets/images/house0-lv3.png"

import char from "../../assets/images/char.png";
import BuySelection from "./BuySelection/BuySelection";
import Buying from "./Buying/Buying";


const cx = classNames.bind(styles);

function ChessBoard() {
  const socket = useContext(SocketContext);

  // số user trong phòng
  const [numberUser,setNumberUser]=useState(0)
   
  // lượt chơi (user đang chơi)
  const [turnOfUser,setTurnUser]=useState(0)
  
  // vị trí index trong room (số thứ tự)
  const [yourTurn,setYourTurn] = useState(0)

  // giá trị xúc xắc sẽ được gửi tới tất cả các socket trong room
  const [diceOne, setDiceOne] = useState(0);
  const [diceTwo, setDiceTwo] = useState(0);

  //handle roll
  const [roll, setRoll] = useState(false);
  const changeRoll = (a) => {
    setRoll(a);
  };

  const [show,setShow]=useState(false)
  const changeShow=(a)=>{
    setShow(a)
  }

  // vị trí cac nhân vật
  const [possition, setPos] = useState([-1,-1,-1,-1]);

  // số bước di chuyển
  const [userSteps, setSteps] = useState(0);

  const cellRefs = useRef([]);

  // thẻ div chứa nhân vật
  const userRef = useRef([]);

  //thẻ chứa nhà
  const houseRefs=useRef([])

  // quản lý các ô trên bàn cờ từ 0->31
  cellRefs.current = Array(32)
    .fill()
    .map((_, i) => cellRefs.current[i] ?? createRef());

  houseRefs.current = Array(20)
    .fill()
    .map((_, i) => houseRefs.current[i] ?? createRef());

  // click btn roll
  const moveBySteps = (step) => {
    socket.emit("roll",{socket:socket.id,gameRoom:"123"})
  };

  const moveOneStep = (turnOfUser) => {
    // possition[turnOfUser] lưu giữ vị trí thứ turnOfUser
     
    userRef.current[turnOfUser].current.classList.add(cx("move"));
    if (0 < possition[turnOfUser] && possition[turnOfUser] <= 8) {
      cellRefs.current[possition[turnOfUser] - 1].current.classList.add(cx("down-right"));
    } 
    else if (8 < possition[turnOfUser] && possition[turnOfUser] < 16) {
      cellRefs.current[possition[turnOfUser] - 1].current.classList.add(cx("down-top"));
    } 
    else if (16 < possition[turnOfUser] && possition[turnOfUser] < 24) {
      cellRefs.current[possition[turnOfUser] - 1].current.classList.add(cx("down-left"));
    } 
    else if (24 < possition[turnOfUser] && possition[turnOfUser] < 32) {
      cellRefs.current[possition[turnOfUser] - 1].current.classList.add(cx("down-bottom"));
    }
    if (possition[turnOfUser] > 31) {   
      possition[turnOfUser]=0 
      setPos(possition);
      // handle Start
    } else {
      possition[turnOfUser]+=1
      setPos(possition);
    }
    userRef.current[turnOfUser].current.style.transform = "translate(20%,-20%) rotate(45deg)";

    cellRefs.current[possition[turnOfUser]].current.appendChild(userRef.current[turnOfUser].current);

    cellRefs.current[possition[turnOfUser]].current.classList.remove(cx("down-right"));
    cellRefs.current[possition[turnOfUser]].current.classList.remove(cx("down-top"));
    cellRefs.current[possition[turnOfUser]].current.classList.remove(cx("down-left"));
    cellRefs.current[possition[turnOfUser]].current.classList.remove(cx("down-bottom"));
  };




  // di chuyển 
  useEffect(() => {
    const interval = setInterval(() => {
      if (userSteps > 0) {
        moveOneStep(turnOfUser)
        userSteps===1 ? setSteps(userSteps - 3) :setSteps(userSteps-1);
      } 
      else if(userSteps===-2) {
        // xử lý khi đi tới đích
          console.log(show)
          setShow(true)

          if(turnOfUser === yourTurn) {
              // xây nhà

              const houseNode=houseRefs.current[0].current
              // cellRefs.current[possition[turnOfUser]].current.appendChild(houseNode)
  
              // houseNode.style.display="block"
              if (0 < possition[turnOfUser] && possition[turnOfUser] <= 8) {
                  houseNode.style.top="-20px"
                  houseNode.style.left="20px"
              } 
              else if (8 < possition[turnOfUser] && possition[turnOfUser] < 16) {
                  houseNode.style.top="-20px"
                  houseNode.style.left="-20px"
              } 
              else if (16 < possition[turnOfUser] && possition[turnOfUser] < 24) {
                houseNode.style.top="-20px"
                houseNode.style.left="40px"
              } 
              else if (24 < possition[turnOfUser] && possition[turnOfUser] < 32) {
                houseNode.style.top="-40px"
                houseNode.style.left="-20px"}
              // trả tiền?
  
              // ...
          }
          else{
              // người chơi khác

          }

            
            // finish
              setSteps(-1)
              // >0 : di chuyển
              // -2 : dừng lại để xử lý nhà
              // -1 : đặt lại -> không di chuyển + xử lý nhà
        clearInterval(interval);
      }
      else {
        clearInterval(interval);

      }

    }, 500);


    return () => {
      clearInterval(interval);
    };
  }, [userSteps,roll,turnOfUser,show]);

  //socket
  useEffect(() => {
    const gameRoom = "123";
    socket.emit("joinRoom", gameRoom);

    // 
    socket.on("room-size",(data)=>{
      setNumberUser(data.size)
      if(data.socket===socket.id) {
        setYourTurn(data.index)
      }
    })

    userRef.current = Array(numberUser)
    .fill()
    .map((_, i) => userRef.current[i] ?? createRef());

    // listen event other click btn roll
    socket.on("roll-result",(data)=>{
        setTurnUser(data.user) 
        setRoll(true)
        setDiceOne(data.diceOne);
        setDiceTwo(data.diceTwo);
        setTimeout(() => {
        setSteps(data.diceOne + data.diceTwo);
    }, 2000);   
    })
    
    return () => {
      socket.off("joinRoom", gameRoom);
    };
  }, [socket,numberUser,yourTurn,userRef,turnOfUser]);


  return (
    <>
      <div
        className={cx("wrapper")}
        style={{ backgroundImage: "linear-gradient(0deg, #95656c, #bf985c)" }}
      >
        
        {/* houses */}
        <div className={cx("house")} ref={houseRefs.current[0]} style={{display:"none"}}>
            <img src={house0_1} width="100px"/>
        </div>

        {/*  users */}
        {[...Array(numberUser)].map((_, index) => {
          return (
            <div key={index} className={cx(`user-zone-${index}`)}>

                {/* nhân vật */}
                <div className={cx(`char`)} ref={userRef.current[index]} >
                  <img src={char} width="50px" />
                  {
                    show  // mua nhà 
                    && turnOfUser!==yourTurn 
                    &&index===turnOfUser
                    && <Buying socket={socket} setShow={changeShow}></Buying>
                  }
                </div>

              <UserZone>

              </UserZone>
            </div>
          );
        })}

        

        <Board 
          cx={cx} 
          cellRefs={cellRefs}  
          diceOne={diceOne}
          diceTwo={diceTwo}
          roll={roll}
          socket={socket}
          changeRoll={changeRoll}
          moveBySteps={moveBySteps}
          yourTurn={yourTurn===turnOfUser}

        ></Board>

        {turnOfUser===yourTurn&&<BuySelection
          title={"Hong Kong"}
          setShow={changeShow}
          show={show}
          images={[house0_1,house0_2,house0_3]}
          turnOfUser={turnOfUser}
          socket={socket}
        >

        </BuySelection>
        }
      </div>
    </>
  );
}
export default ChessBoard;
