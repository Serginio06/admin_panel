import {ModelLocator} from "../models/ModelLocator";
import {LoggerUtil} from "../util/LoggerUtil";
import {ServerErrorCode} from "../constants/ServerErrorCode";
import {Logger} from "log4js";
import {CompanyModel} from "../models/CompanyModel";
import {ICompanyDbEntity} from "../types/dbEntity";
import {ICompany} from "../../../types/entity";
import {Query, Types} from "mongoose";
import {ObjectIdConverter} from "../converter/ObjectIdConverter";
import {ICompanyEntity} from "../types/entity";
import {DbModelConverter} from "../converter/DbModelConverter";
import {ServerEntityConverter} from "../converter/ServerEntityConverter";
import {ProductModel} from "../models/ProductModel";
import {PromoModel} from "../models/PromoModel";

const logger: Logger = LoggerUtil.getLoggerForFile(__filename);

export class CompanyController {
    public checkEmail(email: string, reqIdentifier: string): Promise<boolean> {
        logger.info(`[${reqIdentifier}][checkEmail] Attempt to check company email
            \nemail: ${LoggerUtil.stringify(email)}`);

        const companyModel: CompanyModel = ModelLocator.getInstance().getCompanyModel();

        return companyModel.findByEmail(email, reqIdentifier)
            .then((company: ICompanyDbEntity): boolean => {
                logger.info(`[${reqIdentifier}][checkEmail] company with email ${email} fetched successfully
                    \ncompany: ${LoggerUtil.stringifyObj(company)}`);

                return company === null;
            })
            .catch((err: Error): any => {
                logger.error(`[${reqIdentifier}][checkEmail] company email checking failed!
                    \n${err}`);

                throw err;
            });
    }

    public checkPhone(phone: string, reqIdentifier: string): Promise<boolean> {
        logger.info(`[${reqIdentifier}][checkPhone] Attempt to check company phone
            \nphone: ${LoggerUtil.stringify(phone)}`);

        const companyModel: CompanyModel = ModelLocator.getInstance().getCompanyModel();

        return companyModel.findByPhone(phone, reqIdentifier)
            .then((company: ICompanyDbEntity): boolean => {
                logger.info(`[${reqIdentifier}][checkPhone] company with phone ${phone} fetched successfully
                    \ncompany: ${LoggerUtil.stringifyObj(company)}`);

                return company === null;
            })
            .catch((err: Error): any => {
                logger.error(`[${reqIdentifier}][checkPhone] company phone checking failed!
                    \n${err}`);

                throw err;
            });
    }

    public checkWebAddress(webAddress: string, reqIdentifier: string): Promise<boolean> {
        logger.info(`[${reqIdentifier}][checkWebAddress] Attempt to check company web address
            \nweb address: ${LoggerUtil.stringify(webAddress)}`);

        const companyModel: CompanyModel = ModelLocator.getInstance().getCompanyModel();

        return companyModel.findByWebAddress(webAddress, reqIdentifier)
            .then((company: ICompanyDbEntity): boolean => {
                logger.info(`[${reqIdentifier}][checkWebAddress] company with web address ${webAddress} fetched successfully
                    \ncompany: ${LoggerUtil.stringifyObj(company)}`);

                return company === null;
            })
            .catch((err: Error): any => {
                logger.error(`[${reqIdentifier}][checkWebAddress] company web address checking failed!
                    \n${err}`);

                throw err;
            });
    }

