import classNames from "classnames/bind";
import styles from "./Dice.module.scss";
import { useEffect,memo, useRef, useState } from "react";

import { number } from "./number";
import { diceConvert } from "./diceConvert";
const cx = classNames.bind(styles);

function Dice(props) {

  const elDiceOne=useRef()
  const elDiceTwo=useRef()

  function rollDice() {
    for (var i = 1; i <= 6; i++) {
      elDiceOne.current.classList.remove(cx(`show-${i}`));
      if (diceConvert[props.diceOne] === i) {
        elDiceOne.current.classList.add(cx("show-" + i));
      }
    }

    for (var k = 1; k <= 6; k++) {
      elDiceTwo.current.classList.remove(cx("show-" + k));
      if (diceConvert[props.diceTwo] === k) {
        elDiceTwo.current.classList.add(cx("show-" + k));
      }
    }
  }

  useEffect(()=>{
    console.log(props.roll)
    const interval = setInterval(()=>{
        if(props.roll){
            rollDice()
            props.changeRoll(!props.roll)
        }
        else{
            clearInterval(interval)
        }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  },[props.roll])
  return (
    <div className={cx("game")}>
      <div className={cx("container")}>
        <div id="dice1" className={cx("dice","dice-one")} ref={elDiceOne}>
          {
            [...Array(6)].map((_,index)=>{
                return (
                    <div key={index} id={`dice-one-side-${number[index].key}`} className={cx("side",number[index].key)}>
                        {[...Array(index+1)].map((_,i)=>{
                            return (
                                <div key={i} className={cx("dot",`${number[index].key}-${i+1}`)}></div>
                            )
                        })}
                    </div>
                )
            })
          }
        </div>
      </div>
      
      <div className={cx("container")}>
        <div id="dice2" className={cx("dice","dice-two")} ref={elDiceTwo}>
        {
            [...Array(6)].map((_,index)=>{
                return (
                    <div key={index+"2"} id={`dice-two-side-${number[index].key}`} className={cx("side",number[index].key)}>
                        {[...Array(index+1)].map((_,i)=>{
                            return (
                                <div key={i+"2"} className={cx("dot",`${number[index].key}-${i+1}`)}></div>
                            )
                        })}
                    </div>
                )
            })
          }
        </div>
      </div>

    </div>
  );
}

export default memo(Dice);


