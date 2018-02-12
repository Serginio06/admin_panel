import {ServerErrorCode} from "../constants/ServerErrorCode";
import {LoggerUtil} from "../util/LoggerUtil";
import {HashUtil} from "../util/HashUtil";
import {ModelLocator} from "../models/ModelLocator";
import {ServiceLocator} from "../util/ServiceLocator";
import {EmailTarget} from "../constants/EmailTarget";
import {Logger} from "log4js";
import {UserModel} from "../models/UserModel";
import {IUserDbEntity, IVerificationCodeDbEntity} from "../types/dbEntity";
import {ServerEntityConverter} from "../converter/ServerEntityConverter";
import {ISigninResult} from "../../../types/entity";
import {VerificationCodeModel} from "../models/VerificationCodeModel";
import {DbModelConverter} from "../converter/DbModelConverter";
import {IVerificationCodeEntity} from "../types/entity";
import {LetterDataConverter} from "../converter/LetterDataConverter";
import {IEmailEntity} from "../types/letter";
import {EmailUtil} from "../util/EmailUtil";
import {Query, Types} from "mongoose";
import {ObjectIdConverter} from "../converter/ObjectIdConverter";

const logger: Logger = LoggerUtil.getLoggerForFile(__filename);

export class SigninController {
    public login(email: string, password: string, reqIdentifier: string): Promise<ISigninResult> {
        logger.info(`[${reqIdentifier}][login] Attempt to login user
		    \nemail: ${LoggerUtil.stringify(email)}
		    \npassword: ${LoggerUtil.stringify(password)}`);

        const userModel: UserModel = ModelLocator.getInstance().getUserModel();

        return userModel.findByEmailAndPassword(email, HashUtil.encryptPassword(password), reqIdentifier)
            .then((user: IUserDbEntity): ISigninResult => {
                logger.info(`[${reqIdentifier}][login] user fetched successfully
				    \n${user}`);

                if (!user) {
                    throw new Error(ServerErrorCode.AUTH_ERROR);
                }

                return ServerEntityConverter.getSigninResultEntity(user, reqIdentifier);
            })
            .catch((err: Error): any => {
                logger.error(`[${reqIdentifier}][login] login failed!
				    \n${err}`);

                throw err;
            });
    }

    public loginViaFacebook(facebookId: number, reqIdentifier: string): Promise<ISigninResult> {
        logger.info(`[${reqIdentifier}][loginViaFacebook] Attempt to login user
            \nfacebookId: ${LoggerUtil.stringify(facebookId)}`);

        const userModel: UserModel = ModelLocator.getInstance().getUserModel();

        return userModel.findByFacebookId(facebookId, reqIdentifier)
            .then((user: IUserDbEntity): ISigninResult => {
                logger.info(`[${reqIdentifier}][loginViaFacebook] user fetched successfully
				    \n${user}`);

                if (!user) {
                    throw new Error(ServerErrorCode.FACEBOOK_ID_NOT_FOUND);
                }

                return ServerEntityConverter.getSigninResultEntity(user, reqIdentifier);
            })
            .catch((err): any => {
                logger.error(`[${reqIdentifier}][loginViaFacebook] login failed!
				    \n${err}`);

                throw err;
            });
    }

