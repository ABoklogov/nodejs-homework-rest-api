const data = require('../../contactsData')

const getContactById = async (req, res, next) => {
  try {
    const id = req.params.contactId
    const contact = await data.getContact(id)

    res.json({
      status: 'success',
      code: 200,
      data: {
        resault: contact
      }
    })
  } catch (error) {

  }
}

module.exports = {
  getContactById
}
