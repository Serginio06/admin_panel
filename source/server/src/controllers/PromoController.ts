import {LoggerUtil} from "../util/LoggerUtil";
import {ModelLocator} from "../models/ModelLocator";
import {PromoTargetLanguage} from "../../../types/constants/PromoTargetLanguage";
import {PromoTargetGender} from "../../../types/constants/PromoTargetGender";
import {PromoRewardType} from "../../../types/constants/PromoRewardType";
import {PromoCondition} from "../../../types/constants/PromoCondition";
import {ServerErrorCode} from "../constants/ServerErrorCode";
import {Logger} from "log4js";
import {PromoModel} from "../models/PromoModel";
import {Query, Types} from "mongoose";
import {ObjectIdConverter} from "../converter/ObjectIdConverter";
import {ICompanyDbEntity, IProductDbEntity, IPromoCardDbEntity, IPromoDbEntity, IUserDbEntity} from "../types/dbEntity";
import {ServerEntityConverter} from "../converter/ServerEntityConverter";
import {IPromo, IPromoStatistics} from "../../../types/entity";
import {UserModel} from "../models/UserModel";
import {CompanyModel} from "../models/CompanyModel";
import {PromoCardModel} from "../models/PromoCardModel";
import {ProductModel} from "../models/ProductModel";
import {IPromoCardEntity, IPromoEntity} from "../types/entity";
import {DbModelConverter} from "../converter/DbModelConverter";
import {PromoCodeType} from "../../../types/constants/PromoCodeType";
import {PromoCard2RichBitUserMapModel} from "../models/api/PromoCard2RichBitUserMapModel";

const logger: Logger = LoggerUtil.getLoggerForFile(__filename);

export class PromoController {
    public getPromos(companyId: string, reqIdentifier: string): Promise<IPromo[]> {
        logger.info(`[${reqIdentifier}][getPromos] Attempt to get promos
		    \ncompanyId: ${LoggerUtil.stringify(companyId)}`);

        const promoModel: PromoModel = ModelLocator.getInstance().getPromoModel();
        const _companyId: Types.ObjectId = ObjectIdConverter.getObjectId(companyId, reqIdentifier);

        return promoModel.getPromosByCompanyId(_companyId, reqIdentifier)
            .then((promos: IPromoDbEntity[]): IPromo[] => {
                logger.info(`[${reqIdentifier}][getPromos] promos by companyId fetched successfully
		            \npromos: ${LoggerUtil.stringify(promos)}`);

                if (promos && promos.length) {
                    return promos.map((item: IPromoDbEntity) => ServerEntityConverter.getPromoEntity(item, reqIdentifier));
                }

                return [];
            })
            .catch((err: Error): any => {
                logger.error(`[${reqIdentifier}][getPromos] Get promos failed!
				    \n${err}`);

                throw err;
            });
    }

    public deletePromo(promoId: string, reqIdentifier: string): Promise<void> {
        logger.info(`[${reqIdentifier}][deletePromo] Attempt to delete promo
		    \npromoId: ${LoggerUtil.stringify(promoId)}`);

        const promoModel: PromoModel = ModelLocator.getInstance().getPromoModel();
        const promoCardModel: PromoCardModel = ModelLocator.getInstance().getPromoCardModel();
        const promoCard2richBitUserMapModel: PromoCard2RichBitUserMapModel = ModelLocator.getInstance().getPromoCard2RichBitUserMapModel();

        const _promoId: Types.ObjectId = ObjectIdConverter.getObjectId(promoId, reqIdentifier);

        return promoModel.findById(_promoId, reqIdentifier)
            .then((promo: IPromoDbEntity): Query<void> => {
                logger.info(`[${reqIdentifier}][deletePromo] promo by promoId fetched successfully
                    \npromo: ${LoggerUtil.stringify(promo)}`);

                return promoModel.deleteById(_promoId, reqIdentifier);
            })
            .then((): Query<void> => {
                logger.info(`[${reqIdentifier}][deletePromo] promo deleted successfully`);

                return promoCardModel.deleteByPromoId(_promoId, reqIdentifier);
            })
            .then((): Query<void> => {
                logger.info(`[${reqIdentifier}][deletePromo] promo cards by promoId deleted successfully`);

                return promoCard2richBitUserMapModel.deleteByPromoId(_promoId, reqIdentifier);
            });
    }

