const express =  require('express');
const router = express.Router();
const controller = require('../controller/user.controller')

router.get('/api/getAllData', controller.getAllData);
router.post('/api/create' , controller.signUp);
router.post('/api/login' , controller.login);

module.exports = router;