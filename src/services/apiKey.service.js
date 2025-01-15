'use strict';

const apiKeyModel = require('../models/apiKey.model');
const crypto = require('crypto');
const { PERMISSION } = require('../utils/data-types/enums/role-shop');

const findApiKey = async (key) => {
  //   const newKey = await apiKeyModel.create({
  //     key: crypto.randomBytes(64).toString('hex'),
  //     permissions: PERMISSION.ADMIN,
  //   });

  //   console.log(newKey);

  const objKey = await apiKeyModel.findOne({ key, status: true }).lean();
  return objKey;
};

module.exports = {
  findApiKey,
};
