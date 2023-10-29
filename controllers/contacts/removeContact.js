const Contact = require('../../models/contacts')

const removeContact = async (req, res, next) => {
        const { id } = req.params;
        const result = await Contact.findByIdAndRemove(id)
        res.status(200).json(result)
}

module.exports = removeContact;