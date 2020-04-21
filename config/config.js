require('dotenv').config();
const config = {};

config.dbHost = process.env.DB_HOST || 'localhost' ;
config.dbPort = process.env.DB_PORT || '27017';
config.dbName = process.env.DB_NAME || 'UserAuthentication';
config.dbUser = process.env.DB_USER || '';
config.dbPassword = process.env.DB_PASSWORD || '';
config.serverPort = process.env.NODE_PORT || 4000;


export default config;
