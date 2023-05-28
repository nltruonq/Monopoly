import classNames from "classnames/bind";
import styles from "./Waitting.module.scss";
import { useState,useEffect } from "react";

const cx = classNames.bind(styles);

function Waitting() {
    const [count, setCount] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setCount((prevCount) => prevCount + 1);
      }, 1000);
  
      return () => {
        clearInterval(interval);
      };
    }, []);
  
    const formatTime = (count) => {
      const minutes = Math.floor(count / 60);
      const seconds = count % 60;
      const formattedMinutes = String(minutes).padStart(2, '0');
      const formattedSeconds = String(seconds).padStart(2, '0');
      return `${formattedMinutes}:${formattedSeconds}`;
    };
    return (
        <div className={cx("wrapper")}>
            <div style={{position:"relative"}}>
                <div className={cx("content")}>
                    <h3>Waiting Game</h3>
                    <div>Count: {formatTime(count)}</div>
                </div>
            </div>
        </div>
    )
}

export default Waitting;
