import {PromoObjective} from "./constants/PromoObjective";
import {PromoRewardType} from "./constants/PromoRewardType";
import {PromoTargetInterest} from "./constants/PromoTargetInterest";
import {PromoTargetGender} from "./constants/PromoTargetGender";
import {PromoTargetLanguage} from "./constants/PromoTargetLanguage";
import {PromoTargetAge} from "./constants/PromoTargetAge";

export interface ISigninResult {
    userName: string;
    userId: string;
}

export interface ICategory {
    id: string;
    name: string;
    subcategories?: ICategory[];
}

export interface ICompany {
    _id?: string;
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
    lat?: number;
    lng?: number;
    category?: ICategory;
    dataLanguage?: string;
    links?: string[];
    completed?: boolean;
}

export interface IProduct {
    _id?: string; //@todo remove me
    productId?: string;
    companyId: string;
    name: string;
    category?: string;
    description?: string;
    object?: string;
    objectId?: string;
    price?: string;
    quantity?: string;
    link2product?: string;
    expDate?: string;
    isUnlimitedQuantity?: boolean;
    isOnline?: boolean;
    isOffline?: boolean;
    dataLanguage?: string;
    images?: string[];

    isEditable?: boolean;
    isUnlimited?: boolean;
    link?: string;
    completed?: boolean;
    language?: string;
}

export interface IPromoLocation {
    locationName: string;
    locationType: string;
    lat: number;
    lng: number;
}

export interface IPromoStatistics {
    promoId: string;
    name: string;
    status: string;
    acquisitions: number;
    rejections: number;
    saves: number;
    views: number;
    companyInfoShows: number;
    activates: number;
    shares: number;
}

export interface IPromo {
    name: string;
    objective?: PromoObjective;

    productObject?: string;
    productId?: string;
    rewardType?: PromoRewardType;
    separateProductId?: string;
    discount?: string;

    type?: string;
    condition?: string;
    offerPhrase?: string;
    about?: string;
    terms?: string;
    value?: string;
    quantity?: string;
    isUnlimited?: boolean;
    time2Decide?: number;
    codeType?: string;
    codes?: string;
    imgCode?: string;

    age?: PromoTargetAge[];
    gender?: PromoTargetGender;
    language?: PromoTargetLanguage;
    location?: IPromoLocation;
    locationName?: string;
    locationType?: string;
    lat?: number;
    lng?: number;
    interests?: PromoTargetInterest[];

    scheduleType?: string;
    budgetPeriod?: string;
    pricing?: string;
    budgetAmount?: string;
    startDate?: string;
    finishDate?: string;

    _id: string;
    companyId?: string;
    createdTimestamp?: number;
    status?: string;
    dataLanguage?: string;
}

export interface IResponse<T> {
    success: boolean;
    payload?: T;
    errorCode?: string;
}
