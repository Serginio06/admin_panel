import {LoggerUtil} from "../../util/LoggerUtil";
import {PromoCardController} from "../../controllers/api/PromoCardController";
import {Logger} from "log4js";
import {IRequest} from "../../types";
import {Response} from "express";
import {IPromoCardBody} from "../../types/body";

const logger: Logger = LoggerUtil.getLoggerForFile(__filename);
const controller: PromoCardController = new PromoCardController();

module.exports = {
    acquisition(req: IRequest, res: Response, next: Function): void {
        logger.info(`[${req.identifier}][acquisition] Attempt to increment promo card acquisitions value
            \nrequest body: ${LoggerUtil.stringify(req.body)}`);

        const body: IPromoCardBody = req.body;

        controller.acquisition(body.cardId, req.identifier)
            .then((): void => {
                logger.info(`[${LoggerUtil.stringify(req.identifier)}][acquisition] promo card acquisitions value incremented successfully`);

                res.json({
                    success: true,
                });
            })
            .catch((err: Error): void => {
                logger.error(`[${LoggerUtil.stringify(req.identifier)}][acquisition] promo card acquisitions value incremented failed!
                    \n${err}`);

                res.json({
                    success: false,
                });
            })
            .then((): void => {
                next();
            });
    },

    share(req: IRequest, res: Response, next: Function): void {
        logger.info(`[${req.identifier}][share] Attempt to increment promo card shares value
            \nrequest body: ${LoggerUtil.stringify(req.body)}`);

        const body: IPromoCardBody = req.body;

        controller.share(body.cardId, req.identifier)
            .then((): void => {
                logger.info(`[${LoggerUtil.stringify(req.identifier)}][share] promo card shares value incremented successfully`);

                res.json({
                    success: true,
                });
            })
            .catch((err: Error): void => {
                logger.error(`[${LoggerUtil.stringify(req.identifier)}][share] promo card shares value incremented failed!
                    \n${err}`);

                res.json({
                    success: false,
                });
            })
            .then((): void => {
                next();
            });
    },

    showCompanyInfo(req: IRequest, res: Response, next: Function): void {
        logger.info(`[${req.identifier}][showCompanyInfo] Attempt to increment promo card showCompanyInfo value
            \nrequest body: ${LoggerUtil.stringify(req.body)}`);

        const body: IPromoCardBody = req.body.cardId;

        controller.showCompanyInfo(body.cardId, req.identifier)
            .then((): void => {
                logger.info(`[${LoggerUtil.stringify(req.identifier)}][share] promo card showCompanyInfo value incremented successfully`);

                res.json({
                    success: true,
                });
            })
            .catch((err: Error): void => {
                logger.error(`[${LoggerUtil.stringify(req.identifier)}][share] promo card showCompanyInfo value incremented failed!
                    \n${err}`);

                res.json({
                    success: false,
                });
            })
            .then((): void => {
                next();
            });
    },
};
