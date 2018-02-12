import {LoggerUtil} from "../../util/LoggerUtil";
import {RichBitController} from "../../controllers/api/RichBitController";
import {Logger} from "log4js";
import {IRequest} from "../../types";
import {Response} from "express";
import {IRichBitInitiateBody, IRichBitRequestBody, ISaveRichBitUserInterestsBody} from "../../types/body";
import {IRichBitUserDbEntity} from "../../types/dbEntity";
import {IRichBitPromoCard} from "../../types/api";

const logger: Logger = LoggerUtil.getLoggerForFile(__filename);
const controller: RichBitController = new RichBitController();

module.exports = {
    saveInterests(req: IRequest, res: Response, next: Function): void {
        logger.info(`[${req.identifier}][saveInterests] attempt to change rich bit user interests.
            \nrequest body: ${LoggerUtil.stringify(req.body)}`);

        const body: ISaveRichBitUserInterestsBody = req.body;

        controller.saveInterests(body.uniqueId, body.interests, req.identifier)
            .then((cards: IRichBitPromoCard[]): void => {
                res.json({
                    success: true,
                    cards,
                    interests: body.interests,
                });
            })
            .catch((err: Error): any => {
                logger.error(`[${req.identifier}][saveInterests] richBit save interests action failed!
                    \n${err}`);

                res.json({
                    success: false,
                });
            })
            .then((): void => {
                next();
            });
    },

    initiate(req: IRequest, res: Response, next: () => void): void {
        logger.info(`[${req.identifier}][initiateAction] attempt to save user data.
            \nrequest body: ${LoggerUtil.stringify(req.body)}`);

        const body: IRichBitInitiateBody = req.body;
        const age: number = 17;

        let _richBitUser: IRichBitUserDbEntity = null;

        controller.saveUserData(body.uniqueId, body.geodata, body.gender, body.locale, age, req.identifier)
            .then((richBitUser: IRichBitUserDbEntity): Promise<IRichBitPromoCard[]> => {
                logger.info(`[${req.identifier}][initiateAction] richBit user fetched or inserted successfully
                    \nrichBitUser: ${LoggerUtil.stringify(richBitUser)}`);

                _richBitUser = richBitUser;

                return controller.getTargetCards(richBitUser, body.geodata, body.locale, req.identifier);
            })
            .then((cards: IRichBitPromoCard[]): void => {
                res.json({
                    success: true,
                    cards,
                    interests: _richBitUser.interests,
                });
            })
            .catch((err: Error): void => {
                logger.error(`[${req.identifier}][initiateAction] richBit initiate action failed!
                    \n${err}`);

                res.json({
                    success: false,
                });
            })
            .then((): void => {
                next();
            });
    },

    userCards(req: IRequest, res: Response, next: Function): void {
        logger.info(`[${req.identifier}][userCards] attempt to get user cards
            \nrequest body: ${LoggerUtil.stringify(req.body)}`);

        const body: IRichBitRequestBody = req.body;

        controller.getUserCards(body.uniqueId, req.identifier)
            .then((cards: IRichBitPromoCard[]): void => {
                res.json({
                    success: true,
                    cards,
                });
            })
            .catch((err: Error): void => {
                logger.error(`[${req.identifier}][userCards] get richBit user cards action failed!
                    \n${err}`);

                res.json({
                    success: false,
                    errorCode: err.message,
                });
            })
            .then((): void => {
                next();
            });
    },

    remove(req: IRequest, res: Response, next: Function): void {
        logger.info(`[${req.identifier}][save] Attempt to remove promo card from a wallet
            \nrequest body: ${LoggerUtil.stringify(req.body)}`);

        const body: IRichBitRequestBody = req.body;

        controller.remove(body.uniqueId, body.cardId, req.identifier)
            .then((): void => {
                res.json({
                    success: true,
                });
            })
            .catch((err: Error): void => {
                logger.error(`[${LoggerUtil.stringify(req.identifier)}][remove] promo card remove action failed!
                    \n${err}`);

                res.json({
                    success: false,
                });
            })
            .then((): void => {
                next();
            });
    },

    open(req: IRequest, res: Response, next: Function): void {
        logger.info(`[${req.identifier}][open] Attempt to open promo card
            \nrequest body: ${LoggerUtil.stringify(req.body)}`);

        const body: IRichBitRequestBody = req.body;

        controller.open(body.uniqueId, body.cardId, req.identifier)
            .then((): void => {
                res.json({
                    success: true,
                });
            })
            .catch((err: Error): void => {
                logger.error(`[${LoggerUtil.stringify(req.identifier)}][open] promo card open action failed!
                    \n${err}`);

                res.json({
                    success: false,
                });
            })
            .then((): void => {
                next();
            });
    },

    skip(req: IRequest, res: Response, next: Function): void {
        logger.info(`[${req.identifier}][skip] Attempt to skip promo card
            \nrequest body: ${LoggerUtil.stringify(req.body)}`);

        const body: IRichBitRequestBody = req.body;

        controller.skip(body.uniqueId, body.cardId, req.identifier)
            .then((): void => {
                res.json({
                    success: true,
                });
            })
            .catch((err: Error): void => {
                logger.error(`[${LoggerUtil.stringify(req.identifier)}][skip] promo card skip action failed!
                    ${err}`);

                res.json({
                    success: false,
                });
            })
            .then((): void => {
                next();
            });
    },

    saveCard(req: IRequest, res: Response, next: Function): void {
        logger.info(`[${req.identifier}][saveCard] Attempt to save promo card to a wallet
                \nrequest body: ${LoggerUtil.stringify(req.body)}`);

        const body: IRichBitRequestBody = req.body;

        controller.save(body.uniqueId, body.cardId, req.identifier)
            .then((): void => {
                res.json({
                    success: true,
                });
            })
            .catch((err: Error): void => {
                logger.error(`[${LoggerUtil.stringify(req.identifier)}][saveCard] promo card save action failed!
                    \n${err}`);

                res.json({
                    success: false,
                });
            })
            .then((): void => {
                next();
            });
    },

    activate(req: IRequest, res: Response, next: Function): void {
        logger.info(`[${req.identifier}][activate] Attempt to activate promo card
                \nrequest body: ${LoggerUtil.stringify(req.body)}`);

        const body: IRichBitRequestBody = req.body;

        controller.activate(body.uniqueId, body.cardId, req.identifier)
            .then((): void => {
                res.json({
                    success: true,
                });
            })
            .catch((err: Error): void => {
                logger.error(`[${LoggerUtil.stringify(req.identifier)}][activate] promo card activate action failed!
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
