const express = require('express');

const router = express.Router();
const usersApi = require('../../../controller/api/v1/usersApi');


router.post('/create-session', usersApi.createSession);

module.exports = router;