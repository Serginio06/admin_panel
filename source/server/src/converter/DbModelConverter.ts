import {LoggerUtil} from "../util/LoggerUtil";
import {Logger} from "log4js";
import {Types} from "mongoose";
import {
    ICompanyEntity,
    IProductEntity,
    IPromoCardEntity,
    IPromoEntity,
    IRichBitUserEntity,
    IGeodata,
    IUserEntity,
    IVerificationCodeEntity,
} from "../types/entity";
import {EmailTarget} from "../constants/EmailTarget";
import {ICompany, IProduct, IPromo} from "../../../types/entity";
import {PromoStatus} from "../../../types/constants/PromoStatus";
import {ObjectIdConverter} from "./ObjectIdConverter";
import {PromoCardStatus} from "../constants/PromoCardStatus";
import {RichBitUserGender} from "../constants/RichBitUserGender";
import {RichBitUserLanguage} from "../constants/RichBitUserLanguage";

const logger: Logger = LoggerUtil.getLoggerForFile(__filename);

export class DbModelConverter {
    public static getPromoCard(promoId: Types.ObjectId, code: string, reqIdentifier: string): IPromoCardEntity {
        logger.info(`[${reqIdentifier}][getPromoCard] attempt to create new promo card db entity
            \npromoId: ${LoggerUtil.stringify(promoId)}
            \ncode: ${LoggerUtil.stringify(code)}`);

        return {
            promoId,
            status: PromoCardStatus.CLOSED,
            code,
            acquisitions: 0,
            rejections: 0,
            saves: 0,
            views: 0,
            shares: 0,
            companyInfoShows: 0,
        };
    }

    public static getRichBitUser(uniqueId: string,
                                 geodata: IGeodata,
                                 sex: RichBitUserGender,
                                 locale: RichBitUserLanguage,
                                 age: number,
                                 reqIdentifier: string): IRichBitUserEntity {
        logger.info(`[${reqIdentifier}][getRichBitUser] attempt to create richBit user db entity
            \nuniqueId: ${LoggerUtil.stringify(uniqueId)}
            \ngeodata: ${LoggerUtil.stringify(geodata)}
            \nsex: ${LoggerUtil.stringify(sex)}
            \nlocale: ${LoggerUtil.stringify(locale)}
            \nage: ${LoggerUtil.stringify(age)}`);

        return {
            uniqueId,
            geodata,
            sex,
            age,
            locale,
            open: 0,
            activate: 0,
            skip: 0,
            saved: 0,
            removed: 0,
            interests: [],
        };
    }

    public static getPromo(promo: IPromo, isDraft: boolean, reqIdentifier: string): IPromoEntity {
        logger.info(`[${reqIdentifier}][getPromo] Attempt to create new promo campaign entity.
            \npromo: ${LoggerUtil.stringify(promo)}
            \nisDraft: ${isDraft}`);

        const _status: PromoStatus = isDraft ? PromoStatus.DRAFT : PromoStatus.ACTIVE;
        const _codes: string[] = promo.codes ? promo.codes.split("\n") : [];
        const _companyId: Types.ObjectId = ObjectIdConverter.getObjectId(promo.companyId, reqIdentifier);
        const _rewardId: Types.ObjectId = ObjectIdConverter.getObjectId(promo.separateProductId, reqIdentifier);

        return {
            companyId: _companyId,
            status: _status,
            name: promo.name,
            objective: promo.objective,

            productId: promo.productId,
            reward: {
                rewardType: promo.rewardType,
                rewardId: _rewardId,
                discount: promo.discount,
            },

            offerPhrase: promo.offerPhrase,
            about: promo.about,
            terms: promo.terms,

            promoType: promo.type,
            condition: promo.condition,
            quantityValue: promo.quantity,
            quantityUnlimited: promo.isUnlimited,

            codeType: promo.codeType,
            value: promo.value,
            codes: _codes,
            timeToDecide: promo.time2Decide,
            target: {
                gender: promo.gender,
                language: promo.language,
                age: promo.age,
                interests: promo.interests,
                location: {
                    locationName: promo.locationName,
                    locationType: promo.locationType,
                    lat: promo.lat,
                    lng: promo.lng,
                },
            },

            scheduleType: promo.scheduleType,
            pricing: promo.pricing,
            budgetPeriod: promo.budgetPeriod,
            budgetAmount: promo.budgetAmount,

            dataLanguage: promo.dataLanguage,
            promoProductObject: promo.productObject,
            promoImgCode: promo.imgCode,
            startDate: promo.startDate,
            finishDate: promo.finishDate,
        };
    }

