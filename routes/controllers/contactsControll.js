const contacts = require('../../repositories/index');

const addNewContact = async (req, res, next) => {
    try {
        const userId = res.locals.user.id;
    const data = await contacts.addContact(userId, req.body);
        if (data) {
         return res.json({ status: 'succcess', code: 201, payload: { data, } });
    };
    return res.status(404).json({ status: 'error', code: 404, message: 'Not found1' });
  } catch (error) {
    next(error)
  }
};

const getContactsList = async (req, res, next) => {
    try {
        const userId = res.locals.user.id;
        const {docs: data, ...rest} = await contacts.listContacts(userId, req.query);
        if (data) {
           return res.json({ status: 'succcess', code: 200, payload: { data, ...rest } })
        };
        return res.status(404).json({ status: 'error', code: 404, message: 'Not found1' });
    }
    catch (error) {
        next(error);
    }
};

const getFavoritesContacts = async (req, res, next) => {
      
    try {
        const userId = res.locals.user.id;
        const {docs: data, ...rest} = await contacts.favoritesContacts(userId);
        if (data) {
           return res.json({ status: 'succcess', code: 200, payload: { data, ...rest } })
        };
        return res.status(404).json({ status: 'error', code: 404, message: 'Not found' });

    }
    catch (error) {
        next(error);
    }
};

const getUpdateStatusContact = async (req, res, next) => {
   
    try {
        const userId = res.locals.user.id;
        const data = await contacts.updateStatusContact( userId,req.params.contactId, req.body);
        
        if (data) {
            if (!data.favorite) {
                console.log("missing field favorite");
            };

            return res.json({ status: 'succcess', code: 200, payload: { data} })
        };
        return res.status(404).json({ status: 'error', code: 404, message: 'Not found' });
    }
    catch (error) {
        next(error);
    }
};


const contactByid = async (req, res, next) => {
   
    try {
        const userId = res.locals.user.id;
        const data = await contacts.getContactById( userId,req.params.contactId);
    if (data) {
            return res.json({ status: 'succcess', code: 200, payload: { data } });
        };
        return res.status(404).json({ status: 'error', code: 404, message: 'Not found' });

    } catch (error) {
        next(error)
    }
};
const deleteContact = async (req, res, next) => {
        try {
         const userId = res.locals.user.id
            const data = await contacts.removeContact(userId, req.params.contactId);
        if (data) {
            return res.json({ status: 'succcess', code: 200, payload: { data } });
        };
        return res.status(404).json({ status: 'error', code: 404, message: 'Not found' });

    } catch (error) {
        next(error)
    };
};

const getUpdateContact = async (req, res, next) => {
   
    try {
         const userId = res.locals.user.id
        const data = await contacts.updateContact( userId,req.params.contactId, req.body);
        if (data) {
            return res.json({ status: 'succcess', code: 200, payload: { data } });
        };
        return res.status(404).json({ status: 'error', code: 404, message: 'Not found' });

    } catch (error) {
        next(error)
    }
};

    module.exports = {
        addNewContact,
        getContactsList,
        getFavoritesContacts,
        getUpdateStatusContact,
        contactByid,
        deleteContact,
        getUpdateContact
    
    };