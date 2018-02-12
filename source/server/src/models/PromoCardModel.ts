import {Connection, DocumentQuery, Query, Schema, Types} from "mongoose";
import {AbstractModel} from "./AbstractModel";
import {LoggerUtil} from "../util/LoggerUtil";
import {Logger} from "log4js";
import {IPromoCardDbEntity} from "../types/dbEntity";
import {PromoCardStatus} from "../constants/PromoCardStatus";
import {IPromoCardEntity} from "../types/entity";

const logger: Logger = LoggerUtil.getLoggerForFile(__filename);

export class PromoCardModel extends AbstractModel<IPromoCardDbEntity> {
    constructor(dbInstance: Connection) {
        super(dbInstance);

        this._fields = "_id promoId status code acquisitions rejections views shares saves companyInfoShows";

        this._model = this._dbInstance.model("promoCard", new Schema({
            promoId: {
                type: String,
                required: true,
            },
            status: {
                type: String,
                required: true,
            },
            code: {
                type: String,
            },
            acquisitions: {
                type: Number,
                required: true,
            },
            rejections: {
                type: Number,
                required: true,
            },
            saves: {
                type: Number,
                required: true,
            },
            views: {
                type: Number,
                required: true,
            },
            shares: {
                type: Number,
                required: true,
            },
            companyInfoShows: {
                type: Number,
                required: true,
            },
        }));
    }

    public findById(cardId: Types.ObjectId, reqIdentifier: string): Promise<IPromoCardDbEntity> {
        logger.info(`[${reqIdentifier}][findById] attempt to load promo card by id
		    \ncardId: ${LoggerUtil.stringify(cardId)}`);

        return this._model.findOne({_id: cardId}, this._fields)
            .then((card: IPromoCardDbEntity) => card);
    }

    public findByIds(cardIds: Types.ObjectId[], reqIdentifier: string): Promise<IPromoCardDbEntity[]> {
        logger.info(`[${reqIdentifier}][findByIds] attempt to load promo card by ids
		    \ncardIds: ${LoggerUtil.stringify(cardIds)}`);

        return this._model.find({_id: {$in: cardIds}}, this._fields)
            .then((cards: IPromoCardDbEntity[]) => cards);
    }

    public findByPromoIdAndCode(promoId: Types.ObjectId, code: string, reqIdentifier: string): DocumentQuery<IPromoCardDbEntity, IPromoCardDbEntity> {
        logger.info(`[${reqIdentifier}][findByPromoIdAndCode] attempt to load promo card by promoId and code
		    \npromoId: ${LoggerUtil.stringify(promoId)}
		    \ncode: ${LoggerUtil.stringify(code)}`);

        return this._model.findOne({promoId, code}, this._fields);
    }

    public findByPromoIds(promoIds: Types.ObjectId[], reqIdentifier: string): Promise<IPromoCardDbEntity[]> {
        logger.info(`[${reqIdentifier}][findByPromoId] attempt to load promo cards by promo ids
		    \npromoIds: ${LoggerUtil.stringify(promoIds)}`);

        return this._model.find({promoId: {$in: promoIds}}, this._fields)
            .then((cards: IPromoCardDbEntity[]) => cards);
    }

    public changeStatus(cardId: Types.ObjectId, status: PromoCardStatus, reqIdentifier: string): Query<any> {
        logger.info(`[${reqIdentifier}][changeStatus] attempt to change promo card status
            \ncardId: ${LoggerUtil.stringify(cardId)}
            \nstatus: ${LoggerUtil.stringify(status)}`);

        return this._model.update({_id: cardId}, {$set: {status}});
    }

    public newPromoCard(card: IPromoCardEntity, reqIdentifier: string): Promise<IPromoCardDbEntity> {
        logger.info(`[${reqIdentifier}][newPromoCard] attempt to create new promo card
            \ncard: ${LoggerUtil.stringify(card)}`);

        const _card: IPromoCardDbEntity = new this._model(card);

        return _card.save();
    }

    public editPromoCard(card: IPromoCardEntity, cardId: Types.ObjectId, reqIdentifier: string): Promise<IPromoCardDbEntity> {
        logger.info(`[${reqIdentifier}][editPromoCard] attempt to edit promo card
            \ncard: ${LoggerUtil.stringify(card)}
            \ncardId: ${LoggerUtil.stringify(cardId)}`);

        return this._model.findOneAndUpdate({_id: cardId}, card)
            .then((card: IPromoCardDbEntity) => card);
    }

    public incrementAcquisitions(promoCardId: Types.ObjectId, reqIdentifier: string): Promise<IPromoCardDbEntity> {
        logger.info(`[${reqIdentifier}][incrementAcquisition] attempt to increment promo card acquisition value
            \npromoCardId: ${LoggerUtil.stringify(promoCardId)}`);

        return this._model.findOneAndUpdate({_id: promoCardId}, {$inc: {acquisitions: 1}})
            .then((card: IPromoCardDbEntity) => card);
    }

    public incrementRejections(promoCardId: Types.ObjectId, reqIdentifier: string): Promise<IPromoCardDbEntity> {
        logger.info(`[${reqIdentifier}][incrementRejection] attempt to increment promo card rejections value
            \npromoCardId: ${LoggerUtil.stringify(promoCardId)}`);

        return this._model.findOneAndUpdate({_id: promoCardId}, {$inc: {rejections: 1}})
            .then((card: IPromoCardDbEntity) => card)
    }

    public incrementViews(promoCardId: Types.ObjectId, reqIdentifier: string): Promise<IPromoCardDbEntity> {
        logger.info(`[${reqIdentifier}][incrementViews] attempt to increment promo card view value
            \npromoCardId: ${LoggerUtil.stringify(promoCardId)}`);

        return this._model.findOneAndUpdate({_id: promoCardId}, {$inc: {views: 1}})
            .then((card: IPromoCardDbEntity) => card);
    }

    public incrementShares(promoCardId: Types.ObjectId, reqIdentifier: string): DocumentQuery<IPromoCardDbEntity, IPromoCardDbEntity> {
        logger.info(`[${reqIdentifier}][incrementShares] attempt to increment promo card share value
            \npromoCardId: ${LoggerUtil.stringify(promoCardId)}`);

        return this._model.findOneAndUpdate({_id: promoCardId}, {$inc: {shares: 1}});
    }

    public incrementSaves(promoCardId: Types.ObjectId, reqIdentifier: string): Promise<IPromoCardDbEntity> {
        logger.info(`[${reqIdentifier}][incrementSaves] attempt to increment promo card saves value
            \npromoCardId: ${LoggerUtil.stringify(promoCardId)}`);

        return this._model.findOneAndUpdate({_id: promoCardId}, {$inc: {saves: 1}})
            .then((card: IPromoCardDbEntity) => card);
    }

    public incrementCompanyInfoShows(promoCardId: Types.ObjectId, reqIdentifier: string): DocumentQuery<IPromoCardDbEntity, IPromoCardDbEntity> {
        logger.info(`[${reqIdentifier}][incrementCompanyInfoShows] attempt to increment promo card companyInfoShows value
            \npromoCardId: ${LoggerUtil.stringify(promoCardId)}`);

        return this._model.findOneAndUpdate({_id: promoCardId}, {$inc: {companyInfoShows: 1}});
    }

    public deleteByPromoId(promoId: Types.ObjectId, reqIdentifier: string): Query<void> {
        logger.info(`[${reqIdentifier}][deleteByPromoId] attempt to delete promo card by promoId
            \npromoId: ${LoggerUtil.stringify(promoId)}`);

        return this._model.deleteMany({promoId});
    }
}
