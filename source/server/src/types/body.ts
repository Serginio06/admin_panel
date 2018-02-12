import {ICompany, IProduct, IPromo} from "../../../types/entity";
import {PromoTargetInterest} from "../../../types/constants/PromoTargetInterest";
import {IGeodata} from "./entity";
import {RichBitUserLanguage} from "../constants/RichBitUserLanguage";
import {RichBitUserGender} from "../constants/RichBitUserGender";

export interface ILoginBody {
    email: string;
    password: string;
    keepLogged: boolean;
}

export interface ILoginViaFacebookBody {
    facebookId: number;
    keepLogged: boolean;
}

export interface IRecoverBody {
    email: string;
}

export interface IRegisterUserBody {
    firstName: string;
    familyName: string;
    email: string;
    password: string;
    verify: string;
    isOnDispatch: boolean;
}

export interface IRegisterUserViaFacebookBody {
    name: string;
    facebookId: number;
}

export interface ISignupCheckEmailBody {
    email: string;
}

export interface ILoadUserInfoBody {
    resolvePublic: boolean;
}

export interface IApplyNewPasswordBody {
    newPassword: string;
}

export interface IRegisterCompanyBody {
    company: ICompany;
}

export interface IDeleteCompanyBody {
    companyId: string;
}

export interface IEditCompanyBody {
    company: ICompany;
}

export interface ICheckCompanyEmailBody {
    email: string;
}

export interface ICheckCompanyPhoneBody {
    phone: string;
}

export interface ICheckCompanyWebAddressBody {
    webAddress: string;
}

export interface IEditProductBody {
    product: IProduct;
}

export interface IDeleteProductBody {
    productId: string;
}

export interface IRegisterProductBody {
    product: IProduct;
}

export interface ILoadCompanyProductsBody {
    companyId: string;
}

export interface IPromoCardBody {
    cardId: string;
}

export interface IFinishPromoBody {
    promoId: string;
}

export interface ICompanyPromosBody {
    companyId: string;
}

export interface IPromoBody {
    promo: IPromo;
    isDraft: boolean;
}

export interface IRichBitRequestBody {
    uniqueId: string;
    cardId: string;
}

export interface ISaveRichBitUserInterestsBody extends IRichBitRequestBody {
    interests: PromoTargetInterest[];
}

export interface IRichBitInitiateBody extends IRichBitRequestBody {
    geodata: IGeodata;
    locale: RichBitUserLanguage;
    gender: RichBitUserGender;
}