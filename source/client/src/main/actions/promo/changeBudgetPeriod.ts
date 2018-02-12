import {CHANGE_PROMO_BUDGET_PERIOD} from "../../constants";
import {Action} from "redux";

export interface IChangeBudgetPeriodAction extends Action {
    budgetPeriod: string;
}

export const changeBudgetPeriodAction = (budgetPeriod: string): IChangeBudgetPeriodAction => ({
    budgetPeriod,
    type: CHANGE_PROMO_BUDGET_PERIOD,
});
