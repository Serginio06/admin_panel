import {Connection, DocumentQuery, Schema, Types} from "mongoose";
import {AbstractModel} from "../AbstractModel";
import {LoggerUtil} from "../../util/LoggerUtil";
import {IRichBitUserDbEntity} from "../../types/dbEntity";
import {Logger} from "log4js";
import {PromoTargetInterest} from "../../../../types/constants/PromoTargetInterest";
import {IGeodata, IRichBitUserEntity} from "../../types/entity";

const logger: Logger = LoggerUtil.getLoggerForFile(__filename);

export class RichBitUserModel extends AbstractModel<IRichBitUserDbEntity>  {
    constructor(dbInstance: Connection) {
        super(dbInstance);

        this._fields = "_id uniqueId interests locale geodata sex age open skip activate saved removed";
        this._model = this._dbInstance.model("richBitUser", new Schema({
            uniqueId: {
                type: String,
                required: true,
                unique: true,
            },
            interests: {
                type: Array,
                required: false,
            },
            geodata: {
                lat: {
                    type: String,
                    required: true,
                },
                lng: {
                    type: String,
                    required: true,
                },
            },
            locale: {
                type: String,
                required: false,
            },
            sex: {
                type: String,
                required: true,
            },
            age: {
                type: Number,
                required: true,
            },
            open: {
                type: Number,
                required: false,
            },
            skip: {
                type: Number,
                required: false,
            },
            activate: {
                type: Number,
                required: false,
            },
            saved: {
                type: Number,
                required: false,
            },
            removed: {
                type: Number,
                required: false,
            },
        }));
    }

    public findByUniqueId(uniqueId: string, reqIdentifier: string): DocumentQuery<IRichBitUserDbEntity, IRichBitUserDbEntity> {
        logger.info(`[${reqIdentifier}][findByUniqueId] attempt to find richBit user by uniqueId
            \nuniqueId: ${LoggerUtil.stringify(uniqueId)}`);

        return this._model.findOne({uniqueId}, this._fields);
    }

    public changeInterests(richBitUserId: Types.ObjectId,
                           interests: PromoTargetInterest[],
                           reqIdentifier: string): Promise<IRichBitUserDbEntity> {
        logger.info(`[${reqIdentifier}][changeStatus] attempt to change promo card status
            \nrichBitUserId: ${LoggerUtil.stringify(richBitUserId)}
            \ninterests: ${LoggerUtil.stringify(interests)}`);

        return this._model.update({_id: richBitUserId}, {$set: {interests}})
            .then(() => this._model.findById(richBitUserId));
    }

    public newRichBitUser(richBitUser: IRichBitUserEntity, reqIdentifier: string): Promise<IRichBitUserDbEntity> {
        logger.info(`[${reqIdentifier}][findByUniqueId] attempt to create new richBit user
            \nrichBitUser: ${LoggerUtil.stringify(richBitUser)}`);

        const _user: IRichBitUserDbEntity = new this._model(richBitUser);

        return _user.save();
    }

    public setGeodataAndLocale(richBitUserId: Types.ObjectId, geodata: IGeodata, locale: string, reqIdentifier: string): Promise<IRichBitUserDbEntity> {
        logger.info(`[${reqIdentifier}][setGeodata] attempt to set rich bit user geodata
            \ngeodata: ${LoggerUtil.stringify(geodata)}`);

        return this._model.update({_id: richBitUserId}, {$set: {geodata, locale}})
            .then(() => this._model.findById(richBitUserId, this._fields));
    }

    public incrementOpen(uniqueId: string, reqIdentifier: string): Promise<IRichBitUserDbEntity> {
        logger.info(`[${reqIdentifier}][incrementOpen] attempt to increment richBit user card open value
            \nuniqueId: ${LoggerUtil.stringify(uniqueId)}`);

        return this._model.findOneAndUpdate({uniqueId}, {$inc: {open: 1}})
            .then((richBitUser: IRichBitUserDbEntity) => richBitUser);
    }

    public incrementSkip(uniqueId: string, reqIdentifier: string): Promise<IRichBitUserDbEntity> {
        logger.info(`[${reqIdentifier}][incrementOpen] attempt to increment richBit user card skip value
            \nuniqueId: ${LoggerUtil.stringify(uniqueId)}`);

        return this._model.findOneAndUpdate({uniqueId}, {$inc: {skip: 1}})
            .then((richBitUser: IRichBitUserDbEntity) => richBitUser);
    }

    public incrementActivate(uniqueId: string, reqIdentifier: string): Promise<IRichBitUserDbEntity> {
        logger.info(`[${reqIdentifier}][incrementOpen] attempt to increment richBit user card activate value
            \nuniqueId: ${LoggerUtil.stringify(uniqueId)}`);

        return this._model.findOneAndUpdate({uniqueId}, {$inc: {activate: 1}})
            .then((richBitUser: IRichBitUserDbEntity) => richBitUser);
    }

    public incrementSave(uniqueId: string, reqIdentifier: string): Promise<IRichBitUserDbEntity> {
        logger.info(`[${reqIdentifier}][incrementSave] attempt to increment richBit user card save value
            \nuniqueId: ${LoggerUtil.stringify(uniqueId)}`);

        return this._model.findOneAndUpdate({uniqueId}, {$inc: {saved: 1}})
            .then((richBitUser: IRichBitUserDbEntity) => richBitUser);
    }

    public incrementRemove(uniqueId: string, reqIdentifier: string): Promise<IRichBitUserDbEntity> {
        logger.info(`[${reqIdentifier}][incrementRemove] attempt to increment richBit user card remove value
            \nuniqueId: ${LoggerUtil.stringify(uniqueId)}`);

        return this._model.findOneAndUpdate({uniqueId}, {$inc: {removed: 1}})
            .then((richBitUser: IRichBitUserDbEntity) => richBitUser);
    }
}
