import styles from "./Login.module.scss";
import classNames from "classnames/bind";

import axios from "axios";

const cx = classNames.bind(styles);


function Login() {


    return <>Login
        <form action="http://localhost:8000/api/auth/google" method="get">
            <input type="submit" value="Press to log in"/>
        </form>
    </>;

}

export default Login;
