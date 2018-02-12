import {Connection, DocumentQuery, Query, Schema, Types} from "mongoose";
import {AbstractModel} from "./AbstractModel";
import {LoggerUtil} from "../util/LoggerUtil";
import {PromoTargetGender} from "../../../types/constants/PromoTargetGender";
import {PromoStatus} from "../../../types/constants/PromoStatus";
import {Logger} from "log4js";
import {IPromoDbEntity} from "../types/dbEntity";
import {PromoTargetLanguage} from "../../../types/constants/PromoTargetLanguage";
import {PromoTargetInterest} from "../../../types/constants/PromoTargetInterest";
import {IPromoEntity} from "../types/entity";

const logger: Logger = LoggerUtil.getLoggerForFile(__filename);

export class PromoModel extends AbstractModel<IPromoDbEntity> {
    constructor(dbInstance: Connection) {
        super(dbInstance);

        this._fields = "_id createdTimestamp name companyId objective productId reward offerPhrase about terms promoType condition quantityValue quantityUnlimted value " +
            "codes timeToDecide codeType dataLanguage target quantityUnlimited scheduleType pricing finishDate budgetPeriod budgetAmount status language promoProductObject startDate promoImgCode";

        this._model = this._dbInstance.model("promo", new Schema({
            createdTimestamp: {
                type: Number,
                required: true,
            },
            companyId: {
                type: Schema.Types.ObjectId,
                required: true,
            },
            codeType: {
                type: String,
                required: false,
            },
            status: {
                type: String,
                required: false,
            },
            name: {
                type: String,
                required: false,
            },
            objective: {
                type: String,
                required: false,
            },

            productId: {
                type: String,
                required: false,
            },
            reward: {
                rewardType: {
                    type: String,
                    required: false,
                },
                rewardId: {
                    type: String,
                    default: "",
                    required: false,
                },
                discount: {
                    type: String,
                    default: "",
                    required: false,
                },
            },

            offerPhrase: {
                type: String,
                required: false,
            },
            about: {
                type: String,
                required: false,
            },
            terms: {
                type: String,
                required: false,
            },

            promoType: {
                type: String,
                required: false,
            },
            condition: {
                type: String,
                required: false,
            },
            quantityValue: {
                type: Number,
                required: false,
            },
            quantityUnlimited: {
                type: Boolean,
                required: false,
            },

            value: {
                type: String,
                required: false,
            },
            codes: {
                type: Array,
                required: false,
            },

            timeToDecide: {
                type: Number,
                required: false,
            },

            target: {
                gender: {
                    type: String,
                    required: false,
                },
                language: {
                    type: String,
                    required: false,
                },
                age: {
                    // type: ageSchema,
                    type: Array,
                    required: false,
                },
                interests: {
                    type: Array,
                    required: false,
                },
                location: {
                    type: {
                        name: String,
                        locationType: String,
                        lat: Number,
                        lan: Number,
                    },
                    required: false,
                },
            },

            scheduleType: {
                type: String,
                required: false,
            },
            pricing: {
                type: String,
                required: false,
            },
            finishDate: {
                type: String,
                required: false,
            },
            startDate: {
                type: String,
                required: false,
            },
            budgetPeriod: {
                type: String,
                required: false,
            },
            budgetAmount: {
                type: String,
                required: false,
            },
            dataLanguage: {
                type: String,
                required: false,
            },

            promoProductObject: {
                type: String,
                required: false,
            },

            promoImgCode: {
                type: String,
                required: false,
            },
        }));
    }

    public findByIds(promoIds: Types.ObjectId[], reqIdentifier: string): Promise<IPromoDbEntity[]> {
        logger.info(`[${reqIdentifier}][findByIds] attempt to load promos by promosIds
            \npromoIds: ${LoggerUtil.stringify(promoIds)}`);

        return this._model.find({_id: {$in: promoIds}}, this._fields)
            .then((promos: IPromoDbEntity[]) => promos);
    }

    public findById(promoId: Types.ObjectId, reqIdentifier: string): Promise<IPromoDbEntity> {
        logger.info(`[${reqIdentifier}][findByIds] attempt to load promos by promosId
            \npromoId: ${LoggerUtil.stringify(promoId)}`);

        return this._model.findOne({_id: promoId}, this._fields)
            .then((promo: IPromoDbEntity) => promo);
    }

