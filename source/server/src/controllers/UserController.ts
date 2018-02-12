import {LoggerUtil} from "../util/LoggerUtil";
import {ModelLocator} from "../models/ModelLocator";
import {ServerErrorCode} from "../constants/ServerErrorCode";
import {Logger} from "log4js";
import {UserModel} from "../models/UserModel";
import {Types} from "mongoose";
import {IUserDbEntity} from "../types/dbEntity";
import {ServerEntityConverter} from "../converter/ServerEntityConverter";
import {ISigninResult} from "../../../types/entity";
import {ObjectIdConverter} from "../converter/ObjectIdConverter";

const logger: Logger = LoggerUtil.getLoggerForFile(__filename);

export class UserController {
    public loadUserInfo(userId: string, reqIdentifier: string): Promise<ISigninResult> {
        logger.info(`[${reqIdentifier}][loadUserInfo] attempt to load info about user
            \nuserId: ${userId}`);

        const userModel: UserModel = ModelLocator.getInstance().getUserModel();
        const _userId: Types.ObjectId = ObjectIdConverter.getObjectId(userId, reqIdentifier);

        return userModel.findById(_userId, reqIdentifier)
            .then((user: IUserDbEntity): ISigninResult => {
                logger.info(`[${reqIdentifier}][loadUserInfo] user fetched successfully
                    \nuser: ${LoggerUtil.stringify(user)}`);

                if (!user) {
                    throw new Error(ServerErrorCode.AUTH_ERROR);
                }

                return ServerEntityConverter.getSigninResultEntity(user, reqIdentifier);
            })
            .catch((err: Error): any => {
                logger.error(`[${reqIdentifier}][loadUserInfo] user info loading failed!\n${err}`);

                throw err;
            });
    }
}
