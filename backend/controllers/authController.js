const User = require("../models/user.model")

const authController = {
    getUserByUsername: async (req, res) => {
        try {
            // lấy key từ req
            const username = req.params.username
            // console.log(username)



        } catch (error) {
            console.log(error)
        }
    },
    register: async (req, res) => {
        try {

            const { username } = req.body
            // console.log(user)

            // kiểm tra thử tên username đã tồn tại hay chưa
            const isExisted = await User.findOne({ username }) // username: ?
            // console.log(isExisted?.username,"aa")
            if (isExisted) {
                return res.json({
                    "message": "username đã tồn tại",
                    "status": 200,
                })
            }
            const newUser = new User(req.body) //{username,...}

            await newUser.save()

            res.json({
                status: 500,
                "message": "Tạo thành công"
            })
        } catch (error) {
            console.log(error)
        }
    },
    login: async (req, res) => {
        try {
            //
            const { username, password } = req.body; // lấy từ req
            //i kiểm tra mật khẩu
            // lấy dc user tu db
            const user = await User.findOne({ username })
            if (password === user?.password) {
                return res.json({
                    status: 500,
                    message: "Đăng nhập thành công",
                    user: user // chua tat ca thong tin. tra ve cho client qua response
                })
            }
            else {
                return res.json({
                    status: 200,
                    message: "Username hoac password khong dung"
                })
            }


        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = authController