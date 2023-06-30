import classNames from "classnames/bind";
import styles from "./ActionUser.module.scss";

import { HiShoppingCart } from "react-icons/hi";
import { FaFantasyFlightGames } from "react-icons/fa";
import { SiRiotgames } from "react-icons/si";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(styles);

function ActionUser({ changeWaitting, socket, user }) {
    const navigate = useNavigate();

    const ranking = () => {
        changeWaitting(true);
        socket.emit("waitting");
    };

    const handleClickShop=()=>{
        navigate('/shop')
    }

    const handleCreatePrivateRoom = () => {
        socket.emit("create-private-room", { username: user?.username });
        navigate(`/private-room/${user.username}`);
    };

    useEffect(() => {
        socket.on("waitting-result", (data) => {
            changeWaitting(false);
            navigate(`/game?room=${data.gameRoom}`);
        });
        return () => {
            socket.off("waitting");
        };
    }, [socket]);

    return (
        <div className={cx("wrapper")}>
            <div className={cx("user")}>
                <div className={cx("item")} onClick={handleClickShop}>
                    <HiShoppingCart size={30} color="yellow" />
                    <span className={cx("shop")}>Shop</span>
                </div>
                {/* <div className={cx("item")}>
                    <HiShoppingCart size={30} color="#ccc" />
                    <span>Shop</span>
                </div>
                <div className={cx("item")}>
                    <HiShoppingCart size={30} color="#ccc" />
                    <span>Shop</span>
                </div> */}
            </div>
            <div className={cx("game")}>
                <div className={cx("normal")} onClick={handleCreatePrivateRoom}>
                    <div className={cx("shape")}>
                        <FaFantasyFlightGames size={30} color="yellow" />
                    </div>
                    <span>Đấu với bạn bè</span>
                </div>
                <div className={cx("rank")} onClick={ranking}>
                    <div className={cx("shape")}>
                        <SiRiotgames size={30} color="yellow" />
                    </div>
                    <span>Đấu hạng</span>
                </div>
            </div>
        </div>
    );
}

export default ActionUser;
