import styles from "./ChessBoard.module.scss";
import classNames from "classnames/bind";
import UserZone from "./UserZone/UserZone";
import char from "../../assets/images/char.png";
import { useEffect, useRef, createRef, useState, useContext } from "react";

import { SocketContext } from "../../SocketService";
import Board from "./Board/Board";

const cx = classNames.bind(styles);

function ChessBoard() {
  const socket = useContext(SocketContext);

  // số user trong phòng
  const [numberUser,setNumberUser]=useState(0)
   
  // lượt chơi
  const [turnOfUser,setTurnUser]=useState(0)
  const [yourTurn,setYourTurn] = useState(0)

  // giá trị xúc xắc sẽ được gửi tới tất cả các socket trong room
  const [diceOne, setDiceOne] = useState(0);
  const [diceTwo, setDiceTwo] = useState(0);

  //handle roll
  const [roll, setRoll] = useState(false);
  const changeRoll = (a) => {
    setRoll(a);
  };

  // vị trí cac nhân vật
  const [possition, setPos] = useState([-1,-1,-1,-1]);

  // số bước di chuyển
  const [userSteps, setSteps] = useState(0);

  const cellRefs = useRef([]);

  // thẻ div chứa nhân vật
  const userRef = useRef([]);

  // quản lý các ô trên bàn cờ từ 0->31
  cellRefs.current = Array(32)
    .fill()
    .map((_, i) => cellRefs.current[i] ?? createRef());

  // click btn roll
  const moveBySteps = (step) => {
    socket.emit("roll",{socket:socket.id,gameRoom:"123"})
    socket.on("roll-result",(data)=>{
      setTurnUser(data.user)
      console.log(data)
      setRoll(true);
      setDiceOne(data.diceOne);
      setDiceTwo(data.diceTwo);
      setTimeout(() => {
        setSteps(data.diceOne+data.diceTwo);
      }, 2000);
    })

  };

  //di chuyển 1 bước
  const moveOneStep = () => {
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
        moveOneStep()
        setSteps(userSteps - 1);
      } else {
        clearInterval(interval);
      }
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [possition, userSteps,roll]);

  //socket
  useEffect(() => {
    console.log(turnOfUser,yourTurn)
    const gameRoom = "123";
    socket.emit("joinRoom", gameRoom);

    // 
    socket.on("room-size",(data)=>{
      console.log(data,"aa")
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
      if(socket.id!==data.socket){
        setTurnUser(turnOfUser)
        setRoll(true)
        setDiceOne(data.diceOne);
        setDiceTwo(data.diceTwo);
        setTimeout(() => {
        setSteps(data.diceOne+data.diceTwo);
    }, 2000);   
      }
    })
    return () => {
      socket.off("joinRoom", gameRoom);
    };
  }, [socket,numberUser,yourTurn,userRef]);

  return (
    <>
      <div
        className={cx("wrapper")}
        style={{ backgroundImage: "linear-gradient(0deg, #95656c, #bf985c)" }}
      >


        {/*  users */}
        {[...Array(numberUser)].map((_, index) => {
          return (
            <div key={index} className={cx(`user-zone-${index}`)}>

                {/* nhân vật */}
                <div className={cx(`char`)} ref={userRef.current[index]}>
                  <img src={char} width="50px" />
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
        ></Board>

      </div>
    </>
  );
}
export default ChessBoard;
