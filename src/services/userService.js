const db = require('../models/index');
const bcrypt = require('bcryptjs');

const handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        let userData = {};
        try {
            let isExist = await checkUserEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password'],
                    where: {
                        email: email,
                    },
                    raw: true
                });
                if (user) {
                    let check = bcrypt.compareSync(password, user.password); // true
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = "OK";
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = "Wrong Password";
                    }
                }
                else {
                    userData.errCode = 2;
                    userData.errMessage = "User isn't exist"
                }
            }
            else {
                userData.errCode = 1;
                userData.errMessage = `Your's email isn't exist.`
            }
            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}

const checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    email: userEmail
                }
            })
            if (user) resolve(true);
            else resolve(false);
        } catch (e) {
            reject(e);
        }
    })
}


module.exports = {
    handleUserLogin,
}