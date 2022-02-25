const { Router } = require("express");
const { register, Login, getMe } = require("../controllers/auth");
// we need to MVC
const router = Router();
router.route("/register").post(register);
router.route("/login").post(Login);
router.route("/me").get(getMe);
module.exports = router;
