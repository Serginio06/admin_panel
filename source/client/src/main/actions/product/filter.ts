import {Action} from "redux";
import {FILTER} from "../../constants";

export interface IFilterAction extends Action {
    category: string;
}

export const filterAction = (category: string): IFilterAction => {
    return {
        type: FILTER,
        category,
    }
};
