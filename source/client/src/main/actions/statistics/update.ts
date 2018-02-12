import {IPromoStatistics} from "../../../../../types/entity";
import {Action} from "redux";
import {UPDATE_STATISTICS} from "../../constants";

export interface IUpdateStatisticsAction extends Action {
    statistics: IPromoStatistics;
}

export const updateStatisticsAction = (statistics: IPromoStatistics): IUpdateStatisticsAction => {
    return {
        type: UPDATE_STATISTICS,
        statistics: statistics,
    }
};
