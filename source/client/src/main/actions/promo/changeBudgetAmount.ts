import {CHANGE_PROMO_BUDGET_AMOUNT} from "../../constants";
import {Action} from "redux";

export interface IChangeBudgetAmountAction extends Action {
    budgetAmount: string;
}

export const changeBudgetAmountAction = (budgetAmount: string): IChangeBudgetAmountAction => ({
    budgetAmount,
    type: CHANGE_PROMO_BUDGET_AMOUNT,
});