    public start(promoId: string, userId: string, reqIdentifier: string): Promise<IPromo[]> {
        logger.info(`[${reqIdentifier}][start] Attempt to start promo
		    \npromoId: ${LoggerUtil.stringify(promoId)}
		    \nuserId: ${LoggerUtil.stringify(userId)}`);

        const userModel: UserModel = ModelLocator.getInstance().getUserModel();
        const promoModel: PromoModel = ModelLocator.getInstance().getPromoModel();
        const companyModel: CompanyModel = ModelLocator.getInstance().getCompanyModel();

        const _userId: Types.ObjectId = ObjectIdConverter.getObjectId(userId, reqIdentifier);
        const _promoId: Types.ObjectId = ObjectIdConverter.getObjectId(promoId, reqIdentifier);

        let _companies: ICompanyDbEntity[];
        let _companyId: Types.ObjectId;

        return userModel.findById(_userId, reqIdentifier)
            .then((user: IUserDbEntity): Promise<ICompanyDbEntity[]> => {
                logger.info(`[${reqIdentifier}][start] user fetched successfully
                    \nuser: ${LoggerUtil.stringify(user)}`);

                if (!user || !user._id) {
                    throw new Error(ServerErrorCode.AUTH_ERROR);
                }

                return companyModel.findByUserId(user._id, reqIdentifier);
            })
            .then((companies: ICompanyDbEntity[]): Promise<IPromoDbEntity> => {
                logger.info(`[${reqIdentifier}][start] user companies fetched successfully
                    \ncompanies: ${LoggerUtil.stringifyArray(companies)}`);

                _companies = companies;

                return promoModel.findById(_promoId, reqIdentifier);
            })
            .then((promo: IPromoDbEntity): Promise<IPromoDbEntity> => {
                logger.info(`[${reqIdentifier}][start] promo by promoId fetched successfully
                    \npromo: ${LoggerUtil.stringify(promo)}`);

                for (const company of _companies) {
                    if (company._id.toString() === promo.companyId.toString()) {
                        _companyId = company._id;
                        return promoModel.start(_promoId, reqIdentifier);
                    }
                }

                throw new Error(ServerErrorCode.AUTH_ERROR);
            })
            .then((): Promise<IPromoDbEntity[]> => {
                logger.info(`[${reqIdentifier}][start] promo started successfully`);

                return promoModel.getPromosByCompanyId(_companyId, reqIdentifier);
            })
            .then((promos: IPromoDbEntity[]): IPromo[] => {
                logger.info(`[${reqIdentifier}][start] promos by companyId fetched successfully
		            \npromos: ${LoggerUtil.stringify(promos)}`);

                if (promos && promos.length) {
                    return promos.map((item: IPromoDbEntity) => ServerEntityConverter.getPromoEntity(item, reqIdentifier));
                }

                return [];
            })
            .catch((err: Error): any => {
                logger.error(`[${reqIdentifier}][start] Get promos failed!
				    \n${err}`);

                throw err;
            });
    }

