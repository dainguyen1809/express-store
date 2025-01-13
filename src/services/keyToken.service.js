'use strict';

const keyTokenModel = require('../models/keyToken.model');

class KeyTokenService {
  static generateKeyToken = async ({ userId, publicKey, privateKey }) => {
    try {
      const publicKeyStr = publicKey.toString();
      const tokens = await keyTokenModel.create({
        userId,
        publicKey,
        privateKey,
      });

      return tokens ? tokens.publicKey : null;
    } catch (error) {
      return error;
    }
  };
}

module.exports = KeyTokenService;
