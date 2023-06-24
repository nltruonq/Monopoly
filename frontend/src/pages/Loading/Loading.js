import styles from "./Loading.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function Loading() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("loader")}>
                <div className={cx("loader-small")}></div>
                <div className={cx("loader-large")}></div>
            </div>
        </div>
    );
}

export default Loading;
