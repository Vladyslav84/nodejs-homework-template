const express = require('express')
const router = express.Router()
const controllers = require('../../controllers/userControll');
const userSchemaVal = require('../../schema/userSchema');
const validation = require('../../validation/validation');
const guard = require('../../../helpers/guard');

router.post('/singup', validation(userSchemaVal), controllers.signUp);
router.post('/login', validation(userSchemaVal), controllers.logIn);
router.post('/logout',guard, controllers.logout);
router.get('/current', controllers.currentUser);
router.patch('/', guard, controllers.getUpdateSubscription);

module.exports = router;
