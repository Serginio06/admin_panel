import {LoggerUtil} from "./util/LoggerUtil";
import * as cors from "cors";
import {releaseIdentifierMiddleware} from "./middleware/requestMiddleware";
import {ModelLocator} from "./models/ModelLocator";
import * as mongoose from "mongoose";
import * as path from "path";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as session from "express-session";
import * as connectMongo from "connect-mongo";
import * as helmet from "helmet";
import * as sanitizer from "express-sanitizer";
import * as mongoSantizer from "express-mongo-sanitize";
import {initRoutes} from "./routes/index";
import {ServiceLocator} from "./util/ServiceLocator";
import {Configuration, Logger} from "log4js";
import {IConfig} from "../../types/config";
import {Connection} from "mongoose";
import {MongoStore, MongoStoreFactory} from "connect-mongo";

const log4jsConfig: Configuration = require("../../../config/log4js");

LoggerUtil.setRoot(__dirname);
LoggerUtil.configure(log4jsConfig);

const logger: Logger = LoggerUtil.getLoggerForFile(__filename);

const app: express.Application = express();
app.use(helmet());

const config: IConfig = require("../../../config/index");

ServiceLocator.getInstance()
    .setDomain(config.domain)
    .setPort(config.port);

ServiceLocator.getInstance()
    .getEmailUtil()
    .configureEmail(config.mail);

app.use(cors()); // for dev purposes when frontend launched localhost

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({
    parameterLimit: 100000,
    limit: "50mb",
    extended: true,
}));

app.use(sanitizer());
app.use(mongoSantizer({
    replaceWith: "_",
}));

app.use(cookieParser() as any);

app.use("/build", express.static(path.join(__dirname, "../../../build")));
app.engine("ejs", require("ejs").renderFile);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

(mongoose as any).Promise = global.Promise;
const connection: Connection = mongoose.createConnection(config.dbUrl);
connection.on("error", (err) => {
    logger.error(`connection to DB error!\n${err}`);
});

connection.on("open", () => {
    ModelLocator.getInstance(connection);

    const MongoStore: MongoStoreFactory = connectMongo(session);
    const store: MongoStore = new MongoStore({mongooseConnection: connection});

    app.use(session({
        ...config.session,
        store,
    }));

    initRoutes(app);

    app.use(releaseIdentifierMiddleware);

    app.listen(process.env.PORT || config.port, (err) => {
        if (err) {
            logger.error("Error on server start. Error: ", err.stack);
        } else {
            /* eslint-disable */
            console.info(`Server is running on port ${config.port}`);
            /* eslint-enable */

            logger.info(`Server is running on port ${config.port}`);
        }
    });
});

