const Contact = require('./schema');

const listContacts = async () => {
  try {
    return await Contact.find({}," name email phone favorite");
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    return await Contact.findOne({_id: contactId}," name email phone favorite")
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    return await Contact.findByIdAndRemove({_id: contactId})
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (contact) => {
  try {
    return await Contact.create(contact);
  } catch (error) {
    console.log(error.message);
  }
 };

const updateContact = async (contactId, body) => {
try {
    return await Contact.findByIdAndUpdate(
    { _id: contactId },
    { ...body },
    {new:true})
} catch (error) {
  console.log(error.message);
}

};
const updateStatusContact = async (contactId, body) => {
  try {
  const {favorite} = body;
    return await Contact.findByIdAndUpdate(
    { _id: contactId },
    { favorite },
    {new:true})
} catch (error) {
  console.log(error.message);
}
  }

const favoritesContacts = async () => {
  try {
    return Contact.find({ favorite: true }," name email phone favorite");
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  listContacts,
  favoritesContacts,
  updateStatusContact,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
