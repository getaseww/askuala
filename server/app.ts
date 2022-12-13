import express, { Application,Request,Response, } from "express";
import dotenv from 'dotenv';
import http from 'http';
import compression from 'compression';
import bodyParser from "body-parser";
import cors from 'cors'
import morgan from 'morgan'
import initializeDB from './utilities/database/sequelize'
import routes from "./routers"
import logger from "./utilities/loggers/winston";
import { Error } from "./errors/Error";
import moment from "moment";
import { Messages } from "./errors/Message";


const app: Application = express();
var httpsServer: any;
dotenv.config();
const httpServer = http.createServer(app);
/**
 * passport defination
 *
 */
dotenv.config();

/**
 * Middleware
 */
app.use(compression());
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("combined"));
app.use("/uploads", express.static("uploads"));
app.use("/public", express.static("public"));

/**
 * Initialize Database
 */
initializeDB();

/**
 * Initialize Routes
 */
routes(app);

/**
 * Global Error Handler
 */
app.use((error: any, request: Request, response: Response, next: Function) => {
  if (error instanceof Error) {
    console.log(error);
    logger.error(`Database connection error: ${error}`);
    response.status(error.statusCode).json(error.payload);
  } else {
    console.log(error);
    logger.error(`Database connection error: ${error}`);
    response.status(500).json({
      timestamp: moment(),
      errors: [Messages.INTERNAL_SERVER_ERROR],
    });
  }
});

export { httpServer, httpsServer };
