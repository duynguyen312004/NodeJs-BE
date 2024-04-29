const db = require('../models/index');
const { createNewUser, getAllUsers, getUserInfoById, updateUserData, deleteUserById } = require('../services/CRUDservices')

const getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        res.render('homepage.ejs', { data: data });
    } catch (e) {
        console.log(e)
    }
}

const getConPage = async (req, res) => {
    let data = await db.User.findAll();
    res.render('homepage.ejs', { data: data });
}

const getCRUD = async (req, res) => {
    res.render('CRUD.ejs')
}

const postCRUD = async (req, res) => {
    let message = await createNewUser(req.body);
    console.log(message);
    return res.send("Post CRUD From Server");
}

const displayGetCRUD = async (req, res) => {
    let data = await getAllUsers();
    res.render('display-crud.ejs', { listUsers: data });
}

const getEditCRUD = async (req, res) => {
    let userId = await req.params.id;
    if (userId) {
        let userData = await getUserInfoById(userId);
        return res.render('edit-crud.ejs', { user: userData });
    }
    else {
        return res.send("User not found");
    }
}

const putCRUD = async (req, res) => {
    let data = await req.body;
    await updateUserData(data);
    res.redirect('/get-crud');
}

const DeleteCRUD = async (req, res) => {
    let userId = await req.params.id;
    if (userId) {
        await deleteUserById(userId);
        res.redirect('/get-crud');
    }
    else return res.send("User not found");
}

module.exports = {
    getHomePage,
    getConPage,
    getCRUD,
    postCRUD,
    displayGetCRUD,
    getEditCRUD,
    putCRUD,
    DeleteCRUD
}