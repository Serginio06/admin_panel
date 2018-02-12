import {EmailTarget} from "../constants/EmailTarget";
import {Types} from "mongoose";
import {PromoTargetInterest} from "../../../types/constants/PromoTargetInterest";
import {PromoTargetLanguage} from "../../../types/constants/PromoTargetLanguage";
import {PromoTargetAge} from "../../../types/constants/PromoTargetAge";
import {PromoTargetGender} from "../../../types/constants/PromoTargetGender";
import {ICategory, IPromoLocation} from "../../../types/entity";
import {PromoStatus} from "../../../types/constants/PromoStatus";
import {PromoCardStatus} from "../constants/PromoCardStatus";
import {RichBitUserGender} from "../constants/RichBitUserGender";
import {PromoRewardType} from "../../../types/constants/PromoRewardType";
import {PromoObjective} from "../../../types/constants/PromoObjective";
import {RichBitUserLanguage} from "../constants/RichBitUserLanguage";

export interface IGeodata {
    lat: number;
    lng: number;
}

export interface IRichBitUserEntity {
    uniqueId: string;
    interests: PromoTargetInterest[];
    geodata: IGeodata;
    sex: RichBitUserGender;
    locale?: RichBitUserLanguage;
    age: number;
    open?: number;
    skip?: number;
    activate?: number;
    saved?: number;
    removed?: number;
}

export interface IPromoReward {
    rewardType?: PromoRewardType;
    rewardId?: Types.ObjectId,
    discount?: string;
}

export interface IPromoTarget {
    gender?: PromoTargetGender,
    language?: PromoTargetLanguage,
    age?: PromoTargetAge[],
    interests?: PromoTargetInterest[],
    location?: IPromoLocation,
}

export interface IPromoEntity {
    createdTimestamp?: number;
    companyId: Types.ObjectId,
    codeType?: string;
    status?: PromoStatus;
    name: string;
    objective?: PromoObjective;
    productId?: string;
    reward: IPromoReward;
    offerPhrase?: string;
    about?: string;
    terms?: string;
    promoType?: string;
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

export interface IProductEntity {
    companyId: string;
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

export interface IPromoCardEntity {
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

export interface IUserEntity {
    name: string;
    verified: boolean;
    facebookId?: number;
    email?: string;
    password?: string;
    isOnDispatch?: boolean;
}

export interface ICompanyEntity {
    userId: Types.ObjectId;
    name: string;
    description?: string;
    logo?: string;
    webAddress?: string;
    showWebAddress?: boolean;
    email?: string;
    showEmail?: boolean;
    phone?: string;
    showPhone?: boolean,
    locationName?: string,
    showLocation?: boolean,
    lat?: number,
    lng?: number,
    category?: ICategory,
    dataLanguage?: string,
    links?: string[],
}

export interface IVerificationCodeEntity {
    userId: Types.ObjectId;
    target: EmailTarget;
    hash: string;
}
