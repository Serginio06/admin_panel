import {ModelLocator} from "../models/ModelLocator";
import {LoggerUtil} from "../util/LoggerUtil";
import {ServerErrorCode} from "../constants/ServerErrorCode";
import {Logger} from "log4js";
import {VerificationCodeModel} from "../models/VerificationCodeModel";
import {UserModel} from "../models/UserModel";
import {IVerificationCodeDbEntity} from "../types/dbEntity";
import {Query, Types} from "mongoose";
import {ObjectIdConverter} from "../converter/ObjectIdConverter";

const logger: Logger = LoggerUtil.getLoggerForFile(__filename);

export class VerificationController {
    public verifyUserMail(userId: string, hash: string, reqIdentifier: string): Promise<void> {
        logger.info(`[${reqIdentifier}][verifyUserMail] attempt to verify user email address
            \nuserId: ${LoggerUtil.stringify(userId)}
            \nhash: ${LoggerUtil.stringify(hash)}`);

        const verificationCodeModel: VerificationCodeModel = ModelLocator.getInstance().getVerificationCodeModel();
        const userModel: UserModel = ModelLocator.getInstance().getUserModel();
        const _userId: Types.ObjectId = ObjectIdConverter.getObjectId(userId, reqIdentifier);

        return verificationCodeModel.findByHash(hash, reqIdentifier)
            .then((verificationCode: IVerificationCodeDbEntity): Query<void> => {
                logger.info(`[${reqIdentifier}][verifyUserMail] verification code fetched successfully
                    \nverificationCode: ${LoggerUtil.stringify(verificationCode)}`);

                if (!verificationCode || verificationCode.userId !== _userId) {
                    throw new Error(ServerErrorCode.NOT_FOUND);
                }

                return verificationCodeModel.deleteById(verificationCode._id, reqIdentifier);
            })
            .then((): Query<void> => {
                logger.info(`[${reqIdentifier}][verifyUserMail] verification code deleted successfully`);

                return userModel.verify(_userId, reqIdentifier);
            });
    }
}
