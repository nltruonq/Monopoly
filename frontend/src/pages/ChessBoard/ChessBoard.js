import styles from "./ChessBoard.module.scss";
import classNames from "classnames/bind";
import { useEffect, useRef, createRef, useState, useContext } from "react";
import { useLocation } from "react-router-dom";

import { SocketContext } from "../../SocketService";

import houses from "./constants/houses";
import char from "../../assets/images/char.png";

import UserZone from "./components/UserZone/UserZone";
import Board from "./Board/Board";
import BuySelection from "./modals/BuySelection/BuySelection";
import Buying from "./components/Buying/Buying";
import House from "./components/House/House";
import Cell from "./components/Cell/Cell";
import UpgradeHouse from "./modals/UpgradeHouse";
import OtherHouse from "./modals/OtherHouse";

const cx = classNames.bind(styles);

function ChessBoard() {
  const socket = useContext(SocketContext);
  const location=useLocation()
  const searchParams = new URLSearchParams(location.search);
  const gameRoom = searchParams.get("room");

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
  
  const [changeBalance,setChangeBalance] =useState(false)
    
  socket.on("change-balance-result",(data)=>{
      setChangeBalance( {amount:data.amount, user:data.user,type:data.type})
      setTimeout(()=>{
          setChangeBalance(false)
      },1000)
  })

  

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
    socket.emit("roll",{socket:socket.id,gameRoom})
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
          socket.emit("moved",{possition,turnOfUser,yourTurn,gameRoom})
          setSteps(-1)
        clearInterval(interval);
      }
      else {
        clearInterval(interval);
      }

    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [userSteps,roll,turnOfUser,show,possition]);

  //socket
  useEffect(() => {
    socket.emit("join-room", gameRoom);
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
    socket.on("turn-result",(data)=>{
      setTurnUser(data.user)
    })

    return () => {
      socket.off("join-room", gameRoom);
    };
  }, [socket,numberUser,yourTurn,userRef,turnOfUser]);


  return (
    <>
      <div
        className={cx("wrapper")}
        style={{ backgroundImage: "linear-gradient(0deg, #95656c, #bf985c)" }}
      >
        
        {/* houses */}
        <House 
          houseRefs={houseRefs} 
          houses={houses} 
          cx={cx} 
          socket={socket}
          possition={possition}
          turnOfUser={turnOfUser}
          yourTurn={yourTurn}
          cellRefs={cellRefs}
          >

          </House>

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

              <UserZone index={index} turnOfUser={turnOfUser} change={changeBalance}>

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

        {turnOfUser===yourTurn
        &&show===BUY_HOUSE?
        <BuySelection
          changeShow={changeShow}
          show={show}
          turnOfUser={turnOfUser}
          socket={socket}
          gameRoom={gameRoom}
          possition={possition}
        >

        </BuySelection>
        :turnOfUser===yourTurn
        &&show===UPGRADE_HOUSE
        ?<UpgradeHouse 
          changeShow={changeShow}
          show={show}
          turnOfUser={turnOfUser}
          socket={socket}
          gameRoom={gameRoom}
          possition={possition}
        >

        </UpgradeHouse>
        :
        turnOfUser===yourTurn
        &&show===RE_BUY_HOUSE
        ?
        <OtherHouse
          changeShow={changeShow}
          show={show}
          turnOfUser={turnOfUser}
          socket={socket}
          gameRoom={gameRoom}
          possition={possition}
        ></OtherHouse>
        :""
        }

        {/* Xử lí khi di chyển đến ô đích */}
        {<Cell
          socket={socket}
          changeShow={changeShow}
        ></Cell>}
      </div>
    </>
  );
}
export default ChessBoard;


const BUY_HOUSE = 1
const UPGRADE_HOUSE = 2
const RE_BUY_HOUSE = 3