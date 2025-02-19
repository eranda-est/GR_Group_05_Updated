const { Router } = require('express');
const { loginUser,registerUser,googleLogin } = require('../controllers/UserControllers');  // Corrected the path import
// const { loginUser,registerUser,googleLogin,forgotPassword, resetPassword, changePassword } = require("../controllers/authController");
// const authMiddleware = require("./authRoutes");


const router = Router();

router.post('/login', loginUser);
router.post("/google-login", googleLogin); 

router.post('/register', registerUser);

// router.post("/forgot-password", forgotPassword);
// router.post("/reset-password", resetPassword);
// router.post("/change-password", authMiddleware, changePassword);

module.exports = router;
