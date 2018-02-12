import {LoggerUtil} from "../util/LoggerUtil";
import {ModelLocator} from "../models/ModelLocator";
import {Logger} from "log4js";
import {CategoryModel} from "../models/CategoryModel";
import {ICategory} from "../../../types/entity";
import {ICategoryDbEntity} from "../types/dbEntity";
import {ServerEntityConverter} from "../converter/ServerEntityConverter";

const logger: Logger = LoggerUtil.getLoggerForFile(__filename);

export class CategoryController {
    getCategories(reqIdentifier: string): Promise<ICategory[]> {
        logger.info(`[${reqIdentifier}][getCategories] Attempt to fetch categories`);

        const categoryModel: CategoryModel = ModelLocator.getInstance().getCategoryModel();

        return categoryModel.getCategories(reqIdentifier)
            .then((categories: ICategoryDbEntity[]): ICategory[] => {
                logger.info(`[${reqIdentifier}][getCategopries] categories fetched successfully
                    \ncategories: ${LoggerUtil.stringify(categories)}`);

                return categories.map((item: ICategoryDbEntity) => ServerEntityConverter.getCategory(item, reqIdentifier));
            })
            .catch((err: Error): any => {
                logger.error(`[${reqIdentifier}][getCategories] Get categories failed!
                    \nerr: ${err}`);

                throw err;
            });
    }
}
