const validation = (schema) => {
  const validationFunc = (req, res, next) => {
    const { error } = schema.validate(req.body)

    if (error) {
      return res.status(400).json({
        status: 'Bad Request',
        code: 400,
        message: error.details[0].message
      })
    }
    next()
  }
  return validationFunc
}

module.exports = validation
