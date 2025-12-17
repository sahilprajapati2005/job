// import express from 'express';
// import { getAdminJobs, getJobById, getJobs, postJob } from '../controller/job.controller.js';
// import isauthenticated from '../middlewares/isauthenticated.js';
// const router = express.Router();

// router.route('/post').post(isauthenticated,postJob);
// router.route('/get').get(isauthenticated,getJobs);

// router.route('/getadminjobs').get(isauthenticated,getAdminJobs);


// router.route('/get/:id').get(isauthenticated,getJobById);

// export default router;

import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controller/job.controller.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);

// FIX: Removed 'isAuthenticated' so homepage works for everyone
router.route("/get").get(getAllJobs); 

router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);
router.route("/get/:id").get(isAuthenticated, getJobById);

export default router;


