import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.scss";
import classNames from "classnames/bind";
import axios from "axios";

import Swal from "sweetalert2";

const cx = classNames.bind(styles);

function Register() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleFullNameChange = (e) => {
        setFullName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(fullName, " full");
        axios
            .post(
                `${process.env.REACT_APP_SERVER_API}/api/auth/register`,
                {
                    username: fullName,
                    email,
                    password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then(async (res) => {
                //xử lý data server trả vè qua respnse
                if (res.data.status === 200) navigate("/login");
                else
                    await Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong!",
                    });
            })
            .catch(async (error) => {
                await Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                });
            });
        // Perform registration logic here

        // Reset form fields
        setFullName("");
        setEmail("");
        setPassword("");
    };
    return (
        <div className={cx("register-container")}>
            <div className={cx("register-form")}>
                <div className={cx("text-signup")}>
                    <h2 className={cx("text-login-sign")}>SIGN</h2>
                    <h2 className={cx("text-login-up")}>UP</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={cx("form-group")}>
                        <label htmlFor="fullName"></label>
                        <input type="text" id="fullName" value={fullName} placeholder="Username" onChange={handleFullNameChange} required />
                    </div>
                    <div className={cx("form-group")}>
                        <label htmlFor="email"></label>
                        <input type="email" id="email" value={email} placeholder="Email" onChange={handleEmailChange} required />
                    </div>
                    <div className={cx("form-group")}>
                        <label htmlFor="password"></label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            placeholder="Password"
                            onChange={handlePasswordChange}
                            required
                        />
                    </div>
                    <div className={cx("form-group")}>
                        <button type="submit">SIGN UP</button>
                    </div>
                </form>
                <div className={cx("text-change-login")}>
                    <p>
                        Already have an account? <a href="/login">Sign In</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;