    public finish(promoId: string, userId: string, reqIdentifier: string): Promise<IPromo[]> {
        logger.info(`[${reqIdentifier}][finish] Attempt to finish promo
		    \npromoId: ${LoggerUtil.stringify(promoId)}
		    \nuserId: ${LoggerUtil.stringify(userId)}`);

        const userModel: UserModel = ModelLocator.getInstance().getUserModel();
        const promoModel: PromoModel = ModelLocator.getInstance().getPromoModel();
        const companyModel: CompanyModel = ModelLocator.getInstance().getCompanyModel();

        const _userId: Types.ObjectId = ObjectIdConverter.getObjectId(userId, reqIdentifier);
        const _promoId: Types.ObjectId = ObjectIdConverter.getObjectId(promoId, reqIdentifier);

        let _companies: ICompanyDbEntity[];
        let _companyId: Types.ObjectId;

        return userModel.findById(_userId, reqIdentifier)
            .then((user: IUserDbEntity): Promise<ICompanyDbEntity[]> => {
                logger.info(`[${reqIdentifier}][finish] user fetched successfully
                    \nuser: ${LoggerUtil.stringify(user)}`);

                if (!user || !user._id) {
                    throw new Error(ServerErrorCode.AUTH_ERROR);
                }

                return companyModel.findByUserId(user._id, reqIdentifier);
            })
            .then((companies: ICompanyDbEntity[]): Promise<IPromoDbEntity> => {
                logger.info(`[${reqIdentifier}][finish] user companies fetched successfully
                    \ncompanies: ${LoggerUtil.stringifyArray(companies)}`);

                _companies = companies;

                return promoModel.findById(_promoId, reqIdentifier);
            })
            .then((promo: IPromoDbEntity): Promise<IPromoDbEntity> => {
                logger.info(`[${reqIdentifier}][finish] promo by promoId fetched successfully
                    \npromo: ${LoggerUtil.stringify(promo)}`);

                for (const company of _companies) {
                    if (company._id.toString() === promo.companyId.toString()) {
                        _companyId = company._id;
                        return promoModel.finish(_promoId, reqIdentifier);
                    }
                }

                throw new Error(ServerErrorCode.AUTH_ERROR);
            })
            .then((): Promise<IPromoDbEntity[]> => {
                logger.info(`[${reqIdentifier}][finish] promo finished successfully`);

                return promoModel.getPromosByCompanyId(_companyId, reqIdentifier);
            })
            .then((promos: IPromoDbEntity[]): IPromo[] => {
                logger.info(`[${reqIdentifier}][finish] promos by companyId fetched successfully
		            \npromos: ${LoggerUtil.stringify(promos)}`);

                if (promos && promos.length) {
                    return promos.map((item: IPromoDbEntity) => ServerEntityConverter.getPromoEntity(item, reqIdentifier));
                }

                return [];
            })
            .catch((err: Error): any => {
                logger.error(`[${reqIdentifier}][finish] Get promos failed!
				    \n${err}`);

                throw err;
            });
    }

    public getPromoStatistics(companyId: string, reqIdentifier: string): Promise<IPromoStatistics[]> {
        logger.info(`[${reqIdentifier}][getPromoStatistics] Attempt to get promo statistics
		    \ncompanyId: ${LoggerUtil.stringify(companyId)}`);

        const promoModel: PromoModel = ModelLocator.getInstance().getPromoModel();
        const promoCardModel: PromoCardModel = ModelLocator.getInstance().getPromoCardModel();

        const _companyId: Types.ObjectId = ObjectIdConverter.getObjectId(companyId, reqIdentifier);

        let _promos: IPromoDbEntity[];

        return promoModel.getPromosByCompanyId(_companyId, reqIdentifier)
            .then((promos: IPromoDbEntity[]): Promise<IPromoCardDbEntity[]> => {
                logger.info(`[${reqIdentifier}][getPromoStatistics] promos by companyId fetched successfully
		            \npromos: ${LoggerUtil.stringify(promos)}`);

                _promos = promos;

                if (promos && promos.length > 0) {
                    const ids: Types.ObjectId[] = promos.map((item: IPromoDbEntity) => item._id);

                    return promoCardModel.findByPromoIds(ids, reqIdentifier);
                }

                return Promise.resolve([]);
            })
            .then((promoCards: IPromoCardDbEntity[]): IPromoStatistics[] => {
                logger.info(`[${reqIdentifier}][getPromoStatistics] promoCards fetched successfully
		            \npromoCards: ${LoggerUtil.stringify(promoCards)}`);

                return ServerEntityConverter.getPromoStatistics(_promos, promoCards, reqIdentifier);
            })
            .catch((err: Error): any => {
                logger.error(`[${reqIdentifier}][getPromoStatistics] Get promo statistics failed!
				    \n${err}`);

                throw err;
            });
    }

