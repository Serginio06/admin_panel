import {ModelLocator} from "../../models/ModelLocator";
import {LoggerUtil} from "../../util/LoggerUtil";
import {PromoTargetLanguage} from "../../../../types/constants/PromoTargetLanguage";
import {RichBitUserGender} from "../../constants/RichBitUserGender";
import {PromoRewardType} from "../../../../types/constants/PromoRewardType";
import {PromoCardStatus} from "../../constants/PromoCardStatus";
import {PromoTargetGender} from "../../../../types/constants/PromoTargetGender";
import {Logger} from "log4js";
import {PromoModel} from "../../models/PromoModel";
import {PromoCardModel} from "../../models/PromoCardModel";
import {RichBitUserModel} from "../../models/api/RichBitUserModel";
import {PromoCard2RichBitUserMapModel} from "../../models/api/PromoCard2RichBitUserMapModel";
import {
    ICompanyDbEntity,
    IProductDbEntity,
    IPromoCard2RichBitUserMapDbEntity,
    IPromoCardDbEntity,
    IPromoDbEntity,
    IRichBitUser2SkippedCardsMapDbEntity,
    IRichBitUserDbEntity,
} from "../../types/dbEntity";
import {Query, Types} from "mongoose";
import {ObjectIdConverter} from "../../converter/ObjectIdConverter";
import {PromoTargetInterest} from "../../../../types/constants/PromoTargetInterest";
import {RichBitUser2SkippedPromoCardsMapModel} from "../../models/api/RichBitUser2SkippedPromoCardsMapModel";
import {IRichBitUserEntity, IGeodata} from "../../types/entity";
import {DbModelConverter} from "../../converter/DbModelConverter";
import {CompanyModel} from "../../models/CompanyModel";
import {ProductModel} from "../../models/ProductModel";
import {ServerEntityConverter} from "../../converter/ServerEntityConverter";
import {IRichBitPromoCard} from "../../types/api";
import {RichBitUserLanguage} from "../../constants/RichBitUserLanguage";
import {getDistances} from "../../util/LocationUtil";

const logger: Logger = LoggerUtil.getLoggerForFile(__filename);

export class RichBitController {
    public static _getTargetLanguageByUserLanguage(language: RichBitUserLanguage): PromoTargetLanguage {
        switch (language) {
            case RichBitUserLanguage.RU:
                return PromoTargetLanguage.RU;

            default:
                return PromoTargetLanguage.EN;
        }
    }

    public static _getTargetGenderByUserGender(gender: RichBitUserGender): PromoTargetGender {
        switch (gender) {
            case RichBitUserGender.MALE:
                return PromoTargetGender.MALE;
            case RichBitUserGender.FEMALE:
                return PromoTargetGender.FEMALE;
            default:
                return PromoTargetGender.NO_MATTER;
        }
    }

