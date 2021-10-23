const { Contact } = require('../../models')

const listContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find({})

    res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        resault: contacts
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  listContacts,
}
