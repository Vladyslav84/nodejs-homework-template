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

const getContactsList = async (req, res, next) => {
    try {
        const data = await contacts.listContacts();
        if (data) {
            res.json({ status: 'succcess', code: 200, payload: { data } })
        };
        return res.status(404).json({ status: 'error', code: 404, message: 'Not found' });

    }
    catch (error) {
        next(error);
    }
};

const getFavoritesContacts = async (req, res, next) => {
    try {
        const data = await contacts.favoritesContacts();
        if (data) {
            res.json({ status: 'succcess', code: 200, payload: { data } })
        };
        return res.status(404).json({ status: 'error', code: 404, message: 'Not found' });

    }
    catch (error) {
        next(error);
    }
};

const getUpdateStatusContact = async (req, res, next) => {
    try {
        const data = await contacts.updateStatusContact(req.params.contactId, req.body);

        if (data) {
            if (!data.favorite) {
                console.log("missing field favorite");
            };

            res.json({ status: 'succcess', code: 200, payload: { data} })
        };
        return res.status(404).json({ status: 'error', code: 404, message: 'Not found' });
    }
    catch (error) {
        next(error);
    }
};


const contactByid = async (req, res, next) => {
    try {
        const data = await contacts.getContactById(req.params.contactId);
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
        const data = await contacts.removeContact(req.params.contactId);
        if (data.length !== 0) {
            return res.json({ status: 'succcess', code: 200, payload: { data } });
        };
        return res.status(404).json({ status: 'error', code: 404, message: 'Not found' });

    } catch (error) {
        next(error)
    };
};

const getUpdateContact = async (req, res, next) => {
    try {
        const data = await contacts.updateContact(req.params.contactId, req.body);
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