const { Contact } = require('../../models')

const addContact = async (req, res) => {
  const newContact = { ...req.body, owner: req.user._id }
  const { name } = newContact

  const existenceСontact = await Contact.findOne({ name })

  if (existenceСontact) {
    res.status(400).json({
      status: 'conflict',
      code: 400,
      data: null,
      message: `there is already a contact with the name ${name}`
    })
  } else {
    const result = await Contact.create(newContact)
    res.status(201).json({
      status: 'created',
      code: 201,
      data: {
        resault: result
      }
    })
  }
}

module.exports = {
  addContact
}
