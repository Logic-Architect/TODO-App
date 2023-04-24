const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController')

// DISPLAY HOME PAGE 
router.get('/',homeController.home);


// DISPLAY SIGN IN 
router.get('/sign-in',homeController.signin);


// DISPLAY SIGN UP
router.get('/sign-up',homeController.signup);
// SIGN UP CONTROLLER 
router.post('/add-user',homeController.addUser);


router.use('/user',require('./user.js'));


module.exports = router;