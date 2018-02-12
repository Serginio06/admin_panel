import {Document, Types} from "mongoose";
import {IPromoReward, IPromoTarget, IGeodata} from "./entity";
import {EmailTarget} from "../constants/EmailTarget";
import {PromoCardStatus} from "../constants/PromoCardStatus";
import {PromoTargetInterest} from "../../../types/constants/PromoTargetInterest";
import {RichBitUserGender} from "../constants/RichBitUserGender";
import {PromoType} from "../../../types/constants/PromoType";
import {ICategory} from "../../../types/entity";
import {PromoObjective} from "../../../types/constants/PromoObjective";
import {RichBitUserLanguage} from "../constants/RichBitUserLanguage";

export interface IRichBitUserDbEntity extends Document {
    uniqueId: string;
    interests: PromoTargetInterest[];
    geodata: IGeodata;
    sex: RichBitUserGender;
    locale: RichBitUserLanguage;
    age: string;
    open?: number;
    skip?: number;
    activate?: number;
    saved?: number;
    removed?: number;
}

export interface IPromoCard2RichBitUserMapDbEntity extends Document {
    promoCardId: Types.ObjectId,
    richBitUserId: Types.ObjectId,
    promoId: Types.ObjectId,
}

export interface IRichBitUser2SkippedCardsMapDbEntity extends Document {
    richBitUserId: Types.ObjectId;
    promoCardIds: Types.ObjectId[];
}

export interface IProductDbEntity extends Document {
    companyId: Types.ObjectId;
    name: string;
    category?: string;
    description?: string;
    objectId?: string;
    price?: string;
    quantity?: string;
    link?: string;
    expTimestamp?: string;
    isUnlimited?: boolean;
    isOnline?: boolean;
    isOffline?: boolean;
    language?: string;
    pics?: string[];
}

export interface IPromoCardDbEntity extends Document {
    promoId: Types.ObjectId;
    status: PromoCardStatus;
    code?: string;
    acquisitions: number;
    rejections: number;
    saves: number;
    views: number;
    shares: number;
    companyInfoShows: number;
}

export interface IPromoDbEntity extends Document {
    createdTimestamp: number;
    companyId: Types.ObjectId;
    codeType?: string;
    status?: string;
    name: string;
    objective?: PromoObjective;
    productId?: Types.ObjectId;
    reward: IPromoReward;
    offerPhrase?: string;
    about?: string;
    terms?: string;
    promoType?: PromoType;
    condition?: string;
    quantityValue?: string;
    quantityUnlimited?: boolean;
    value?: string;
    codes?: string[];
    timeToDecide?: number;
    target?: IPromoTarget;
    scheduleType?: string;
    pricing?: string;
    finishDate?: string;
    startDate?: string;
    budgetPeriod?: string;
    budgetAmount?: string;
    dataLanguage?: string;
    promoProductObject?: string;
    promoImgCode?: string;
}

export interface IUserDbEntity extends Document {
    name: string;
    verified: boolean;
    facebookId?: number;
    email?: string;
    password?: string;
    isOnDispatch?: boolean;
}

export interface ICompanyDbEntity extends Document {
    userId: Types.ObjectId;
    name: string;
    description?: string;
    logo?: string;
    webAddress?: string;
    showWebAddress?: boolean;
    email?: string;
    showEmail?: boolean;
    phone?: string;
    showPhone?: boolean;
    locationName?: string;
    showLocation?: boolean;
    lat?: string;
    lng?: string;
    category?: ICategory;
    dataLanguage?: string;
    links?: string[];
}

export interface IVerificationCodeDbEntity extends Document {
    userId: Types.ObjectId;
    target: EmailTarget;
    hash: string;
}

export interface ICategoryDbEntity extends Document {
    id: string;
    name: string;
    subcategories: ISubcategories[];
}

export interface ISubcategories {
    id: string;
    parentId: string;
    name: string;
    subcategories: [{
        id: string;
        parentId: string;
        name: string;
        subcategories: [{
            id: string;
            parentId: string;
            name: string;
        }];
    }];
}