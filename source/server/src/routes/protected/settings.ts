import {LoggerUtil} from "../../util/LoggerUtil";
import {ServerErrorCode} from "../../constants/ServerErrorCode";
import {SettingsController} from "../../controllers/SettingsController";
import {Logger} from "log4js";
import {IRequest} from "../../types";
import {Response} from "express";
import {IApplyNewPasswordBody} from "../../types/body";

const logger: Logger = LoggerUtil.getLoggerForFile(__filename);
const controller: SettingsController = new SettingsController();

module.exports = {
    applyNewPassword(req: IRequest, res: Response, next: Function): void {
        logger.info(`[${req.identifier}][onApplyNewPassword] attempt to apply new password
            \nrequest body: ${LoggerUtil.stringify(req.body)}`);

        const body: IApplyNewPasswordBody = req.body;

        if (!body || !body.newPassword) {
            logger.error(`[${req.identifier}] Request has a field with broken value`);

            res.json({
                success: false,
                errorCode: ServerErrorCode.BAD_REQUEST,
            });

            return next();
        }

        const userId: string = (req as any).session.userId;

        controller.applyNewPassword(userId, body.newPassword, req.identifier)
            .then((): void => {
                if (!res.headersSent)
                    res.json({
                        success: true,
                    });
            })
            .catch((err: Error): void => {
                logger.error(`[${req.identifier}][onApplyNewPassword] attempt to apply new password failed!`);

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
