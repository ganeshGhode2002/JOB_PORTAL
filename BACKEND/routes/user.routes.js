import express from "express"
import { register, login, logOut ,home} from '../controllers/user.controller.js'

const router = express.Router();


router.route("/register").post(register)
router.route("/home").get(home)

router.route("/login").post(login)
router.route("/logout").get(logOut)

export default router;