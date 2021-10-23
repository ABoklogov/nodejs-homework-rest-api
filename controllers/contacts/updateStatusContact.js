const { Contact } = require('../../models')

const updateStatusContact = async (req, res, next) => {
  try {
    const id = req.params.contactId
    const { favorite } = req.body

    if (favorite === undefined) {
      return res.status(400).json({
        status: 'rejected',
        code: 404,
        data: null,
        message: 'missing field favorite'
      })
    }

    const updateContact = await Contact.findByIdAndUpdate(id, { favorite }, { new: true })

    updateContact
      ? res.status(200).json({
        status: 'success',
        code: 200,
        data: {
          resault: updateContact
        }
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
  updateStatusContact
}
