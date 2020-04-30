require('dotenv').config();
const config = {};

config.dbHost = process.env.DB_HOST || 'localhost' ;
config.dbPort = process.env.DB_PORT || '27017';
config.dbName = process.env.DB_NAME || 'UserAuthentication';
config.dbUser = process.env.DB_USER || '';
config.dbPassword = process.env.DB_PASSWORD || '';
config.serverPort = process.env.NODE_PORT || 4000;

config.udemyCourseAPI = "https://www.udemy.com/api-2.0/courses/?search=";
config.authorization = "Basic OVlUQUVYamFVYk9ZSkp6amhmMFlBY3llRE5BYU94MUUzbnZxbEZQRDpXNlJ4Y3Z0TWs3WVBjTEg5Z0hSS0dPVUUzVTBjMEs5emdkOFhQZG42Nml3aVVYRklFV0ZtcGNxNFFhQ2hrS0txeUxQWUZ4Unk1SVJaWW1Ra2xVR05RaDV3OFM2TUZIOXZ5cGpoSTYxTDEwN0lUczd0NXJOVDYzVnB4YzlZeWZBRA==";


export default config;
