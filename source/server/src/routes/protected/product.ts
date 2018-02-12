import {LoggerUtil} from "../../util/LoggerUtil";
import {ProductController} from "../../controllers/ProductController";
import {Logger} from "log4js";
import {IRequest} from "../../types";
import {Response} from "express";
import {IDeleteProductBody, IEditProductBody, ILoadCompanyProductsBody, IRegisterProductBody} from "../../types/body";
import {IProduct} from "../../../../types/entity";

const logger: Logger = LoggerUtil.getLoggerForFile(__filename);
const controller: ProductController = new ProductController();

module.exports = {
    deleteProduct(req: IRequest, res: Response, next: () => void): void {
        logger.info(`[${req.identifier}][deleteProduct] Attempt to delete product.
            \nrequest body: ${LoggerUtil.stringify(req.body)}`);

        const body: IDeleteProductBody = req.body;

        controller.deleteProduct(body.productId, req.identifier)
            .then((): void => {
                    res.json({
                        success: true,
                    });
            })
            .catch((err: Error): void => {
                logger.error(`[${req.identifier}][deleteProduct] Attempt to delete product failed!
                    \n${err}`);

                if (!res.headersSent) {
                    res.json({
                        success: false,
                        errorCode: err.message,
                    });
                }
            })
            .then((): void => {
                next();
            });
    },

    editProduct(req: IRequest, res: Response, next: Function): void {
        logger.info(`[${req.identifier}][editProduct] Attempt to edit product.
            \nrequest body: ${LoggerUtil.stringify(req.body)}`);

        const body: IEditProductBody = req.body;

        controller.editProduct(body.product, req.identifier)
            .then((product: any): void => {
                if (!res.headersSent)
                    res.json({
                        success: true,
                        payload: product,
                    });
            })
            .catch((err: Error): void => {
                logger.error(`[${req.identifier}][editProduct] Attempt to edit product failed!
                    \n${err}`);

                if (!res.headersSent)
                    res.json({
                        success: false,
                        errorCode: err.message,
                    });
            })
            .then((): void => {
                next();
            });
    },

    registerProduct(req: IRequest, res: Response, next: Function): void {
        logger.info(`[${req.identifier}][registerProduct] Attempt to register new product.
		    \nrequest body: ${LoggerUtil.stringify(req.body)}`);

        const body: IRegisterProductBody = req.body;

        controller.registerProduct(body.product, req.identifier)
            .then((product: IProduct): void => {
                if (!res.headersSent)
                    res.json({
                        success: true,
                        payload: product,
                    });
            })
            .catch((err: Error): void => {
                logger.error(`[${req.identifier}][registerProduct] Attempt to register new product failed!
		            \n${err}`);

                if (!res.headersSent)
                    res.json({
                        success: false,
                        errorCode: err.message,
                    });
            })
            .then(() => {
                next();
            });
    },

    loadCompanyProducts(req: IRequest, res: Response, next: Function): void {
        logger.info(`[${req.identifier}][loadCompanyProducts] Attempt to load company products.
            \nrequest body: ${LoggerUtil.stringify(req.body)}`);

        const body: ILoadCompanyProductsBody = req.body;

        controller.loadCompanyProducts(body.companyId, req.identifier)
            .then((companyProducts: any[]): void => {
                if (!res.headersSent)
                    res.json({
                        success: true,
                        payload: companyProducts,
                    });
            })
            .catch((err: Error): void => {
                logger.error(`[${req.identifier}][loadCompanyProducts] Attempt to load company products failed!
                    \n${err}`);

                if (!res.headersSent)
                    res.json({
                        success: false,
                        errorCode: err.message,
                    });
            })
            .then((): void => {
                next();
            });
    },
};
