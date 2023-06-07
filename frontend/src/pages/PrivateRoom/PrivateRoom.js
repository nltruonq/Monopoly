import styles from "./PrivateRoom.module.scss";
import classNames from "classnames/bind";

import { AiOutlineCloseCircle } from "react-icons/ai";
import { Row, Col } from "react-bootstrap";
import UserItem from "./components/UserItem/UserItem";
import InviteFriends from "./components/InviteFriends/InviteFriends";

import { colors } from "../../pages/ChessBoard/constants/Color/color";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function PrivateRoom() {
    const navigate = useNavigate();
    const handleGoBackHome = () => {
        navigate("/");
    };
    return (
        <div className={cx("wrapper")}>
            {/* SHOW AVATAR + NAME */}
            <div className={cx("header")}>
                <div className={cx("profile")}>
                    <div className={cx("bow")}></div>
                    <div className={cx("bow2")}></div>
                    <div className={cx("name")}>NAMEEEEEEEEEEEEEEEEE</div>
                    <div className={cx("img")}>
                        <img src="https://i.pinimg.com/564x/e8/9d/29/e89d292e76d2ffee19e7f17f7f9c6734.jpg" alt="avatar" />
                    </div>
                    <div className={cx("bg")}></div>
                </div>
                {/* TITLE PRIVATE ROOM */}
                <div className={cx("title")}>
                    <div className={cx("bow")}></div>
                    <div className={cx("bow2")}></div>
                    <div className={cx("name")}>PRIVATE ROOM</div>
                </div>
                {/* BUTTON BACK HOME ... */}
                <div className={cx("actions")}>
                    <div onClick={handleGoBackHome} className={cx("close")}>
                        <AiOutlineCloseCircle size={40} color="white" style={{ backgroundColor: "red", borderRadius: "50%" }} />
                    </div>
                </div>
            </div>
            <div className={cx("main")}>
                <UserItem color={colors[0]} />
                <UserItem color={colors[1]} />
                <UserItem color={colors[2]} />
                <UserItem color={colors[3]} />
                <InviteFriends />
            </div>
            <div className={cx("footer")}>
                <div className={cx("play")}>
                    <button>PLAY</button>
                </div>
            </div>
        </div>
    );
}

export default PrivateRoom;