    public save(uniqueId: string, cardId: string, reqIdentifier: string): Promise<IRichBitUserDbEntity> {
        logger.info(`[${reqIdentifier}][save] Attempt to save promo card to user wallet
            \nuniqueId: ${LoggerUtil.stringify(uniqueId)}
            \ncardId: ${LoggerUtil.stringify(cardId)}`);

        const promoModel: PromoModel = ModelLocator.getInstance().getPromoModel();
        const promoCardModel: PromoCardModel = ModelLocator.getInstance().getPromoCardModel();
        const richBitUserModel: RichBitUserModel = ModelLocator.getInstance().getRichBitUserModel();
        const promoCard2RichBitUserMapModel: PromoCard2RichBitUserMapModel = ModelLocator.getInstance().getPromoCard2RichBitUserMapModel();

        let _richBitUser: IRichBitUserDbEntity;
        let _promoCard: IPromoCardDbEntity;

        // check if richBitUser with uniqueId exist in our DB or we need to add him
        return richBitUserModel.findByUniqueId(uniqueId, reqIdentifier)
            .then((richBitUser: IRichBitUserDbEntity): Promise<IPromoCardDbEntity> => {
                logger.info(`[${reqIdentifier}][save] richBit user fetched successfully
                    \nrichBitUser: ${LoggerUtil.stringify(richBitUser)}`);
                _richBitUser = richBitUser;

                if (!richBitUser || !richBitUser._id) {
                    throw new Error(`RichBit user wasn't found! UniqueId: ${uniqueId}`);
                }

                const _cardId: Types.ObjectId = ObjectIdConverter.getObjectId(cardId, reqIdentifier);

                return promoCardModel.findById(_cardId, reqIdentifier);
            })
            .then((promoCard: IPromoCardDbEntity): Promise<IPromoCard2RichBitUserMapDbEntity> => {
                logger.info(`[${reqIdentifier}][save] promoCard to save fetched successfully
                    \nrichBitUser: ${LoggerUtil.stringify(promoCard)}`);

                if (!promoCard || !promoCard._id) {
                    throw new Error(`PromoCard ${cardId} not found!`);
                }

                _promoCard = promoCard;

                // check if user already includes in promo (has promoCard with same promoId)
                return promoCard2RichBitUserMapModel.findByRichBitUserIdAndPromoId(_richBitUser._id, promoCard.promoId, reqIdentifier);
            })
            .then((map: IPromoCard2RichBitUserMapDbEntity): Promise<IPromoDbEntity> => {
                logger.info(`[${reqIdentifier}][save] promoCard2richBitUserMap by richBitUserId and promoId fetched successfully
                    \nmap: ${LoggerUtil.stringify(map)}`);

                if (map && map._id) {
                    throw new Error(`User already has promoCard for promo ${_promoCard.promoId}`);
                }

                // get Promo object for current promoCard to check isQuantityUnlimited field
                return promoModel.findById(_promoCard.promoId, reqIdentifier);
            })
            .then((promo: IPromoDbEntity): Promise<IPromoCard2RichBitUserMapDbEntity> => {
                logger.info(`[${reqIdentifier}][save] promo fetched successfully
                    \npromo: ${LoggerUtil.stringify(promo)}`);

                if (!promo || !promo._id) {
                    throw new Error(`Promo ${_promoCard.promoId} wasn't found!`);
                }

                //@todo `quantityUnlimited` was `isUnlimitedQuantity` - how this worked?
                if (promo.quantityUnlimited) {
                    return promoCard2RichBitUserMapModel.newMap(_promoCard._id, _richBitUser._id, promo._id, reqIdentifier);
                }

                return promoCard2RichBitUserMapModel.findByPromoCardId(_promoCard._id, reqIdentifier)
                    .then((map: IPromoCard2RichBitUserMapDbEntity): Promise<IPromoCard2RichBitUserMapDbEntity> => {
                        logger.info(`[${reqIdentifier}][save] promoCard2richBitUserMap by promoCardId fetched successfully
                                \nmap: ${LoggerUtil.stringify(map)}`);

                        if (map && map._id) {
                            throw new Error(`Promo card ${cardId} already has user! RichBitUserId: ${map.richBitUserId}`);
                        }

                        return promoCard2RichBitUserMapModel.newMap(_promoCard._id, _richBitUser._id, promo._id, reqIdentifier);
                    });
            })
            .then((): Promise<IPromoCardDbEntity> => {
                logger.info(`[${reqIdentifier}][save] promo card successfully accepted to ricBit user`);

                const _cardId: Types.ObjectId = ObjectIdConverter.getObjectId(cardId, reqIdentifier);

                return promoCardModel.incrementSaves(_cardId, reqIdentifier);
            })
            .then((): Promise<IRichBitUserDbEntity> => {
                logger.info(`[${reqIdentifier}][save] promo card saves value incremented successfully`);

                return richBitUserModel.incrementSave(uniqueId, reqIdentifier);
            })
            .catch((err: Error): any => {
                logger.error(`[${reqIdentifier}][save] can't save promo card!
                    ${err}`);

                throw err;
            });
    }

