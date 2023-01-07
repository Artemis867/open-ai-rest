import express, { Express, Request, Response } from 'express';
import { routes } from './routes';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// body parser config
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.disable("etag");
// CORS SETUP
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    res.status(200).json({});
  } else {
    next();
  }
});

//routes
app.use('/', routes);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});