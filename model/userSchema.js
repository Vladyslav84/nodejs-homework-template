const { Schema, model } = require('mongoose');
const { Subscription } = require('../helpers/constatnts');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const SALT = 8;
const {nanoid} = require('nanoid')

const userSchema = Schema({

  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,

  },
  subscription: {
    type: String,
    enum: [Subscription.STARTER, Subscription.PRO, Subscription.BUISINESS],
    default: Subscription.STARTER
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: {
    type: String,
    default:function () {
      return gravatar.url(this.email, {s:"250"}, true)
    }
  },
  idCloudAvatar: {
    type: String,
    default: null
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verifyToken: {
    type: String,
    required: true,
    default: nanoid()
  }

}, { versionKey: false, timestamps: true });

userSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.pre('save', async function (next) {
    if (this.isModified("password")) {
        const salt = await bcrypt.genSalt(SALT)
        this.password = await bcrypt.hash(this.password, salt)
    }
    next();
})

const User = model('user', userSchema)

module.exports = User;