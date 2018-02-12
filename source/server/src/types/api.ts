import {IGeodata} from "./entity";
import {PromoType} from "../../../types/constants/PromoType";
import {PromoTargetInterest} from "../../../types/constants/PromoTargetInterest";
import {PromoRewardType} from "../../../types/constants/PromoRewardType";
import {PromoCardStatus} from "../constants/PromoCardStatus";

export interface IRichBitPromoCard {
    cardId: string;
    status: PromoCardStatus;

    company: IRichBitPromoCardCompany;
    promo: IRichBitPromoCardPromo;
    product: IRichBitPromoCardProduct;
    reward: IRichBitPromoCardReward;
}

export interface IRichBitPromoCardCompany {
    name: string;
    logo: string;
    about: string;
    category: string;
    subcategory: string;
    website: string;
    email: string;
    phone: string;
    address: string;
    location: {
        lat: string;
        lng: string;
    };
}

export interface IRichBitPromoCardPromo {
    offer: string;
    about: string;
    terms: string;
    price: string;
    type: PromoType;
    condition: string;
    activationText?: string;
    activationImg?: string;
    timeToDecide: number;
    lat: string;
    lng: string;
    interests: PromoTargetInterest[];
}

export interface IRichBitPromoCardProduct {
    link: string;
    price: string;
    pics: string[];
}

export interface IRichBitPromoCardReward {
    type: PromoRewardType;
    link: string;
    pics: string[];
    percentage: string;
}