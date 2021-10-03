// const User = require('../../model/userSchema');
const Users = require('../../repositories/users');
const { HttpCode } = require('../../helpers/constatnts');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SEC_KEY = process.env.SEC_KEY;

const signUp = async (req, res, next) => {
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

const logout = async (req, res, next) => {
  try {
      const id = req.user.id;
      await Users.updateToken(id, null);
      return res.status(HttpCode.NO_CONTENT).json({ });
  } catch (error) {
    next(error)
  }
};

const currentUser = async (req, res, next) => {
  try {
    const token = await req.headers.authorization.split(' ')[1];
    const { email, subscription } = await Users.findUserByToken(token);
       if ( email && subscription ) {
      return res.json({ status: 'succcess', code: 200, payload:  {email, subscription} });
    };
    return res.status(HttpCode.UNAUTHORIZED).json({ status: 'error', code: 404, message: 'Not authorized' });

  } catch (error) {
    next(error)
  }
};

const getUpdateSubscription = async (req, res, next) => {

       try {
        const userId = res.locals.user.id
        const data = await Users.updateSubscription( userId, req.body);
        if (data) {
            return res.json({ status: 'succcess', code: 200, payload: { data } });
        };
        return res.status(HttpCode.NOT_FOUND).json({ status: 'error', code: 404, message: 'Not found' });

    } catch (error) {
        next(error)
    }
};

module.exports = {
    signUp,
    logIn,
    logout,
    currentUser,
    getUpdateSubscription
};

// {
//    "email": "example@example.com",
//   "password": "examplepassword"
// }

