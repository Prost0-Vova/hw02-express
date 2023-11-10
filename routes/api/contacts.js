
const contactsController = require('../../controllers/contacts')
const wrapper = require('../../helpers/controllerWrapper')
const schema = require('../../schemas/contacts')
const {validationMiddleware} = require("../../middlewares")
const express = require('express')
const router = express.Router()
const {checkOwner} = require("../../middlewares")


router.get('/', wrapper(contactsController.listContacts))

router.get('/:id', wrapper(checkOwner), contactsController.getContactById)

router.post('/',   wrapper(checkOwner), contactsController.addContact)

router.delete('/:id', validationMiddleware(schema.contactSchema), wrapper(checkOwner), contactsController.removeContact)

router.patch("/:id/favorite", validationMiddleware(schema.updateFavoriteSchema), wrapper(checkOwner), contactsController.updateFavorite)

router.put('/:id', wrapper(contactsController.updateById))

module.exports = router;