    public newPromo(promo2insert: IPromo, isDraft: boolean, reqIdentifier: string) {
        logger.info(`[${reqIdentifier}][newPromo] Attempt to create new promo campaign.
            \npromo2insert: ${LoggerUtil.stringify(promo2insert)}
            \nisDraft: ${LoggerUtil.stringify(isDraft)}`);

        const promoModel: PromoModel = ModelLocator.getInstance().getPromoModel();
        const productModel: ProductModel = ModelLocator.getInstance().getProductModel();
        const companyModel: CompanyModel = ModelLocator.getInstance().getCompanyModel();
        const promoCardModel: PromoCardModel = ModelLocator.getInstance().getPromoCardModel();

        const _companyId: Types.ObjectId = ObjectIdConverter.getObjectId(promo2insert.companyId, reqIdentifier);

        return companyModel.findById(_companyId, reqIdentifier)
            .then((company: ICompanyDbEntity): Promise<IProductDbEntity> => {
                logger.info(`[${reqIdentifier}][newPromo] promo company fetched successfully
                    \ncompany: ${LoggerUtil.stringifyObj(company)}`);

                if (!company || !company._id) {
                    throw new Error(`Company wasn't found! CompanyId: ${promo2insert.companyId}`);
                }

                if (!isDraft && promo2insert.productId) {
                    const _productId: Types.ObjectId = ObjectIdConverter.getObjectId(promo2insert.productId, reqIdentifier);

                    return productModel.findById(_productId, reqIdentifier);
                }
                return Promise.resolve(null);
            })
            .then((product: IProductDbEntity): Promise<void> => {
                logger.info(`[${reqIdentifier}][newPromo] promo product fetched successfully
                    \nproduct: ${LoggerUtil.stringifyObj(product)}`);

                if (!isDraft && (!product || !product._id)) {
                    throw new Error(`Product wasn't found! ProductId: ${promo2insert.productId}`);
                }

                if (!isDraft && product.companyId.toString() !== promo2insert.companyId) {
                    throw new Error(`Product has different companyId!
                        \nproduct's companyId: ${product.companyId}
                        \ntarget's companyId: ${promo2insert.companyId}`);
                }

                if (!isDraft && promo2insert.separateProductId && promo2insert.rewardType === PromoRewardType.SEPARATE_PRODUCT) {
                    return this._checkRewardId(promo2insert.separateProductId, promo2insert.companyId, reqIdentifier);
                }

                return Promise.resolve();
            })
            .then((): Promise<IPromoDbEntity> => {
                logger.info(`[${reqIdentifier}][newPromo] promo reward product was checked successfully (if required)`);

                const _promo: IPromoEntity = DbModelConverter.getPromo(promo2insert, isDraft, reqIdentifier);
                _promo.createdTimestamp = new Date().getTime();

                return promoModel.newPromo(_promo, reqIdentifier);
            })
            .then((promo: IPromoDbEntity): Promise<IPromoCardDbEntity[]> => {
                logger.info(`[${reqIdentifier}][newPromo] new promo created successfully!
                    \npromo: ${LoggerUtil.stringifyObj(promo)}`);

                let promises: Array<Promise<IPromoCardDbEntity>> = [];
                switch (promo2insert.codeType) {
                    case PromoCodeType.NO_CODE:
                        if (promo.quantityUnlimited) {
                            const card: IPromoCardEntity = DbModelConverter.getPromoCard(promo._id, "", reqIdentifier);
                            promises = [promoCardModel.newPromoCard(card, reqIdentifier)];
                        } else {
                            for (let i = 0; i < +promo.quantityValue; i++) {
                                const card: IPromoCardEntity = DbModelConverter.getPromoCard(promo._id, "", reqIdentifier);
                                promises.push(promoCardModel.newPromoCard(card, reqIdentifier));
                            }
                        }
                        break;

                    case PromoCodeType.CODE:
                        promises = promo.codes.map((item: string) => {
                            if (item.length) {
                                const card: IPromoCardEntity = DbModelConverter.getPromoCard(promo._id, item, reqIdentifier);
                                return promoCardModel.newPromoCard(card, reqIdentifier);
                            } else {
                                return Promise.resolve(null);
                            }
                        });
                        break;

                    case PromoCodeType.BAR_QR:
                        if (promo.quantityUnlimited) {
                            const card = DbModelConverter.getPromoCard(promo._id, "", reqIdentifier);
                            promises = [promoCardModel.newPromoCard(card, reqIdentifier)];
                        } else {
                            for (let i = 0; i < +promo.quantityValue; i++) {
                                const card = DbModelConverter.getPromoCard(promo._id, "", reqIdentifier);
                                promises.push(promoCardModel.newPromoCard(card, reqIdentifier));
                            }
                        }
                        break;
                }

                return Promise.all(promises);
            })
            .then((): Promise<IPromo[]> => {
                logger.info(`[${reqIdentifier}][newPromo] promo cards created successfully!`);

                return this.getPromos(promo2insert.companyId, reqIdentifier);
            })
            .catch((err: Error): any => {
                logger.error(`[${reqIdentifier}][newPromo] new promo create action failed!
                    \n${err}`);

                throw err;
            });
    }

