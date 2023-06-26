import classNames from "classnames/bind";
import styles from "./FriendLayout.module.scss";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

import { TiArrowBack } from "react-icons/ti";

const cx = classNames.bind(styles);

function FriendLayout({ children }) {
    const navigate = useNavigate();

    const handleGoBackHome = () => {
        navigate("/");
    };
    return (
        <>
            <div className={cx("container")}>
                <div className={cx("wrapper")}>
                    <div className={cx("text")}>
                        <div onClick={handleGoBackHome} className={cx("back")}>
                            <TiArrowBack style={{ cursor: "pointer" }} size={40} color="white" />
                        </div>
                        <h2>THÔNG TIN BẠN BÈ</h2>
                    </div>
                    <div className={cx("sidebar")}>
                        <Sidebar></Sidebar>
                    </div>
                </div>
                <div className={cx("content")}>{children}</div>
            </div>
        </>
    );
}

export default FriendLayout;
