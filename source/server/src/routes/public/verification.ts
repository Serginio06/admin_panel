import {LoggerUtil} from "../../util/LoggerUtil";
import {VerificationController} from "../../controllers/VerificationController";
import {Logger} from "log4js";
import {IRequest} from "../../types";
import {Response} from "express";
import {IVerificationParams} from "../../types/params";

const logger: Logger = LoggerUtil.getLoggerForFile(__filename);
const controller: VerificationController = new VerificationController();

module.exports = {
    "verify/:userId/:hash": function (req: IRequest, res: Response, next: Function): void {
        logger.info(`[${req.identifier}][verify] attempt to verify user email`);

        const body: IVerificationParams = req.body;

        controller.verifyUserMail(body.userId, body.hash, req.identifier)
            .then((): void => {
                logger.info(`[${req.identifier}][verify] user email verified successfully`);

                res.cookie("verifyMessage", "Verification successful :)");
                res.render("../views/verify.ejs");
            })
            .catch((err: Error): any => {
                logger.error(`[${req.identifier}][verify] can't verify user email!
                    \n${err}`);

                res.cookie("verifyMessage", "Something went wrong :(");
                res.render("../views/verify.ejs");
            })
            .then((): void => {
                next();
            });
    },
};
