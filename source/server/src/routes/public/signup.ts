import {ServerErrorCode} from "../../constants/ServerErrorCode";
import {LoggerUtil} from "../../util/LoggerUtil";
import {SignupController} from "../../controllers/SignupController";
import {Logger} from "log4js";
import {IRequest} from "../../types";
import {Response} from "express";
import {ISigninResult} from "../../../../types/entity";
import {IRegisterUserBody, IRegisterUserViaFacebookBody, ISignupCheckEmailBody} from "../../types/body";

const logger: Logger = LoggerUtil.getLoggerForFile(__filename);
const controller: SignupController = new SignupController();

module.exports = {
    registerUser(req: IRequest, res: Response, next: Function): void {
        logger.info(`[${req.identifier}][registerUser] Attempt to register new user.
            \nrequest body: ${LoggerUtil.stringify(req.body)}`);

        const body: IRegisterUserBody = req.body;

        if (!body.firstName || !body.familyName || !body.email || !body.password || !body.verify) {
            logger.error(`[${req.identifier}][registerUser] Request has a field with broken value`);
            res.json({
                success: false,
                errorCode: ServerErrorCode.BAD_REQUEST,
            });

            return next();
        }

        controller.registerUser(body.firstName, body.familyName, body.email, body.password, body.verify, body.isOnDispatch, req.identifier)
            .then((signinResult: ISigninResult): void => {
                res.cookie("userName", signinResult.userName);

                (req as any).session.userId = signinResult.userId;

                if (!res.headersSent)
                    res.json({
                        success: true,
                    });
            })
            .catch((err: Error): any => {
                logger.info(`[${req.identifier}][registerUser] register new user failed!
                    \n${err}`);

                if (!res.headersSent)
                    res.json({
                        success: false,
                        errorCode: err.message,
                    });
            })
            .then((): void => {
                next();
            });
    },

    registerUserViaFacebook(req: IRequest, res: Response, next: Function) {
        logger.info(`[${req.identifier}][registerUserViaFacebook] Attempt to register new user via Facebook.
            \nrequest body: ${LoggerUtil.stringify(req.body)}`);

        const body: IRegisterUserViaFacebookBody = req.body;

        if (!body.name || !body.facebookId) {
            logger.error(`[${req.identifier}][registerUserViaFacebook] Request has a field with broken value`);

            res.json({
                success: false,
                errorCode: ServerErrorCode.BAD_REQUEST,
            });

            return next();
        }

        controller.registerUserViaFacebook(body.name, body.facebookId, req.identifier)
            .then((signinResult: ISigninResult): void => {
                res.cookie("userName", signinResult.userName);

                (req as any).session.userId = signinResult.userId;

                if (!res.headersSent)
                    res.json({
                        success: true,
                    });
            })
            .catch((err: Error): any => {
                logger.info(`[${req.identifier}][registerUserViaFacebook] Attempt to register new user via Facebook failed!
                    \n${err}`);

                if (!res.headersSent)
                    res.json({
                        success: false,
                        errorCode: err.message,
                    });
            })
            .then((): void => {
                next();
            });
    },

    checkEmail(req: IRequest, res: Response, next: Function): void {
        logger.info(`[${req.identifier}][checkEmail] Attempt to check user email.
            \nrequest body: ${LoggerUtil.stringify(req.body)}`);

        const body: ISignupCheckEmailBody = req.body;

        if (!body.email) {
            logger.error(`[${req.identifier}][checkEmail] Request has no email`);

            res.json({
                success: false,
                errorCode: ServerErrorCode.BAD_REQUEST,
            });

            return next();
        }

        controller.checkUserEmail(body.email, req.identifier)
            .then((checkingResult: boolean): void => {
                if (!res.headersSent)
                    res.json({
                        success: true,
                        payload: checkingResult,
                    });
            })
            .catch((err: Error): any => {
                logger.info(`[${req.identifier}][checkEmail] Attempt to check user email failed!
                    \n${err}`);

                if (!res.headersSent)
                    res.json({
                        success: false,
                        errorCode: err.message,
                    });
            })
            .then((): void => {
                next();
            });
    },
};
