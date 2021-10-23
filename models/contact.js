const { Schema, model } = require('mongoose')
const Joi = require('joi')

const reg = /^(\+)?((\d{2,3}) ?\d|\d)(([ -]?\d)|( ?(\d{2,3}) ?)){5,12}\d$/

const contactSchema = Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  }
}, { versionKey: false, timestamps: true })

const joiSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(50)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ru'] } })
    .required(),
  phone: Joi.string()
    .pattern(new RegExp(reg))
    .required(),
  favorite: Joi.boolean()
})

const Contact = model('contact', contactSchema)

module.exports = {
  Contact,
  joiSchema
}