    public remove(uniqueId: string, cardId: string, reqIdentifier: string) {
        logger.info(`[${reqIdentifier}][remove] Attempt to remove promo card from a user wallet
            \nuniqueId: ${LoggerUtil.stringify(uniqueId)}
            \ncardId: ${LoggerUtil.stringify(cardId)}`);

        const richBitUserModel: RichBitUserModel = ModelLocator.getInstance().getRichBitUserModel();
        const promoCardModel: PromoCardModel = ModelLocator.getInstance().getPromoCardModel();
        const promoCard2richBitUserMapModel: PromoCard2RichBitUserMapModel = ModelLocator.getInstance().getPromoCard2RichBitUserMapModel();

        const _cardId: Types.ObjectId = ObjectIdConverter.getObjectId(cardId, reqIdentifier);

        return richBitUserModel.findByUniqueId(uniqueId, reqIdentifier)
            .then((richBitUser: IRichBitUserDbEntity): Query<void> => {
                logger.info(`[${reqIdentifier}][remove] richBit user fetched successfully
                    \nrichBitUser: ${LoggerUtil.stringify(richBitUser)}`);

                if (!richBitUser || !richBitUser._id) {
                    throw new Error(`RichBit user wasn't found! UniqueId: ${uniqueId}`);
                }

                return promoCard2richBitUserMapModel.removeCard(_cardId, richBitUser._id, reqIdentifier);
            })
            .then((): Promise<IRichBitUserDbEntity> => {
                logger.info(`[${reqIdentifier}][remove] promo card successfully remove from a ricBit user`);

                return richBitUserModel.incrementRemove(uniqueId, reqIdentifier);
            })
            .then((): Query<void> => {
                logger.info(`[${reqIdentifier}][remove] richBit user remove value incremented successfully`);

                return promoCardModel.changeStatus(_cardId, PromoCardStatus.CLOSED, reqIdentifier);
            })
            .catch((err: Error): any => {
                logger.error(`[${reqIdentifier}][remove] can't remove promo card!${err}`);

                throw err;
            });
    }

    public saveInterests(uniqueId: string, interests: PromoTargetInterest[], reqIdentifier: string): Promise<IRichBitPromoCard[]> {
        logger.info(`[${reqIdentifier}][saveInterests] Attempt to save richBit user interests
            \nuniqueId: ${LoggerUtil.stringify(uniqueId)}
            \ninterests: ${LoggerUtil.stringify(interests)}`);

        const richBitUserModel: RichBitUserModel = ModelLocator.getInstance().getRichBitUserModel();

        return richBitUserModel.findByUniqueId(uniqueId, reqIdentifier)
            .then((richBitUser: IRichBitUserDbEntity): Promise<IRichBitUserDbEntity> => {
                logger.info(`[${reqIdentifier}][saveInterests] richBit user fetched successfully
                    \nrichBitUser: ${LoggerUtil.stringify(richBitUser)}`);

                if (!richBitUser || !richBitUser._id) {
                    throw new Error(`RichBit user wasn't found! UniqueId: ${uniqueId}`);
                }

                return richBitUserModel.changeInterests(richBitUser._id, interests, reqIdentifier);
            })
            .then((richBitUser: IRichBitUserDbEntity): Promise<IRichBitPromoCard[]> => {
                logger.info(`[${reqIdentifier}][saveInterests] interests saved successfully
                    \nrichBitUser: ${LoggerUtil.stringify(richBitUser)}`);

                return this.getTargetCards(richBitUser, richBitUser.geodata, richBitUser.locale, reqIdentifier);
            })
            .catch((err: Error): any => {
                logger.error(`[${reqIdentifier}][saveInterests] can't change richBit user interests!${err}`);

                throw err;
            });
    }

