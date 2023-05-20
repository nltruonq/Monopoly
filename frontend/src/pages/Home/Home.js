import ActionUser from "../../components/ActionUser/ActionUser";
import Event from "../../components/Event/Event";
import Friend from "../../components/Friend/Friend";
import Header from "../../components/Header/Header";
import InviteWorld from "../../components/InviteWorld/InviteWorld";
import styles from "./Home.module.scss";
import classNames from "classnames/bind";
import { SocketContext } from "../../SocketService";
import { useContext } from "react";
const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx("wrapper")}>
            <Header />
            <div className={cx("f-e")}>
                <Friend />
                <Event />
            </div>
            <InviteWorld />
            <ActionUser />
        </div>
    );
}

export default Home
