const { Router } = require('express');
const router = Router();
const authController = require('../controllers/authController');
const { requireAuth } = require('../controllers/authMiddleware');

router.get('/login',authController.loginGet);
router.post('/login',authController.loginPost);
router.get('/signup',authController.signupGet);
router.post('/signup',authController.signupPost);
router.get('/logout',authController.logoutGet);



module.exports = router;