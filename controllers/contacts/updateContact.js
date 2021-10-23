const { Contact } = require('../../models')

const updateContact = async (req, res, next) => {
  try {
    const id = req.params.contactId

    const newContact = await Contact.findByIdAndUpdate(id, req.body, { new: true })

    newContact
      ? res.status(200).json({
        status: 'success',
        code: 200,
        data: {
          resault: newContact
        },
        message: 'Сontact replaced'
      })
      : res.status(404).json({
        status: 'rejected',
        code: 404,
        data: null,
        message: 'Not found'
      })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  updateContact
}
