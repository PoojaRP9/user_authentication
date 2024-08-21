const express = require("express")
const router = express.Router()
const controller = require("../controllers/user.controller");
const verifyToken = require("../middleware/verifyToken.middleware");


router.get('/',controller.homePage);


router.get('/signup',controller.userSignup);
router.post('/signup',controller.userSignup);


router.get('/login',controller.userLogin);
router.post('/login',controller.userLogin);

router.get('/logout',controller.userLogout);


router.route('/user').get(verifyToken,controller.getUserProfile);


module.exports = router;