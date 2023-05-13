const express = require('express')
const {
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
} = require('./users.controller')


const authRouter = express.Router()

authRouter.post('/register', userRoleAssignment, createUser)
authRouter.get('/users', isLoggedIn, isAdmin, getUsers)
authRouter.get('/users/:id', isLoggedIn, isSelfOrAdmin, getUserById)
authRouter.put('/users/:id', isLoggedIn, isSelfOrAdmin, userRoleAssignment, updateUser)
authRouter.delete('/users/:id', isLoggedIn, isSelfOrAdmin, deleteUser)
authRouter.post('/login', login)
authRouter.post('/logout', logout)

module.exports = authRouter
