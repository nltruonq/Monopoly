import ActionUser from "./components/ActionUser/ActionUser";
import Event from "./components/Event/Event";
import Friend from "./components/Friend/Friend";
import Header from "./components/Header/Header";
import InviteWorld from "./components/InviteWorld/InviteWorld";
import Waitting from "./components/Waitting/Waitting";
import styles from "./Home.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";

const cx = classNames.bind(styles);

function Home() {
    const [waitting,setWaitting]=useState(false)
    const changeWaitting=(value)=>{
        setWaitting(value)
    }

    return (
        <div className={cx("wrapper")}>
            {waitting&& <Waitting></Waitting>}
            <Header />
            <div className={cx("f-e")}>
                <Friend />
                <Event />
            </div>
            <InviteWorld />
            <ActionUser changeWaitting={changeWaitting}/>
        </div>
    );
}

export default Home
