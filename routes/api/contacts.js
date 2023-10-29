const contacts = require('../../models/contacts')
const contactsController = require('../../controllers/contacts')
const wrapper = require('../../helpers/controllerWrapper')
const contactSchema = require('../../schemas/contacts')
const validate = require("../../middlewares/validationMiddleware")
const express = require('express')
const router = express.Router()



router.get('/', wrapper(contactsController.listContacts))

router.get('/:id', wrapper(contactsController.getContactById))

router.post('/',  validate(contactSchema), wrapper(contactsController.addContact))

router.delete('/:id', validate(contactSchema), wrapper(contactsController.removeContact))

router.patch("/:id/favorite", validate(contactSchema.updateFavoriteSchema), wrapper(booksController.updateFavorite))

router.put('/:id', wrapper(contactsController.updateById))

module.exports = router;