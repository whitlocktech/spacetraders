const passport = require('passport')
const User = require('../../models/user/user.model')

async function createUser(req, res) {
    try {
        const { username, password, email, role } = req.body
        await user.save()
        res.status(201).json(user)
    } catch (error) {
        res.status(400).json(error)
    }
}

async function getUsers(req, res) {
    try {
        const users = await User.find({})
        res.status(200).json(users)
    } catch (error) {
        res.status(400).json(error)
    }
}

async function getUserById(req, res) {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
    } catch (error) {
        res.status(400).json(error)
    }
}

async function updateUser(req, res) {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
    } catch (error) {
        res.status(400).json(error)
    }
}

async function deleteUser(req, res) {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
    } catch (error) {
        res.status(400).json(error)
    }
}

async function login(req, res, next) {
    passport.authenticate('local', (error, user, info) => {
        if (error) {
            return next(error)
        }
        if (!user) {
            return res.status(400).json({ message: 'Incorrect username or password' })
        }
        req.logIn(user, (error) => {
            if (error) {
                return next(error)
            }
            req.session.userId = user._id
            req.session.username = user.username
            return res.status(200).json(`Logged in as ${user.username}`)
        })
    })(req, res, next)
}

async function logout(req, res) {
    req.logout()
    res.status(200).json('Logged out')
}

async function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.status(401).json('Unauthorized')
}

async function isAdmin(req, res, next) {
    if (req.user.role === 'admin') {
        return next()
    }
    res.status(403).json('Forbidden')
}

async function userRoleAssignment(req, res, next) {
    if (req.body.role === 'admin' && req.user.role !== 'admin') {
        return res.status(403).json('Forbidden')
    }
}

async function isSelfOrAdmin(req, res, next) {
    if (req.user.role === 'admin' || req.user.id === req.params.id) {
        return next()
    }
    res.status(403).json('Forbidden')
}

module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    login,
    logout,
    isLoggedIn,
    isAdmin,
    userRoleAssignment,
    isSelfOrAdmin
}
