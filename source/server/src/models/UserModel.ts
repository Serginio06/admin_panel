import {Connection, DocumentQuery, Query, Schema, Types} from "mongoose";
import {AbstractModel} from "./AbstractModel";
import {LoggerUtil} from "../util/LoggerUtil";
import {Logger} from "log4js";
import {IUserDbEntity} from "../types/dbEntity";
import {IUserEntity} from "../types/entity";

const logger: Logger = LoggerUtil.getLoggerForFile(__filename);

export class UserModel extends AbstractModel<IUserDbEntity> {
    constructor(dbInstance: Connection) {
        super(dbInstance);

        this._fields = "_id name facebookId email verified password isOnDispatch";
        this._model = this._dbInstance.model("user", new Schema({
            name: {
                type: String,
                required: true,
            },
            facebookId: {
                type: Number,
                required: false,
            },
            email: {
                type: String,
                required: false,
            },
            verified: {
                type: Boolean,
                required: true,
            },
            password: {
                type: String,
                required: false,
            },
            isOnDispatch: {
                type: Boolean,
                required: false,
            },
        }));
    }

    public findById(userId: Types.ObjectId, reqIdentifier: string): DocumentQuery<IUserDbEntity, IUserDbEntity> {
        logger.info(`[${reqIdentifier}][findById] attempt to load user by id
            \nuserId: ${LoggerUtil.stringify(userId)}`);

        return this._model.findOne({_id: userId}, this._fields);
    }

    public findByEmail(email: string, reqIdentifier: string): DocumentQuery<IUserDbEntity, IUserDbEntity> {
        logger.info(`[${reqIdentifier}][findByEmail] attempt to load user by email
            \nemail: ${LoggerUtil.stringify(email)}`);

        return this._model.findOne({email}, this._fields);
    }

    public findByVerifiedEmail(email: string, reqIdentifier: string): DocumentQuery<IUserDbEntity, IUserDbEntity> {
        logger.info(`[${reqIdentifier}][findByVerifiedEmail] attempt to load user by verified email
            \nemail: ${LoggerUtil.stringify(email)}`);

        return this._model.findOne({email, verified: true}, this._fields);
    }

    public findByFacebookId(facebookId: number, reqIdentifier: string): DocumentQuery<IUserDbEntity, IUserDbEntity> {
        logger.info(`[${reqIdentifier}][findByFacebookId] attempt to load user by facebookId
            \nfacebookId: ${LoggerUtil.stringify(facebookId)}`);

        return this._model.findOne({facebookId}, this._fields);
    }

    public findByEmailAndPassword(email: string, password: string, reqIdentifier: string): DocumentQuery<IUserDbEntity, IUserDbEntity> {
        logger.info(`[${reqIdentifier}][findByEmailAndPassword] attempt to load user by email and password
            \nemail: ${LoggerUtil.stringify(email)}
            \npassword: ${LoggerUtil.stringify(password)}`);

        return this._model.findOne({email, password}, this._fields);
    }

    public deleteById(userId: Types.ObjectId, reqIdentifier: string): Query<void> {
        logger.info(`[${reqIdentifier}][deleteById] attempt to delete user by id
            \nuserId: ${LoggerUtil.stringify(userId)}`);

        return this._model.deleteOne({_id: userId});
    }

    public newUser(user: IUserEntity, reqIdentifier: string): Promise<IUserDbEntity> {
        logger.info(`[${reqIdentifier}][newUser] attempt to create new user
            \nuser: ${LoggerUtil.stringify(user)}`);

        return this._model.create(user)
            .then((): DocumentQuery<IUserDbEntity, IUserDbEntity> => {
                if (user.email) {
                    return this.findByEmail(user.email, reqIdentifier);
                }
                return this.findByFacebookId(user.facebookId, reqIdentifier);
            });
    }

    public verify(userId: Types.ObjectId, reqIdentifier: string): Query<void> {
        logger.info(`[${reqIdentifier}][verify] attempt to verify user by id
            \nuserId: ${LoggerUtil.stringify(userId)}`);

        return this._model.update({_id: userId}, {$set: {verified: true}});
    }

    public updatePassword(userId: Types.ObjectId, password: string, reqIdentifier: string): Query<void> {
        logger.info(`[${reqIdentifier}][updatePassword] attempt to update user's password by id
            \nuserId: ${LoggerUtil.stringify(userId)}
            \npassword: ${LoggerUtil.stringify(password)}`);

        return this._model.update({_id: userId}, {$set: {password}});
    }
}
