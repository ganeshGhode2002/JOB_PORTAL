import express from "express"
import isAuthenticated from '../middleware/isAuthenticated.js'
import { getAdminJobs, getAllJobs, getJobById, postJob } from '../controllers/jobs.controller.js'

const router = express.Router();


router.route("/post").post(isAuthenticated, postJob)
router.route("/getAllJobs").get(isAuthenticated, getAllJobs)
router.route("/get/:id").get(isAuthenticated, getJobById)
router.route("/adminJobs").get(isAuthenticated, getAdminJobs)


export default router;