    public open(uniqueId: string, cardId: string, reqIdentifier: string): Promise<IPromoCardDbEntity> {
        logger.info(`[${reqIdentifier}][open] Attempt to mark promo card as opened
            \nuniqueId: ${LoggerUtil.stringify(uniqueId)}
            \ncardId: ${LoggerUtil.stringify(cardId)}`);

        const promoCardModel: PromoCardModel = ModelLocator.getInstance().getPromoCardModel();
        const richBitUserModel: RichBitUserModel = ModelLocator.getInstance().getRichBitUserModel();

        const _cardId: Types.ObjectId = ObjectIdConverter.getObjectId(cardId, reqIdentifier);

        return richBitUserModel.findByUniqueId(uniqueId, reqIdentifier)
            .then((richBitUser: IRichBitUserDbEntity): Query<void> => {
                logger.info(`[${reqIdentifier}][open] richBit user fetched successfully
                    \nrichBitUser: ${LoggerUtil.stringify(richBitUser)}`);

                if (!richBitUser || !richBitUser._id) {
                    throw new Error(`RichBit user wasn't found! UniqueId: ${uniqueId}`);
                }

                return promoCardModel.changeStatus(_cardId, PromoCardStatus.OPENED, reqIdentifier);
            })
            .then((): Promise<IRichBitUserDbEntity> => {
                logger.info(`[${reqIdentifier}][open] promo card marked as opened successfully`);

                return richBitUserModel.incrementOpen(uniqueId, reqIdentifier);
            })
            .then((): Promise<IPromoCardDbEntity> => {
                logger.info(`[${reqIdentifier}][open] richBit user open value incremented successfully`);

                return promoCardModel.incrementViews(_cardId, reqIdentifier);
            })
            .catch((err: Error): any => {
                logger.error(`[${reqIdentifier}][open] can't open promo card!
                    \n${err}`);

                throw err;
            });
    }

    public activate(uniqueId: string, cardId: string, reqIdentifier: string): Promise<IRichBitUserDbEntity> {
        logger.info(`[${reqIdentifier}][activate] Attempt to mark promo card as activated
            \nuniqueId: ${LoggerUtil.stringify(uniqueId)}
            \ncardId: ${LoggerUtil.stringify(cardId)}`);

        const promoCardModel: PromoCardModel = ModelLocator.getInstance().getPromoCardModel();
        const richBitUserModel: RichBitUserModel = ModelLocator.getInstance().getRichBitUserModel();

        return richBitUserModel.findByUniqueId(uniqueId, reqIdentifier)
            .then((richBitUser: IRichBitUserDbEntity): Query<void> => {
                logger.info(`[${reqIdentifier}][activate] richBit user fetched successfully
                    \nrichBitUser: ${LoggerUtil.stringify(richBitUser)}`);

                if (!richBitUser || !richBitUser._id) {
                    throw new Error(`RichBit user wasn't found! UniqueId: ${uniqueId}`);
                }

                const _cardId: Types.ObjectId = ObjectIdConverter.getObjectId(cardId, reqIdentifier);

                return promoCardModel.changeStatus(_cardId, PromoCardStatus.ACTIVE, reqIdentifier);
            })
            .then((): Promise<IRichBitUserDbEntity> => {
                logger.info(`[${reqIdentifier}][activate] promo card clicks value incremented successfully`);

                return richBitUserModel.incrementActivate(uniqueId, reqIdentifier);
            })
            .catch((err: Error): any => {
                logger.error(`[${reqIdentifier}][activate] can't activate promo card!
                    \n${err}`);

                throw err;
            });
    }

