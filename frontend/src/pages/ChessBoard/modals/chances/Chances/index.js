import React from "react";
import WheelComponent from "../../../components/WheelComponent";
import modalConstant from "../../../constants/modal";

function ChangesModal({changeShow,turnOfUser,gameRoom,yourTurn}) {
  const segments = ["Vào tù", "Phá nhà người khác", "Tổ chức sinh nhật", "Nộp thuế"];
  const segColors = ["#3DA5E0", "#34A24F", "#F9AA1F", "#FF9000"];
  const onFinished = (winner) => {
    // 
    setTimeout(()=>{
      // dùng để test
      // changeShow(modalConstant.DESTROY_HOUSE)

      if(winner === segments[0] ){
          changeShow(modalConstant.JAIL)
      }
      else if(winner===segments[1]){
          changeShow(modalConstant.DESTROY_HOUSE)
      }
      else if(winner===segments[2]){
         changeShow(modalConstant.HOST_BIRTHDAY)
      }
      else{
        changeShow(modalConstant.PAY_TAX)
      }
    },2000)
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
            buttonText={turnOfUser===yourTurn? "Spin":""}
            gameRoom={gameRoom}
            isOnlyOnce={true}
          />
        </div>
      </div>
    </>
  );
}

export default ChangesModal;
