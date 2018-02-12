import {ServerErrorCode} from "../constants/ServerErrorCode";
import {LoggerUtil} from "../util/LoggerUtil";
import {HashUtil} from "../util/HashUtil";
import {ModelLocator} from "../models/ModelLocator";
import {Logger} from "log4js";
import {UserModel} from "../models/UserModel";
import {Query, Types} from "mongoose";
import {IUserDbEntity} from "../types/dbEntity";
import {ObjectIdConverter} from "../converter/ObjectIdConverter";

const logger: Logger = LoggerUtil.getLoggerForFile(__filename);

export class SettingsController {
    public applyNewPassword(userId: string, newPassword: string, reqIdentifier: string): Promise<void> {
        logger.info(`[${reqIdentifier}][applyNewPassword] Attempt to apply new password
		    \nuserId: ${LoggerUtil.stringify(userId)}
		    \nnewPassword: ${LoggerUtil.stringify(newPassword)}`);

        const userModel: UserModel = ModelLocator.getInstance().getUserModel();
        const _userId: Types.ObjectId = ObjectIdConverter.getObjectId(userId, reqIdentifier);

        return userModel.findById(_userId, reqIdentifier)
            .then((user: IUserDbEntity): Query<void> => {
                logger.info(`[${reqIdentifier}][applyNewPassword] user fetched successfully
                    \nuser: ${LoggerUtil.stringify(user)}`);

                if (!user) {
                    throw new Error(ServerErrorCode.AUTH_ERROR);
                }

                const credential: string = HashUtil.encryptPassword(newPassword);

                return userModel.updatePassword(user._id, credential, reqIdentifier);
            })
            .catch((err: Error): any => {
                logger.error(`[${reqIdentifier}][applyNewPassword] applying new password failed!
                    \n${err}`);

                throw err;
            });
    }
}
