import {IState} from "../../state";
import {IUpdateStatisticsAction} from "../../actions/statistics/update";
import {IPromoStatistics} from "../../../../../types/entity";

export const updateStatisticsReducer = (state: IState, action: IUpdateStatisticsAction): IState => {
    const statistics: IPromoStatistics[] = state.statisticsPageState.promoStatistics.slice();

    for (let item of statistics) {
        if (item.promoId === action.statistics.promoId) {
            item = action.statistics;
            break;
        }
    }

    return {
        ...state,

        statisticsPageState: {
            ...state.statisticsPageState,

            promoStatistics: statistics,
        }
    }
};
