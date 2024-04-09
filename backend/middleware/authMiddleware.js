import jwt from 'jsonwebtoken'
import asyncHandler from '../middleware/asyncHandler.js'
import User from '../models/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
    if (!req.cookies.token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
    try {
        const decodedUser = jwt.verify(req.cookies.token, process.env.JWT_SECRET)
        req.user = await User.findById(decodedUser._id).select('-password')
        next()
    } catch (error) {
        console.error(error)
        res.status(401)
        throw new Error('Not authorized, token failed')
    }
}
)

const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401)
        throw new Error('Not authorized as an admin')
    }
}

export { protect, admin }