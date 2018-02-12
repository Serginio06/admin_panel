import {LoggerUtil} from "../../util/LoggerUtil";
import {UserController} from "../../controllers/UserController";
import {ServerErrorCode} from "../../constants/ServerErrorCode";
import {Logger} from "log4js";
import {IRequest} from "../../types";
import {Response} from "express";
import {ILoadUserInfoBody} from "../../types/body";
import {ISigninResult} from "../../../../types/entity";

const logger: Logger = LoggerUtil.getLoggerForFile(__filename);
const controller: UserController = new UserController();

module.exports = {
    loadUserInfo(req: IRequest, res: Response, next: Function): void {
        logger.info(`[${req.identifier}][loadUserInfo] Attempt to load user info.
            \nrequest body: ${LoggerUtil.stringify(req.body)}`);

        const body: ILoadUserInfoBody = req.body;
        const userId: string = (req as any).session.userId;

        controller.loadUserInfo(userId, req.identifier)
            .then((userInfo: ISigninResult): void => {
                if (!res.headersSent)
                    res.json({
                        success: true,
                        payload: userInfo,
                    });
            })
            .catch((err: Error): any => {
                logger.error(`[${req.identifier}][loadUserInfo] Attempt to load user info failed!
                    \n${err}`);

                if (err.message === ServerErrorCode.AUTH_ERROR) {
                    if (!body.resolvePublic && (req as any).session) {
                        (req as any).session.destroy();
                    }
                }

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
