const { Contact } = require('../../models')

const updateContact = async (req, res) => {
  const id = req.params.contactId

  const updateContact = await Contact.findByIdAndUpdate(id, req.body, { new: true }).populate('owner', '_id email subscription')

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
}

module.exports = {
  updateContact
}
