import {ServerErrorCode} from "../constants/ServerErrorCode";
import {LoggerUtil} from "../util/LoggerUtil";
import {HashUtil} from "../util/HashUtil";
import * as emailValidator from "email-validator";
import {ModelLocator} from "../models/ModelLocator";
import {EmailTarget} from "../constants/EmailTarget";
import {ServiceLocator} from "../util/ServiceLocator";
import {Logger} from "log4js";
import {UserModel} from "../models/UserModel";
import {IUserDbEntity, IVerificationCodeDbEntity} from "../types/dbEntity";
import {VerificationCodeModel} from "../models/VerificationCodeModel";
import {DbModelConverter} from "../converter/DbModelConverter";
import {IUserEntity} from "../types/entity";
import {LetterDataConverter} from "../converter/LetterDataConverter";
import {IEmailEntity} from "../types/letter";
import {EmailUtil} from "../util/EmailUtil";
import {ServerEntityConverter} from "../converter/ServerEntityConverter";
import {ISigninResult} from "../../../types/entity";
import {Query} from "mongoose";

const logger: Logger = LoggerUtil.getLoggerForFile(__filename);

export class SignupController {
    public checkUserEmail(email: string, reqIdentifier: string): Promise<boolean> {
        logger.info(`[${reqIdentifier}][checkUserEmail] Attempt to check user email
            \nemail: ${LoggerUtil.stringify(email)}`);

        const userModel: UserModel = ModelLocator.getInstance().getUserModel();

        return userModel.findByEmail(email, reqIdentifier)
            .then((user: IUserDbEntity): boolean => {
                logger.info(`[${reqIdentifier}][checkUserEmail] user with email ${email} fetched successfully
                    \nuser: ${LoggerUtil.stringify(user)}`);

                return user === null;
            })
            .catch((err: Error): any => {
                logger.error(`[${reqIdentifier}][checkUserEmail] user email checking failed!
                    \n${err}`);

                throw err;
            });
    }

    public registerUser(firstName: string,
                        familyName: string,
                        email: string,
                        password: string,
                        verify: string,
                        isOnDispatch: boolean,
                        reqIdentifier: string): Promise<ISigninResult> {
        logger.info(`[${reqIdentifier}][registerUser] Attempt to register user
            \nFirstName: ${LoggerUtil.stringify(firstName)}
            \nFamilyName: ${LoggerUtil.stringify(familyName)}
            \nEmail: ${LoggerUtil.stringify(email)}
            \nPassword: ${LoggerUtil.stringify(password)}
            \nVerify: ${LoggerUtil.stringify(verify)}
            \nisOnDispatch: ${LoggerUtil.stringify(isOnDispatch)}`);

        if (!emailValidator.validate(email)) {
            throw new Error(ServerErrorCode.EMAIL_NOT_VALID);
        }

        const userModel: UserModel = ModelLocator.getInstance().getUserModel();
        const verificationCodeModel: VerificationCodeModel = ModelLocator.getInstance().getVerificationCodeModel();

        const credential: string = HashUtil.encryptPassword(password);

        let _hash: string;
        let _user: IUserDbEntity;
        let _verificationCode: IVerificationCodeDbEntity;

        return userModel.findByEmail(email, reqIdentifier)
            .then((user: IUserDbEntity): Promise<IUserDbEntity> => {
                logger.info(`[${reqIdentifier}][registerUser] user with email ${email} fetched successfully
                    \nuser: ${LoggerUtil.stringify(user)}`);

                if (user && user._id) {
                    throw new Error(ServerErrorCode.EMAIL_NOT_UNIQUE);
                }

                const user2insert: IUserEntity = DbModelConverter.getUser(firstName, familyName, email, credential, isOnDispatch, reqIdentifier);

                return userModel.newUser(user2insert, reqIdentifier);
            })
            .then((user: IUserDbEntity): Promise<string> => {
                logger.info(`[${reqIdentifier}][registerUser] user registered successfully
                    \nuser: ${LoggerUtil.stringify(user)}`);

                _user = user;

                return this._getVerificationCodeHash(reqIdentifier);
            })
            .then((hash: string): Promise<IVerificationCodeDbEntity> => {
                logger.info(`[${reqIdentifier}][registerUser] verification code hash generated successfully
                    \nhash: ${LoggerUtil.stringify(hash)}`);

                _hash = hash;

                const verificationCode2insert = DbModelConverter.getVerificationCode(_user._id, EmailTarget.VERIFY_USER_EMAIL, _hash, reqIdentifier);

                return verificationCodeModel.newVerificationCode(verificationCode2insert, reqIdentifier);
            })
            .then((verificationCode: IVerificationCodeDbEntity): Promise<void> => {
                logger.info(`[${reqIdentifier}][registerUser] verification code added successfully
                    \nverificationCode: ${LoggerUtil.stringify(verificationCode)}`);

                _verificationCode = verificationCode;

                const verifyEmailData: IEmailEntity = LetterDataConverter.getVerifyEmailData(
                    _user._id,
                    _hash,
                    ServiceLocator.getInstance().getDomain(),
                    ServiceLocator.getInstance().getPort().toString(),
                    reqIdentifier,
                );
                const emailUtil: EmailUtil = ServiceLocator.getInstance().getEmailUtil();

                return emailUtil.sendEmail(_user.email, EmailTarget.VERIFY_USER_EMAIL, verifyEmailData, reqIdentifier);
            })
            .then((): ISigninResult => {
                logger.info(`[${reqIdentifier}][registerUser] email sent successfully`);

                return ServerEntityConverter.getSigninResultEntity(_user, reqIdentifier);
            })
            .catch((err: Error): any => {
                logger.error(`[${reqIdentifier}][registerUser] user registration failed!
                    \n${err}`);

                if (_user._id || _verificationCode._id) {
                    return userModel.deleteById(_user._id, reqIdentifier)
                        .then((): Query<void> => verificationCodeModel.deleteById(_verificationCode._id, reqIdentifier))
                        .then((): any => {
                            throw err;
                        });
                } else {
                    throw err;
                }
            });
    }

    public registerUserViaFacebook(name: string, facebookId: number, reqIdentifier: string): Promise<ISigninResult> {
        logger.info(`[${reqIdentifier}][registerUserViaFacebook] Attempt to register user via Facebook
            \nname: ${LoggerUtil.stringify(name)}
            \nfacebookId: ${LoggerUtil.stringify(facebookId)}`);

        const userModel: UserModel = ModelLocator.getInstance().getUserModel();

        return userModel.findByFacebookId(facebookId, reqIdentifier)
            .then((user: IUserDbEntity): Promise<IUserDbEntity> => {
                logger.info(`[${reqIdentifier}][registerUserViaFacebook] user with facebookId ${facebookId} fetched successfully
                    \nuser: ${LoggerUtil.stringify(user)}`);

                if (user && user._id) {
                    throw new Error(ServerErrorCode.FACEBOOK_ID_NOT_UNIQUE);
                }

                const user2insert: IUserEntity = DbModelConverter.getFacebookUser(name, facebookId, reqIdentifier);

                return userModel.newUser(user2insert, reqIdentifier);
            })
            .then((user: IUserDbEntity): ISigninResult => {
                logger.info(`[${reqIdentifier}][registerUserViaFacebook] registered user fetched successfully
                    \nuser: ${LoggerUtil.stringify(user)}`);

                return ServerEntityConverter.getSigninResultEntity(user, reqIdentifier);
            })
            .catch((err: Error): any => {
                logger.error(`[${reqIdentifier}][registerUserViaFacebook] user registration failed!
                    \n${err}`);

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
