// const User = require('../../model/userSchema');
const Users = require('../../repositories/users');
const { HttpCode } = require('../../helpers/constatnts');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SEC_KEY = process.env.SEC_KEY;

const signUp = async (req, res, next) => {
  console.log('signUp');
    try {
        const user = await Users.findUserByEmail(req.body.email);
    if (user) {
      return res.status(HttpCode.CONFLICT).json({ status: 'error', code: HttpCode.CONFLICT, message: 'Email in use' });
        };
        const {id, email, subscription} = await Users.createUser(req.body);
        return res.status(HttpCode.CREATED).json({ status: 'succes', code: HttpCode.CREATED, id, email, subscription });

  } catch (error) {
    next(error)
  }
};

const logIn = async (req, res, next) => {
    try {
        const user = await Users.findUserByEmail(req.body.email);
        const isValidPassword = await user?.isValidPassword(req.body.password);

    if (!user || !isValidPassword) {
        return res.status(HttpCode.UNAUTHORIZED)
            .json({ status: 'error', code: HttpCode.CONFLICT, message: 'Email or password is wrong' });
      };
        const id = user.id;
        const payload = {id};
        const token = jwt.sign(payload, SEC_KEY, { expiresIn: '2h' });
        await Users.updateToken(id, token);
        const {email, subscription} = await req.body;
        return res.status(HttpCode.OK).json({ status: 'succes', code: HttpCode.OK, email, subscription, token });
        
  } catch (error) {
    next(error)
  }
};

// const logout = async (req, res, next) => {
//     try {
//     const data = await users.addContact(req.body);
//     if (data) {
//       return res.json({ status: 'succcess', code: 201, payload: { data } });
//     };
//     return res.status(404).json({ status: 'error', code: 404, message: 'Not found' });
//   } catch (error) {
//     next(error)
//   }
// };

module.exports = {
    signUp,
    logIn,
    // logout
};