const register = require('./register')
const login = require('./login')
const current = require('./current')
const logout = require('./logout')
const subscription = require('./subcription')
const updateAvatar = require('./updateAvatar') 
const getAvatar = require ("./getAvatar")


module.exports = { register, login, current, logout, subscription, updateAvatar, getAvatar }