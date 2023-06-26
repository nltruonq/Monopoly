import styles from "./Event.module.scss";
import classNames from "classnames/bind";
import NavEvent from "./components/NavEvent/NavEvent";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { TiArrowBack } from "react-icons/ti";
import EventLogin from "./components/EventLogin/EventLogin";

const cx = classNames.bind(styles);

function Event() {
    const [nav, setNav] = useState("eventLogin");
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user-monopoly")) || null);
    const navigate = useNavigate();

    const handleGoBackHome = () => {
        navigate("/");
    };
    return (
        <div className={cx("wrapper")}>
            <div className={cx("header")}>
                <div onClick={handleGoBackHome} className={cx("back")}>
                    <TiArrowBack size={40} color="white" />
                </div>
                <div className={cx("title")}>Sự kiện</div>
            </div>
            <div className={cx("main")}>
                <NavEvent user={user} nav={nav} setNav={setNav} />
                {nav === "eventLogin" && <EventLogin user={user} />}
            </div>
        </div>
    );
}

export default Event;
