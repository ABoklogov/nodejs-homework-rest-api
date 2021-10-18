const Joi = require('joi')

const contactValidation = (req, res, next) => {
  const reg = /^(\+)?((\d{2,3}) ?\d|\d)(([ -]?\d)|( ?(\d{2,3}) ?)){5,12}\d$/

  const schema = Joi.object({
    name: Joi.string()
      .alphanum()
      .min(2)
      .max(30)
      .required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ru'] } })
      .required(),
    phone: Joi.string()
      .pattern(new RegExp(reg))
      .required(),
  })

  const valitadionResult = schema.validate(req.body)

  if (valitadionResult.error) {
    return res.json({
      status: valitadionResult.error.details[0].message,
      code: 400
    })
  }
  next()
}

module.exports = {
  contactValidation
}
