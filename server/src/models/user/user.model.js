const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const bcrypt = require('bcrypt')

const userSchema = require('./user.mongo')

userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        return next()
    }
    bcrypt.genSalt(10, (error, salt) => {
        if (error) {
            return next(error)
        }
        bcrypt.hash(user.password, salt, (error, hash) => {
            if (error) {
                return next(error)
            }
            user.password = hash
            next()
        })
    })
})

userSchema.plugin(passportLocalMongoose, {
    usernameField: 'username',
    passwordField: 'password',
    
})

const User = mongoose.model('User', userSchema)

module.exports = User