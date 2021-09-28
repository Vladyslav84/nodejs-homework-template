const express = require('express')
const router = express.Router()
const controllers = require('../../controllers/userControll');
const userSchemaVal = require('../../schema/userSchema');
const validation = require('../../validation/validation');
// const Users = require('../../../repositories/users')

// const DB_HOST = "mongodb+srv://Vladyslav:mPmkcV43UXi12vn4@cluster0.qg5tp.mongodb.net/db-contacts?retryWrites=true&w=majority";

// parol: mPmkcV43UXi12vn4. Login: Vladyslav
// router.post('/www',  async (req, res, next) => {
//  console.log('signUp');
//     try {
//         const user = await Users.findUserByEmail(req.body.email);
//     if (user) {
//       return res.status(200).json({ status: 'error', code: 200, message: 'Email in use' });
//         };
//         const {email, subscription} = await Users.createUser(req.body);
//     return res.status(200).json({ status: 'succes', code: 200, email, subscription });
//         // const ddd = await User.create(req.body);
//         // return console.log(ddd);
//   } catch (error) {
//     next(error)
//   }
// });
router.post('/singup', validation(userSchemaVal), controllers.signUp);
router.post('/login', validation(userSchemaVal), controllers.logIn);
// router.post('/logout', validation(userSchemaVal),controllers.logout);
// controllers.signUp();

module.exports = router;
