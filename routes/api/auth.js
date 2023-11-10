const express = require("express");
const {
  register,
  login,
  current,
  logout,
  subscription,
} = require("../../controllers/auth");
const { schemas } = require("../../models/user");
const { validationMiddleware, authenticate } = require("../../middlewares");
const wrapper = require('../../helpers/controllerWrapper')
const router = express.Router();


router.post(
    "/register",
    validationMiddleware(schemas.registerSchema),
    wrapper(register)
  );
  router.post("/login", validationMiddleware(schemas.loginSchema), wrapper(login));
  
  router.get("/current", authenticate, wrapper(current));
  
  router.post("/logout", authenticate, wrapper(logout));
  
  router.patch(
    "/users/:userId",
    authenticate,
    validationMiddleware(schemas.updateSchema),
    wrapper(subscription)
  );
  
  module.exports = router;