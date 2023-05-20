import React, { useState } from "react";
import styles from "./Login.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";

const cx = classNames.bind(styles);

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Perform login logic here

        // Reset form fields
        setEmail("");
        setPassword("");
    };

    return (
        <div className={cx("login-container")}>
            <div className={cx("login-form")}>

                {/* form login */}
                <div className={cx("form-login")}>
                    <div className={cx("text-login")}>
                        <h2 className={cx("text-login-log")}>SIGN</h2>
                        <h2 className={cx("text-login-in")}>IN</h2>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className={cx("form-group")}>
                            <label htmlFor="email" p></label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Email"
                                value={email}
                                onChange={handleEmailChange}
                                required
                            />
                        </div>
                        <div className={cx("form-group")}>
                            <label htmlFor="password"></label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={handlePasswordChange}
                                required
                            />
                        </div>
                        <div className={cx("form-group")}>
                            <button type="submit">SING IN</button>
                        </div>

                    </form>
                    <p className={cx("text-connect")}>Connect with</p>
                    <div className={cx("button-group")}>
                        <button type="submit" className={cx("button-facebook")}>
                            <FontAwesomeIcon icon={faFacebookF} className={cx("icon")} />
                        </button>
                        <button type="submit" className={cx("button-google")}>
                            <FontAwesomeIcon icon={faGoogle} className={cx("icon")} />
                        </button>
                    </div>
                    <div className={cx("text-change-register")}>
                        <p>Don't have an account? <a href="/register">Sign Up</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
