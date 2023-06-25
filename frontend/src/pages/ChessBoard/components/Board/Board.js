import Dice from "../Dice/Dice";
import { locations } from "../../constants/locations/data";
import { types } from "../../constants/locations/type";
import Chance from "./components/Chance/Chance";
import startImg from "../../../../assets/images/start.png"
import taxImg from "../../../../assets/images/tax.png"
import prisonImg from "../../../../assets/images/prison.png"
import seaVideo from "../../../../assets/images/beach.mp4"
import worldTourImg from "../../../../assets/images/worldtour.png"
import { createRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCell } from "../../../../redux/cellSlice";
import modalConstant from "../../constants/modal";
import bg  from "../../../../assets/images/bg.jpg"
import seagameVideo from "../../../../assets/images/seagame.mov"
import seagameImg from "../../../../assets/images/seagame.png"

function Board(props){
    const {
            yourTurn,cx,roll,diceOne,diceTwo,cellRefs,
            changeRoll,moveBySteps,socket,changeShow,
            gameRoom,userRef,turnOfUser,changePos,possition
          }
          =props
    
    // phá nhà
    const [destroy,setDestroy]=useState(false)
    const [listDestroy,setListDestroy]=useState([])

    const [listOwner,setListOwner]=useState([])
    
    const seagameRef= createRef()

    const houseOwner= useSelector(selectCell)
    console.log(houseOwner)
    

    
    useEffect(()=>{
      socket.on("destroy-house-result",data=>{
         setDestroy({user:data.user})
      })
      let list = []
      for(let i = 0; i < houseOwner.length; i++ ){
        if(houseOwner[i].owner !== destroy.user){
          list.push(houseOwner[i].boardIndex)
        }
      }
      setListDestroy(list)

      
      if(destroy){
        for(let i=0; i<32; ++i){
          if(list.includes(i)){
            cellRefs.current[i].current.addEventListener('click',()=>handleDestroy(i))
          }
        }
      }
      
      socket.on("reset-destroy-result",data=>{
        setListDestroy([])
        setDestroy(false)
        for(let i=0; i<32; ++i){
          if(listDestroy.includes(i)){
            cellRefs.current[i].current.removeEventListener('click',()=>handleDestroy(i))
          }
        }
        
      })
      return ()=>{
        socket.off("destroy-house-result")
        socket.off("reset-destroy-result")
      }
    },[socket,destroy])


    const handleDestroy=(i)=>{
      changeShow({state:modalConstant.DESTROY_H_SELECT,data:i})
    }

    const handleWourldTour=(i)=>{
      socket.emit("select-world-tour",{gameRoom,index:i})
    }

    // world tour
    useEffect(()=>{
      socket.on("world-tour-result",()=>{
        for( let i=0; i<32; ++i){
          if(i!==24) // khác ô world tour
          {
            cellRefs.current[i].current.addEventListener('click',()=>handleWourldTour(i))
          }
        }
      })

      socket.on("select-world-tour-result",data=>{
        const index=data.index
        cellRefs.current[index].current.appendChild(userRef.current[turnOfUser].current)
        possition[turnOfUser]=index
        changePos(possition)
        for( let i=0; i<32; ++i){
          if(i!==24) // khác ô world tour
          {
            cellRefs.current[i].current.removeEventListener('click',()=>handleWourldTour(i))
          }
        }
        socket.emit("finish-world-tour",{possition:index,turnOfUser,gameRoom})
      })

      return ()=>{
        socket.off("world-tour-result")
        socket.off("select-world-tour-result")
      }
      
    },[socket])   


    // seagame
    const handleSeagame=(i)=>{
      // changeShow({state:modalConstant.SEAGAME_H_SELECT,data:i})
      socket.emit("host-seagame",{gameRoom,index:i})
      socket.emit("close",{gameRoom})
      socket.emit("turn",{gameRoom})
    }

    useEffect(()=>{
      socket.on("seagame-result",()=>{
        let list = []
        // console.log(houseOwner,turnOfUser)
        for(let i = 0; i < houseOwner.length; i++ ){
          if(houseOwner[i].owner === turnOfUser){
            list.push(houseOwner[i].boardIndex)
          }
        }
        setListOwner(list)

        if(list.length!==0){

          for(let i =0 ; i<32 ; i++){
            if(list.includes(i)){
              cellRefs.current[i].current.addEventListener('click',()=>handleSeagame(i))
            }
          }
        }
        else {
          socket.emit("close",{gameRoom})
          socket.emit("turn",{gameRoom})
        }
      })

      socket.on("host-seagame-result",data=>{
        seagameRef.current.style.display="block"
        cellRefs.current[data.index].current.appendChild(seagameRef.current)

        setListOwner([])
      })

      return()=>{
        socket.off("seagame-result")
        socket.off("host-seagame-result")
      }

    },[socket,houseOwner,seagameRef])


    // bán nhà


    return (
        <>
          <div className={cx("chess-board")}>
            <div ref={seagameRef} style={{display:"none",position:"absolute",top:10,left:0,zIndex:13}}> 
                <img src= {seagameImg} width={75} />
            </div>
          <div className={cx("content")}>
            {/* 2 góc và 7 hình vuông */}
            <div className={cx("row-board")}>
              <div
                className={cx("corner", "square")}
                ref={cellRefs.current[8]}
                style={{backgroundColor:"white",color:"red"}}
              >
                <img src={prisonImg} width={100} 
                  style={{transform:"translate(-20%,-23%) rotate(20deg,0,60deg)",position:"absolute"}} 
                />

              </div>
              {/* thẻ đánh dấu từ 9 tới 15 */}
              <div className={cx("row")}>
                {[...Array(7)].map((_, index) => {
                  return (
                    <div
                      key={index}
                      className={destroy&&listDestroy.includes(9+index) 
                                || listOwner.includes(9+index) 
                                ? cx("rectangle","able") :cx("rectangle")}
                      ref={cellRefs.current[9 + index]}
                    >
                      { locations[9+index].type=== types.SEA 
                        ? 
                        <video autoPlay muted loop width="60" height="90" style={{
                          position:"absolute",
                          overflow:"hidden",
                          objectFit:"cover",
                        }}>
                          <source src={seaVideo} type="video/mp4" />
                        </video>
                        :
                        locations[9+index].type === types.CITY
                        ? <div className={cx("city-top")}>{locations[9+index].city}</div>
                        :<Chance></Chance>
                      }

                    </div>
                  );
                })}
              </div>
              <div
                className={cx("corner", "square")}
                ref={cellRefs.current[16]}
                style={{backgroundColor:"white"}}
              >
                <video autoPlay muted loop width="90" height="90" 
                    style={{
                      position:"absolute",
                      overflow:"hidden",
                      objectFit:"cover",
                    }}>
                    <source src={seagameVideo} type="video/mp4" />
                </video>
              </div>
            </div>

            {/* 14 hình vuông: 7 hình bên trái và 7 hình bên phải */}
            <div className={cx("center-board")} >
              {/* thẻ đánh dấu từ 7->1 */}
              <div className={cx("col")}>
                <div className={cx("column")}>
                  {[...Array(7)].map((_, index) => {
                    return (
                      <div
                        key={index}
                        className={destroy&&listDestroy.includes(7-index)
                                  || listOwner.includes(7-index)
                                  ? cx("rectangle-column","able") 
                                  :cx("rectangle-column")}
                        ref={cellRefs.current[7 - index]}
                      >
                        {locations[7-index].type=== types.SEA ? 
                        <video autoPlay muted loop width="90" height="60" style={{
                          position:"absolute",
                          overflow:"hidden",
                          objectFit:"cover",
                        }}>
                          <source src={seaVideo} type="video/mp4" />
                        </video>
                        :
                        locations[7-index].type===types.CITY
                        ? <div className={cx("city-left")}>{locations[7-index].city}</div>
                        :<Chance></Chance>
                      } 
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className={cx("center")} style={{backgroundImage:`url(${bg})`,backgroundSize:"cover",padding:"20px"}}>
                {yourTurn&&<button onClick={() => moveBySteps(diceOne + diceTwo)}>
                  MOVE
                </button>}
                <Dice
                  diceOne={diceOne}
                  diceTwo={diceTwo}
                  roll={roll}
                  changeRoll={changeRoll}
                >

                </Dice>


              </div>
              {/* thẻ đánh dấu từ 17 tới 23 */}
              <div className={cx("col")}>
                <div className={cx("column")}>
                  {[...Array(7)].map((_, index) => {
                    return (
                      <div
                        key={index}
                        className=
                        {
                          destroy&&listDestroy.includes(17+index)
                          || listOwner.includes(17+index)
                          ? cx("rectangle-column","able") 
                          :cx("rectangle-column")
                        }
                        ref={cellRefs.current[17 + index]}
                      >
                        {locations[17+index].type=== types.SEA ? 
                        <video autoPlay muted loop width="90" height="60" style={{
                          position:"absolute",
                          overflow:"hidden",
                          objectFit:"cover",
                        }}>
                          <source src={seaVideo} type="video/mp4" />
                        </video>
                        :
                        locations[17+index].type===types.CITY
                        ? <div className={cx("city-left")}>{locations[17+index].city}</div>
                        :<Chance></Chance>
                      } 

                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 2 góc dưới và 7 hình vuông */}

            <div className={cx("row-board")}>
              {/* Thẻ đánh dấu ô 0 */}
              <div
                className={cx("corner", "square")}
                ref={cellRefs.current[0]}
                style={{backgroundColor:"white"}}
              >
                <img src={startImg} width="90" style={{transform:"rotateZ(-60deg)",position:"absolute"}}/>
              </div>

              {/* Đánh dấu từ 31->25*/}
              <div className={cx("row")}>
                {[...Array(7)].map((_, index) => {
                  return (
                    <div
                      key={index}
                      className={destroy&&listDestroy.includes(31-index)
                                ||listOwner.includes(31-index)
                                ? cx("rectangle","able") 
                                :cx("rectangle")}
                      
                      ref={cellRefs.current[31 - index]}
                    >
                      {locations[31-index].type=== types.SEA ? 
                        <>
                        <video autoPlay muted loop width="60" height="90" style={{
                          position:"absolute",
                          overflow:"hidden",
                          objectFit:"cover",
                        }}>
                          <source src={seaVideo} type="video/mp4" />
                        </video>
                        </>
                        :
                        locations[31-index].type===types.CITY 
                        ? <div className={cx("city-top")}>{locations[31-index].city}</div>
                        :<>
                          <img src={taxImg} width={50} style={{marginTop:20,position:"absolute"}}/>
                        </>
                      } 
                    </div>
                  );
                })}
              </div>

              {/* thẻ đánh dấu ô 24 */}
              <div
                className={cx("corner", "square")}
                ref={cellRefs.current[24]}
                style={{backgroundColor:"black"}}
              >
                <img src={worldTourImg} width={120} style={{position:"absolute", transform:"translate(0%,-20%) rotate(60deg) " }}/>
              </div>
            </div>
          </div>
        </div>
        </>
    )
}

export default Board
