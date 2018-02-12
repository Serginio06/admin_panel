import {Connection, Model, Document} from "mongoose";

export class AbstractModel<T extends Document> {
    protected _fields: string;
    protected _dbInstance: Connection;
    protected _model: Model<T>;

    constructor(dbInstance: Connection) {
        this._dbInstance = dbInstance;
    }
}