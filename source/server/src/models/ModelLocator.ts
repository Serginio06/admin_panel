import {UserModel} from "./UserModel";
import {VerificationCodeModel} from "./VerificationCodeModel";
import {CompanyModel} from "./CompanyModel";
import {CategoryModel} from "./CategoryModel";
import {ProductModel} from "./ProductModel";
import {RichBitUserModel} from "./api/RichBitUserModel";
import {PromoModel} from "./PromoModel";
import {PromoCardModel} from "./PromoCardModel";
import {RichBitUser2SkippedPromoCardsMapModel} from "./api/RichBitUser2SkippedPromoCardsMapModel";
import {PromoCard2RichBitUserMapModel} from "./api/PromoCard2RichBitUserMapModel";
import {Connection} from "mongoose";

export class ModelLocator {
    static instance: ModelLocator;

    _dbInstance: Connection;

    _categoryModel: CategoryModel;
    _companyModel: CompanyModel;
    _productModel: ProductModel;
    _promoModel;
    _promoCardModel: PromoCardModel;
    _userModel: UserModel;
    _verificationCodeModel: VerificationCodeModel;

    _richBitUserModel;
    _richBitUser2skippedPromoCardsMapModel;
    _promoCard2RichBitUserMapModel;

    constructor(dbInstance) {
        this._dbInstance = dbInstance;

        this._categoryModel = null;
        this._companyModel = null;
        this._productModel = null;
        this._promoModel = null;
        this._promoCardModel = null;
        this._userModel = null;
        this._verificationCodeModel = null;

        this._richBitUserModel = null;
        this._richBitUser2skippedPromoCardsMapModel = null;
        this._promoCard2RichBitUserMapModel = null;
    }

    static getInstance(dbInstance: Connection = null) {
        if (!this.instance) {
            this.instance = new ModelLocator(dbInstance);
        }

        return this.instance;
    }

    getCategoryModel(): CategoryModel {
        if (this._categoryModel === null) {
            this._categoryModel = new CategoryModel(this._dbInstance);
        }

        return this._categoryModel;
    }

    getCompanyModel(): CompanyModel {
        if (this._companyModel === null) {
            this._companyModel = new CompanyModel(this._dbInstance);
        }

        return this._companyModel;
    }

    getPromoModel() {
        if (this._promoModel === null) {
            this._promoModel = new PromoModel(this._dbInstance);
        }

        return this._promoModel;
    }

    getPromoCardModel(): PromoCardModel {
        if (this._promoCardModel === null) {
            this._promoCardModel = new PromoCardModel(this._dbInstance);
        }

        return this._promoCardModel;
    }

    getProductModel(): ProductModel {
        if (this._productModel === null) {
            this._productModel = new ProductModel(this._dbInstance);
        }

        return this._productModel;
    }

    getUserModel(): UserModel {
        if (this._userModel === null) {
            this._userModel = new UserModel(this._dbInstance);
        }

        return this._userModel;
    }

    getVerificationCodeModel(): VerificationCodeModel {
        if (this._verificationCodeModel === null) {
            this._verificationCodeModel = new VerificationCodeModel(this._dbInstance);
        }

        return this._verificationCodeModel;
    }

    getRichBitUserModel() {
        if (this._richBitUserModel === null) {
            this._richBitUserModel = new RichBitUserModel(this._dbInstance);
        }

        return this._richBitUserModel;
    }

    getRichBitUser2skippedPromoCardsMapModel() {
        if (this._richBitUser2skippedPromoCardsMapModel === null) {
            this._richBitUser2skippedPromoCardsMapModel = new RichBitUser2SkippedPromoCardsMapModel(this._dbInstance);
        }

        return this._richBitUser2skippedPromoCardsMapModel;
    }

    getPromoCard2RichBitUserMapModel() {
        if (this._promoCard2RichBitUserMapModel === null) {
            this._promoCard2RichBitUserMapModel = new PromoCard2RichBitUserMapModel(this._dbInstance);
        }

        return this._promoCard2RichBitUserMapModel;
    }
}