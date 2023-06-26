import styles from "./ChessBoard.module.scss";
import classNames from "classnames/bind";
import { useEffect, useRef, createRef, useState, useContext } from "react";
import { useLocation } from "react-router-dom";

import { SocketContext } from "../../SocketService";
import houses from "./constants/houses";
import modalConstant from "./constants/modal";
import char from "../../assets/images/char.png";

import UserZone from "./components/UserZone/UserZone";
import Board from "./components/Board/Board";
import BuySelection from "./modals/houses/BuySelection/BuySelection";
import Buying from "./components/Buying/Buying";
import House from "./components/House/House";
import Cell from "./components/Cell/Cell";
import UpgradeHouse from "./modals/houses/UpgradeHouse";
import OtherHouse from "./modals/houses/OtherHouse";
import SocketRedux from "./components/SocketRedux";
import TaxComponent from "./modals/chances/Tax/tax";
import ChangesModal from "./modals/chances/Chances";
import Birthday from "./modals/chances/BirthDay";
import Prison from "./modals/corner/Prison";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, updatePrison } from "../../redux/userSlice";
import LostTurn from "./modals/corner/LostTurn";
import DestroyOtherHouse from "./modals/chances/DestroyOHouse";
import DestroyHouseSelect from "./modals/chances/DestroyHSelect";
import WorldTour from "./modals/corner/WorldTour";
import BuySea from "./modals/seas/BuySea";
import OtherSea from "./modals/seas/OtherSea";
import Seagame from "./modals/corner/Seagame";

const cx = classNames.bind(styles);

