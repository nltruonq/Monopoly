import styles from "./Profile.module.scss";
import classNames from "classnames/bind";
import NavProfile from "./components/NavProfile/NavProfile";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { TiArrowBack } from "react-icons/ti";
import Information from "./components/Information/Information";

const cx = classNames.bind(styles);

function Profile() {
    const [nav, setNav] = useState("information");
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
                <div className={cx("title")}>Thông tin kiện tướng</div>
            </div>
            <div className={cx("main")}>
                <NavProfile nav={nav} setNav={setNav} />
                {nav === "information" && <Information user = {user} />}
                {nav === "history" && <Information />}
                {nav === "character" && <Information />}
            </div>
        </div>
    );
}

export default Profile;
