const Contact = require('../model/schema');

const listContacts = async (userId, query) => {
  try {

    const {sortBy,sortBydesc, filter, favorite = null, limit=5, page = 1 } = query;
    const optionSearch = { owner: userId };
    if (favorite !== null) {
      optionSearch.favorite = favorite;
    };
    const resultList = await Contact.paginate(optionSearch, {
     
      limit,
      page,
      sort: {
        ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
         ...(sortBydesc ? { [`${sortBydesc}`]: -1 } : {}
        )
      },
      select: filter ? filter.split('|').join(' ') : '',
          
    });
    return resultList;
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (userId,contactId) => {
  try {
    return await Contact.findOne({_id: contactId, owner: userId}," name email phone favorite")
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async ( userId,contactId) => {
  try {
    return await Contact.findByIdAndRemove({_id: contactId, owner: userId})
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (userId, contact) => {
  try {
    return await Contact.create({...contact, owner: userId});
  } catch (error) {
    console.log(error.message);
  }
 };

const updateContact = async (userId,contactId, body) => {
try {
    return await Contact.findByIdAndUpdate(
    { _id: contactId, owner: userId },
    { ...body },
    {new:true})
} catch (error) {
  console.log(error.message);
}

};
const updateStatusContact = async (userId, contactId, body) => {
  try {
  const {favorite} = body;
    return await Contact.findByIdAndUpdate(
    { _id: contactId,owner: userId },
    { favorite },
    {new:true})
} catch (error) {
  console.log(error.message);
}
  }

const favoritesContacts = async (userId) => {
  try {
    return Contact.find({ favorite: true, owner: userId }," name email phone favorite");
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