    public recover(email: string, reqIdentifier: string): Promise<void> {
        logger.info(`[${reqIdentifier}][recover] Attempt to recover password
            \nemail: ${LoggerUtil.stringify(email)}`);

        const userModel: UserModel = ModelLocator.getInstance().getUserModel();
        const verificationCodeModel: VerificationCodeModel = ModelLocator.getInstance().getVerificationCodeModel();

        let _user: IUserDbEntity = null;
        let _hash: string = null;

        return userModel.findByVerifiedEmail(email, reqIdentifier)
            .then((user: IUserDbEntity): Promise<string> => {
                logger.info(`[${reqIdentifier}][recover] user fetched successfully
                    \n${user}`);

                if (!user) {
                    throw new Error(ServerErrorCode.NOT_FOUND);
                }

                _user = user;

                return this._getVerificationCodeHash(reqIdentifier);
            })
            .then((hash: string): Promise<IVerificationCodeDbEntity> => {
                logger.info(`[${reqIdentifier}][recover] verification code hash generated successfully
                    \n${LoggerUtil.stringify(hash)}`);

                _hash = hash;

                const code2insert: IVerificationCodeEntity = DbModelConverter.getVerificationCode(_user._id, EmailTarget.RECOVER_PASSWORD, _hash, reqIdentifier);

                return verificationCodeModel.newVerificationCode(code2insert, reqIdentifier);
            })
            .then((verificationCode: IVerificationCodeDbEntity): Promise<void> => {
                logger.info(`[${reqIdentifier}][recover] verification code added successfully
                    \n${LoggerUtil.stringify(verificationCode)}`);

                const recoverEmailData: IEmailEntity = LetterDataConverter.getRecoverEmailData(
                    _user._id,
                    _hash,
                    ServiceLocator.getInstance().getDomain(),
                    ServiceLocator.getInstance().getPort().toString(),
                    reqIdentifier,
                );
                const emailUtil: EmailUtil = ServiceLocator.getInstance().getEmailUtil();

                return emailUtil.sendEmail(_user.email, EmailTarget.RECOVER_PASSWORD, recoverEmailData, reqIdentifier);
            })
            .catch((err: Error): any => {
                logger.error(`[${reqIdentifier}][recover] recover failed!
                    \n${err}`);

                throw err;
            });
    }

    public recoverUserPass(userId: string, hash: string, reqIdentifier: string): Promise<void> {
        logger.info(`[${reqIdentifier}][recoverUserPass] Attempt to recover user password
            \nuserId: ${LoggerUtil.stringify(userId)}
            \nhash: ${LoggerUtil.stringify(hash)}`);

        const userModel: UserModel = ModelLocator.getInstance().getUserModel();
        const verificationCodeModel: VerificationCodeModel = ModelLocator.getInstance().getVerificationCodeModel();
        const _userId: Types.ObjectId = ObjectIdConverter.getObjectId(userId, reqIdentifier);

        let _user: IUserDbEntity = null;

        return userModel.findById(_userId, reqIdentifier)
            .then((user: IUserDbEntity): Promise<IVerificationCodeDbEntity> => {
                logger.info(`[${reqIdentifier}][recoverUserPass] user fetched successfully
                    \n${user}`);

                if (!user) {
                    throw new Error(`UserId wasn't found!\nuserId: ${LoggerUtil.stringify(userId)}`);
                }

                _user = user;

                return verificationCodeModel.findByHash(hash, reqIdentifier);
            })
            .then((verificationCode: IVerificationCodeDbEntity): Query<void> => {
                logger.info(`[${reqIdentifier}][recoverUserPass] verification code added successfully
                    \n${LoggerUtil.stringify(verificationCode)}`);

                if (!verificationCode) {
                    throw new Error(ServerErrorCode.NOT_FOUND);
                }
                if (verificationCode.target !== EmailTarget.RECOVER_PASSWORD) {
                    throw new Error(`Wrong verification code target! Code target: ${verificationCode.target}`);
                }
                if (verificationCode.userId !== _userId) {
                    throw new Error(`Wrong verification code userId! Code userId: ${verificationCode.userId}`);
                }

                return verificationCodeModel.deleteById(verificationCode._id, reqIdentifier);
            })
            .catch((err: Error): any => {
                logger.error(`[${reqIdentifier}][recoverUserPass] recover failed!\n${err}`);

                throw err;
            });
    }

    private _getVerificationCodeHash(reqIdentifier: string): Promise<string> {
        logger.info(`[${reqIdentifier}][_getVerificationCodeHash] attempt to generate verification code hash`);

        const verificationCodeModel: VerificationCodeModel = ModelLocator.getInstance().getVerificationCodeModel();
        let count: number = 5;

        const getHash: Function = (): Promise<string> => {
            const hash: string = HashUtil.getRandomHash();

            return verificationCodeModel.findByHash(hash, reqIdentifier)
                .then((verificationCode: IVerificationCodeDbEntity): Promise<string> => {
                    if (verificationCode && verificationCode._id) {
                        count--;
                    } else {
                        return Promise.resolve(hash);
                    }

                    if (count) {
                        return getHash();
                    }
                    throw new Error("Can't generate new hash for verification code!");
                });
        };

        return getHash();
    }
}
