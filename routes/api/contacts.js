
const contactsController = require('../../controllers/contacts')
const wrapper = require('../../helpers/controllerWrapper')
const schema = require('../../schemas/contacts')
const validate = require("../../middlewares/validationMiddleware")
const express = require('express')
const router = express.Router()



router.get('/', wrapper(contactsController.listContacts))

router.get('/:id', wrapper(contactsController.getContactById))

router.post('/',   wrapper(contactsController.addContact))

router.delete('/:id', validate(schema.contactSchema), wrapper(contactsController.removeContact))

router.patch("/:id/favorite", validate(schema.updateFavoriteSchema), wrapper(contactsController.updateFavorite))

router.put('/:id', wrapper(contactsController.updateById))

module.exports = router;