const { resolve } = require('path');

exports.default = {
  port: 3100,
  dateFormat: 'DD MMM YY, H:mm:ss',
  logs: {
    directory: resolve(__dirname, 'logs'),
    filename: 'logfile.log',
    handleExceptions: true,
    json: false,
    maxsize: 5242880, // 5MB
    maxFiles: 25,
    colorize: false
  },
  storageLimits: {
    userLoginHistory: 2
  },
  authentication: {
    userPasswordSalt: 8,
    expiresIn: 604800,
    jwtSecret: 'what-are-you-doing'
  },

  development: {
    dialect: 'sqlite',
    host: 'localhost',
    username: 'root',
    password: 'root',
    storage: 'database.sqlite'
  },
  test: {
    dialect: 'sqlite',
    host: 'localhost',
    username: 'root',
    password: 'root',
    storage: 'database-test.sqlite'
  },
  production: {
    dialect: 'sqlite',
    host: 'localhost',
    username: 'root',
    password: 'root',
    storage: 'database-prod.sqlite'
  }
};
