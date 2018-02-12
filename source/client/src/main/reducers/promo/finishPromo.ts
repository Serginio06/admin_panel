import {ICompanyPromo, IPromoPageState, IState} from "../../state";
import {IFinishPromoSendAction, IFinishPromoSuccessAction} from "../../actions/promo/finishPromo";
import {IPromo} from "../../../../../types/entity";
import {IFailedAction} from "../../../common/actions";
import {PromoStatus} from "../../../../../types/constants/PromoStatus";

export const finishPromoSendReducer = (state: IState, action: IFinishPromoSendAction): IState => ({
    ...state,

    promoPageState: {
        ...state.promoPageState,

        errorCode: "",
        failed: false,
    },
});

export const finishPromoSuccessReducer = (state: IState, action: IFinishPromoSuccessAction): IState => {
    const promos: ICompanyPromo[] = action.promos.map((item: IPromo) => {
        return {
            ...item,
            checked: false,
            priceAfterDiscount: "",
            quantityIsUnlimitedChecked: item.isUnlimited,
        }
    });
    const promoPageState: IPromoPageState = {...state.promoPageState};
    promoPageState.status = PromoStatus.EXPIRED;

    return {
        ...state,

        promos,

        promoPageState,
    };
};

export const finishPromoFailedReducer = (state: IState, action: IFailedAction): IState => ({
    ...state,

    promoPageState: {
        ...state.promoPageState,

        errorCode: action.errorCode,
        failed: true,
        registered: false,
    },
});
