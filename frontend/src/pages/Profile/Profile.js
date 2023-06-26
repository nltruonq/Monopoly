import styles from "./Profile.module.scss";
import classNames from "classnames/bind";
import NavProfile from "./components/NavProfile/NavProfile";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { TiArrowBack } from "react-icons/ti";
import Information from "./components/Information/Information";
import MatchHistory from "./components/MatchHistory/MatchHistory";
import axios from "axios";

const cx = classNames.bind(styles);

function Profile() {
    const [nav, setNav] = useState("information");
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user-monopoly")) || null);
    const params = useParams();
    const [profileUser, setProfileUser] = useState(null);
    const navigate = useNavigate();

    const handleGoBackHome = () => {
        navigate("/");
    };

    useEffect(() => {
        const getProfileUser = async () => {
            const rs = await axios.get(`${process.env.REACT_APP_SERVER_API}/api/user/get-one/${params.username}`);
            setUser(rs.data);
        };
        if (user.username !== params.username) {
            getProfileUser();
        }
    }, []);
    return (
        <div className={cx("wrapper")}>
            <div className={cx("header")}>
                <div onClick={handleGoBackHome} className={cx("back")}>
                    <TiArrowBack size={40} color="white" />
                </div>
                <div className={cx("title")}>Thông tin kiện tướng</div>
            </div>
            <div className={cx("main")}>
                <NavProfile user={user} nav={nav} setNav={setNav} />
                {nav === "information" && <Information user={user} />}
                {nav === "history" && <MatchHistory user={user} />}
                {nav === "character" && <Information />}
            </div>
        </div>
    );
}

export default Profile;
