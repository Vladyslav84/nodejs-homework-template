const User = require('../model/userSchema');

const findUserById = async (id) => {
  try {
    return await User.findById(id);
  } catch (error) {
    console.log(error.message);
  }
};

const findUserByEmail = async (email) => {

  try {
    return await User.findOne({email});
  } catch (error) {
    console.log(error.message);
  }
};

const createUser = async (body) => {

  try {
      const user = new User(body);
      return await user.save();
  } catch (error) {
    console.log(error.message);
  }
};

const updateToken = async (id, token) => {
  try {
      return await User.updateOne({ _id: id }, {token})
  } catch (error) {
    console.log(error.message);
  }
};

const findUserByToken = async (token) => {
  try {
    return await User.findOne({token});
  } catch (error) {
    console.log(error.message);
  }
};

const updateSubscription = async (userId, body) => {

try {
    return await User.findByIdAndUpdate(
    { _id: userId },
    { ...body },
    {new:true})
} catch (error) {
  console.log(error.message);
}

};

module.exports = {
    findUserById,
    findUserByEmail,
    createUser,
    updateToken,
    findUserByToken,
    updateSubscription
    };