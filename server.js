const app = require('./src/app');

const PORT = process.env.DEV_APP_PORT || 8000;

const server = app.listen(PORT, () => {
  console.log(`Server Listening ${PORT}`);
});

process.on('SIGINT', () => {
  server.close(() => {
    console.log(`Exit Server`);
  });
});
