import { useEffect, useRef, useState } from "react";
import styles from "./EventLogin.module.scss";
import classNames from "classnames/bind";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../../../Loading/Loading";

import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { DiRuby } from "react-icons/di";

const cx = classNames.bind(styles);

const reward = {
    login: false,
    match3: false,
    match5: false,
};

function EventLogin({ user }) {
    const [isReceive, setIsReceive] = useState(JSON.parse(localStorage.getItem("monopoly-reward")) || reward);

    const handleReceiveRewardLogin = async () => {
        isReceive.login = true;
        localStorage.setItem("monopoly-reward", JSON.stringify(isReceive));
        setIsReceive({ ...isReceive, login: true });
        await Swal.fire("Nhận phần thưởng thành công!", "", "success");
    };

    const handleReceiveRewardMatch3 = async () => {
        isReceive.match3 = true;
        localStorage.setItem("monopoly-reward", JSON.stringify(isReceive));
        setIsReceive({ ...isReceive, match3: true });
        await Swal.fire("Nhận phần thưởng thành công!", "", "success");
    };

    const handleReceiveRewardMatch5 = async () => {
        isReceive.match5 = true;
        localStorage.setItem("monopoly-reward", JSON.stringify(isReceive));
        setIsReceive({ ...isReceive, match5: true });
        await Swal.fire("Nhận phần thưởng thành công!", "", "success");
    };

    return (
        <div className={cx("wrapper")}>
            <div className={cx("main")}>
                <div className={cx("item")}>
                    <div className={cx("title")}>ĐĂNG NHẬP HẰNG NGÀY</div>
                    <div className={cx("reward")}>
                        Phần thưởng là 200 <RiMoneyDollarCircleLine size={20} color="yellow" /> và 50 <DiRuby size={20} color="red" />
                    </div>
                    {!isReceive.login && (
                        <button onClick={handleReceiveRewardLogin} className={cx("ok")}>
                            Nhận ngay
                        </button>
                    )}
                </div>
                <div className={cx("item")}>
                    <div className={cx("title")}>CHƠI ĐỦ 3 VÁN</div>
                    <div className={cx("reward")}>
                        Phần thưởng là 400 <RiMoneyDollarCircleLine size={20} color="yellow" /> và 100 <DiRuby size={20} color="red" />
                    </div>
                    {!isReceive.match3 && (
                        <button onClick={handleReceiveRewardMatch3} className={cx("ok")}>
                            Nhận ngay
                        </button>
                    )}
                </div>
                <div className={cx("item")}>
                    <div className={cx("title")}>CHƠI ĐỦ 5 VÁN</div>
                    <div className={cx("reward")}>
                        Phần thưởng là 900 <RiMoneyDollarCircleLine size={20} color="yellow" /> và 250 <DiRuby size={20} color="red" />
                    </div>
                    {!isReceive.match5 && (
                        <button onClick={handleReceiveRewardMatch5} className={cx("ok")}>
                            Nhận ngay
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default EventLogin;