    public skip(uniqueId: string, cardId: string, reqIdentifier: string): Promise<IPromoCardDbEntity> {
        logger.info(`[${reqIdentifier}][skip] Attempt to mark promo card as skipped
            \nuniqueId: ${LoggerUtil.stringify(uniqueId)}
            \ncardId: ${LoggerUtil.stringify(cardId)}`);

        const promoCardModel: PromoCardModel = ModelLocator.getInstance().getPromoCardModel();
        const richBitUserModel: RichBitUserModel = ModelLocator.getInstance().getRichBitUserModel();
        const richBitUser2skippedPromoCardsMap: RichBitUser2SkippedPromoCardsMapModel = ModelLocator.getInstance().getRichBitUser2skippedPromoCardsMapModel();

        const _cardId: Types.ObjectId = ObjectIdConverter.getObjectId(cardId, reqIdentifier);

        return richBitUserModel.findByUniqueId(uniqueId, reqIdentifier)
            .then((richBitUser: IRichBitUserDbEntity): Promise<IRichBitUser2SkippedCardsMapDbEntity> => {
                logger.info(`[${reqIdentifier}][skip] richBit user fetched successfully
                    \nrichBitUser: ${LoggerUtil.stringify(richBitUser)}`);

                if (!richBitUser || !richBitUser._id) {
                    throw new Error(`RichBit user wasn't found! UniqueId: ${uniqueId}`);
                }

                return richBitUser2skippedPromoCardsMap.addToSkippedCards(richBitUser._id, _cardId, reqIdentifier);
            })
            .then((): Promise<IRichBitUserDbEntity> => {
                logger.info(`[${reqIdentifier}][skip] promo card id was successfully added to skipped`);

                return richBitUserModel.incrementSkip(uniqueId, reqIdentifier);
            })
            .then((): Promise<IPromoCardDbEntity> => {
                logger.info(`[${reqIdentifier}][skip] richBit user skipped value incremented successfully`);

                return promoCardModel.incrementRejections(_cardId, reqIdentifier);
            })
            .catch((err: Error): any => {
                logger.error(`[${reqIdentifier}][skip] can't skip promo card!`);

                throw err;
            });
    }

    public saveUserData(uniqueId: string,
                        geodata: IGeodata,
                        sex: RichBitUserGender,
                        locale: RichBitUserLanguage,
                        age: number,
                        reqIdentifier: string): Promise<IRichBitUserDbEntity> {
        logger.info(`[${reqIdentifier}][saveUserData] Attempt to save user data if required
            \nuniqueId: ${LoggerUtil.stringify(uniqueId)}
            \ngeodata: ${LoggerUtil.stringify(geodata)}
            \nsex: ${LoggerUtil.stringify(sex)}
            \nage: ${LoggerUtil.stringify(age)}`);

        const richBitUserModel: RichBitUserModel = ModelLocator.getInstance().getRichBitUserModel();

        return richBitUserModel.findByUniqueId(uniqueId, reqIdentifier)
            .then((richBitUser: IRichBitUserDbEntity) => {
                logger.info(`[${reqIdentifier}][saveUserData] richBit user fetched successfully
                    \nrichBitUser: ${LoggerUtil.stringify(richBitUser)}`);

                if (richBitUser) {
                    return richBitUserModel.setGeodataAndLocale(richBitUser._id, geodata, locale, reqIdentifier);
                }

                const user: IRichBitUserEntity = DbModelConverter.getRichBitUser(uniqueId, geodata, sex, locale, age, reqIdentifier);

                return richBitUserModel.newRichBitUser(user, reqIdentifier);
            })
            .catch((err: Error): never => {
                logger.error(`[${reqIdentifier}][saveUserData] saveUserData failed!
                    \n${err}`);

                throw err;
            });
    }

    public getUserCards(uniqueId: string, reqIdentifier: string): Promise<IRichBitPromoCard[]> {
        logger.info(`[${reqIdentifier}][getUserCards] attempt to load richBit user cards
            \nuniqueId: ${LoggerUtil.stringify(uniqueId)}`);

        const richBitUserModel: RichBitUserModel = ModelLocator.getInstance().getRichBitUserModel();
        const promoCard2richBitUserMapModel: PromoCard2RichBitUserMapModel = ModelLocator.getInstance().getPromoCard2RichBitUserMapModel();

        return richBitUserModel.findByUniqueId(uniqueId, reqIdentifier)
            .then((richBitUser: IRichBitUserDbEntity): Promise<IPromoCard2RichBitUserMapDbEntity[]> => {
                logger.info(`[${reqIdentifier}][getUserCards] richBit user fetched successfully
                    \nrichBit user: ${LoggerUtil.stringify(richBitUser)}`);

                if (richBitUser && richBitUser._id) {
                    return promoCard2richBitUserMapModel.findByRichBitUserId(richBitUser._id, reqIdentifier);
                } else {
                    return Promise.resolve([]);
                }
            })
            .then((maps: IPromoCard2RichBitUserMapDbEntity[]): Promise<IRichBitPromoCard[]> => {
                logger.info(`[${reqIdentifier}][getUserCards] maps fetched successfully
                    \nmaps: ${LoggerUtil.stringify(maps)}`);

                if (maps && maps.length) {
                    const ids = maps.map((item: IPromoCard2RichBitUserMapDbEntity) => item.promoCardId);

                    return this._getUserCardsByIds(ids, reqIdentifier);
                }

                return Promise.resolve([]);
            });
    }

