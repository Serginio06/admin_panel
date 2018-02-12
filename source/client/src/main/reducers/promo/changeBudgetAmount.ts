import {VALIDATION_LEVEL_ERROR, VALIDATION_LEVEL_SUCCESS} from "../../../common/constants/ValidationLevelType";
import {isCurrencyValid} from "../../../common/util/validation";
import {ICompanyPromo, IState, IStepsState} from "../../state";
import {IChangeBudgetAmountAction} from "../../actions/promo/changeBudgetAmount";

export function changeBudgetAmountReducer(state: IState, action: IChangeBudgetAmountAction): IState {
    let budgetAmountValidationLevel: string = VALIDATION_LEVEL_SUCCESS;
    let budgetAmountValidationMessage: string = "";
    let budgetAmount: string;

    const isEditable: boolean = state.promoPageState.isEditable;
    const promoId: string = state.promoPageState._id;
    const promos: ICompanyPromo[] = state.promos.slice();
    const steps: IStepsState[] = state.promoPageState.steps.slice();

    if (action.budgetAmount.length > 1) {
        budgetAmount = action.budgetAmount.match(/[^$]*/g).join("");

        if (budgetAmount.split(".").length > 1) {
            const _budgetAmount: string[] = budgetAmount.split(".");
            _budgetAmount[0] = /^\d+$/.test(_budgetAmount[0]) ? _budgetAmount[0] : "0";

            if (_budgetAmount[0].length > 1 && _budgetAmount[0].charAt(0) === "0") {
                let p: string = "";
                let flag: boolean = false;

                for (let i: number = 0; i < budgetAmount[0].length; i++) {
                    if (!flag && _budgetAmount[0].charAt(i) !== "0") {
                        flag = true;
                    }

                    if (flag) {
                        p += _budgetAmount[0].charAt(i);
                    }
                }

                _budgetAmount[0] = p.length ? p : "0";
            }
            if (_budgetAmount[1]) {
                _budgetAmount[1] = /^\d+$/.test(_budgetAmount[1]) ? _budgetAmount[1] : "00";
                _budgetAmount[1] = _budgetAmount[1].substr(0, 2);
            }
            budgetAmount = _budgetAmount.join(".");
        } else {
            let p: string = "";
            let flag: boolean = false;

            for (let i: number = 0; i < budgetAmount.length; i++) {
                if (!flag && budgetAmount.charAt(i) !== "0") {
                    flag = true;
                }

                if (flag) {
                    p += budgetAmount.charAt(i);
                }
            }

            budgetAmount = p.length ? p : "0";
        }
    } else if (action.budgetAmount.length === 1) {
        budgetAmount = /^\d+$/.test(action.budgetAmount) ? action.budgetAmount : "0";
    } else {
        budgetAmount = "0";
    }

    if (budgetAmount && budgetAmount.length > 15) {
        budgetAmount = budgetAmount.substr(0, 15);
    }

    if (!budgetAmount || budgetAmount.length === 0) {
        budgetAmountValidationLevel = VALIDATION_LEVEL_ERROR;
        budgetAmountValidationMessage = "Field must be filled";
    } else if (!isCurrencyValid(budgetAmount)) {
        budgetAmount = state.promoPageState.budgetAmount;
    }

    for (const promo of promos) {
        if (promo._id === promoId) {
            promo.budgetAmount = budgetAmount;
            break;
        }
    }

    steps[4].isCompleted = state.promoPageState.scheduleType !== ""
        && state.promoPageState.scheduleTypeValidationMessage === ""
        && state.promoPageState.pricing !== ""
        && state.promoPageState.pricingValidationMessage === ""
        && state.promoPageState.budgetPeriod !== ""
        && state.promoPageState.budgetPeriodValidationMessage === ""
        && budgetAmount !== ""
        && budgetAmountValidationMessage === "";

    if (state.promoPageState.scheduleType === "By Time Period") {
        steps[4].isCompleted = steps[4].isCompleted
            && state.promoPageState.startDate !== ""
            && state.promoPageState.finishDate !== "";
    }

    return {
        ...state,

        promos,

        promoPageState: {
            ...state.promoPageState,

            currentStep: 4,
            steps,

            budgetAmount,
            budgetAmountValidationLevel,
            budgetAmountValidationMessage,
            isEditable,
        },
    };
}
