import {ServerErrorCode} from "../../constants/ServerErrorCode";
import {LoggerUtil} from "../../util/LoggerUtil";
import {SigninController} from "../../controllers/SigninController";
import {Logger} from "log4js";
import {IRequest} from "../../types";
import {Response} from "express";
import {ISigninResult} from "../../../../types/entity";
import {ILoginBody, ILoginViaFacebookBody, IRecoverBody} from "../../types/body";
import {IRecoverParams} from "../../types/params";

const logger: Logger = LoggerUtil.getLoggerForFile(__filename);
const controller: SigninController = new SigninController();

module.exports = {
    login(req: IRequest, res: Response, next: Function): void {
        logger.info(`[${req.identifier}][login] Attempt to login.
            \nrequest body: ${LoggerUtil.stringify(req.body)}`);

        const body: ILoginBody = req.body;

        if (!body.email || !body.password) {
            logger.error(`[${req.identifier}][login] Request has a field with broken value`);
            res.json({
                success: false,
                errorCode: ServerErrorCode.BAD_REQUEST,
            });

            return next();
        }

        controller.login(body.email, body.password, req.identifier)
            .then((signinResult: ISigninResult): void => {
                (req as any).session.userId = signinResult.userId; //@todo fix me

                if (!body.keepLogged) {
                    (req as any).session.cookie.expires = null;
                }

                res.json({
                    success: true,
                    payload: signinResult,
                });
            })
            .catch((err): void => {
                logger.error(`[${req.identifier}][login] Attempt to login failed!
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

    loginViaFacebook(req: IRequest, res: Response, next: Function): void {
        logger.info(`[${req.identifier}][loginViaFacebook] Attempt to login via Facebook.
            \nrequest body: ${LoggerUtil.stringify(req.body)}`);

        const body: ILoginViaFacebookBody = req.body;

        if (!body.facebookId) {
            logger.error(`[${req.identifier}][loginViaFacebook] Request has a field with broken value`);
            res.json({
                success: false,
                errorCode: ServerErrorCode.BAD_REQUEST,
            });

            return next();
        }

        controller.loginViaFacebook(body.facebookId, req.identifier)
            .then((signinResult: ISigninResult): void => {
                (req as any).session.userId = signinResult.userId;

                if (!body.keepLogged) {
                    (req as any).session.cookie.expires = null;
                }

                if (!res.headersSent)
                    res.json({
                        success: true,
                        payload: signinResult,
                    });
            })
            .catch((err: Error): void => {
                logger.error(`[${req.identifier}][loginViaFacebook] Attempt to login via facebook failed!
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

    recoverPass(req: IRequest, res: Response, next: Function): void {
        logger.info(`[${req.identifier}][recoverPass] Attempt to recover password.
            \nrequest body: ${LoggerUtil.stringify(req.body)}`);

        const body: IRecoverBody = req.body;

        if (!body || !body.email) {
            logger.error(`[${req.identifier}][recoverPass] Request has a field with broken value`);
            res.json({
                success: false,
                errorCode: ServerErrorCode.BAD_REQUEST,
            });

            return next();
        }

        controller.recover(body.email, req.identifier)
            .then((): void => {
                res.json({
                    success: true,
                });
            })
            .catch((err) => {
                logger.error(`[${req.identifier}][recoverPass] Attempt to recover pass failed!
                    \n${err}`);

                if (!res.headersSent)
                    res.json({
                        success: false,
                        errorCode: err.message,
                    });
            });
    },

    "recover/:userId/:hash": function (req: IRequest, res: Response, next: Function): void {
        logger.info(`[${req.identifier}][recover] attempt to recover user pass`);

        const params: IRecoverParams = req.params;

        controller.recoverUserPass(params.userId, params.hash, req.identifier)
            .then((): void => {
                logger.info(`[${req.identifier}][recover] user pass recovered successfully`);

                (req as any).session.userId = params.userId;

                res.redirect(301, "/password");
            })
            .then((): void => {
                next();
            });
    },

    logout(req: IRequest, res: Response, next: Function): void {
        logger.info(`[${req.identifier}][logout] Attempt to logout.`);

        try {
            if ((req as any).session) (req as any).session.destroy(() => {});

            if (!res.headersSent)
                res.json({
                    success: true,
                });
        } catch (err) {
            logger.error(`[${req.identifier}][logout] Attempt to logout failed!
                \n${err}`);

            if (!res.headersSent)
                res.json({
                    success: false,
                    errorCode: err.message,
                });
        } finally {
            next();
        }
    },
};
