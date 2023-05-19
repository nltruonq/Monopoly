import styles from "./ChessBoard.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function ChessBoard() {
  return (
    <>
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
    </>
  );
}
export default ChessBoard;
