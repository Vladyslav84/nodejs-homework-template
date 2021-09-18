const express = require('express')
const router = express.Router()
const contacts = require('../../model/index');
const  controllers  = require('../controllers/contactsControll');
const contactSchema = require('../schema/contactsSchema');
const  validation  = require('../validation//validation');

// console.log(controllers.addContact());

router.get('/', async (req, res, next) => {
  try {
    const data = await contacts.listContacts();
    if (data) {
       res.json({ status: 'succcess', code: 200, payload: { data } })
    };
    return res.json({ status: 'error', code: 404, message: 'Not found' });

  }
  catch (error) {
    next(error);
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const data = await contacts.getContactById(req.params.contactId);
    if (data) {
      return res.json({ status: 'succcess', code: 200, payload: { data } });
    };
    return res.json({ status: 'error', code: 404, message: 'Not found' });

  } catch (error) {
    next(error)
  }
});

router.post('/', validation(contactSchema),controllers.addNewContact);

// router.post('/',async (req, res, next) => {
//     try {
//     const data = await contacts.addContact(req.body);
//     if (data) {
//       return res.json({ status: 'succcess', code: 201, payload: { data } });
//     };

//   } catch (error) {
//     next(error)
//   }
// })

router.delete('/:contactId', async (req, res, next) => {
    try {
        const data = await contacts.removeContact(req.params.contactId);
    if (data.length !== 0) {
      return res.json({ status: 'succcess', code: 200, payload: { data } });
        };
        return res.status(404).json({ status: 'error', code: 404, message: 'Not found' });

  } catch (error) {
    next(error)
  }
})

router.patch('/:contactId', async (req, res, next) => {
    try {
      const data = await contacts.updateContact(req.params.contactId, req.body);
    if (data) {
      return res.json({ status: 'succcess', code: 200, payload: { data } });
      };
      
        return res.json({ status: 'error', code: 404, message: 'Not found' });

  } catch (error) {
    next(error)
  }
})

module.exports = router;
