import {LoggerUtil} from "../util/LoggerUtil";
import {Logger} from "log4js";
const validator: any = require("validator");
import {
    ICategoryDbEntity,
    ICompanyDbEntity,
    IProductDbEntity,
    IPromoCardDbEntity,
    IPromoDbEntity,
    IUserDbEntity,
} from "../types/dbEntity";
import {ICategory, ICompany, IProduct, IPromo, IPromoStatistics, ISigninResult} from "../../../types/entity";
import {PromoCardStatus} from "../constants/PromoCardStatus";
import {PromoRewardType} from "../../../types/constants/PromoRewardType";
import {IRichBitPromoCard} from "../types/api";
import {PromoCodeType} from "../../../types/constants/PromoCodeType";

const logger: Logger = LoggerUtil.getLoggerForFile(__filename);

export class ServerEntityConverter {
    public static getCategory(category: ICategoryDbEntity, reqIdentifier: string): ICategory {
        logger.info(`[${reqIdentifier}][getCategoty] attempt to create category entity
            \ncategory: ${LoggerUtil.stringify(category)}`);

        const subcategories: ICategory[] = [];
        for (const subcategory of category.subcategories) {
            if (subcategory.name) {
                subcategories.push({
                    id: subcategory.id,
                    name: subcategory.name,
                    subcategories: [],
                });
            }
        }

        return {
            id: category.id,
            name: category.name,
            subcategories,
        };
    }

    public static getSigninResultEntity(user: IUserDbEntity, reqIdentifier: string): ISigninResult {
        logger.info(`[${reqIdentifier}][getSigninResultEntity] Attempt to create signin result entity.` +
            `\nuser: ${LoggerUtil.stringify(user)}`);

        return {
            userName: user.name,
            userId: user._id,
        };
    }

    public static getUserCompanyEntity(company: ICompanyDbEntity, reqIdentifier: string): ICompany[] {
        logger.info(`[${reqIdentifier}][getUserCompanyEntity] Attempt to create user company entity.
            \ncompany: ${LoggerUtil.stringifyObj(company)}`);

        const completed: boolean = !!(company.name
            && validator.isEmail(company.email)
            && company.logo
            && (company.category && company.category.name)
            && (company.category.subcategories && company.category.subcategories[0]));

        return {
            ...(company as any)._doc,
            completed,
        };
    }

    public static getCompanyProductEntity(product: IProductDbEntity, reqIdentifier: string): IProduct {
        logger.info(`[${reqIdentifier}][getCompanyProductEntity] Attempt to create company product entity.
         \nproduct: ${LoggerUtil.stringifyObj(product)}`);

        return {
            _id: product._id.toString(),

            category: product.category,
            companyId: product.companyId.toString(),
            description: product.description,
            expDate: product.expTimestamp,
            isOffline: product.isOffline,
            isOnline: product.isOnline,
            isUnlimited: product.isUnlimited,
            language: product.language,
            link: product.link,
            name: product.name,
            object: product.objectId,
            price: product.price,
            quantity: product.quantity,
            images: product.pics,
        };
    }

    public static getPromoStatistics(promos: IPromoDbEntity[],
                                     promoCards: IPromoCardDbEntity[],
                                     reqIdentifier: string): IPromoStatistics[] {
        logger.info(`[${reqIdentifier}][getPromoCards] Attempt to create company promo cards.` +
            `\npromoCards: ${LoggerUtil.stringifyArray(promoCards)}
             \npromos: ${LoggerUtil.stringifyArray(promos)}`);

        const res: IPromoStatistics[] = [];
        let activates: number;
        let acquisitions: number;
        let rejections: number;
        let saves: number;
        let views: number;
        let shares: number;
        let companyInfoShows: number;

        if (promoCards && promoCards.length && promos && promos.length) {
            for (const promo of promos) {
                activates = 0;
                acquisitions = 0;
                rejections = 0;
                saves = 0;
                views = 0;
                companyInfoShows = 0;
                shares = 0;

                for (const card of promoCards) {
                    if (promo._id.toString() === card.promoId.toString()) {
                        acquisitions += card.acquisitions;
                        rejections += card.rejections;
                        saves += card.saves;
                        views += card.views;
                        companyInfoShows += card.companyInfoShows;
                        shares += card.shares;

                        if (card.status === PromoCardStatus.ACTIVE) {
                            activates++;
                        }
                    }
                }

                res.push({
                    promoId: promo._id,
                    name: promo.name,
                    status: promo.status,
                    acquisitions,
                    rejections,
                    saves,
                    views,
                    companyInfoShows,
                    activates,
                    shares,
                });
            }
        }

        return res;
    }

