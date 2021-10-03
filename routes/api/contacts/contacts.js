const express = require('express')
const router = express.Router()
const  controllers  = require('../../controllers/contactsControll');
const {contactSchema, updateStatusContactSchema} = require('../../schema/contactsSchema');
const validation = require('../../validation/validation');
const guard = require('../../../helpers/guard');
const passport = require('passport');

// const DB_HOST = "mongodb+srv://Vladyslav:mPmkcV43UXi12vn4@cluster0.qg5tp.mongodb.net/db-contacts?retryWrites=true&w=majority";

// parol: mPmkcV43UXi12vn4. Login: Vladyslav

router.get('/',guard, controllers.getContactsList);
router.get('/favorites',guard, passport.authenticate('jwt', { session: false }), controllers.getFavoritesContacts);
router.get('/:contactId',guard, controllers.contactByid);
router.post('/',guard, validation(contactSchema),controllers.addNewContact);
router.delete('/:contactId',guard, controllers.deleteContact);
router.put('/:contactId',guard, validation(contactSchema), controllers.getUpdateContact);
router.patch('/:contactId/favorite',guard, validation(updateStatusContactSchema), controllers.getUpdateStatusContact);

module.exports = router;
