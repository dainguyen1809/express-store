'use strict';

const express = require('express');
const AuthController = require('../../controllers/auth.controller');
const router = express.Router();

router.post('/auth/signup', AuthController.signUp);

module.exports = router;
