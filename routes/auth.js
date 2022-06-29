const express = require('express');
const router = express.Router();
const auth = require('../controller/auth')

router.post('/',auth.signup)
router.post('/token', auth.token)
router.post('/token/refresh', auth.token_refresh)


module.exports = router