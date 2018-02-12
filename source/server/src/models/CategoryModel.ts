import {AbstractModel} from "./AbstractModel";
import {LoggerUtil} from "../util/LoggerUtil";
import {Logger} from "log4js";
import {ICategoryDbEntity} from "../types/dbEntity";
import {Connection, DocumentQuery, Schema} from "mongoose";

const logger: Logger = LoggerUtil.getLoggerForFile(__filename);

export class CategoryModel extends AbstractModel<ICategoryDbEntity> {
    constructor(dbInstance: Connection) {
        super(dbInstance);

        this._fields = "_id id name subcategories";
        this._model = this._dbInstance.model("categories", new Schema({
            id: String,
            name: {
                type: String,
                required: true,
                unique: true,
            },
            subcategories: [{
                id: String,
                parentId: String,
                name: String,
                subcategories: [{
                    id: String,
                    parentId: String,
                    name: String,
                    subcategories: [{
                        id: String,
                        parentId: String,
                        name: String,
                    }],
                }],
            }],
        }));
    }

    public getCategories(reqIdentifier: string): DocumentQuery<ICategoryDbEntity[], ICategoryDbEntity> {
        logger.info(`[${reqIdentifier}][getCategories] attempt to load categories`);

        return this._model.find({}, this._fields);
    }
}
