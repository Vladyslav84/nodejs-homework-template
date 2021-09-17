const express = require('express')
const router = express.Router()
const contacts = require('../../model/index');

router.get('/', async (req, res, next) => {
  try {
    const data = await contacts.listContacts();
    res.json({ status: 'succcess', code: 200, payload: { data } })
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const data = await contacts.getContactById(req.params.contactId);
    if (data) {
      return res.json({ status: 'succcess', code: 200, payload: { data } });
    };

  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.patch('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