function ChessBoard() {
  const socket = useContext(SocketContext);
  const location=useLocation()
  const searchParams = new URLSearchParams(location.search);
  const gameRoom = searchParams.get("room");

  const userRedux = useSelector(selectUser)
  const dispatch= useDispatch()

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
  const changePos=(a)=>{
    setPos(a)
  }
  
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

  houseRefs.current = Array(24)
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
    if (possition[turnOfUser] >= 31) {   
      possition[turnOfUser]=0 
      setPos(possition);
      // handle Start
      if(yourTurn === turnOfUser) {
        socket.emit("start",{
          gameRoom,amount:300,user:turnOfUser
        })
        socket.emit("change-balance",
        {gameRoom,
          amount:300,
          user:turnOfUser,
          type:"plus"
        })
      }
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
  
  // dịch chuyển
  useEffect(()=>{
    if(show === modalConstant.JAIL && possition[turnOfUser] !==8 ){
      possition[turnOfUser]=8
      setPos(possition)
      cellRefs.current[8].current?.appendChild(userRef.current[turnOfUser].current)
    }

  },[show,possition])
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
      socket.off("start")
    };
  }, [userSteps,roll,turnOfUser,show,possition,socket]);

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

        // double thì ra tù
        if(data.diceOne === data.diceTwo){
          dispatch(updatePrison({turnOfUser,turns:-userRedux[turnOfUser].prison}))
        }

        setTimeout(() => {
          if(userRedux[turnOfUser].prison > 0 && data.diceOne!== data.diceTwo){
            setSteps(0)
            dispatch(updatePrison({turnOfUser,turns:-1}))
            setShow(modalConstant.LOST_TURN)
          }
          else {
            // if(turnOfUser===1) setSteps(7)
            // else 
            // setSteps(data.diceOne + data.diceTwo);
            setSteps(25)
          }
        }, 2000);   
    })
    socket.on("turn-result",(data)=>{
      setTurnUser(data.user)
    })

    return () => {
      socket.off("join-room", gameRoom);
      socket.off("roll-result")
      socket.off("turn-result")
    };
  }, [socket,numberUser,yourTurn,userRef,turnOfUser,userRedux,show]);


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
          gameRoom={gameRoom}
          >

          </House>

        {/*  users */}
        {[...Array(numberUser)].map((_, index) => {
          return (
            <div key={index} className={cx(`user-zone-${index}`)}>

                {/* nhân vật */}
                <div className={cx(`char`)} ref={userRef.current[index]} >
                  <img src={char} width="100px" />
                  {
                    show  // mua nhà 
                    && turnOfUser!==yourTurn 
                    &&index===turnOfUser
                    && <Buying socket={socket} setShow={changeShow}></Buying>
                  }
                </div>

              <UserZone index={index} turnOfUser={turnOfUser} >

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
          changeShow={changeShow}
          gameRoom={gameRoom}
          userRef={userRef}
          turnOfUser={turnOfUser}
          possition={possition}
          changePos={changePos}
        ></Board>


        {/* MODAL */}
        {turnOfUser===yourTurn
        &&show===modalConstant.BUY_HOUSE?
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
        &&show===modalConstant.UPGRADE_HOUSE
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
        &&show===modalConstant.RE_BUY_HOUSE
        ?
        <OtherHouse
          changeShow={changeShow}
          show={show}
          turnOfUser={turnOfUser}
          socket={socket}
          gameRoom={gameRoom}
          possition={possition}
        ></OtherHouse>

        :
        turnOfUser===yourTurn
        &&show===modalConstant.PAY_TAX
        ?
        <TaxComponent 
          changeShow={changeShow}
          show={show}
          turnOfUser={turnOfUser}
          socket={socket}
          gameRoom={gameRoom}
          possition={possition}
        >
        </TaxComponent>
        :
        turnOfUser===yourTurn&&
        show === modalConstant.CHANGES
        ?
        <ChangesModal
          changeShow={changeShow}
          show={show}
          turnOfUser={turnOfUser}
          socket={socket}
          gameRoom={gameRoom}
          yourTurn={yourTurn}
        >
        </ChangesModal>
        :
        // turnOfUser===yourTurn&&
        show === modalConstant.HOST_BIRTHDAY
        ?
        <Birthday
          changeShow={changeShow}
          yourTurn={yourTurn}
          gameRoom={gameRoom}
          numberUser={numberUser}
          show={show}
          turnOfUser={turnOfUser}
          socket={socket}
        >
        </Birthday>
        :
        turnOfUser===yourTurn&&
        show === modalConstant.JAIL
        ?
        <Prison
          changeShow={changeShow}
          gameRoom={gameRoom}
          show={show}
          turnOfUser={turnOfUser}
          socket={socket}
        >
        </Prison>
        :
        turnOfUser===yourTurn&&
        show === modalConstant.LOST_TURN
        ?
        <LostTurn
          changeShow={changeShow}
          gameRoom={gameRoom}
          show={show}
          socket={socket}
          turnOfUser={turnOfUser}
        >

        </LostTurn>
        :
        turnOfUser===yourTurn&&
        show === modalConstant.DESTROY_HOUSE
        ?
        <DestroyOtherHouse
          changeShow={changeShow}
          yourTurn={yourTurn}
          gameRoom={gameRoom}
          numberUser={numberUser}
          show={show}
          turnOfUser={turnOfUser}
          socket={socket}
        >

        </DestroyOtherHouse>
        :
        turnOfUser===yourTurn&&
        show.state === modalConstant.DESTROY_H_SELECT
        ?
        <DestroyHouseSelect
          show={show}
          changeShow={changeShow}
          turnOfUser={turnOfUser}
          socket={socket}
          gameRoom={gameRoom}
          index= {show.data}
        >

        </DestroyHouseSelect>
        :
        turnOfUser === yourTurn&&
        show===modalConstant.WORLD_TOUR
        ?
        <WorldTour
          show={show}
          changeShow={changeShow}
          socket={socket}
          gameRoom={gameRoom}
          turnOfUser={turnOfUser}
        >
        </WorldTour>
        :
        turnOfUser === yourTurn&&
        show === modalConstant.BUY_SEA
        ?
        // show, changeShow, possition,turnOfUser,socket,gameRoom 
        <BuySea
          show={show}
          changeShow={changeShow}
          possition={possition}
          turnOfUser={turnOfUser}
          socket={socket}
          gameRoom={gameRoom}
        
        >

        </BuySea>
        :
        turnOfUser===yourTurn&&
        show === modalConstant.OTHER_SEA
        ?
        <OtherSea
        // show, changeShow, possition,turnOfUser,socket,gameRoom
          show={show}
          changeShow={changeShow}
          possition={possition}
          turnOfUser={turnOfUser}
          socket={socket}
          gameRoom={gameRoom}
        >

        </OtherSea>
        :
        turnOfUser===yourTurn&&
        show===modalConstant.SEAGAME
        ?
        <Seagame
          show={show}
          changeShow={changeShow}
          turnOfUser={turnOfUser}
          socket={socket}
          gameRoom={gameRoom}
        >

        </Seagame>
        :""
        }

        {/* Xử lí khi di chyển đến ô đích -> quản lý hiện các modal*/}
        {<Cell
          socket={socket}
          changeShow={changeShow}
        ></Cell>}

        {/* xử lý các sự kiện socket chỉ liên quan đến redux*/}
        <SocketRedux socket = {socket} yourTurn={yourTurn}></SocketRedux>

      </div>
    </>
  );
}
export default ChessBoard;


