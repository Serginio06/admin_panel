import {ICompanyPromo, IPromoPageState, IState} from "../../state";
import {IStartPromoSendAction, IStartPromoSuccessAction} from "../../actions/promo/startPromo";
import {IPromo} from "../../../../../types/entity";
import {IFailedAction} from "../../../common/actions";
import {PromoStatus} from "../../../../../types/constants/PromoStatus";

export const startPromoSendReducer = (state: IState, action: IStartPromoSendAction): IState => ({
    ...state,

    promoPageState: {
        ...state.promoPageState,

        errorCode: "",
        failed: false,
    },
});

export const startPromoSuccessReducer = (state: IState, action: IStartPromoSuccessAction): IState => {
    const promos: ICompanyPromo[] = action.promos.map((item: IPromo) => {
        return {
            ...item,
            checked: false,
            priceAfterDiscount: "",
            quantityIsUnlimitedChecked: item.isUnlimited,
        }
    });
    const promoPageState: IPromoPageState = {...state.promoPageState};
    promoPageState.status = PromoStatus.ACTIVE;

    return {
        ...state,

        promos,

        promoPageState,
    };
};

export const startPromoFailedReducer = (state: IState, action: IFailedAction): IState => ({
    ...state,

    promoPageState: {
        ...state.promoPageState,

        errorCode: action.errorCode,
        failed: true,
        registered: false,
    },
});