    public getTargetCards(richBitUser: IRichBitUserDbEntity,
                          geodata: IGeodata,
                          locale: RichBitUserLanguage,
                          reqIdentifier: string): Promise<IRichBitPromoCard[]> {
        logger.info(`[${reqIdentifier}][getTargetCards] Attempt to get target cards for user: ${LoggerUtil.stringify(richBitUser)}`);

        const promoModel: PromoModel = ModelLocator.getInstance().getPromoModel();
        const companyModel: CompanyModel = ModelLocator.getInstance().getCompanyModel();
        const productModel: ProductModel = ModelLocator.getInstance().getProductModel();
        const promoCardModel: PromoCardModel = ModelLocator.getInstance().getPromoCardModel();
        const promoCard2richBitUserMapModel: PromoCard2RichBitUserMapModel = ModelLocator.getInstance().getPromoCard2RichBitUserMapModel();
        const richBitUser2skippedPromoCardsMapModel: RichBitUser2SkippedPromoCardsMapModel = ModelLocator.getInstance().getRichBitUser2skippedPromoCardsMapModel();

        const gender: PromoTargetGender = RichBitController._getTargetGenderByUserGender(richBitUser.sex);
        const language: PromoTargetLanguage = RichBitController._getTargetLanguageByUserLanguage(locale);

        const _promos: IPromoDbEntity[] = [];
        let _companies: ICompanyDbEntity[] = [];
        let _products: IProductDbEntity[] = [];
        let _cards: IPromoCardDbEntity[] = [];
        let _ownedPromos: Types.ObjectId[] = [];
        let _skippedMap: IRichBitUser2SkippedCardsMapDbEntity;

        return promoModel.getPromosByTarget(gender, language, richBitUser.interests, reqIdentifier)
            .then((promos: IPromoDbEntity[]): Promise<void[]> => {
                logger.info(`[${reqIdentifier}][getTargetCards] target promos fetched successfully
                    \npromos: ${LoggerUtil.stringify(promos)}`);

                const origins: string = `${geodata.lat},${geodata.lng}`;
                const currentTime: number = new Date().getTime();

                let destinations: string;
                const promises: Array<Promise<void>> = [];

                // check if chosen promises are in target radius from current richBitUser location
                promos.forEach((item: IPromoDbEntity) => {
                    destinations = `${item.target.location.lat},${item.target.location.lng}`;
                    const promoExpireTime: number = item.createdTimestamp + item.timeToDecide * 60 * 60 * 1000;

                    if (currentTime > promoExpireTime) {
                        return;
                    }

                    promises.push(getDistances(origins, destinations, item.target.location.locationType)
                        .then((isValid: boolean): void => {
                            if (isValid) {
                                _promos.push(item);
                            }
                        }));
                });

                return Promise.all(promises);
            })
            .then((): Promise<ICompanyDbEntity[]> => {
                logger.info(`[${reqIdentifier}][getTargetCards] promos fetched successfully`);

                const ids: Types.ObjectId[] = _promos.map((item: IPromoDbEntity) => item.companyId);

                return companyModel.findByIds(ids, reqIdentifier);
            })
            .then((companies: ICompanyDbEntity[]): Promise<IProductDbEntity[]> => {
                logger.info(`[${reqIdentifier}][getTargetCards] companies fetched successfully
                    \ncompanies: ${LoggerUtil.stringifyArray(companies)}`);

                _companies = companies;

                const productIds: Types.ObjectId[] = [];
                _promos.forEach((item: IPromoDbEntity) => {
                    productIds.push(item.productId);

                    if (item.reward.rewardType === PromoRewardType.SEPARATE_PRODUCT) {
                        productIds.push(item.reward.rewardId);
                    }
                });

                const ids: Types.ObjectId[] = [];
                productIds.forEach((item: Types.ObjectId) => {
                    if (item) {
                        ids.push(item);
                    }
                });

                return productModel.findByIds(ids, reqIdentifier);
            })
            .then((products: IProductDbEntity[]): Promise<IPromoCardDbEntity[]> => {
                logger.info(`[${reqIdentifier}][getTargetCards] promo products fetched successfully
                    \nproducts: ${LoggerUtil.stringifyArray(products)}`);

                _products = products;

                const ids: Types.ObjectId[] = _promos.map((item: IPromoDbEntity) => item._id);

                return promoCardModel.findByPromoIds(ids, reqIdentifier);
            })
            .then((cards: IPromoCardDbEntity[]): Promise<IRichBitUser2SkippedCardsMapDbEntity> => {
                logger.info(`[${reqIdentifier}][getTargetCards] promo cards fetched successfully
                    \ncards: ${LoggerUtil.stringify(cards)}`);

                _cards = cards;

                return richBitUser2skippedPromoCardsMapModel.findByRichBitUserId(richBitUser._id, reqIdentifier);
            })
            .then((map: IRichBitUser2SkippedCardsMapDbEntity): Promise<IPromoCard2RichBitUserMapDbEntity[]> => {
                logger.info(`[${reqIdentifier}][getTargetCards] skipped map fetched successfully
                    \nmap: ${LoggerUtil.stringify(map)}`);

                _skippedMap = map;

                return promoCard2richBitUserMapModel.findByRichBitUserId(richBitUser._id, reqIdentifier);
            })
            .then((maps: IPromoCard2RichBitUserMapDbEntity[]): Promise<IPromoCard2RichBitUserMapDbEntity[]> => {
                logger.info(`[${reqIdentifier}][getTargetCards] user's cards map fetched successfully
                    \nmap: ${LoggerUtil.stringify(maps)}`);

                _ownedPromos = maps.map((item: IPromoCard2RichBitUserMapDbEntity) => {
                    for (const card of _cards) {
                        if (item.promoCardId.toString() === card._id.toString()) {
                            return card.promoId;
                        }
                    }
                });

                const ids: Types.ObjectId[] = _cards.map((item: IPromoCardDbEntity) => item._id);

                return promoCard2richBitUserMapModel.findByPromoCardIds(ids, reqIdentifier);
            })
            .then((maps: IPromoCard2RichBitUserMapDbEntity[]): IRichBitPromoCard[] => {
                logger.info(`[${reqIdentifier}][getTargetCards] owned promo cards map fetched successfully
                    \nmap: ${LoggerUtil.stringify(maps)}`);

                if (!maps || !maps.length) {
                    maps = [];
                }

                const unlimitedPromos: IPromoDbEntity[] = _promos.filter((item: IPromoDbEntity) => item.quantityUnlimited);
                const cardsWithOwnerIds: Types.ObjectId[] = maps.map((item: IPromoCard2RichBitUserMapDbEntity) => item.promoCardId);
                const sentPromosIds: Types.ObjectId[] = [];
                const sentPromoCards: IPromoCardDbEntity[] = [];

                const unlimitedPromosIds: Types.ObjectId[] = unlimitedPromos.map((item: IPromoDbEntity) => item._id);

                for (const card of _cards) {
                    // card already has owner and card's promo hasn't unlimited quantity
                    if (cardsWithOwnerIds.indexOf(card._id) !== -1 && unlimitedPromosIds.indexOf(card.promoId) !== -1) {
                        continue;
                    }

                    // user already has promo card of this promo campaign
                    if (_ownedPromos.indexOf(card.promoId) !== -1) {
                        continue;
                    }

                    // we already pushed card of this promo to array for sending
                    if (sentPromosIds.indexOf(card.promoId) !== -1) {
                        continue;
                    }

                    // user skipped this card
                    if (_skippedMap && _skippedMap.promoCardIds.indexOf(card._id) !== -1) {
                        continue;
                    }

                    // we already sent 5 promo cards
                    if (sentPromoCards.length !== 5) {
                        sentPromoCards.push(card);
                        sentPromosIds.push(card.promoId);
                    }

                    if (sentPromoCards.length === 5) {
                        break;
                    }
                }

                return ServerEntityConverter.getUserCards(sentPromoCards, _companies, _promos, _products, reqIdentifier);
            });
    }

