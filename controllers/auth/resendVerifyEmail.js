const { User } = require("../../models/user");
const { reqError } = require("../../helpers");
const { sendEmail } = require("../../middlewares")

const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw reqError(401, "Email not found");
  }
  if (user.verify) {
    throw reqError(400, "Verification has already been passed");
  }
  const verifyEmail = {
    to: email,
    subject: "Verify your email",
    html: `<h1>Hello ${user.name}</h1>
        <p>If you want to verify your email, click on the link below.</p>
        <a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}"> Verify </a>
        <p>If you did not request this, please ignore this email</p>`,
  };

  await sendEmail(verifyEmail);

  res.json({ message: "Email is verified successfully" });
};

module.exports = resendVerifyEmail;