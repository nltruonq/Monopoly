import styles from "./ChessBoard.module.scss";
import classNames from "classnames/bind";
import UserZone from "./UserZone/UserZone";
import bgImage from "../../../src/assets/images/bg_in_game.jpg"

const cx = classNames.bind(styles);

function ChessBoard() {
  return (
    <>
    <div className={cx("wrapper")} 

        style={{
            backgroundImage: 'linear-gradient(0deg, #95656c, #bf985c)',
        }}
    >

      {/* Current user */}
      <div className={cx("user-zone")}>
            <UserZone></UserZone>
      </div>

      {/* Other users */}
      <div className={cx("user-zone-2")}>
            <UserZone></UserZone>
      </div>
      <div className={cx("user-zone-3")}>
            <UserZone></UserZone>
      </div>
      <div className={cx("user-zone-4")}>
            <UserZone></UserZone>
      </div>

      <div className={cx("chess-board")}>
        <div className={cx("content")}>
          {/* 2 góc và 7 hình vuông */}
          <div className={cx("row-board")}>
            <div className={cx("corner", "square")}></div>
            <div className={cx("row")}>
              {[...Array(7)].map((_, index) => {
                return <div key={index} className={cx("rectangle")}></div>;
              })}
            </div>
            <div className={cx("corner", "square")}></div>
          </div>

          {/* 14 hình vuông: 7 hình bên trái và 7 hình bên phải */}
          <div className={cx("center-board")}>
            <div className={cx("col")}>
              <div className={cx("column")}>
                {[...Array(7)].map((_, index) => {
                  return (
                    <div key={index} className={cx("rectangle-column")}></div>
                  );
                })}
              </div>
            </div>
            <div className={cx("center")}></div>
            <div className={cx("col")}>
              <div className={cx("column")}>
                {[...Array(7)].map((_, index) => {
                  return (
                    <div key={index} className={cx("rectangle-column")}></div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 2 góc dưới và 7 hình vuông */}
          <div className={cx("row-board")}>
            <div className={cx("corner", "square")}></div>
            <div className={cx("row")}>
              {[...Array(7)].map((_, index) => {
                return <div key={index} className={cx("rectangle")}></div>;
              })}
            </div>
            <div className={cx("corner", "square")}></div>
          </div>
        </div>
      </div>
    </div>

    </>
  );
}
export default ChessBoard;
