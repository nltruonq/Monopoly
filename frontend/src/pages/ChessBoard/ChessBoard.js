import styles from "./ChessBoard.module.scss";
import classNames from "classnames/bind";
import UserZone from "./UserZone/UserZone";
import char from "../../assets/images/char.png";
import { useEffect, useRef, createRef, useState } from "react";

const cx = classNames.bind(styles);

function ChessBoard() {
  const [possition,setPos]=useState(0)
  
  const cellRefs = useRef([]);

  const userRef = useRef();

  cellRefs.current = Array(32)
    .fill()
    .map((_, i) => cellRefs.current[i] ?? createRef());

  const move=()=>{
    userRef.current.classList.add(cx("move"))
    if(possition>31){
      setPos(0)
      // handle Start 

    }
    else {
      setPos(possition+1)
    }
    userRef.current.style.transform="translate(20%,-20%) rotate(45deg)"
    possition!=0 && cellRefs.current[possition-1].current.classList.add(cx("down"))
    cellRefs.current[possition].current.appendChild(userRef.current);
    cellRefs.current[possition].current.classList.remove(cx("down"))
    
  }
  useEffect(() => {

  }, [possition]);

  return (
    <>
      <div
        className={cx("wrapper")}
        style={{ backgroundImage: "linear-gradient(0deg, #95656c, #bf985c)" }}
      >
        {/* Current user */}
        <div className={cx("user-zone")}>
          <UserZone></UserZone>
        </div>

        {/* Other users */}
        {[...Array(3)].map((_, index) => {
          return (
            <div className={cx(`user-zone-${2 + index}`)}>
              <UserZone></UserZone>
            </div>
          );
        })}

        <div className={cx("char")} ref={userRef}>
          <img src={char} width="50px" />
        </div>

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
                  <button onClick={move}>
                    MOVE
                  </button>

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
      </div>
    </>
  );
}
export default ChessBoard;
