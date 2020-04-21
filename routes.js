import express from 'express'
import {routeConfig} from './auth/routes.config'
const router = express.Router();

routeConfig(router);

export default router;