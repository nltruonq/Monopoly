import classNames from "classnames/bind";
import Header from "../../components/Header/Header";
import styles from "./HeaderOnly.module.scss";

const cx = classNames.bind(styles);

function HeaderOnly({ children }) {
    return (
        <>  
            <Header/>
            {children}
        </>
    );
}

export default HeaderOnly;
