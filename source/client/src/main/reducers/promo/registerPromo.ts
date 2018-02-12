import {Action} from "redux";
import {DataLanguage} from "../../../common/constants/dataLanguageType";
import {ICompanyPromo, initState, IState} from "../../state";
import {IRegisterPromoSendAction, IRegisterPromoSuccessAction} from "../../actions/promo/registerPromo";
import {IPromo} from "../../../../../types/entity";
import {IFailedAction} from "../../../common/actions";

export function registerPromoSendReducer(state: IState, action: IRegisterPromoSendAction): IState {
    return {
        ...state,

        promoPageState: {
            ...state.promoPageState,

            failed: false,

            errorCode: "",
        },
    };
}

export function registerPromoSuccessReducer(state: IState, action: IRegisterPromoSuccessAction): IState {
    const promos: ICompanyPromo[] = action.promos.map((item: IPromo) => {
        return {
            ...item,
            checked: false,
            quantityIsUnlimitedChecked: item.isUnlimited,
            priceAfterDiscount: "",
        }
    });

    for (const promo of promos) {
        promo.checked = false;
    }

    return {
        ...state,

        promos,

        promoPageState: {
            ...initState.promoPageState,
        },
    };
}

export function registerPromoFailedReducer(state: IState, action: IFailedAction): IState {
    return {
        ...state,

        promoPageState: {
            ...state.promoPageState,

            failed: true,

            errorCode: action.errorCode,

            registered: false,
        },
    };
}
