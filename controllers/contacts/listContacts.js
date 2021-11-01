const { Contact } = require('../../models')

const listContacts = async (req, res) => {
  const { page = 1, limit = 20, favorite } = req.query
  const skip = (page - 1) * limit

  const total = await Contact.find({ owner: req.user._id })
  const pages = Math.ceil(total.length / limit)

  const serverResponse = (total, pages, contacts) => {
    return res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        total: total.length,
        pages,
        resault: contacts
      },
    })
  }

  if (!favorite) {
    const contacts = await Contact.find({ owner: req.user._id }, '_id name email phone favorite owner', { skip, limit: +limit }).populate('owner', '_id email subscription')

    return serverResponse(total, pages, contacts)
  }

  const contacts = await Contact.find({ owner: req.user._id, favorite }, '_id name email phone favorite owner', { skip, limit: +limit }).populate('owner', '_id email subscription')

  serverResponse(total, pages, contacts)
}

module.exports = {
  listContacts,
}
