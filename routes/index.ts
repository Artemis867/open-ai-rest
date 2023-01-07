import express from 'express';
import { defaultRoute } from './defaultRoute';
import { generateRoute } from './generate';

export const routes = express.Router();
routes.use(defaultRoute);
routes.use(generateRoute);