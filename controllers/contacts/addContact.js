const data = require('../../contactsData')

const addContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body
    const contact = await data.addContactData(name, email, phone)

    contact
      ? res.json({
        status: 'success',
        code: 201,
        data: {
          resault: contact
        }
      })
      : res.json({
        status: 'rejected',
        code: 404,
        message: `there is already a contact with the name ${name}`
      })
  } catch (error) {
    res.json({
      status: 'rejected',
      code: 404,
      message: error.message
    })
  }
}

module.exports = {
  addContact
}
