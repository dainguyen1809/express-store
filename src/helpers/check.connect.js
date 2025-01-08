const mongoose = require('mongoose');
const os = require('os');
const SECONDS = 5000;

const countConnect = () => {
  const count = mongoose.connections.length;

  console.log(`Number of connections: ${count}`);
};

const checkOverload = () => {
  setInterval(() => {
    const numberConnections = mongoose.connections.length;
    const numCores = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss;

    const maxConnections = numCores * 5; // example maximum 5 connections

    console.log(`Active connections: ${numberConnections}`);
    console.log(`Memory usage: ${memoryUsage / 1024 / 1024} MB`);

    if (numberConnections > maxConnections) {
      console.log(`Connection overload detached!`);
    }
  }, SECONDS);
};

module.exports = {
  countConnect,
  checkOverload,
};
