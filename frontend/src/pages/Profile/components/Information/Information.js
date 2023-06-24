import { useRef, useState } from "react";
import styles from "./Information.module.scss";
import classNames from "classnames/bind";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../../../Loading/Loading";

const cx = classNames.bind(styles);

function Information({ user }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const imgRef = useRef("");
    const inputRef = useRef("");

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            const imageDataURL = reader.result;
            imgRef.current.src = imageDataURL;
            setSelectedImage(imageDataURL);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        if (!selectedImage) {
            return await Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Vui lòng chọn ảnh!",
            });
        }
        setLoading(true);
        const rs = await axios.post(`${process.env.REACT_APP_SERVER_API}/api/user/change-avatar`, {
            username: user.username,
            image: selectedImage,
        });

        if (rs.status === 200) {
            localStorage.setItem("user-monopoly", JSON.stringify(rs.data.user));
            setLoading(false);
            return await Swal.fire({
                icon: "success",
                title: "Success",
                text: "Đổi avatar thành công!",
            });
        }
        setLoading(false);
        return await Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
        });
    };

    const handleImageClick = () => {
        inputRef.current.click();
    };

    return (
        <div className={cx("wrapper")}>
            {!loading && (
                <div className={cx("avatar")}>
                    <img ref={imgRef} src={selectedImage || user?.avatar} onClick={handleImageClick} />
                    <input ref={inputRef} style={{ display: "none" }} type="file" accept="image/*" onChange={handleImageChange} />
                    <button className={cx("btn-change")} onClick={handleSubmit}>
                        Thay đổi
                    </button>
                </div>
            )}
            {loading && <Loading />}
        </div>
    );
}

export default Information;
