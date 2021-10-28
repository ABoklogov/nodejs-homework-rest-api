const { Contact } = require('../../models')

const listContacts = async (req, res) => {
  const contacts = await Contact.find({ owner: req.user._id }).populate('owner', '_id email subscription')

  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      resault: contacts
    },
  })
}

module.exports = {
  listContacts,
}
