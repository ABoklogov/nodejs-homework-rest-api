const validationUser = (schema) => {
  const validationFunc = (req, res, next) => {
    const { error } = schema.validate(req.body)

    if (error) {
      return res.status(400).json({
        Status: '400 Bad Request',
        ContentType: 'application/json',
        ResponseBody: 'Ошибка от Joi или другой библиотеки валидации'
      })
    }
    next()
  }
  return validationFunc
}

module.exports = {
  validationUser
}