    public finish(promoId: Types.ObjectId, reqIdentifier: string): Promise<IPromoDbEntity> {
        logger.info(`[${reqIdentifier}][finish] attempt to finish promo by promoId
            \npromoId: ${LoggerUtil.stringify(promoId)}`);

        return this._model.findOneAndUpdate({_id: promoId}, {$set: {status: PromoStatus.EXPIRED}})
            .then((promo: IPromoDbEntity) => promo);
    }

    public start(promoId: Types.ObjectId, reqIdentifier: string): Promise<IPromoDbEntity> {
        logger.info(`[${reqIdentifier}][start] attempt to start promo by promoId
            \npromoId: ${LoggerUtil.stringify(promoId)}`);

        return this._model.findOneAndUpdate({_id: promoId}, {$set: {status: PromoStatus.ACTIVE}})
            .then((promo: IPromoDbEntity) => promo);
    }

    public getPromosByCompanyId(companyId: Types.ObjectId, reqIdentifier: string): Promise<IPromoDbEntity[]> {
        logger.info(`[${reqIdentifier}][getPromosByCompanyId] attempt to load promos by companyId
		    \ncompanyId: ${LoggerUtil.stringify(companyId)}`);

        return this._model.find({companyId}, this._fields)
            .then((promos: IPromoDbEntity[]) => promos);
    }

    public getPromosByTarget(gender: PromoTargetGender,
                             language: PromoTargetLanguage,
                             interests: PromoTargetInterest[],
                             reqIdentifier: string): Promise<IPromoDbEntity[]> {
        logger.info(`[${reqIdentifier}][getPromosByTarget] attempt to load promos by target
	        \ngender: ${LoggerUtil.stringify(gender)}
	        \nlanguage: ${LoggerUtil.stringify(language)}
	        \ninterests: ${LoggerUtil.stringify(interests)}`);

        const _interests = interests && interests.length ? interests : [
            PromoTargetInterest.BUSINESS_INDUSTRY, PromoTargetInterest.ENTERTAINMENT,
            PromoTargetInterest.FITNESS_WELLNESS, PromoTargetInterest.FOOD_DRINKS,
            PromoTargetInterest.HOBBIES_ACTIVITIES, PromoTargetInterest.SHOPPING_FASHION,
            PromoTargetInterest.SPORT_OUTDOORS, PromoTargetInterest.INTERNET];

        return this._model.find({
                status: PromoStatus.ACTIVE,
                "target.gender": {$in: [gender, PromoTargetGender.NO_MATTER]},
                "target.language": language,
                "target.interests": {$elemMatch: {$in: _interests}},
            }, this._fields)
            .then((promos: IPromoDbEntity[]) => promos);
    }

    public newPromo(promo: IPromoEntity, reqIdentifier: string): Promise<IPromoDbEntity> {
        logger.info(`[${reqIdentifier}][newPromo] attempt to create new promo
            \npromo: ${LoggerUtil.stringifyObj(promo)}`);

        const _promo: IPromoDbEntity = new this._model(promo);

        return _promo.save();
    }

    public editPromo(promo: IPromoEntity, promoId: Types.ObjectId, reqIdentifier: string): Promise<IPromoDbEntity> {
        logger.info(`[${reqIdentifier}][editPromo] attempt to edit promo
            \npromo: ${LoggerUtil.stringifyObj(promo)}
            \npromoId: ${LoggerUtil.stringify(promoId)}`);

        return this._model.update({_id: promoId}, {$set: promo}, {runValidators: true})
            .then((): DocumentQuery<IPromoDbEntity, IPromoDbEntity> => this._model.findOne({_id: promoId}));
    }

    public deletePromoByCompanyId(companyId: Types.ObjectId, reqIdentifier: string): Query<void> {
        logger.info(`[${reqIdentifier}][deletePromoByCompanyId] attempt to delete promo by companyId
            \ncompanyId: ${LoggerUtil.stringify(companyId)}`);

        return this._model.deleteMany({companyId});
    }

    public deleteById(promoId: Types.ObjectId, reqIdentifier: string): Query<void> {
        logger.info(`[${reqIdentifier}][deleteById] attempt to delete promo by id
            \npromoId: ${LoggerUtil.stringify(promoId)}`);

        return this._model.deleteOne({_id: promoId});
    }

    public deleteProductIds(productId: Types.ObjectId, reqIdentifier: string): Promise<any> {
        logger.info(`[${reqIdentifier}][deleteProductIds] attempt to delete product ids
            \nproductId: ${LoggerUtil.stringify(productId)}`);

        return this._model.update({productId}, {$set: {productId: null}})
            .then(() => {
                this._model.update({"reward.rewardId": productId}, {$set: {"reward.rewardId": null}})
            });
    }
}
