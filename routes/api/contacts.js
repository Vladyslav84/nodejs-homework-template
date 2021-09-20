const express = require('express')
const router = express.Router()
const  controllers  = require('../controllers/contactsControll');
const contactSchema = require('../schema/contactsSchema');
const validation = require('../validation/validation');


router.get('/', controllers.getContactsList);

router.get('/:contactId', controllers.contactByid);

router.post('/', validation(contactSchema),controllers.addNewContact);

router.delete('/:contactId', controllers.deleteContact);

router.put('/:contactId', validation(contactSchema), controllers.getUpdateContact);


module.exports = router;
