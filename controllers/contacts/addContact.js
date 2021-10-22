const { Contact } = require('../../models')

const addContact = async (req, res, next) => {
  try {
    const { name } = req.body

    const existenceСontact = await Contact.findOne({ name })

    if (existenceСontact) {
      res.status(400).json({
        status: 'rejected',
        code: 400,
        message: `there is already a contact with the name ${name}`
      })
    } else {
      const result = await Contact.create(req.body)
      res.status(201).json({
        status: 'success',
        code: 201,
        data: {
          resault: result
        }
      })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  addContact
}
