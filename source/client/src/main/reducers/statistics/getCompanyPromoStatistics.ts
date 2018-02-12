import {IState} from "../../state";
import {Action} from "redux";
import {IPromoStatistics} from "../../../../../types/entity";
import {IFailedAction} from "../../../common/actions";

export const loadCompanyPromoStatisticsSendReducer = (state: IState): IState => ({...state});

export interface ILoadCompanyPromoStatisticsSuccessReducer extends Action {
    payload: IPromoStatistics[],
}

export const loadCompanyPromoStatisticsSuccessReducer = (state: IState, action: ILoadCompanyPromoStatisticsSuccessReducer): IState => ({
    ...state,
    statisticsPageState: {
        errorCode: "",
        failed: false,
        promoStatistics: action.payload,
    },
});

export const loadCompanyPromoStatisticsFailedReducer = (state: IState, action: IFailedAction): IState => ({
    ...state,
    statisticsPageState: {
        errorCode: action.errorCode,
        failed: true,
        promoStatistics: null,
    },
});
