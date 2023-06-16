import React from "react";
import WheelComponent from "../../../components/WheelComponent";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { colors } from "../../../constants/Color/color";

function ChangesModal({show,changeShow,turnOfUser,socket,gameRoom,possition,
}) {
  const segments = ["Vào tù", "Phá nhà người khác", "Tổ chức sinh nhật", "Nộp thuế"];
  const segColors = ["#3DA5E0", "#34A24F", "#F9AA1F", "#FF9000"];
  const onFinished = (winner) => {
    console.log(winner);
  };
  const handleClose = () => {
    changeShow(false);
    socket.emit("close", { gameRoom });
    //  sau này sẽ thế thành giá trị 2 xúc xắc để xét double
    socket.emit("turn", { gameRoom });
  };

  return (
    <>
      <div
        style={{
          position: "fixed",
          zIndex: 1000,
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, .35)",
          // display: 'none',
        }}
      >
        <div style={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center"
        }}>
          <WheelComponent
            segments={segments}
            segColors={segColors}
            onFinished={(winner) => onFinished(winner)}
            primaryColor="black"
            contrastColor="white"
            buttonText="Spin"
            // isOnlyOnce={true}
          />
        </div>
      </div>
    </>
  );
}

export default ChangesModal;
