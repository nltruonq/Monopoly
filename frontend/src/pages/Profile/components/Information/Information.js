import styles from "./Information.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function Information() {
    return <div className={cx("wrapper")}></div>;
}

export default Information;
