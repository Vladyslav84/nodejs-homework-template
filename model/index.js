
const fs = require('fs/promises');
const path = require('path');
const { v4 } = require("uuid");

const getContacts = async () => {
  return JSON.parse(await fs.readFile(path.join(__dirname, './contacts.json'), 'utf8'));
};

const listContacts = async () => {
  return await getContacts();
};

const getContactById = async (contactId) => {
  const data = await getContacts();
  const [result] = data.filter(contact => contact.id === contactId);
  return result;
};

const removeContact = async (contactId) => {
  const data = await getContacts();
  const filterdData = data.filter(contact => contact.id !== contactId);
  await fs.writeFile(path.join(__dirname, './contacts.json'), JSON.stringify(filterdData));
  const deletedContact = await data.filter(contact => contact.id === contactId);
  return deletedContact;
    
};
   
const addContact = async (contact) => {
  const newContact = { id: v4(), contact };
  const data = await getContacts();
  const updateContacts = [...data, newContact];
  await fs.writeFile(path.join(__dirname, './contacts.json'), JSON.stringify(updateContacts));
  return newContact;
 };

const updateContact = async (contactId, body) => {
  const data = await getContacts();
  const [result] = data.filter(contact => contact.id === contactId);
  if (result) {
    Object.assign(result, body);
    await fs.writeFile(path.join(__dirname, './contacts.json'), JSON.stringify(data));
  }
  return result;

};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
