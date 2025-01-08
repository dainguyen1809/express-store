'use strict';

const mongoose = require('mongoose');
const { countConnect, checkOverload } = require('../helpers/check.connect');

const connStr = `mongodb://localhost:27017/techstore`;

class Database {
  /**
   *
   */
  constructor() {
    this.connect();
  }

  connect(type = 'mongodb') {
    if (1 == 1) {
      mongoose.set('debug', true);
      mongoose.set('debug', { color: true });
    }

    mongoose
      .connect(connStr)
      .then((_) => {
        maxPoolsize: 50;
        countConnect();
        console.log(`Connected successfully`);
        checkOverload();
      })
      .catch((err) => {
        console.log(`Error connect`);
      });
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }
}

const instanceMongodb = Database.getInstance();

module.exports = instanceMongodb;
