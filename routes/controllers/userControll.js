// const User = require('../../model/userSchema');
const Users = require('../../repositories/users');
const { HttpCode } = require('../../helpers/constatnts');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SEC_KEY = process.env.SEC_KEY;
// const AVATARS_DIR = process.env.AVATARS_DIR;
// const UploadAvatarService = require('../../service/localUpload');
const fs = require('fs/promises');
// const path = require('path');
const UploadCloudinary = require('../../service/cloudUpload');



const signUp = async (req, res, next) => {
    try {
        const user = await Users.findUserByEmail(req.body.email);
    if (user) {
      return res.status(HttpCode.CONFLICT).json({ status: 'error', code: HttpCode.CONFLICT, message: 'Email in use' });
        };
        const {id, email, subscription, avatarURL} = await Users.createUser(req.body);
        return res.status(HttpCode.CREATED).json({ status: 'succes', code: HttpCode.CREATED, id, email, subscription, avatarURL });

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
        const token = jwt.sign(payload, SEC_KEY, { expiresIn: '1d' });
        await Users.updateToken(id, token);
        const {email, subscription} = await req.body;
        return res.status(HttpCode.OK).json({ status: 'succes', code: HttpCode.OK, email, subscription, token });
        
  } catch (error) {
    next(error)
  }
};

const logout = async (req, res, next) => {
  try {
      const id = res.locals.user.id;
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


// for local upload
// const avatars = async (req, res, next) => {
// try {
//   const id = res.locals.user.id;
//   const uploads = new UploadAvatarService(AVATARS_DIR);
//   const avatarUrl = await uploads.saveAvatar({ idUser: id, file: req.file });
//   try {
//     await fs.unlink(path.join(AVATARS_DIR, res.locals.user.avatarURL))

//   } catch (error) {
//     console.log(error);
//   }
//   await Users.updateAvatar(id, avatarUrl);
//   return res.json({ status: 'succcess', code: 200, payload: { avatarUrl } });
//   } catch (error) {
//   next(error)
// }
// };

// for cloud upload

const avatars = async (req, res, next) => {
try {
  const id = res.locals.user.id;
    const uploads = new UploadCloudinary();
  const { idCloudAvatar, avatarURL } = await uploads.saveAvatar(
        req.file.path,
    res.locals.user.idCloudAvatar
  );
  await fs.unlink(req.file.path); // чистимо папку tmp
  await Users.updateAvatar(id, avatarURL, idCloudAvatar);
  return res.json({ status: 'succcess', code: 200, payload: { avatarURL } });
  } catch (error) {
  next(error)
}
};

module.exports = {
    signUp,
    logIn,
    logout,
    currentUser,
  getUpdateSubscription,
    avatars
};


