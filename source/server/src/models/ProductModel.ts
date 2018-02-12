import {Connection, Query, Schema, Types} from "mongoose";
import {AbstractModel} from "./AbstractModel";
import {LoggerUtil} from "../util/LoggerUtil";
import {IProductDbEntity} from "../types/dbEntity";
import {Logger} from "log4js";
import {IProductEntity} from "../types/entity";

const logger: Logger = LoggerUtil.getLoggerForFile(__filename);

export class ProductModel extends AbstractModel<IProductDbEntity> {
    constructor(dbInstance: Connection) {
        super(dbInstance);

        this._fields = "_id companyId name description objectId price quantity category link expTimestamp isUnlimited isOnline isOffline language pics";
        this._model = this._dbInstance.model("product", new Schema({
            companyId: {
                type: Schema.Types.ObjectId,
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            category: {
                type: String,
                required: false,
            },
            description: {
                type: String,
                required: false,
            },
            objectId: {
                type: String,
                required: false,
            },
            price: {
                type: String,
                required: false,
            },
            quantity: {
                type: String,
                required: false,
            },
            link: {
                type: String,
                required: false,
            },
            expTimestamp: {
                type: String,
                required: false,
                unique: false,
            },
            isUnlimited: {
                type: Boolean,
                required: false,
            },
            isOnline: {
                type: Boolean,
                required: false,
            },
            isOffline: {
                type: Boolean,
                required: false,
            },
            language: {
                type: String,
                required: false,
            },
            pics: {
                type: Array,
                required: false,
            },
        }));

        this.editProduct = this.editProduct.bind(this);
    }

    public findById(productId: Types.ObjectId, reqIdentifier: string): Promise<IProductDbEntity> {
        logger.info(`[${reqIdentifier}][findById] attempt to load product by id
	        \nproductId: ${LoggerUtil.stringify(productId)}`);

        return this._model.findById(productId, this._fields)
            .then((product: IProductDbEntity) => product);
    }

    public findByIds(productIds: Types.ObjectId[], reqIdentifier: string): Promise<IProductDbEntity[]> {
        logger.info(`[${reqIdentifier}][findById] attempt to load products by ids
	        \nproductIds: ${LoggerUtil.stringify(productIds)}`);

        return this._model.find({_id: {$in: productIds}}, this._fields)
            .then((products: IProductDbEntity[]) => products);
    }

    public findByCompanyId(companyId: Types.ObjectId, reqIdentifier: string): Promise<IProductDbEntity[]> {
        logger.info(`[${reqIdentifier}][findByCompanyId] attempt to load products by companyId
            \ncompanyId: ${LoggerUtil.stringify(companyId)}`);

        return this._model.find({companyId}, this._fields)
            .then((products: IProductDbEntity[]) => products);
    }

    public newProduct(product: IProductEntity, reqIdentifier: string): Promise<IProductDbEntity> {
        logger.info(`[${reqIdentifier}][newProduct] attempt to register new company product
            \nproduct: ${LoggerUtil.stringifyObj(product)}`);

        return this._model.create(product);
    }

    public editProduct(product: IProductEntity, productId: Types.ObjectId, reqIdentifier: string): Promise<IProductDbEntity> {
        logger.info(`[${reqIdentifier}][editProduct] attempt to edit product
            \nproduct: ${LoggerUtil.stringifyObj(product)}
            \nproductId: ${LoggerUtil.stringify(productId)}`);

        return this._model.update({_id: productId}, {$set: product})
            .then(() => this._model.findOne({_id: productId}));
    }

    public deleteProductByCompanyId(companyId: Types.ObjectId, reqIdentifier: string): Query<void> {
        logger.info(`[${reqIdentifier}][deleteProductByCompanyId] attempt to delete product by companyId
            \ncompanyId: ${LoggerUtil.stringify(companyId)}`);

        return this._model.deleteMany({companyId});
    }

    public deleteProductById(productId: Types.ObjectId, reqIdentifier: string): Query<void> {
        logger.info(`[${reqIdentifier}][deleteProductById] attempt to delete product by id
            \nproductId: ${LoggerUtil.stringify(productId)}`);

        return this._model.deleteMany({_id: productId});
    }
}
