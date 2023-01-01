import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import { Application } from 'express';
import { routes } from './routes';
import bodyParser from 'body-parser';

const app: Application = express();

interface Config {
  name: string;
  port: number;
  host: string;
}

let config: Config = {
  name: 'sample-express-view',
  port: process.env.PORT as unknown as number,
  host: '0.0.0.0'
};

// body-parser
app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(helmet());
app.use(cors());

app.use('/', routes);

app.listen(config.port, config.host, 128, () => {
  console.log(`${config.name} running on ${config.host}:${config.port}`);
});
