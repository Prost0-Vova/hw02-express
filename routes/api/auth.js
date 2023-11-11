const express = require("express");
const auth = require("../../controllers/auth");
const { schemas } = require("../../models/user");
const { validationMiddleware, authenticate, upload } = require("../../middlewares");

const router = express.Router();


router.post(
    "/register",
    validationMiddleware(schemas.registerSchema),
    auth.register
  );
  router.post("/login", validationMiddleware(schemas.loginSchema), auth.login);
  
  router.get("/current", authenticate, auth.current);
  
  router.post("/logout", authenticate, auth.logout);

  router.get("/avatars", authenticate, auth.getAvatar);

  router.patch(
    "/users/:userId",
    authenticate,
    validationMiddleware(schemas.updateSchema),
    auth.updateAvatar,
    upload.single("avatar")
    
  );
  
  module.exports = router;