    public static getVerificationCode(userId: Types.ObjectId,
                                      target: EmailTarget,
                                      hash: string,
                                      reqIdentifier: string): IVerificationCodeEntity {
        logger.info(`[${reqIdentifier}][getVerificationCode] Attempt to create verification code entity.` +
            `\nuserId: ${LoggerUtil.stringify(userId)}
             \ntarget: ${LoggerUtil.stringify(target)}
             \nhash: ${LoggerUtil.stringify(hash)}`);

        return {
            userId,
            target,
            hash,
        };
    }

    public static getUser(firstName: string,
                          familyName: string,
                          email: string,
                          credential: string,
                          isOnDispatch: boolean,
                          reqIdentifier: string): IUserEntity {
        logger.info(`[${reqIdentifier}][getUser] Attempt to create user entity.` +
            `\nfirstName: ${LoggerUtil.stringify(firstName)}
             \nfamilyName: ${LoggerUtil.stringify(familyName)}
             \nemail: ${LoggerUtil.stringify(email)}
             \ncredential: ${LoggerUtil.stringify(credential)}
             \nisOnDispatch: ${LoggerUtil.stringify(isOnDispatch)}`);

        return {
            name: `${firstName} ${familyName}`,
            email,
            verified: false,
            password: credential,
            isOnDispatch: !!isOnDispatch,
        };
    }

    public static getFacebookUser(name: string, facebookId: number, reqIdentifier: string): IUserEntity {
        logger.info(`[${reqIdentifier}][getFacebookUser] Attempt to create facebook user entity.` +
            `\nname: ${LoggerUtil.stringify(name)}
            \nfacebookId: ${LoggerUtil.stringify(facebookId)}`);

        return {
            name,
            facebookId,
            verified: true,
        };
    }

    public static getCompany(userId: Types.ObjectId, company: ICompany, reqIdentifier: string): ICompanyEntity {
        logger.info(`[${reqIdentifier}][getCompany] Attempt to create company entity. 
           \nuserId: ${LoggerUtil.stringify(userId)}
           \ncompany.: ${LoggerUtil.stringifyObj(company)}`);

        return {
            userId,
            name: company.name,
            description: company.description,
            email: company.email,
            showEmail: company.showEmail,
            phone: company.phone,
            showPhone: company.showPhone,
            webAddress: company.webAddress,
            showWebAddress: company.showWebAddress,
            locationName: company.locationName,
            showLocation: company.showLocation,
            lat: company.lat,
            lng: company.lng,
            category: {
                name: company.category && company.category.name ? company.category.name : null,
                id: company.category && company.category.id ? company.category.id : null,
                subcategories: company.category && company.category.subcategories ? company.category.subcategories : [],
            },
            logo: company.logo,
            dataLanguage: company.dataLanguage,
            links: company.links,
        };
    }

    public static getCompanyProduct(product2edit: IProduct, reqIdentifier: string): IProductEntity {
        logger.info(`[${reqIdentifier}][getCompanyProduct] attempt to create company product entity.
            \nproduct2edit: ${LoggerUtil.stringifyObj(product2edit)}`);

        return {
            companyId: product2edit.companyId,
            name: product2edit.name,
            category: product2edit.category,
            description: product2edit.description,
            objectId: product2edit.object,
            price: product2edit.price,
            quantity: product2edit.quantity,
            link: product2edit.link2product,
            expTimestamp: product2edit.expDate,
            isUnlimited: product2edit.isUnlimitedQuantity,
            isOnline: product2edit.isOnline,
            isOffline: product2edit.isOffline,
            language: product2edit.dataLanguage,
            pics: product2edit.images,
        };
    }
}
