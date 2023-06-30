import styles from "./ChessBoard.module.scss";
import classNames from "classnames/bind";
import { useEffect, useRef, createRef, useState, useContext } from "react";
import { useLocation } from "react-router-dom";

import { SocketContext } from "../../SocketService";
import houses from "./constants/houses";
import modalConstant from "./constants/modal";

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
import { selectUser, setActive, updatePrison } from "../../redux/slices/userSlice";
import LostTurn from "./modals/corner/LostTurn";
import DestroyOtherHouse from "./modals/chances/DestroyOHouse";
import DestroyHouseSelect from "./modals/chances/DestroyHSelect";
import WorldTour from "./modals/corner/WorldTour";
import BuySea from "./modals/seas/BuySea";
import OtherSea from "./modals/seas/OtherSea";
import Seagame from "./modals/corner/Seagame";
import Lost from "./modals/games/Lost";
import Win from "./modals/games/Win";

const cx = classNames.bind(styles);

function ChessBoard() {
  const socket = useContext(SocketContext);
  const location=useLocation()
  const searchParams = new URLSearchParams(location.search);
  const gameRoom = searchParams.get("room");

  const userInGame = useSelector(selectUser)
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

  const [winner,setWinner] = useState()

  const cellRefs = useRef([]);

  // thẻ div chứa nhân vật
  const userRef = useRef([]);

  //thẻ chứa nhà
  const houseRefs=useRef([])

  const seagameRef= createRef()

  // quản lý các ô trên bàn cờ từ 0->31
  cellRefs.current = Array(32)
    .fill()
    .map((_, i) => cellRefs.current[i] ?? createRef());

  
      
  const clickSaveIndex=(i)=>{
    localStorage.setItem("index",i)
    // dispatch(setIndexSelect({index:i}))
  }
  // hàm lưu vị trí khi click chọn

  useEffect(()=>{
    for(let i = 0; i <32 ;++i){
      cellRefs?.current[i]?.current?.addEventListener('click',()=>clickSaveIndex(i))
      // cellRefs?.current[i]?.current?.addEventListener('click',()=>clickSaveLickIndex(i))
    }
  },[])

  houseRefs.current = Array(24)
    .fill()
    .map((_, i) => houseRefs.current[i] ?? createRef());

  userRef.current = Array(numberUser)
    .fill()
    .map((_, i) => userRef.current[i] ?? createRef());
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

    socket.on("jail-result",data=>{

      possition[data.user]=8
      setPos(possition)
      cellRefs.current[8].current?.appendChild(userRef.current[data.user].current)
    })

    return ()=>{
      socket.off("jail-result")
    }

  },[possition,socket])

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
  }, [userSteps,turnOfUser,possition,socket,yourTurn]);


  // render 1 lần duy nhất khi vào phòng
  useEffect(()=>{
    console.log("khởi tạo")
    // 
    socket.emit("join-room", gameRoom);

  },[])


  // xử lý các sự kiện socket
  useEffect(() => {


    socket.on("room-size",(data)=>{
      setNumberUser(data.size)
      console.log(data)
      for(let i =0;i<data.size;i++){
        dispatch(setActive({yourTurn:i}))
      }
      if(data.socket===socket.id) {
        setYourTurn(data.index)
      }
    })
 
    // listen event other click btn roll
    socket.on("roll-result",(data)=>{
        setTurnUser(data.user) 
        setRoll(true)
        setDiceOne(data.diceOne);
        setDiceTwo(data.diceTwo);

        // double thì ra tù
        if(data.diceOne === data.diceTwo){
          dispatch(updatePrison({turnOfUser,turns:-userInGame[turnOfUser].prison}))
        }

        setTimeout(() => {
          if(userInGame[turnOfUser].prison > 0 && data.diceOne!== data.diceTwo){
            setSteps(0)
            dispatch(updatePrison({turnOfUser,turns:-1}))
            setShow(modalConstant.LOST_TURN)
          }
          else {

            // chỉ dùng để test bán nhà 2 lần 
            // user 0 : 1000
            // user 1 : 550
            // if(turnOfUser===0) setSteps(8)
            // else 
            // // setSteps(8)
            // if(userInGame[1].balance >100){
            //   setSteps(2)

            // }
            // else setSteps(4)

            // test step
            // setSteps(...)

            // test thua
            // setSteps(4)            

            setSteps(data.diceOne + data.diceTwo)
          }
        }, 2000);   
    })
    socket.on("turn-result",(data)=>{
      // 0   1   2   3
      // ac  no  no  ac
      //kiểm tra active 
      // g/s data.user = 1 
      console.log(userInGame)
      let i =data.user
      let loop= 0
      while(userInGame[i].active !==true && loop<6){
        if(i === userInGame.length -1 ){
          i=0
        }
        else {
          i=i+1;
        }
        loop++
      }
      setTurnUser(i)
    })


    socket.on("winner-result",data=>{
      setWinner(data.winner)
      setTimeout(()=>{
        setShow(modalConstant.WIN)
      },500)
    })

    return () => {
      socket.off("join-room", gameRoom);
      socket.off("roll-result")
      socket.off("turn-result")
      socket.off("room-size")
      socket.off("winner-result")
    };
  }, [socket,turnOfUser,userInGame]);


    return (
    <>
      <div
        className={cx("wrapper")}
        style={{ backgroundImage: "linear-gradient(0deg, #95656c, #bf985c)" }}
      >
        
        {/* houses */}
        <House 
          userRef={userRef}
          houseRefs={houseRefs} 
          houses={houses} 
          cx={cx} 
          socket={socket}
          possition={possition}
          turnOfUser={turnOfUser}
          yourTurn={yourTurn}
          cellRefs={cellRefs}
          gameRoom={gameRoom}
          seagameRef={seagameRef}
          >

          </House>

        {/*  users */}
        {[...Array(numberUser)].map((_, index) => {
          return (
            <div key={index} className={cx(`user-zone-${index}`)}>

                {/* nhân vật */}
                <div className={cx(`char`)} ref={userRef.current[index]} >
                  <img src={userInGame[index].char} height="100px" />
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
          seagameRef={seagameRef}
          userRef={userRef}
          turnOfUser={turnOfUser}
          possition={possition}
          changePos={changePos}
          userSteps={userSteps}
          show={show}
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
        :
        turnOfUser ===yourTurn &&
        show === modalConstant.LOSS
        ?
        <Lost
          show={show}
          changeShow={changeShow}
          socket={socket}
          turnOfUser={turnOfUser}
          gameRoom={gameRoom}
          possition={possition}
        >

        </Lost>
        :
        show===modalConstant.WIN
        ?
        <Win 
          show={show}
          changeShow={changeShow}
          socket={socket}
          turnOfUser={turnOfUser}
          gameRoom={gameRoom}
          winner={winner}
        >

        </Win>
        :""
        }

        {/* Xử lí khi di chyển đến ô đích -> quản lý hiện các modal*/}
        {<Cell
          socket={socket}
          changeShow={changeShow}
        ></Cell>}

        {/* xử lý các sự kiện socket chỉ liên quan đến redux*/}
        <SocketRedux socket = {socket} gameRoom={gameRoom} turnOfUser={turnOfUser}></SocketRedux>

      </div>
    </>
  );
}
export default ChessBoard;


