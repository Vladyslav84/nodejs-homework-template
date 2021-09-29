const express = require('express')
const router = express.Router()
const controllers = require('../../controllers/userControll');
const userSchemaVal = require('../../schema/userSchema');
const validation = require('../../validation/validation');
// const Users = require('../../../repositories/users')

// const DB_HOST = "mongodb+srv://Vladyslav:mPmkcV43UXi12vn4@cluster0.qg5tp.mongodb.net/db-contacts?retryWrites=true&w=majority";

// parol: mPmkcV43UXi12vn4. Login: Vladyslav

router.post('/singup', validation(userSchemaVal), controllers.signUp);
router.post('/login', validation(userSchemaVal), controllers.logIn);
// router.post('/logout', validation(userSchemaVal),controllers.logout);
// controllers.signUp();

module.exports = router;
