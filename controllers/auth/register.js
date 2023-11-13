const {User} = require("../../models/user.js");
const {reqError} = require("../../helpers");
const { sendEmail } = require("../../middlewares")
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const { BASE_URL } = process.env;


const register = async (req, res, next) => {
    const { name, email, password, subscription } = req.body;
    const user = await User.findOne({ email });
  
    if (user) {
      throw reqError(409, "Email in use");
    }
    const verificationToken = nanoid();
    const hashedPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      subscription,
      avatarURL,
      verificationToken,
    });
    const verifyEmail = {
      to: email,
      subject: "Verify your email",
      html: `<h1>Hello ${name}</h1>
          <p>Please verify your email by clicking on the link below</p>
          <a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}"> Verify </a>
          <p>If you did not request this, please ignore this email</p>`,
    };
    await sendEmail(verifyEmail);
  
    res.status(201).json({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      subscription: newUser.subscription,
    });
  };
  
  module.exports = register;