const data = require('../../contactsData')

const getContactById = async (req, res) => {
  try {
    const id = req.params.contactId
    const contact = await data.getContactData(id)

    contact
      ? res.status(200).json({
        status: 'success',
        code: 200,
        data: {
          resault: contact
        }
      })
      : res.status(404).json({
        status: 'rejected',
        code: 404,
        message: 'Not found'
      })
  } catch (error) {
    res.status(404).json({
      status: 'rejected',
      code: 404,
      message: error.message
    })
  }
}

module.exports = {
  getContactById
}
