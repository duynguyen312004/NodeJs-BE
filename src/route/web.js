const { getHomePage, getConPage, getCRUD, postCRUD, displayGetCRUD, getEditCRUD, putCRUD, DeleteCRUD } = require('../controllers/homeController');

const { handleLogin } = require('../controllers/userController');

const express = require('express')
const router = express.Router()


//router.Method('/route', handler)
router.get('/', getHomePage);
router.get('/hoidanit', getConPage);
router.get('/CRUD', getCRUD);
router.post('/post-crud', postCRUD);
router.get('/get-crud', displayGetCRUD);
router.get('/edit-crud/:id', getEditCRUD);
router.post('/put-crud', putCRUD);
router.get('/delete-crud/:id', DeleteCRUD)

router.post('/api/login', handleLogin)
module.exports = router;