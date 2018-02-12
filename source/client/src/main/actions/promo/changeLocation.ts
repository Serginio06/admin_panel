import {CHANGE_PROMO_LOCATION} from "../../constants";
import {Action} from "redux";

export interface IChangeLocationAction extends Action {
    location: string;
    lat: number;
    lng: number;
    locationType: string;
}

export const changeLocationAction = (location: string,
                                     lat: number,
                                     lng: number,
                                     locationType: string): IChangeLocationAction => ({
    type: CHANGE_PROMO_LOCATION,
    location,
    lat,
    lng,
    locationType,
});
