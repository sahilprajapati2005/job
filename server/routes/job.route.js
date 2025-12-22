// In server/routes/job.route.js
import express from "express";
import isAuthenticated from "../middlewares/isauthenticated.js";
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controller/job.controller.js";
const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(getAllJobs);
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);

// FIX: Remove 'isAuthenticated' from this line
router.route("/get/:id").get(getJobById); 

export default router;