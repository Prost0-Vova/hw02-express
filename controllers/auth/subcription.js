const { User } = require("../../models/user");
const reqError = require("../../helpers/reqError");

const subscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  const user = await User.findById(_id);
  if (!user) {
    throw reqError(404, "User is nit find");
  }

  user.subscription = subscription;
  await user.save();

  res.json({ message: "Update subscription success", user });
};

module.exports = subscription;