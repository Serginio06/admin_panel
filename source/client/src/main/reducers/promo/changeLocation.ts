import {ICompanyPromo, IState} from "../../state";
import {IChangeLocationAction} from "../../actions/promo/changeLocation";
import {VALIDATION_LEVEL_ERROR, VALIDATION_LEVEL_SUCCESS} from "../../../common/constants/ValidationLevelType";

export function changeLocationReducer(state: IState, action: IChangeLocationAction): IState {
    let location: string = action.location;
    let locationValidationLevel: string = VALIDATION_LEVEL_SUCCESS;
    let locationValidationMessage: string = "";

    const lat: number = action.lat;
    const lng: number = action.lng;
    const locationType: string = action.locationType;
    const isEditable: boolean = state.promoPageState.isEditable;
    const promoId: string = state.promoPageState._id;
    const promos: ICompanyPromo[] = state.promos.slice();

    if (location && location.length > 300) {
        location = location.substr(300);
    }

    if (!location || !lat || !lng || !locationType) {
        locationValidationLevel = VALIDATION_LEVEL_ERROR;
        locationValidationMessage = "Choose real address";
    }

    for (let promo of promos) {
        if (promo._id === promoId) {
            promo = {
                ...promo,
                locationName: location,
                lat,
                lng,
                locationType,
            };
            break;
        }
    }

    return {
        ...state,

        promos,

        promoPageState: {
            ...state.promoPageState,
            locationValidationLevel,
            locationValidationMessage,
            isEditable,
            lat,
            lng,
            locationName: location,
            locationType,
        },
    };
}
