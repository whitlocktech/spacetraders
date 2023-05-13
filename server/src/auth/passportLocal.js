const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('../models/user/user.model')

passport.user(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await User.findOne({ username })
            if (!user) {
                return done(null, false, { message: 'Incorrect username' })
            }
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return done(null, false, { message: 'Incorrect password' })
            }
            return done(null, user)
        } catch (error) {
            return done(error)
        }
    })
)

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    done(null, user.id)
})

module.exports = passport