    public editPromo(promo2edit: IPromo, isDraft: boolean, reqIdentifier: string): Promise<IPromo[]> {
        logger.info(`[${reqIdentifier}][editPromo] Attempt to update promo campaign.
            \npromo2edit: ${LoggerUtil.stringify(promo2edit)}
            \nisDraft: ${LoggerUtil.stringify(isDraft)}`);

        const promoModel: PromoModel = ModelLocator.getInstance().getPromoModel();
        const productModel: ProductModel = ModelLocator.getInstance().getProductModel();
        const companyModel: CompanyModel = ModelLocator.getInstance().getCompanyModel();
        const promoCardModel: PromoCardModel = ModelLocator.getInstance().getPromoCardModel();

        const _promoId: Types.ObjectId = ObjectIdConverter.getObjectId(promo2edit._id, reqIdentifier);

        let _promo;

        return promoModel.findById(_promoId, reqIdentifier)
            .then((promo: IPromoDbEntity): Promise<ICompanyDbEntity> => {
                logger.info(`[${reqIdentifier}][editPromo] promo fetched successfully
                    \npromo: ${LoggerUtil.stringifyObj(promo)}`);

                _promo = promo;

                return companyModel.findById(_promo.companyId, reqIdentifier);
            })
            .then((company: ICompanyDbEntity): Promise<IProductDbEntity> => {
                logger.info(`[${reqIdentifier}][editPromo] promo company fetched successfully
                    \ncompany: ${LoggerUtil.stringifyObj(company)}`);

                if (!company || !company._id) {
                    throw new Error(`Company wasn't found! CompanyId: ${promo2edit.companyId}`);
                }

                if (!isDraft && promo2edit.productId) {
                    const _productId: Types.ObjectId = ObjectIdConverter.getObjectId(promo2edit.productId, reqIdentifier);
                    return productModel.findById(_productId, reqIdentifier);
                }

                return Promise.resolve(null);
            })
            .then((product: IProductDbEntity): Promise<void> => {
                logger.info(`[${reqIdentifier}][editPromo] promo product fetched successfully
                    \nproduct: ${LoggerUtil.stringifyObj(product)}`);

                if (!isDraft && (!product || !product._id)) {
                    throw new Error(`Product wasn't found! ProductId: ${promo2edit.productId}`);
                }

                if (!isDraft && product.companyId.toString() !== promo2edit.companyId) {
                    throw new Error(`Product has different companyId!
                        \nproduct's companyId: ${JSON.stringify(product.companyId)}
                        \ntarget's companyId: ${promo2edit.companyId}`);
                }

                if (!isDraft && promo2edit.separateProductId && promo2edit.rewardType === PromoRewardType.SEPARATE_PRODUCT) {
                    return this._checkRewardId(promo2edit.separateProductId, promo2edit.companyId, reqIdentifier);
                }

                return Promise.resolve();
            })
            .then((): Promise<IPromoDbEntity> => {
                logger.info(`[${reqIdentifier}][editPromo] promo reward product was checked successfully (if required)`);

                const _promo2edit: IPromoEntity = DbModelConverter.getPromo(promo2edit, isDraft, reqIdentifier);
                _promo2edit.createdTimestamp = _promo.createdTimestamp;
                const _promoId: Types.ObjectId = ObjectIdConverter.getObjectId(promo2edit._id, reqIdentifier);

                return promoModel.editPromo(_promo2edit, _promoId, reqIdentifier);
            })
            .then((promo: IPromoDbEntity): Promise<IPromoCardDbEntity[]> => {
                logger.info(`[${reqIdentifier}][editPromo] promo was updated successfully!
                    \npromo: ${LoggerUtil.stringifyObj(promo)}`);

                let _codes: string[] = [];
                if (promo2edit.codes) {
                    _codes = promo2edit.codes.split("\n");
                }

                const _promoId: Types.ObjectId = ObjectIdConverter.getObjectId(promo2edit._id, reqIdentifier);

                const promises: Array<Promise<IPromoCardDbEntity>> = _codes.map((item: string) => {
                    if (item.length) {
                        const card: IPromoCardEntity = DbModelConverter.getPromoCard(_promoId, item, reqIdentifier);

                        return promoCardModel.findByPromoIdAndCode(_promoId, item, reqIdentifier)
                            .then((_card: IPromoCardDbEntity): Promise<IPromoCardDbEntity> => {
                                logger.info(`[${reqIdentifier}][editPromo] promo card was fetched successfully!
                                    \n_card: ${LoggerUtil.stringify(_card)}`);

                                if (!_card || !_card._id) {
                                    return promoCardModel.newPromoCard(card, reqIdentifier);
                                } else {
                                    //@todo fix me
                                    (card as any)._id = _card._id;
                                    return promoCardModel.editPromoCard(card, _card._id, reqIdentifier);
                                }
                            });
                    } else {
                        return Promise.resolve(null);
                    }
                });

                return Promise.all(promises);
            })
            .then((): Promise<IPromo[]> => {
                logger.info(`[${reqIdentifier}][editPromo] promo cards created successfully!`);

                return this.getPromos(promo2edit.companyId, reqIdentifier);
            })
            .catch((err: Error): any => {
                logger.error(`[${reqIdentifier}][editPromo] promo update action failed!
                    \n${err}`);

                throw err;
            });
    }

    private _checkRewardId(rewardId: string, companyId: string, reqIdentifier: string): Promise<void> {
        logger.info(`[${reqIdentifier}][_checkRewardId] attempt to check reward product
            \nrewardId: ${LoggerUtil.stringify(rewardId)}
            \ncompanyId: ${LoggerUtil.stringify(companyId)}`);

        const productModel: ProductModel = ModelLocator.getInstance().getProductModel();
        const _rewardId: Types.ObjectId = ObjectIdConverter.getObjectId(rewardId, reqIdentifier);

        return productModel.findById(_rewardId, reqIdentifier)
            .then((product) => {
                logger.info(`[${reqIdentifier}][_checkRewardId] promo reward product fetched successfully
                    \nproduct: ${LoggerUtil.stringifyObj(product)}`);

                if (!product || !product._id) {
                    throw new Error(`Product wasn't found! ProductId: ${rewardId}`);
                }

                if (product.companyId.toString() !== companyId) {
                    throw new Error(`Product has different companyId!
                        \nproduct's companyId: ${product.companyId}
                        \ntarget's companyId: ${companyId}`);
                }

                return Promise.resolve();
            });
    }
}
