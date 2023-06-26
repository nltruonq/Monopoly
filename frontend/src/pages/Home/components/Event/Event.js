import classNames from "classnames/bind";
import styles from "./Event.module.scss";

import { VscSymbolEvent } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function Event({ user }) {
    const navigate = useNavigate();
    const handleGoEvent = () => {
        navigate("/event");
    };
    return (
        <div className={cx("wrapper")}>
            <div className={cx("banner")}>
                <img
                    src="https://cdn.dribbble.com/userupload/2770226/file/original-aa4480e802ae811d699f594c1167a560.png?compress=1&resize=800x600"
                    alt="banner"
                />
            </div>
            <div onClick={handleGoEvent} className={cx("event")}>
                <VscSymbolEvent size={26} color="yellow" />
                <span>Sự kiện</span>
            </div>
        </div>
    );
}

export default Event;
