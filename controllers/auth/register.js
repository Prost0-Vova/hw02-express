const {User} = require("../../models/user.js");
const {reqError} = require("../../helpers");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");


const register = async (req, res, next) => {
    const { name, email, password, subscription } = req.body;
    const user = await User.findOne({ email });
  
    if (user) {
      throw reqError(409, "Email in use");
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      subscription,
      avatarURL,
    });
  
    res.status(201).json({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      subscription: newUser.subscription,
    });
  };
  
  module.exports = register;