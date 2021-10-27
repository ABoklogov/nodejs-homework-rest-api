const { Contact } = require('../../models')

const updateContact = async (req, res, next) => {
  try {
    const id = req.params.contactId

    const updateContact = await Contact.findByIdAndUpdate(id, req.body, { new: true })

    updateContact
      ? res.status(200).json({
        status: 'success',
        code: 200,
        data: {
          resault: updateContact
        },
        message: 'Сontact replaced'
      })
      : res.status(404).json({
        status: 'error',
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
