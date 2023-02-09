const { Router } = require('express');
const router = Router();
const authController = require('../controllers/authController');

router.get('/',authController.home);
router.get('/login',authController.loginGet);
router.post('/login',authController.loginPost);
router.get('/signup',authController.signupGet);
router.post('/signup',authController.signupPost);


module.exports = router;