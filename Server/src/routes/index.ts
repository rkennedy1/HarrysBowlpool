import express from 'express';
import { defaultRoute } from './defaultRoute';
import { gameRoute } from './gameRoute';
import { playerRoute } from './playerRoute';

export const routes = express.Router();

routes.use(defaultRoute);
routes.use(gameRoute);
routes.use(playerRoute);
