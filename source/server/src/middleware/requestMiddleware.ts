import {LoggerUtil} from "../util/LoggerUtil";
import {ServiceLocator} from "../util/ServiceLocator";
import {RequestIdentifierUtil} from "../util/RequestIdentifierUtil";
import {Logger} from "log4js";
import {IRequest} from "../types";
import {Response} from "express";

const requestUtil: RequestIdentifierUtil = ServiceLocator.getInstance().getRequestIdentifierUtil();

const logger: Logger = LoggerUtil.getLoggerForFile(__filename);

export function applyIdentifierMiddleware(req: IRequest, res: Response, next: Function): void {
    req.identifier = requestUtil.getUniqueIdentifier();

    logger.info(`[applyIdentifierMiddleware] Identifier ${req.identifier} applied`);

    next();
}

export function releaseIdentifierMiddleware(req: IRequest, res: Response, next: Function): void {
    if (req.identifier) {
        requestUtil.release(req.identifier);
        logger.info(`[releaseIdentifierMiddleware] Identifier ${req.identifier} released`);
    }
}
