import { useEffect } from "react"
import { RiChat2Fill, RiChatCheckFill } from "react-icons/ri"

function Buying({socket,setShow}){
    useEffect(()=>{
        socket.on("bought-result",(data)=>{
            setShow(false)
        })
    },[socket])
    return (
        <>
        <RiChat2Fill color="white" size={100} style={{
            position:"absolute",
            top:-60,
            left:-50,
        }}>
        </RiChat2Fill>
        <div style={{
            color:"black",
            position:"absolute",
            top:-30,
            left:-30,
            }}>Buying...</div>
        </>
    )
}

export default Buying