const router = require('express').Router();

const homeController = require('../controller/home_controller');

router.get('/', homeController.home);

router.use('/users', require('./users'));

console.log("Router loaded")
module.exports = router;