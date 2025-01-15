'use strict';

const express = require('express');
const { apiKey, permission } = require('../auth/auth.check');
const router = express.Router();

// check api token
router.use(apiKey);
// check permission
router.use(permission('00000'));

router.use('/v1/api/', require('./auth'));

// router.get('', (req, res, next) => {
//   return res.status(200).json({
//     message: '123',
//   });
// });

module.exports = router;
