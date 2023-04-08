const express = require('express');
const router = express.Router();
const passport = require('passport')

const userController = require('../controllers/userController');



// SIGN IN CONTROLLER 
router.post('/create-session',passport.authenticate(
    'local',{
        failureRedirect : '/sign-in'
    }
),userController.createSession);



// RENDERING USER PROFILE 
router.get('/profile',passport.checkAuthentication,userController.profile);
router.post('/add',userController.add);
router.post('/delete',userController.delete);

router.get('/sign-out',userController.signout);



module.exports =router;

