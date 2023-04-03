const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller')

router.get('/',homeController.home);
router.post('/add',homeController.add);
router.post('/delete',homeController.delete);

module.exports = router;