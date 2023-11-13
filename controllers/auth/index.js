const register = require('./register')
const { controllerWrapper } = require("../../helpers")
const login = require('./login')
const current = require('./current')
const logout = require('./logout')
const subscription = require('./subcription')
const updateAvatar = require('./updateAvatar') 
const getAvatar = require("./getAvatar")
const verifyEmail = require("./verifyEmail")
const resendVerifyEmail = require("./resendVerifyEmail")


module.exports = {
    register: controllerWrapper(register), 
    login: controllerWrapper(login), 
    current: controllerWrapper(current),
    logout: controllerWrapper(logout),
     subscription: controllerWrapper(subscription),
      updateAvatar: controllerWrapper(updateAvatar),
       getAvatar: controllerWrapper(getAvatar),
        verifyEmail: controllerWrapper(verifyEmail), 
        resendVerifyEmail: controllerWrapper(resendVerifyEmail),
    }