    public static getUserCards(cards: IPromoCardDbEntity[],
                               companies: ICompanyDbEntity[],
                               promos: IPromoDbEntity[],
                               products: IProductDbEntity[],
                               reqIdentifier: string): IRichBitPromoCard[] {
        logger.info(`[${reqIdentifier}][getUserCards] Attempt to create richBit user cards.` +
            `\ncards: ${LoggerUtil.stringifyArray(cards)}
             \ncompanies: ${LoggerUtil.stringifyArray(companies)}
             \npromos: ${LoggerUtil.stringifyArray(promos)}
             \nproducts: ${LoggerUtil.stringifyArray(products)}`);

        const res: IRichBitPromoCard[] = [];
        let _company: ICompanyDbEntity;
        let _promo: IPromoDbEntity;
        let _product: IProductDbEntity;
        let _reward: IProductDbEntity;

        let _subcategory;
        let location;

        const currentDate: number = Date.now();

        for (const card of cards) {
            for (const promo of promos) {
                if (promo._id.toString() === card.promoId.toString()) {
                    _company = null;
                    _promo = null;
                    _product = null;
                    _reward = null;

                    location = {};
                    _subcategory = "";

                    _promo = promo;

                    for (const company of companies) {
                        if (promo.companyId && company._id.toString() === promo.companyId.toString()) {
                            _company = company;
                            break;
                        }
                    }

                    for (const product of products) {
                        if (product._id.toString() === promo.productId.toString()) {
                            _product = product;
                            break;
                        }
                    }

                    if (_promo.reward.rewardType === PromoRewardType.SEPARATE_PRODUCT && _promo.reward.rewardId) {
                        for (const product of products) {
                            if (product._id.toString() === promo.reward.rewardId.toString()) {
                                _reward = product;
                                break;
                            }
                        }
                    }

                    const time2decide: number = _promo.createdTimestamp + _promo.timeToDecide * 60 * 60 * 1000;
                    let status: PromoCardStatus = card.status;

                    if (time2decide <= currentDate) {
                        status = PromoCardStatus.EXPIRED;
                    }

                    res.push({
                        cardId: card._id,
                        status,

                        company: {
                            name: _company.name,
                            logo: _company.logo,
                            about: _company.description,
                            category: _company.category && _company.category.name ? _company.category.name : "",
                            subcategory: _company.category
                            && _company.category.subcategories
                            && _company.category.subcategories.length ?
                                _company.category.subcategories[_company.category.subcategories.length - 1].name : "",
                            website: _company.webAddress,
                            email: _company.email,
                            phone: _company.phone,
                            address: _company.locationName ? _company.locationName : "",
                            location: _company.lat && _company.lng ? {
                                lat: _company.lat,
                                lng: _company.lng,
                            } : null,
                        },
                        promo: {
                            offer: _promo.offerPhrase,
                            about: _promo.about,
                            terms: _promo.terms,
                            price: _product.price,
                            type: _promo.promoType,
                            condition: _promo.condition,
                            activationText: _promo.codeType === PromoCodeType.CODE ? card.code : "",
                            activationImg: _promo.codeType === PromoCodeType.BAR_QR ? _promo.promoImgCode : "",
                            timeToDecide: time2decide,
                            lat: _promo.target.location.lat.toString(),
                            lng: _promo.target.location.lng.toString(),
                            interests: _promo.target.interests,
                        },
                        product: {
                            link: _product.link,
                            price: _product.price,
                            pics: _product.pics,
                        },
                        reward: {
                            type: _promo.reward.rewardType,
                            link: _reward ? _reward.link : "",
                            pics: _reward ? _reward.pics : [],
                            percentage: _promo.reward.discount,
                        },
                    });
                }
            }
        }

        return res;
    }

    public static getPromoEntity(promo: IPromoDbEntity, reqIdentifier: string): IPromo {
        logger.info(`[${reqIdentifier}][getPromoEntity] Attempt to create promo entity
            \npromo: ${LoggerUtil.stringify(promo)}`);

        const separateProductId: string = promo && promo.reward && promo.reward.rewardId
            && promo.reward.rewardId.toString();
        const codes: string = promo.codes ? promo.codes.join("\n") : "";

        return {
            createdTimestamp: promo.createdTimestamp,
            name: promo.name,
            offerPhrase: promo.offerPhrase,
            about: promo.about,
            terms: promo.terms,
            objective: promo.objective,
            productId: promo.productId && promo.productId.toString(),
            rewardType: promo.reward.rewardType,
            separateProductId,
            discount: promo.reward.discount,
            type: promo.promoType,
            condition: promo.condition,
            quantity: promo.quantityValue,
            isUnlimited: promo.quantityUnlimited,
            value: promo.value,
            codes,
            time2Decide: promo.timeToDecide,
            age: promo.target.age,
            gender: promo.target.gender,
            scheduleType: promo.scheduleType,
            pricing: promo.pricing,
            language: promo.target.language,
            productObject: promo.promoProductObject,
            locationName: promo.target.location ? promo.target.location.locationName : "",
            locationType: promo.target.location ? promo.target.location.locationType : "",
            lng: promo.target.location ? promo.target.location.lng : 0,
            lat: promo.target.location ? promo.target.location.lat : 0,
            budgetPeriod: promo.budgetPeriod,
            budgetAmount: promo.budgetAmount,
            finishDate: promo.finishDate,
            startDate: promo.startDate,
            status: promo.status,
            codeType: promo.codeType,
            imgCode: promo.promoImgCode,
            interests: promo.target.interests,
            _id: promo._id,
            dataLanguage: promo.dataLanguage,
        };
    }
}
