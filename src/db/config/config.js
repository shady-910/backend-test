require('dotenv').config();
const { defaultsDeep } = require('lodash');

const {
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_HOST,
  DB_PORT,
} = process.env;

const defaultConfig = {
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'postgres',
  logging: false,
  define: {
    underscored: true,
  },
  pool: {
    max: 10,
    min: 0,
    acquire: 60000,
  },
};

const envConfigs = {
  test: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
  },
  development: {},
  staging: {},
  sandbox: {},
  production: {},
};

const getConfigs = (configs, defaults) => {
  const result = {};

  Object.entries(configs).forEach((entry) => {
    const [env, config] = entry;
    result[env] = defaultsDeep(config, defaults);
  });
  return result;
};

const configs = getConfigs(envConfigs, defaultConfig);

module.exports = configs;
