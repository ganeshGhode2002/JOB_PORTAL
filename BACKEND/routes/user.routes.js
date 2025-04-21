import express from "express"
import isAuthenticated from '../middleware/isAuthenticated.js'
import { register, login, logOut ,home,updateProfile} from '../controllers/user.controller.js'

const router = express.Router();


router.route("/register").post(register)
router.route("/home").get(home)

router.route("/login").post(login)
router.route("/logout").get(logOut)
router.route("/profile/update").put(isAuthenticated, updateProfile)

export default router;