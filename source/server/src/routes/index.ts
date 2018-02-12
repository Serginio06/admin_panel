import {LoggerUtil} from "../util/LoggerUtil";
import {tokenRequiresMiddleware} from "../middleware/authenticateMiddleware";
import {applyIdentifierMiddleware} from "../middleware/requestMiddleware";
import {apiTokenRequiresMiddleware} from "../middleware/authenticateApiMiddleware";
import * as fs from "fs";
import * as path from "path";
import {Logger} from "log4js";
import {Application} from "express";

const logger: Logger = LoggerUtil.getLoggerForFile(__filename);

function _initRoutes(app: Application, dir: string, isProtected: boolean, isApi: boolean): void {
    const routes: string[] = fs.readdirSync(dir);
    const middleware: Function[] = [applyIdentifierMiddleware];

    if (isProtected) {
        middleware.push(tokenRequiresMiddleware);
    }

    if (isApi) {
        middleware.push(apiTokenRequiresMiddleware);
    }

    const initializedRoutes: string[] = [];

    for (const route of routes) {
        if (route.indexOf(".js") === -1) {
            continue;
        }

        logger.info(`Route ${route} found in ${dir}.`);

        const name: string = route.slice(0, route.indexOf(".js"));
        const routeFile: object = require(`${dir}/${name}`);

        for (const key in routeFile) {
            if (routeFile.hasOwnProperty(key) && initializedRoutes.indexOf(key) === -1) {
                app.use(`/${key}` as any, middleware as any, routeFile[key]);
                initializedRoutes.push(key);

                logger.info(`Method /${key} of route "${name}" initialized.`);
            }
        }
    }
}

export function initRoutes(app: Application): void {
    const publicRoutes: string = path.join(__dirname, "./public");
    const protectedRoutes: string = path.join(__dirname, "./protected");
    const apiRoutes: string = path.join(__dirname, "./api");

    _initRoutes(app, publicRoutes, false, false);
    _initRoutes(app, protectedRoutes, true, false);
    _initRoutes(app, apiRoutes, false, false);
}