    private _getUserCardsByIds(ids: Types.ObjectId[], reqIdentifier: string): Promise<IRichBitPromoCard[]> {
        logger.info(`[${reqIdentifier}][_getUserCardsByIds] attempt to load richBit user cards by ids
            \nids: ${LoggerUtil.stringify(ids)}`);

        const promoModel: PromoModel = ModelLocator.getInstance().getPromoModel();
        const companyModel: CompanyModel = ModelLocator.getInstance().getCompanyModel();
        const productModel: ProductModel = ModelLocator.getInstance().getProductModel();
        const promoCardModel: PromoCardModel = ModelLocator.getInstance().getPromoCardModel();

        let _cards: IPromoCardDbEntity[] = [];
        let _promos: IPromoDbEntity[] = [];
        let _products: IProductDbEntity[] = [];

        return promoCardModel.findByIds(ids, reqIdentifier)
            .then((cards: IPromoCardDbEntity[]): Promise<IPromoDbEntity[]> => {
                logger.info(`[${reqIdentifier}][_getUserCardsByIds] user's promo cards fetched successfully
                    \ncards: ${LoggerUtil.stringify(cards)}`);

                _cards = cards;
                const promoIds: Types.ObjectId[] = cards.map((item: IPromoCardDbEntity) => item.promoId);

                return promoModel.findByIds(promoIds, reqIdentifier);
            })
            .then((promos: IPromoDbEntity[]): Promise<IProductDbEntity[]> => {
                logger.info(`[${reqIdentifier}][_getUserCardsByIds] promos fetched successfully
                    \npromos: ${LoggerUtil.stringifyArray(promos)}`);

                _promos = promos;

                const productIds: Types.ObjectId[] = [];

                for (const promo of _promos) {
                    if (productIds.indexOf(promo.productId) < 0) {
                        productIds.push(promo.productId);
                    }

                    if (promo.reward.rewardType === PromoRewardType.SEPARATE_PRODUCT) {
                        if (productIds.indexOf(promo.reward.rewardId) < 0) {
                            productIds.push(promo.reward.rewardId);
                        }
                    }
                }

                const ids: Types.ObjectId[] = [];
                productIds.forEach((item: Types.ObjectId) => {
                    if (item) {
                        ids.push(item);
                    }
                });

                return productModel.findByIds(ids, reqIdentifier);
            })
            .then((products: IProductDbEntity[]): Promise<ICompanyDbEntity[]> => {
                logger.info(`[${reqIdentifier}][_getUserCardsByIds] products fetched successfully
                    \nproducts: ${LoggerUtil.stringifyArray(products)}`);

                _products = products;

                const ids: Types.ObjectId[] = products.map((item: IProductDbEntity) => item.companyId);

                return companyModel.findByIds(ids, reqIdentifier);
            })
            .then((companies: ICompanyDbEntity[]) => {
                logger.info(`[${reqIdentifier}][_getUserCardsByIds] companies fetched successfully
                    \ncompanies: ${LoggerUtil.stringifyArray(companies)}`);

                return ServerEntityConverter.getUserCards(_cards, companies, _promos, _products, reqIdentifier);
            });
    }
}
