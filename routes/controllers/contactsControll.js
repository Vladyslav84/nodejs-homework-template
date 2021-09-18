const contacts = require('../../model/index');


const addNewContact = async (req, res, next) => {
    try {
    const data = await contacts.addContact(req.body);
    if (data) {
      return res.json({ status: 'succcess', code: 201, payload: { data } });
    };
    return res.status(404).json({ status: 'error', code: 404, message: 'Not found' });
  } catch (error) {
    next(error)
  }
};

module.exports = {
    addNewContact
}