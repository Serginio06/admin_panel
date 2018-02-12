import {AbstractModel} from "./AbstractModel";
import * as mongoose from "mongoose";
import {LoggerUtil} from "../util/LoggerUtil";
import {ICompanyDbEntity} from "../types/dbEntity";
import {Connection, DocumentQuery, Query, Schema, Types} from "mongoose";
import {ICompanyEntity} from "../types/entity";
import {Logger} from "log4js";

const logger: Logger = LoggerUtil.getLoggerForFile(__filename);

export class CompanyModel extends AbstractModel<ICompanyDbEntity> {
    constructor(dbInstance: Connection) {
        super(dbInstance);

        this._fields = "_id userId name description logo webAddress showWebAddress email showEmail phone showPhone " +
            "locationName showLocation lat lng category dataLanguage links";
        this._model = this._dbInstance.model("company", new Schema({
            userId: {
                type: Schema.Types.ObjectId,
                required: true,
                ref: "user",
            },
            name: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: false,
            },
            logo: {
                type: String,
                required: false,
            },
            webAddress: {
                type: String,
                required: false,
            },
            showWebAddress: {
                type: Boolean,
                required: false,
            },
            email: {
                type: String,
                required: false,
            },
            showEmail: {
                type: Boolean,
                required: false,
            },
            phone: {
                type: String,
                required: false,
            },
            showPhone: {
                type: Boolean,
                required: false,
            },
            locationName: {
                type: String,
                required: false,
            },
            showLocation: {
                type: Boolean,
                required: false,
            },
            lat: {
                type: String,
                required: false,
            },
            lng: {
                type: String,
                required: false,
            },
            category: {
                name: {
                    type: String,
                    required: false,
                },
                id: {
                    type: String,
                    required: false,
                },
                subcategories: Array,
            },
            dataLanguage: {
                type: String,
                required: false,
            },
            links: {
                type: Array,
                required: false,
            },
        }));
    }

    public findById(companyId: Types.ObjectId, reqIdentifier: string): Promise<ICompanyDbEntity> {
        logger.info(`[${reqIdentifier}][findById] attempt to load company by companyId
            \ncompanyId: ${LoggerUtil.stringify(companyId)}`);

        return this._model.findById(companyId, this._fields)
            .then((company: ICompanyDbEntity) => company);
    }

    public findByIds(companyIds: Types.ObjectId[], reqIdentifier: string): Promise<ICompanyDbEntity[]> {
        logger.info(`[${reqIdentifier}][findByIds] attempt to load companies by companyIds
            \ncompanyIds: ${LoggerUtil.stringify(companyIds)}`);

        return this._model.find({_id: {$in: companyIds}}, this._fields)
            .then((companies: ICompanyDbEntity[]) => companies);
    }

    public findByUserId(userId: Types.ObjectId, reqIdentifier: string): Promise<ICompanyDbEntity[]> {
        logger.info(`[${reqIdentifier}][findByUserId] attempt to load company by userId
            \nuserId: ${LoggerUtil.stringify(userId)}`);

        return this._model.find({userId}, this._fields)
            .then((companies: ICompanyDbEntity[]) => companies);
    }

    public findByEmail(email: string, reqIdentifier: string): Promise<ICompanyDbEntity> {
        logger.info(`[${reqIdentifier}][findByEmail] attempt to load company by email
            \nemail: ${LoggerUtil.stringify(email)}`);

        if (email) {
            return this._model.findOne({email}, this._fields)
                .then((company: ICompanyDbEntity) => company);
        }

        return Promise.resolve(null);
    }

    public findByPhone(phone: string, reqIdentifier: string): Promise<ICompanyDbEntity> {
        logger.info(`[${reqIdentifier}][findByPhone] attempt to load company by phone
            \nphone: ${LoggerUtil.stringify(phone)}`);

        if (phone) {
            return this._model.findOne({phone}, this._fields)
                .then((company: ICompanyDbEntity) => company);
        }

        return Promise.resolve(null);
    }

    public findByWebAddress(webAddress: string, reqIdentifier: string): Promise<ICompanyDbEntity> {
        logger.info(`[${reqIdentifier}][findByWebAddress] attempt to load company by webAddress
            \nwebAddress: ${LoggerUtil.stringify(webAddress)}`);

        if (webAddress) {
            return this._model.findOne({webAddress}, this._fields)
                .then((company: ICompanyDbEntity) => company);
        }

        return Promise.resolve(null);
    }

    public newCompany(company: ICompanyEntity, reqIdentifier: string): Promise<ICompanyDbEntity> {
        logger.info(`[${reqIdentifier}][newCompany] attempt to create new company
            \ncompany: ${LoggerUtil.stringifyObj(company)}`);

        const _company = new this._model(company);

        return _company.save();
    }

    public editCompany(company: ICompanyEntity, companyId: Types.ObjectId, reqIdentifier: string): Promise<ICompanyDbEntity> {
        logger.info(`[${reqIdentifier}][editCompany] attempt to edit company
            \ncompany: ${LoggerUtil.stringifyObj(company)}`);

        return this._model.update({_id: companyId}, {$set: company})
            .then((): DocumentQuery<ICompanyDbEntity, ICompanyDbEntity> => this._model.findOne({_id: companyId}));
    }

    public deleteCompany(companyId: Types.ObjectId, reqIdentifier: string): Query<void> {
        logger.info(`[${reqIdentifier}][deleteCompany] attempt to delete company
            \ncompanyId: ${LoggerUtil.stringify(companyId)}`);

        return this._model.deleteOne({_id: companyId});
    }
}
