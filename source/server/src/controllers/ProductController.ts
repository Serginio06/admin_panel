import {Query, Types} from "mongoose";
import {LoggerUtil} from "../util/LoggerUtil";
import {ModelLocator} from "../models/ModelLocator";
import {Logger} from "log4js";
import {ProductModel} from "../models/ProductModel";
import {IProductEntity} from "../types/entity";
import {DbModelConverter} from "../converter/DbModelConverter";
import {IProduct} from "../../../types/entity";
import {ServerEntityConverter} from "../converter/ServerEntityConverter";
import {IProductDbEntity} from "../types/dbEntity";
import {ObjectIdConverter} from "../converter/ObjectIdConverter";
import {PromoModel} from "../models/PromoModel";

const logger: Logger = LoggerUtil.getLoggerForFile(__filename);

export class ProductController {
    public registerProduct(product2register: IProduct, reqIdentifier: string): Promise<IProduct> {
        logger.info(`[${reqIdentifier}][registerProduct] attempt to register new product.
            \nproduct2register: ${LoggerUtil.stringifyObj(product2register)}`);

        const productModel: ProductModel = ModelLocator.getInstance().getProductModel();
        const _product2register: IProductEntity = DbModelConverter.getCompanyProduct(product2register, reqIdentifier);

        return productModel.newProduct(_product2register, reqIdentifier)
            .then((product: IProductDbEntity): IProduct => {
                logger.info(`[${reqIdentifier}][registerProduct] new company product registered successfully
				    \nproduct: ${LoggerUtil.stringify(product)}`);

                return ServerEntityConverter.getCompanyProductEntity(product, reqIdentifier);
            })
            .catch((err: Error): any => {
                logger.error(`[${reqIdentifier}][registerProduct] register product failed!
                    \n${err}`);

                throw err;
            });
    }

    public editProduct(product2edit: IProduct, reqIdentifier: string): Promise<any> {
        logger.info(`[${reqIdentifier}][editProduct] attempt to edit product.
            \nproduct2edit: ${LoggerUtil.stringify(product2edit)}`);

        const productModel: ProductModel = ModelLocator.getInstance().getProductModel();
        const _product2edit: IProductEntity = DbModelConverter.getCompanyProduct(product2edit, reqIdentifier);
        const _productId: Types.ObjectId = ObjectIdConverter.getObjectId(product2edit.productId, reqIdentifier);

        return productModel.editProduct(_product2edit, _productId, reqIdentifier)
            .then((product: IProductDbEntity): any => {
                logger.info(`[${reqIdentifier}][editProduct] company product edited successfully
				    \nproduct: ${LoggerUtil.stringifyObj(product)}`);

                return ServerEntityConverter.getCompanyProductEntity(product, reqIdentifier);
            })
            .catch((err: Error): any => {
                logger.error(`[${reqIdentifier}][editProduct] edit product failed!
                    \n${err}`);

                throw err;
            });
    }

    public deleteProduct(productId: string, reqIdentifier: string): Promise<void> {
        logger.info(`[${reqIdentifier}][deleteProduct] attempt to delete product.
            \nproductId: ${LoggerUtil.stringify(productId)}`);

        const productModel: ProductModel = ModelLocator.getInstance().getProductModel();
        const promoModel: PromoModel = ModelLocator.getInstance().getPromoModel();
        const _productId: Types.ObjectId = ObjectIdConverter.getObjectId(productId, reqIdentifier);

        return productModel.deleteProductById(_productId, reqIdentifier)
            .then((): Promise<void> => {
                logger.info(`[${reqIdentifier}][deleteProduct] company product deleted successfully`);

                return promoModel.deleteProductIds(_productId, reqIdentifier);
            });
    }

    public loadCompanyProducts(companyId: string, reqIdentifier: string): Promise<any[]> {
        logger.info(`[${reqIdentifier}][loadCompanyProducts] Attempt to load company products
            \ncompanyId: ${LoggerUtil.stringify(companyId)}`);

        const productModel: ProductModel = ModelLocator.getInstance().getProductModel();
        const _companyId: Types.ObjectId = ObjectIdConverter.getObjectId(companyId, reqIdentifier);

        return productModel.findByCompanyId(_companyId, reqIdentifier)
            .then((products: IProductDbEntity[]): any[] => {
                logger.info(`[${reqIdentifier}][loadCompanyProducts] company products fetched successfully
                    \nproducts: ${LoggerUtil.stringify(products)}`);

                return products.map(item => ServerEntityConverter.getCompanyProductEntity(item, reqIdentifier));
            })
            .catch((err) => {
                logger.error(`[${reqIdentifier}][loadCompanyProducts] user companies loading failed!
                    \n${err}`);

                throw err;
            });
    }
}
