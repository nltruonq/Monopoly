const bcrypt = require("bcrypt");
const User = require("../models/user.model");

const authController = {
    getUserByUsername: async (req, res) => {
        try {
            // lấy key từ req
            const username = req.params.username;
            // console.log(username)
        } catch (error) {
            console.log(error);
        }
    },
    register: async (req, res) => {
        try {
            let { username, password, ...rest } = req.body;
            const isExisted = await User.findOne({ username }); // username: ?
            if (isExisted) {
                return res.json({
                    message: "username đã tồn tại",
                    status: 500,
                });
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            password = hashedPassword;

            const user = { username, password, ...rest };
            const newUser = new User(user); //{username,...}

            await newUser.save();

            res.json({
                status: 200,
                message: "Tạo thành công",
            });
        } catch (error) {
            console.log(error);
        }
    },
    login: async (req, res) => {
        try {
            //
            const { username, password } = req.body; // lấy từ req
            //i kiểm tra mật khẩu
            // lấy dc user tu db
            const user = await User.findOne({ username });
            if (!user) {
                return res.json({
                    status: 500,
                    message: "Đăng nhập thất bại",
                });
            }
            const isValid = await user.isRightPassword(password);
            if (isValid) {
                return res.json({
                    status: 200,
                    message: "Đăng nhập thành công",
                    user: user, // chua tat ca thong tin. tra ve cho client qua response
                });
            } else {
                return res.json({
                    status: 500,
                    message: "Username hoac password khong dung",
                });
            }
        } catch (error) {
            console.log(error);
        }
    },
};
module.exports = authController;
