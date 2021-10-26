const { Schema, model } = require('mongoose')
const Joi = require('joi')

const userSchema = Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    maxlength: 30,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ['starter', 'pro', 'business'],
    default: 'starter'
  },
  token: {
    type: String,
    default: null,
  },
}, { versionKey: false, timestamps: true })

const joiSchema = Joi.object({
  password: Joi.string().min(6).max(30).required(),
  email: Joi.string().required(),
  subscription: Joi.string().default('starter'),
  token: Joi.string().default(null)
})

const User = model('user', userSchema)

module.exports = {
  User,
  joiSchema
}
