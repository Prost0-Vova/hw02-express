const { reqError } = require("../helpers/reqError");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(reqError(401));
  }
  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    if (!user) {
      next(reqError(401));
    }
    req.user = user;
    next();
  } catch {
    next(reqError(401));
  }
};

module.exports = authenticate;