import express from "express"
import isAuthenticated from '../middleware/isAuthenticated.js'
import { registerCompany,getAllCompanies ,updateCompany,getCompanyById} from '../controllers/company.controller.js'

const router = express.Router();


router.route("/registercompany").post(isAuthenticated,registerCompany)
router.route("/get").get(isAuthenticated,getAllCompanies)
router.route("/get/:id").get(isAuthenticated,getCompanyById)
router.route("/udpdet/:id").put(isAuthenticated,updateCompany)


export default router;