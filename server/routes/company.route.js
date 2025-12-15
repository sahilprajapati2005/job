import express from 'express';
import isauthenticated from '../middlewares/isauthenticated.js';
import { getCompanyById, registercompany, updateCompany, getCompany } from '../controller/company.controller.js';
import { singleUpload } from '../middlewares/multer.js'; // Import this

const router = express.Router();

router.route('/register').post(isauthenticated, registercompany);
router.get("/get", isauthenticated, getCompany);
router.route('/get/:id').get(isauthenticated, getCompanyById);
// Add singleUpload middleware here
router.route('/update/:id').put(isauthenticated, singleUpload, updateCompany);

export default router;