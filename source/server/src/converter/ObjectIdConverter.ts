import {Types} from "mongoose";
import {Logger} from "log4js";
import {LoggerUtil} from "../util/LoggerUtil";

const logger: Logger = LoggerUtil.getLoggerForFile(__filename);

export class ObjectIdConverter {
    public static getObjectId(value: string, reqIdentifier: string): Types.ObjectId {
        logger.info(`[${reqIdentifier}][getObjectId] attempt to create mongoose objectId from string ${value}`);

        return value && value !== "0" ? Types.ObjectId(value) : null;
    }
}
