import Mongoose from 'mongoose';
import config from '../config/config';
import { error } from 'winston';

Mongoose.Promise = global.Promise;

let url = 'mongodb://';
if (config.dbUser && config.dbPassword)
	url += `${config.dbUser}:${config.dbPassword}@`;

url += `${config.dbHost}:${config.dbPort}/${config.dbName}`;

const mongoDb = async () => {
	try {
		await Mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
		console.log('Connected to mongo!!!');
	} catch (err) {
		console.log('Could not connect to MongoDB',err);
	}
};

export default mongoDb;
