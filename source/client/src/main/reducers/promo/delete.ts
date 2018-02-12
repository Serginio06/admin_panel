import {IState, ICompanyPromo, IPromoPageState} from "../../state";
import {IDeletePromoSuccessAction} from "../../actions/promo/delete";

export const deletePromoSendReducer = (state: IState): IState => {
    return {
        ...state,
    }
};

export const deletePromoSuccessReducer = (state: IState, action: IDeletePromoSuccessAction): IState => {
    const promos: ICompanyPromo[] = state.promos;
    const promoPageState: IPromoPageState = {...state.promoPageState};

    if (promoPageState.isEditable) {
        promoPageState.isEditable = false;
    }

    for (let i: number = 0; i < promos.length; i++) {
        if (promos[i]._id === action.promoId) {
            promos.splice(i, 1);
            break;
        }
    }

    return {
        ...state,

        promos,

        promoPageState,
    };
};

export const deletePromoFailedReducer = (state: IState): IState => {
    return {
        ...state,
    }
};
