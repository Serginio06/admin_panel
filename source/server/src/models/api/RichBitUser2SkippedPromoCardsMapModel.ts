import {Connection, DocumentQuery, Schema, Types} from "mongoose";
import {AbstractModel} from "../AbstractModel";
import {LoggerUtil} from "../../util/LoggerUtil";
import {IRichBitUser2SkippedCardsMapDbEntity as IDbEntity} from "../../types/dbEntity";
import {Logger} from "log4js";

const logger: Logger = LoggerUtil.getLoggerForFile(__filename);

export class RichBitUser2SkippedPromoCardsMapModel extends AbstractModel<IDbEntity> {
    constructor(dbInstance: Connection) {
        super(dbInstance);

        this._fields = "_id richBitUserId promoCardIds";
        this._model = this._dbInstance.model("richBitUser2skippedPromoCardMap", new Schema({
            richBitUserId: {
                type: Schema.Types.ObjectId,
                required: true,
                unique: true,
            },

            promoCardIds: {
                type: Array,
                required: false,
            },
        }));
    }

    public findByRichBitUserId(richBitUserId: Types.ObjectId, reqIdentifier: string): Promise<IDbEntity> {
        logger.info(`[${reqIdentifier}][findByRichBitUserId] attempt to find skipped promo cards array by richBitUserId
            \nrichBitUserId: ${LoggerUtil.stringify(richBitUserId)}`);

        return this._model.findOne({richBitUserId}, this._fields)
            .then((map: IDbEntity) => map);
    }

    public newMap(richBitUserId: Types.ObjectId, reqIdentifier: string): Promise<IDbEntity> {
        logger.info(`[${reqIdentifier}][newMap] attempt to create new richBit user to skipped promo card map
            \nrichBitUserId: ${LoggerUtil.stringify(richBitUserId)}`);

        const map: IDbEntity = new this._model({richBitUserId, promoCardIds: []});

        return map.save();
    }

    public addToSkippedCards(richBitUserId: Types.ObjectId,
                             promoCardId: Types.ObjectId,
                             reqIdentifier: string): Promise<IDbEntity> {
        logger.info(`[${reqIdentifier}][addToSkippedCards] attempt to add promoCardId to skipped cards array
            \nrichBitUserId: ${richBitUserId}
            \npromoCardId: ${promoCardId}`);

        return this._model.findOne({richBitUserId: richBitUserId}, this._fields)
            .then((map: IDbEntity) => {
                logger.info(`[${reqIdentifier}][addToSkippedCards] map fetched successfully
                    \nmap: ${LoggerUtil.stringify(map)}`);

                if (!map || !map._id) {
                    const _map: IDbEntity = new this._model({richBitUserId, promoCardIds: [promoCardId]});

                    return _map.save();
                }

                if (map.promoCardIds.indexOf(promoCardId) === -1) {
                    return this._model.findOneAndUpdate({richBitUserId}, {$push: {promoCardIds: promoCardId}});
                }
            });
    }
}
