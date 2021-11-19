const { Schema, model } = require('mongoose')
const Joi = require('joi')

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      default: '',
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  },
  { versionKey: false, timestamps: true }
)

const joiSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().required(),
  // subscription: Joi.string().default('starter'),
  // token: Joi.string().default(null),
  // avatarURL: Joi.string().default(''),
})

const User = model('user', userSchema)

module.exports = {
  User,
  joiSchema,
}