    public editCompany(company2edit: ICompany, userId: string, reqIdentifier: string): Promise<any> {
        logger.info(`[${reqIdentifier}][editCompany] Attempt to edit company
            \nuserId: ${LoggerUtil.stringify(userId)}
            \ncompany2edit: ${LoggerUtil.stringify(company2edit)}`);

        const companyModel: CompanyModel = ModelLocator.getInstance().getCompanyModel();
        const _companyId: Types.ObjectId = ObjectIdConverter.getObjectId(company2edit._id, reqIdentifier);

        return companyModel.findByEmail(company2edit.email, reqIdentifier)
            .then((company: ICompanyDbEntity): Promise<ICompanyDbEntity> => {
                logger.info(`[${reqIdentifier}][editCompany] company with email ${company2edit.email} fetched successfully
				    \ncompany: ${LoggerUtil.stringify(company)}`);

                if (company && company._id && company._id.toString() !== _companyId.toString()) {
                    throw new Error(ServerErrorCode.EMAIL_NOT_UNIQUE);
                }

                return companyModel.findByPhone(company2edit.phone, reqIdentifier);
            })
            .then((company: ICompanyDbEntity): Promise<ICompanyDbEntity> => {
                logger.info(`[${reqIdentifier}][editCompany] company with phone ${company2edit.phone} fetched successfully
				    \ncompany: ${LoggerUtil.stringify(company)}`);

                if (company && company._id && company._id.toString() !== _companyId.toString()) {
                    throw new Error(ServerErrorCode.PHONE_NOT_UNIQUE);
                }

                return companyModel.findByWebAddress(company2edit.webAddress, reqIdentifier);
            })
            .then((company: ICompanyDbEntity): Promise<ICompanyDbEntity> => {
                logger.info(`[${reqIdentifier}][editCompany] company with webAddress ${company2edit.webAddress} fetched successfully
                    \n${LoggerUtil.stringify(company)}`);

                if (company && company._id && company._id.toString() !== _companyId.toString()) {
                    throw new Error(ServerErrorCode.WEB_ADDRESS_NOT_UNIQUE);
                }

                const _userId: Types.ObjectId = ObjectIdConverter.getObjectId(userId, reqIdentifier);
                const _company2edit: ICompanyEntity = DbModelConverter.getCompany(_userId, company2edit, reqIdentifier);

                return companyModel.editCompany(_company2edit, _companyId, reqIdentifier);
            })
            .then((company: ICompanyDbEntity): any => {
                logger.info(`[${reqIdentifier}][editCompany] edited company fetched successfully
                    \ncompany: ${LoggerUtil.stringify(company)}`);

                return ServerEntityConverter.getUserCompanyEntity(company, reqIdentifier);
            })
            .catch((err: Error): any => {
                logger.error(`[${reqIdentifier}][editCompany] company editing failed!
                    \n${err}`);

                throw err;
            });
    }

    public deleteCompany(userId: string, companyId: string, reqIdentifier: string): Promise<void> {
        logger.info(`[${reqIdentifier}][deleteCompany] Attempt to delete company
            \nuserId: ${LoggerUtil.stringify(userId)}
            \ncompanyId: ${LoggerUtil.stringify(companyId)}`);

        const companyModel: CompanyModel = ModelLocator.getInstance().getCompanyModel();
        const productModel: ProductModel = ModelLocator.getInstance().getProductModel();
        const promoModel: PromoModel = ModelLocator.getInstance().getPromoModel();
        const _companyId: Types.ObjectId = ObjectIdConverter.getObjectId(companyId, reqIdentifier);

        return companyModel.findById(_companyId, reqIdentifier)
            .then((company: ICompanyDbEntity): Query<void> => {
                logger.info(`[${reqIdentifier}][deleteCompany] company fetched successfully
                    \ncompany: ${LoggerUtil.stringify(company)}`);

                if (company && company.userId.toString() !== userId) {
                    throw new Error(`Company has different userId!`);
                }

                return companyModel.deleteCompany(_companyId, reqIdentifier);
            })
            .then((): Query<void> => {
                logger.info(`[${reqIdentifier}][deleteCompany] company deleted successfully`);

                return productModel.deleteProductByCompanyId(_companyId, reqIdentifier);
            })
            .then((): Query<void> => {
                logger.info(`[${reqIdentifier}][deleteCompany] products deleted successfully`);

                return promoModel.deletePromoByCompanyId(_companyId, reqIdentifier);
            })
    }

