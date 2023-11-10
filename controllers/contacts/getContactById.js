const { Contact } = require('../../models/contacts')
const {reqError} = require('../../helpers')

const getContactById = async (req, res, next) => {
        const { id } = req.params;
  const result = await Contact.findById(id)
  if (!result) {
    throw reqError(404);
  }
  res.status(200).json(result);
    
}

module.exports = getContactById;