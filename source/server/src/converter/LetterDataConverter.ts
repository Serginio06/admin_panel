import {LoggerUtil} from "../util/LoggerUtil";
import {Logger} from "log4js";
import {Types} from "mongoose";
import {IEmailEntity} from "../types/letter";

const logger: Logger = LoggerUtil.getLoggerForFile(__filename);

export class LetterDataConverter {
    public static getRecoverEmailData(userId: Types.ObjectId,
                                      hash: string,
                                      domain: string,
                                      port: string,
                                      reqIdentifier: string): IEmailEntity {
        logger.info(`[${reqIdentifier}][getRecoverEmailData] attempt to create data for recover email template
            \nuserId: ${LoggerUtil.stringify(userId)}
            \nhash: ${LoggerUtil.stringify(hash)}`);

        return {
            link: `${domain}:${port}/recover/${userId}/${hash}`,
        };
    }

    public static getVerifyEmailData(userId: Types.ObjectId,
                                     hash: string,
                                     domain: string,
                                     port: string,
                                     reqIdentifier: string): IEmailEntity {
        logger.info(`[${reqIdentifier}][getVerifyEmailData] attempt to create data for verification email template
            \nuserId: ${LoggerUtil.stringify(userId)}
            \nhash: ${LoggerUtil.stringify(hash)}`);

        return {
            link: `${domain}:${port}/verify/${userId}/${hash}`,
        };
    }
}