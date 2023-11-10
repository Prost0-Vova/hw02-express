const { User } = require('../../models/user')
const bcrypt = require('bcrypt')
const { reqError } = require('../../helpers')
const jwt = require("jsonwebtoken");


const { JWT_SECRET } = process.env;

const login = async (req, res, next) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
        throw reqError(401, "Email is not valid")
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw reqError(401, "Password is not valid")
    }
    
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
   await User.findByIdAndUpdate(user._id, { token });

   res.status(200).json({ token })

};

module.exports = login;