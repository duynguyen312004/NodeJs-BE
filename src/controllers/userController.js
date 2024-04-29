const { handleUserLogin, } = require('../services/userService');


const handleLogin = async (req, res) => {
    //check email
    //check password
    //return userInfor
    //access_token: jWT json web token
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: "missing inputs parameter",
        })
    }

    let userData = await handleUserLogin(email, password);
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

module.exports = {
    handleLogin
}