    public registerCompany(userId: string, company2register: ICompany, reqIdentifier: string): Promise<any> {
        logger.info(`[${reqIdentifier}][registerCompany] Attempt to register company
            \nuserId: ${LoggerUtil.stringify(userId)}
            \ncompany2register: ${LoggerUtil.stringifyObj(company2register)}`);

        const companyModel: CompanyModel = ModelLocator.getInstance().getCompanyModel();

        return companyModel.findByEmail(company2register.email, reqIdentifier)
            .then((company: ICompanyDbEntity): Promise<ICompanyDbEntity> => {
                logger.info(`[${reqIdentifier}][registerCompany] company with email ${company2register.email} fetched successfully
				    \ncompany: ${LoggerUtil.stringifyObj(company)}`);

                if (company && company._id) {
                    throw new Error(ServerErrorCode.EMAIL_NOT_UNIQUE);
                }

                return companyModel.findByPhone(company2register.phone, reqIdentifier);
            })
            .then((company: ICompanyDbEntity): Promise<ICompanyDbEntity> => {
                logger.info(`[${reqIdentifier}][registerCompany] company with phone ${company2register.phone} fetched successfully
				    \ncompany: ${LoggerUtil.stringifyObj(company)}`);

                if (company && company._id) {
                    throw new Error(ServerErrorCode.PHONE_NOT_UNIQUE);
                }

                return companyModel.findByWebAddress(company2register.webAddress, reqIdentifier);
            })
            .then((company): Promise<ICompanyDbEntity> => {
                logger.info(`[${reqIdentifier}][registerCompany] company with webAddress ${company2register.webAddress} fetched successfully
                    \ncompany: ${LoggerUtil.stringifyObj(company)}`);

                if (company && company._id) {
                    throw new Error(ServerErrorCode.WEB_ADDRESS_NOT_UNIQUE);
                }

                const _userId: Types.ObjectId = ObjectIdConverter.getObjectId(userId, reqIdentifier);
                const _company2register: ICompanyEntity = DbModelConverter.getCompany(_userId, company2register, reqIdentifier);

                return companyModel.newCompany(_company2register, reqIdentifier);
            })
            .then((company: ICompanyDbEntity): any => {
                logger.info(`[${reqIdentifier}][registerCompany] registered company fetched successfully
                    \ncompany: ${LoggerUtil.stringifyObj(company)}`);

                return ServerEntityConverter.getUserCompanyEntity(company, reqIdentifier);
            })
            .catch((err: Error): any => {
                logger.error(`[${reqIdentifier}][registerCompany] company registration failed!
                    \n${err}`);

                throw err;
            });
    }

    public loadUserCompanies(userId: string, reqIdentifier: string): Promise<ICompany[]> {
        logger.info(`[${reqIdentifier}][loadUserCompanies] Attempt to load user companies
            \nuserId: ${LoggerUtil.stringify(userId)}`);

        const companyModel: CompanyModel = ModelLocator.getInstance().getCompanyModel();
        const _userId: Types.ObjectId = ObjectIdConverter.getObjectId(userId, reqIdentifier);

        return companyModel.findByUserId(_userId, reqIdentifier)
            .then((companies: ICompanyDbEntity[]): any[] => {
                logger.info(`[${reqIdentifier}][loadUserCompanies] user companies fetched successfully
                    \ncompanies: ${LoggerUtil.stringifyArray(companies)}`);

                return companies.map((item: ICompanyDbEntity): ICompany[] => {
                    return ServerEntityConverter.getUserCompanyEntity(item, reqIdentifier);
                });
            })
            .catch((err: Error): any => {
                logger.error(`[${reqIdentifier}][loadUserCompanies] user companies loading failed!
                    \n${err}`);

                throw err;
            });
    }
}
