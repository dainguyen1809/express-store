'use strict';

const userModel = require('../models/user.model');
const roles = require('../utils/data-types/enums/role-shop');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const KeyTokenService = require('./keyToken.service');
const { createTokenPairs } = require('../auth/auth.util');
const { getInfoData } = require('../utils');

class AuthService {
  static signUp = async ({ name, email, password }) => {
    try {
      const holderUser = await userModel.findOne({ email }).lean();

      console.log(`holderUser:::::::::::`, holderUser);

      if (holderUser) {
        return {
          code: '1234',
          message: 'Email has been taken',
        };
      }
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = await userModel.create({
        name,
        email,
        password: passwordHash,
        roles: [roles.USER],
      });

      if (newUser) {
        const publicKey = crypto.randomBytes(64).toString('hex');
        const privateKey = crypto.randomBytes(64).toString('hex');

        console.log({ publicKey, privateKey });

        // saving token to collection
        const keyStore = await KeyTokenService.generateKeyToken({
          userId: newUser._id,
          publicKey,
          privateKey,
        });

        console.log('key store:::', keyStore);

        if (!keyStore) {
          return {
            code: '1111',
            message: 'Token invalid!',
          };
        }

        const tokens = await createTokenPairs(
          { userId: newUser._id, email },
          publicKey,
          privateKey
        );
        console.log(`Created Token Successfully:: `, tokens);

        return {
          code: 201,
          metadata: {
            user: getInfoData({
              fields: ['_id', 'name', 'email'],
              object: newUser,
            }),
            tokens,
          },
        };
      }

      return {
        code: 200,
        metadata: null,
      };
    } catch (error) {
      console.error(error);
      return {
        code: '999',
        message: error.message,
        status: 'error',
      };
    }
  };
}

module.exports = AuthService;
