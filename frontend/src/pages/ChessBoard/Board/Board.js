import Dice from "../Dice/Dice";

function Board(props){
    const {cx,roll,diceOne,diceTwo,cellRefs,changeRoll,moveBySteps,socket}=props

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
                    ></div>
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
                      ></div>
                    );
                  })}
                </div>
              </div>
              <div className={cx("center")}>
                {<button onClick={() => moveBySteps(diceOne + diceTwo)}>
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
                        className={cx("rectangle-column")}
                        ref={cellRefs.current[17 + index]}
                      ></div>
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
              ></div>

              {/* Đánh dấu từ 31->25*/}
              <div className={cx("row")}>
                {[...Array(7)].map((_, index) => {
                  return (
                    <div
                      key={index}
                      className={cx("rectangle")}
                      ref={cellRefs.current[31 - index]}
                    ></div>
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
