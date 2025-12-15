import express from 'express';
import { login, register, updateProfile, logout } from '../controller/user.controller.js';
import isauthenticated from '../middlewares/isauthenticated.js';
import { singleUpload } from '../middlewares/multer.js'; // Import this


const router = express.Router();

router.route('/login').post(login);
router.route('/register').post(register);
// Add singleUpload middleware here
router.route('/profile/update').post(isauthenticated, singleUpload, updateProfile); 
router.route('/logout').get(logout);

export default router;