const contacts = require('../../models/contacts')
const Contact = require('../../models/contacts')

const listContacts = async (req, res, next) => {
        const result = await Contact.find({}, 'title author');
        return res.status(200).json(result)   
}

module.exports = listContacts;