import express from 'express';
import { logInUser, getUserProfile, registerUser, updateUserProfile,getUsers,deleteUser,getUserById,logOutUSer,updateUser } from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, admin, getUsers);
router.post("/register", registerUser)
router.post('/login', logInUser);
router.post('/logout', logOutUSer);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.route('/:id').get( getUserById).delete(protect,admin, deleteUser).put(protect, admin, updateUser);

export default router;