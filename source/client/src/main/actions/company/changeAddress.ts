import {CHANGE_COMPANY_ADDRESS} from "../../constants";
import {Action} from "redux";

export interface IChangeAddressAction extends Action {
    locationName: string;
    lat: number;
    lng: number;
}

export function changeAddressAction(locationName: string, lat: number, lng: number): IChangeAddressAction {
    return {
        lat,
        lng,
        locationName,
        type: CHANGE_COMPANY_ADDRESS,
    };
}
