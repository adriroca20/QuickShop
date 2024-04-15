import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import getToken from '../utils/generateToken.js';
//@desc Auth user & get token
//@route POST /api/users/login
//@access Public
const logInUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({
        email
    })
    if(!user){
        res.status(401)
        throw new Error('Invalid email')
    }
    if (user && (await user.matchPassword(password))) {
        const token = getToken(user._id)
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000 //30 days
        })
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
        return res
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})
//@desc Auth user & get token
//@route POST /api/users/register
//@access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    const userExists = await User.findOne({
        email
    })
    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }
    const user = await User.create({
        name,
        email,
        password
    })
    if (user) {
        const token = getToken(user._id)
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000 //30 days
        })
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    }
    else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})
//@desc log out user
//@route POST /api/users/logout
//@access Public
const logOutUSer = asyncHandler(async (req, res) => {
    res.clearCookie('token')
    res.status(200).json({
        message: 'logged out'
    })
})
//@desc user profile
//@route GET /api/users/profile
//@access Public
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})
//@desc update user profile
//@route GET /api/users/profile
//@access Public
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.password) {
            user.password = req.body.password
        }
        const updatedUser = await user.save()
        const token = getToken(user._id)
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000 //30 days
        })
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})
//@desc get all users
//@route GET /api/users
//@access Public
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.json(users)
})
//@desc get user by id
//@route GET /api/users/:id
//@access Public
const getUserById = asyncHandler(async (req, res) => {
    res.send('get user by id')
})
//@desc delete user
//@route DELETE /api/users/:id
//@access Public
const deleteUser = asyncHandler(async (req, res) => {
    res.send('delete user')
})
//@desc update user
//@route PUT /api/users/:id
//@access Public
const updateUser = asyncHandler(async (req, res) => {
    res.send('update user')
})

export { logInUser, registerUser, logOutUSer, getUserProfile, updateUserProfile, getUsers, getUserById, deleteUser, updateUser }