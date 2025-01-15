'use strict';

const JWT = require('jsonwebtoken');

const createTokenPairs = async (payload, publicKey, privateKey) => {
  try {
    const accessToken = JWT.sign(payload, publicKey, {
      expiresIn: '2 days',
    });

    const refreshToken = JWT.sign(payload, privateKey, {
      expiresIn: '7 days',
    });

    JWT.verify(accessToken, publicKey, (err, decode) => {
      if (err) {
        console.error(`Error verify: `, err);
      } else {
        console.log(`Decode verify: `, decode);
      }
    });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error('auth error');
  }
};

module.exports = {
  createTokenPairs,
};
