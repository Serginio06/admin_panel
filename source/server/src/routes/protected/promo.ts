import {LoggerUtil} from "../../util/LoggerUtil";
import {PromoController} from "../../controllers/PromoController";
import {Logger} from "log4js";
import {IRequest} from "../../types";
import {Response} from "express";
import {ICompanyPromosBody, IFinishPromoBody, IPromoBody} from "../../types/body";
import {IPromo, IPromoStatistics} from "../../../../types/entity";

const logger: Logger = LoggerUtil.getLoggerForFile(__filename);
const controller: PromoController = new PromoController();

module.exports = {
    finishPromo(req: IRequest, res: Response, next: Function): void {
        logger.info(`[${req.identifier}][finishPromo] Attempt to finish promo.
		    \nrequest body: ${LoggerUtil.stringify(req.body)}`);

        const body: IFinishPromoBody = req.body;

        controller.finish(body.promoId, (req as any).session.userId, req.identifier)
            .then((promos: IPromo[]): void => {
                if (!res.headersSent)
                    res.json({
                        success: true,
                        payload: promos,
                    });
            })
            .catch((err: Error): void => {
                logger.error(`[${req.identifier}] finishPromo failed!
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

    startPromo(req: IRequest, res: Response, next: Function): void {
        logger.info(`[${req.identifier}][startPromo] Attempt to start promo.
		    \nrequest body: ${LoggerUtil.stringify(req.body)}`);

        const body: IFinishPromoBody = req.body;

        controller.start(body.promoId, (req as any).session.userId, req.identifier)
            .then((promos: IPromo[]): void => {
                res.json({
                    success: true,
                    payload: promos,
                });
            })
            .catch((err: Error): void => {
                logger.error(`[${req.identifier}] startPromo failed!
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

    deletePromo(req: IRequest, res: Response, next: () => void): void {
        logger.info(`[${req.identifier}][deletePromo] Attempt to delete promo.
		    \nrequest body: ${LoggerUtil.stringify(req.body)}`);

        const body: IFinishPromoBody = req.body;

        controller.deletePromo(body.promoId, req.identifier)
            .then((): void => {
                res.json({
                    success: true,
                });
            })
            .catch((err: Error): void => {
                logger.error(`[${req.identifier}] deletePromo failed!
		            \n${err}`);

                if (!res.headersSent) {
                    res.json({
                        success: false,
                        errorCode: err.message,
                    });
                }
            })
            .then((): void => {
                next();
            });
    },

    loadCompanyPromos(req: IRequest, res: Response, next: Function): void {
        logger.info(`[${req.identifier}] Attempt to get promos.
		    \nrequest body: ${LoggerUtil.stringify(req.body)}`);

        const body: ICompanyPromosBody = req.body;

        controller.getPromos(body.companyId, req.identifier)
            .then((promos: IPromo[]): void => {
                if (!res.headersSent)
                    res.json({
                        success: true,
                        payload: promos,
                    });
            })
            .catch((err: Error): void => {
                logger.error(`[${req.identifier}] getPromos failed!
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

    loadCompanyPromoStatistics(req: IRequest, res: Response, next: Function): void {
        logger.info(`[${req.identifier}][loadCompanyPromoStatistics] Attempt to get promo statistics.
		    \nrequest body: ${LoggerUtil.stringify(req.body)}`);

        const body: ICompanyPromosBody = req.body;

        controller.getPromoStatistics(body.companyId, req.identifier)
            .then((statistics: IPromoStatistics[]): void => {
                if (!res.headersSent)
                    res.json({
                        success: true,
                        payload: statistics,
                    });
            })
            .catch((err: Error): void => {
                logger.error(`[${req.identifier}][loadCompanyPromoStatistics] loadCompanyPromoStatistics failed!
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

    newPromo(req: IRequest, res: Response, next: Function): void {
        logger.info(`[${req.identifier}] Attempt to create new promo campaign.
            \nrequest body: ${LoggerUtil.stringify(req.body)}`);

        const body: IPromoBody = req.body;

        controller.newPromo(body.promo, body.isDraft, req.identifier)
            .then((promos: IPromo[]): void => {
                if (!res.headersSent)
                    res.json({
                        success: true,
                        payload: promos,
                    });
            })
            .catch((err: Error): void => {
                logger.error(`[${req.identifier}][newPromo] new promo creation action failed!
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

    editPromo(req: IRequest, res: Response, next: Function): void {
        logger.info(`[${req.identifier}][editPromo] Attempt to edit promo.
            \nrequest body: ${LoggerUtil.stringify(req.body)}`);

        const body: IPromoBody = req.body;

        controller.editPromo(body.promo, body.isDraft, req.identifier)
            .then((promos: IPromo[]): void => {
                if (!res.headersSent)
                    res.json({
                        success: true,
                        payload: promos,
                    });
            })
            .catch((err: Error): void => {
                logger.error(`[${req.identifier}][editPromo] promo editing action failed!
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
