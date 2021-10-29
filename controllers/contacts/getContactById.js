const { Contact } = require('../../models')

const getContactById = async (req, res) => {
  const id = req.params.contactId
  const contact = await Contact.findById(id).populate('owner', '_id email subscription')

  contact
    ? res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        resault: contact
      }
    })
    : res.status(404).json({
      status: 'error',
      code: 404,
      data: null,
      message: 'Not found'
    })
}

module.exports = {
  getContactById
}
