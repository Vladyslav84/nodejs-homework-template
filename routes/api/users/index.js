const express = require('express')
const router = express.Router()
const controllers = require('../../controllers/userControll');
const userSchemaVal = require('../../schema/userSchema');
const validation = require('../../validation/validation');
const guard = require('../../../helpers/guard');
const upload = require('../../../helpers/uploadsMiddleware');

router.post('/singup', validation(userSchemaVal), controllers.signUp);
router.post('/login', validation(userSchemaVal), controllers.logIn);
router.post('/logout',guard, controllers.logout);
router.get('/current',guard, controllers.currentUser);
router.patch('/', guard, controllers.getUpdateSubscription);
router.patch('/avatars', guard,upload.single('avatar'), controllers.avatars);

module.exports = router;
