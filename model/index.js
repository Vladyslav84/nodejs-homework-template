
const fs = require('fs/promises');
const path = require('path');

const getContacts = async () => {
  return JSON.parse(await fs.readFile(path.join(__dirname, './contacts.json'), 'utf8'));
};

const listContacts = async () => {
  return await getContacts();
};

const getContactById = async (contactId) => {
  // console.log(contactId.id);
  const data = await getContacts()
  return await data.filter(contact => contact.id === contactId);
};

const removeContact = async (contactId) => { }

const addContact = async (body) => { }

const updateContact = async (contactId, body) => { }

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
