import Dice from "../Dice/Dice";
import seaBG from "../../../../assets/images/sea.jpg"
import { locations } from "../../constants/locations/data";
import { types } from "../../constants/locations/type";
import Chance from "./components/Chance/Chance";
import startImg from "../../../../assets/images/start.png"

function Board(props){
    const {yourTurn,cx,roll,diceOne,diceTwo,cellRefs,changeRoll,moveBySteps}=props

    return (
        <>
          <div className={cx("chess-board")}>
          <div className={cx("content")}>
            {/* 2 góc và 7 hình vuông */}
            <div className={cx("row-board")}>
              <div
                className={cx("corner", "square")}
                ref={cellRefs.current[8]}
              ></div>
              {/* thẻ đánh dấu từ 9 tới 15 */}
              <div className={cx("row")}>
                {[...Array(7)].map((_, index) => {
                  return (
                    <div
                      key={index}
                      className={cx("rectangle")}
                      ref={cellRefs.current[9 + index]}
                    >
                      { locations[9+index].type=== types.SEA 
                        ? <img src= {seaBG} width="60" height="90" style={{
                          position:"absolute",
                          overflow:"hidden",
                          objectFit:"cover",
                        }}/>
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
              ></div>
            </div>

            {/* 14 hình vuông: 7 hình bên trái và 7 hình bên phải */}
            <div className={cx("center-board")}>
              {/* thẻ đánh dấu từ 7->1 */}
              <div className={cx("col")}>
                <div className={cx("column")}>
                  {[...Array(7)].map((_, index) => {
                    return (
                      <div
                        key={index}
                        className={cx("rectangle-column")}
                        ref={cellRefs.current[7 - index]}
                      >
                        {locations[7-index].type=== types.SEA ? <img src= {seaBG} width="60" height="90" style={{
                          position:"absolute",
                          overflow:"hidden",
                          objectFit:"cover",
                          transform: "translate(27%,-18%) rotate(90deg)",
                        }}/>
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
              <div className={cx("center")}>
                {yourTurn&&<button onClick={() => moveBySteps(diceOne + diceTwo)}>
                  MOVE
                </button>}
                <Dice
                  diceOne={7}
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
                        className={cx("rectangle-column")}
                        ref={cellRefs.current[17 + index]}
                      >
                        {locations[17+index].type=== types.SEA ? <img src= {seaBG} width="60" height="90" style={{
                          position:"absolute",
                          overflow:"hidden",
                          objectFit:"cover",
                          transform: "translate(27%,-18%) rotate(90deg)",
                        }}/>
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
              >
                <img src={startImg} width="80" style={{transform:"rotateZ(-60deg)",position:"absolute"}}/>
              </div>

              {/* Đánh dấu từ 31->25*/}
              <div className={cx("row")}>
                {[...Array(7)].map((_, index) => {
                  return (
                    <div
                      key={index}
                      className={cx("rectangle")}
                      ref={cellRefs.current[31 - index]}
                    >
                      {locations[31-index].type=== types.SEA ? <img src= {seaBG} width="60" height="90" style={{
                          position:"absolute",
                          overflow:"hidden",
                          objectFit:"cover",
                        }}/>
                        :
                        locations[31-index].type===types.CITY 
                        ? <div className={cx("city-top")}>{locations[31-index].city}</div>
                        :"TAX"
                      } 
                    </div>
                  );
                })}
              </div>

              {/* thẻ đánh dấu ô 24 */}
              <div
                className={cx("corner", "square")}
                ref={cellRefs.current[24]}
              ></div>
            </div>
          </div>
        </div>
        </>
    )
}

export default Board
