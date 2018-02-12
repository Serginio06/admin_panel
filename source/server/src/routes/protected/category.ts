import {LoggerUtil} from "../../util/LoggerUtil";
import {CategoryController} from "../../controllers/CategoryController";
import {IRequest} from "../../types";
import {Response} from "express";
import {Logger} from "log4js";
import {ICategory} from "../../../../types/entity";

const controller: CategoryController = new CategoryController();
const logger: Logger = LoggerUtil.getLoggerForFile(__filename);

module.exports = {
    getCompanyCategories(req: IRequest, res: Response, next: Function): void {
        logger.info(`[${req.identifier}][getCompanyCategories] Attempt to get categories.`);

        controller.getCategories(req.identifier)
            .then((categories: ICategory[]): void => {
                res.json({
                    success: true,
                    payload: categories,
                });
            })
            .catch((err: Error): any => {
                logger.error(`[${req.identifier}][getCompanyCategories] Attempt to get categories failed!
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
