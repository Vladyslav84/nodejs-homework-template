const express = require('express')
const router = express.Router()
const  controllers  = require('../controllers/contactsControll');
const {contactSchema, updateStatusContactSchema} = require('../schema/contactsSchema');
const validation = require('../validation/validation');
const guard = require('../../helpers/guard');
const passport = require('passport');

// const DB_HOST = "mongodb+srv://Vladyslav:mPmkcV43UXi12vn4@cluster0.qg5tp.mongodb.net/db-contacts?retryWrites=true&w=majority";

// parol: mPmkcV43UXi12vn4. Login: Vladyslav

router.get('/', passport.authenticate('jwt', { session: false }), controllers.getContactsList);
router.get('/favorites', controllers.getFavoritesContacts);
router.get('/:contactId', controllers.contactByid);
router.post('/', validation(contactSchema),controllers.addNewContact);
router.delete('/:contactId', controllers.deleteContact);
router.put('/:contactId', validation(contactSchema), controllers.getUpdateContact);
router.patch('/:contactId/favorite', validation(updateStatusContactSchema), controllers.getUpdateStatusContact);

module.exports = router;
