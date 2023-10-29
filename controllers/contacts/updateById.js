const Contact = require('../../models/contacts')

const updateById = async (req, res, next) => {
        const { id } = req.params;
        const result = await Contact.findByIdAndUpdate(id, req.body, {new: true})
        res.status(200).json(result)   
}

module.exports = updateById;