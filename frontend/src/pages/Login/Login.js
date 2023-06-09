import React, { useEffect, useState } from "react";
import styles from "./Login.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const cx = classNames.bind(styles);

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(
                `${process.env.REACT_APP_SERVER_API}/api/auth/login`,
                { username, password },
                {
                    headers: {
                        ContentType: "application/json",
                    },
                }
            )
            .then(async (res) => {
                if (res.data.status === 200) {
                    await Swal.fire({
                        icon: "success",
                        title: "Login success!",
                    });
                    localStorage.setItem("user-monopoly", JSON.stringify(res.data.user));
                    navigate("/");
                } else {
                    await Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong!",
                    });
                }
            })
            .catch(async (error) => {
                console.log(error);
                await Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                });
            });
        // Perform login logic here

        // Reset form fields
        setUsername("");
        setPassword("");
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user-monopoly"));
        if (user) {
            navigate("/");
        }
    }, []);

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
                            <input id="email" placeholder="Username" value={username} onChange={handleEmailChange} required />
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
                            <button type="submit">SIGN IN</button>
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
                        <p>
                            Don't have an account? <a href="/register">Sign Up</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
