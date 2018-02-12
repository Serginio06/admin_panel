import {Connection, DocumentQuery, Query, Schema, Types} from "mongoose";
import {AbstractModel} from "../AbstractModel";
import {LoggerUtil} from "../../util/LoggerUtil";
import {IPromoCard2RichBitUserMapDbEntity as IDbEntity} from "../../types/dbEntity";
import {Logger} from "log4js";

const logger: Logger = LoggerUtil.getLoggerForFile(__filename);

export class PromoCard2RichBitUserMapModel extends AbstractModel<IDbEntity> {
    constructor(dbInstance: Connection) {
        super(dbInstance);

        this._fields = "_id promoCardId richBitUserId";
        this._model = this._dbInstance.model("promoCard2RichBitUser", new Schema({
            promoCardId: {
                type: Schema.Types.ObjectId,
                required: true,
            },

            richBitUserId: {
                type: Schema.Types.ObjectId,
                required: true,
            },

            promoId: {
                type: Schema.Types.ObjectId,
                required: true,
            },
        }));
    }

    public findByRichBitUserIdAndPromoId(richBitUserId: Types.ObjectId,
                                         promoId: Types.ObjectId,
                                         reqIdentifier: string): Promise<IDbEntity> {
        logger.info(`[${reqIdentifier}][findByRichBitUserIdAndPromoId] attempt to find map by richBitUserId and promoId
            \nrichBitUserId: ${richBitUserId}
            \npromoId: ${promoId}`);

        return this._model.findOne({richBitUserId, promoId}, this._fields)
            .then((map: IDbEntity) => map);
    }

    public findByRichBitUserId(richBitUserId: Types.ObjectId, reqIdentifier: string): Promise<IDbEntity[]> {
        logger.info(`[${reqIdentifier}][findByRichBitUserId] attempt to find map by richBitUserId
            \nrichBitUserId: ${richBitUserId}`);

        return this._model.find({richBitUserId}, this._fields)
            .then((maps: IDbEntity[]) => maps);
    }

    public findByPromoCardId(promoCardId: Types.ObjectId, reqIdentifier: string): DocumentQuery<IDbEntity, IDbEntity> {
        logger.info(`[${reqIdentifier}][findByPromoCardId] attempt to find map by promoCardId
            \npromoCardId: ${promoCardId}`);

        return this._model.findOne({promoCardId}, this._fields);
    }

    public findByPromoCardIds(promoCardIds: Types.ObjectId[], reqIdentifier: string): Promise<IDbEntity[]> {
        logger.info(`[${reqIdentifier}][findByPromoCardIds] attempt to find map by promoCardIds
            \npromoCardId: ${promoCardIds}`);

        return this._model.find({promoCardId: {$in: promoCardIds}}, this._fields)
            .then((maps: IDbEntity[]) => maps);
    }

    public newMap(promoCardId: Types.ObjectId,
                  richBitUserId: Types.ObjectId,
                  promoId: Types.ObjectId,
                  reqIdentifier: string): Promise<IDbEntity> {
        logger.info(`[${reqIdentifier}][newMap] attempt to add new map
            \npromoCardId: ${promoCardId}
            \nrichBitUserId: ${richBitUserId}
            \npromoId: ${promoId}`);

        const _map: IDbEntity = new this._model({promoCardId, richBitUserId, promoId});

        return _map.save();
    }

    public removeCard(promoCardId: Types.ObjectId,
                      richBitUserId: Types.ObjectId,
                      reqIdentifier: string): Query<void> {
        logger.info(`[${reqIdentifier}][removeCard] attempt to remove map
            \npromoCardId: ${promoCardId}
            \nrichBitUserId: ${richBitUserId}`);

        return this._model.remove({promoCardId, richBitUserId});
    }

    public deleteByPromoId(promoId: Types.ObjectId, reqIdentifier: string): Query<void> {
        logger.info(`[${reqIdentifier}][deleteByPromoId] attempt to delete map by promoId
            \npromoId: ${LoggerUtil.stringify(promoId)}`);

        return this._model.deleteMany({promoId});
    }
}
