import {VALIDATION_LEVEL_ERROR, VALIDATION_LEVEL_SUCCESS} from "../../../common/constants/ValidationLevelType";
import {ICompanyPromo, IState, IStepsState} from "../../state";
import {IChangeBudgetPeriodAction} from "../../actions/promo/changeBudgetPeriod";

export function changeBudgetPeriodReducer(state: IState, action: IChangeBudgetPeriodAction): IState {
    let budgetPeriodValidationLevel: string = VALIDATION_LEVEL_SUCCESS;
    let budgetPeriodValidationMessage: string = "";

    const budgetPeriod: string = action.budgetPeriod;
    const isEditable: boolean = state.promoPageState.isEditable;
    const promoId: string = state.promoPageState._id;
    const promos: ICompanyPromo[] = state.promos.slice();
    const steps: IStepsState[] = state.promoPageState.steps.slice();

    if (!budgetPeriod || budgetPeriod.length === 0) {
        budgetPeriodValidationLevel = VALIDATION_LEVEL_ERROR;
        budgetPeriodValidationMessage = "Field must be filled";
    }

    for (const promo of promos) {
        if (promo._id === promoId) {
            promo.budgetPeriod = budgetPeriod;
            break;
        }
    }

    steps[4].isCompleted = state.promoPageState.scheduleType !== ""
        && state.promoPageState.scheduleTypeValidationMessage === ""
        && state.promoPageState.pricing !== ""
        && state.promoPageState.pricingValidationMessage === ""
        && budgetPeriod !== ""
        && budgetPeriodValidationMessage === ""
        && state.promoPageState.budgetAmount !== ""
        && state.promoPageState.budgetAmountValidationMessage === "";

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

            budgetPeriod,
            budgetPeriodValidationLevel,
            budgetPeriodValidationMessage,
            isEditable,
        },
    };
}
