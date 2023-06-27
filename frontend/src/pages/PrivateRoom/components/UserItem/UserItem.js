import styles from "./UserItem.module.scss";
import classNames from "classnames/bind";

import char from "../../../../assets/images/char.png";

import { GrSubtract } from "react-icons/gr";

const cx = classNames.bind(styles);

function UserItem({ color, player, handleKick, host, user }) {
    return player ? (
        <div className={cx("wrapper")}>
            <div className={cx("header")} style={{ backgroundColor: `${color}` }}>
                <div className={cx("avatar")}>
                    <img src={player.avatar} alt="avatar" />
                </div>
                <div className={cx("name")}>{player.username}</div>
            </div>
            <div className={cx("main")}>
                <div className={cx("char")}>
                    <img src="https://jujutsuphanpara.jp/_nuxt/img/chara_illust_gojo.40908ab.png" alt="char" />
                </div>
            </div>
            <div className={cx("footer")}>
                {user.username === host && player.username !== host && (
                    <div onClick={() => handleKick(player)} className={cx("kick")} style={{ backgroundColor: `${color}` }}>
                        <GrSubtract size={30} color="white" />
                    </div>
                )}
            </div>
        </div>
    ) : (
        <div className={cx("wrapper")}>
            <div className={cx("header")} style={{ backgroundColor: `${color}` }}>
                <div className={cx("name")}></div>
            </div>
            <div className={cx("main")}>
                <div className={cx("char")}></div>
            </div>
            <div className={cx("footer")}></div>
        </div>
    );
}

export default UserItem;
