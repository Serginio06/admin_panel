import {AbstractModel} from "./AbstractModel";
import {LoggerUtil} from "../util/LoggerUtil";
import {IVerificationCodeDbEntity} from "../types/dbEntity";
import {Connection, Query, Schema, Types} from "mongoose";
import {IVerificationCodeEntity} from "../types/entity";

const logger = LoggerUtil.getLoggerForFile(__filename);

export class VerificationCodeModel extends AbstractModel<IVerificationCodeDbEntity> {
    constructor(dbInstance: Connection) {
        super(dbInstance);

        this._fields = "_id userId target hash";
        this._model = this._dbInstance.model("verificationCode", new Schema({
            userId: {
                type: String,
                required: true,
            },
            target: {
                type: String,
                required: true,
            },
            hash: {
                type: String,
                required: true,
                unique: true,
            },
        }));
    }

    public findByHash(hash: string, reqIdentifier: string): Promise<IVerificationCodeDbEntity> {
        logger.info(`[${reqIdentifier}][findByHash] attempt to load verification code by hash
            \nhash: ${LoggerUtil.stringify(hash)}`);

        return this._model.findOne({hash}, this._fields)
            .then((code: IVerificationCodeDbEntity) => code);
    }

    public deleteById(verificationCodeId: Types.ObjectId, reqIdentifier: string): Query<void> {
        logger.info(`[${reqIdentifier}][deleteById] attempt to delete verification code by id
            \nverificationCodeId: ${LoggerUtil.stringify(verificationCodeId)}`);

        return this._model.deleteOne({_id: verificationCodeId});
    }

    public newVerificationCode(verificationCode: IVerificationCodeEntity, reqIdentifier: string): Promise<IVerificationCodeDbEntity> {
        logger.info(`[${reqIdentifier}][newVerificationCode] attempt to create new verification code
            \nverificationCode: ${LoggerUtil.stringify(verificationCode)}`);

        return this._model.create(verificationCode)
            .then((): Promise<IVerificationCodeDbEntity> => this.findByHash(verificationCode.hash, reqIdentifier));
    }
}
