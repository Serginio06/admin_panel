import {ModelLocator} from "../../models/ModelLocator";
import {LoggerUtil} from "../../util/LoggerUtil";
import {Logger} from "log4js";
import {PromoCardModel} from "../../models/PromoCardModel";
import {Types} from "mongoose";
import {ObjectIdConverter} from "../../converter/ObjectIdConverter";

const logger: Logger = LoggerUtil.getLoggerForFile(__filename);

export class PromoCardController {
    public acquisition(promoCardId: string, reqIdentifier: string): Promise<any> {
        logger.info(`[${reqIdentifier}][acquisition] Attempt to increment promo card acquisitions value
		    \npromoCardId: ${LoggerUtil.stringify(promoCardId)}`);

        const promoCardModel: PromoCardModel = ModelLocator.getInstance().getPromoCardModel();
        const _promoCardId: Types.ObjectId = ObjectIdConverter.getObjectId(promoCardId, reqIdentifier);

        return promoCardModel.incrementAcquisitions(_promoCardId, reqIdentifier)
            .catch((err: Error): never => {
                logger.error(`[${reqIdentifier}][acquisition] increment promo card acquisitions value failed!
				    \n${err}`);

                throw err;
            });
    }

    public share(promoCardId: string, reqIdentifier: string): Promise<void> {
        logger.info(`[${reqIdentifier}][share] Attempt to increment promo card shares value
		    \npromoCardId: ${LoggerUtil.stringify(promoCardId)}`);

        const promoCardModel: PromoCardModel = ModelLocator.getInstance().getPromoCardModel();
        const _promoCardId: Types.ObjectId = ObjectIdConverter.getObjectId(promoCardId, reqIdentifier);

        return promoCardModel.incrementShares(_promoCardId, reqIdentifier)
            .catch((err: Error): never => {
                logger.error(`[${reqIdentifier}][share] increment promo card shares value failed!
				    \n${err}`);

                throw err;
            });
    }

    public showCompanyInfo(promoCardId: string, reqIdentifier: string): Promise<void> {
        logger.info(`[${reqIdentifier}][showCompanyInfo] Attempt to increment promo card showsCompanyInfo value
		    \npromoCardId: ${LoggerUtil.stringify(promoCardId)}`);

        const promoCardModel = ModelLocator.getInstance().getPromoCardModel();
        const _promoCardId: Types.ObjectId = ObjectIdConverter.getObjectId(promoCardId, reqIdentifier);

        return promoCardModel.incrementCompanyInfoShows(_promoCardId, reqIdentifier)
            .catch((err: Error): never => {
                logger.error(`[${reqIdentifier}][showCompanyInfo] increment promo card showsCompanyInfo value failed!
				    \n${err}`);

                throw err;
            });
    }
}
