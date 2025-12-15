import express from 'express';
import { getAdminJobs, getJobById, getJobs, postJob } from '../controller/job.controller.js';
import isauthenticated from '../middlewares/isauthenticated.js';
const router = express.Router();

router.route('/post').post(isauthenticated,postJob);
router.route('/get').get(isauthenticated,getJobs);
router.route('/getadminjobs').get(isauthenticated,getAdminJobs);

router.route('/get/:id').get(isauthenticated,getJobById);

export default router;

