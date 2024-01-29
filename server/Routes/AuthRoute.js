const { Signup, Login } = require('../Controllers/AuthController');
const { userVerification } = require('../Middlewares/AuthMiddleware');
const router = require('express').Router();

// Middleware for user verification
router.post('/', userVerification);

// Signup route
router.post('/signup', Signup);

// Login route
router.post('/login', Login);

module.exports = router;
