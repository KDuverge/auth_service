const router = require('express').Router();

const { handleError } = require('../service/error');
const { createUser, loginUser } = require('../controller/auth');

router.post('/register', handleError(createUser));
router.post('/login', handleError(loginUser));

module.exports = router;
