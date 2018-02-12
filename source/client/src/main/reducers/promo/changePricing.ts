import {VALIDATION_LEVEL_ERROR, VALIDATION_LEVEL_SUCCESS} from "../../../common/constants/ValidationLevelType";
import {ICompanyPromo, IState, IStepsState} from "../../state";
import {IChangePricingAction} from "../../actions/promo/changePricing";

export function changePricingReducer(state: IState, action: IChangePricingAction): IState {
    let pricingValidationLevel: string = VALIDATION_LEVEL_SUCCESS;
    let pricingValidationMessage: string = "";

    const pricing: string = action.pricing;
    const isEditable: boolean = state.promoPageState.isEditable;
    const promoId: string = state.promoPageState._id;
    const promos: ICompanyPromo[] = state.promos.slice();
    const steps: IStepsState[] = state.promoPageState.steps.slice();

    if (!pricing || pricing.length === 0) {
        pricingValidationLevel = VALIDATION_LEVEL_ERROR;
        pricingValidationMessage = "Field must be filled";
    }
    // else if (pricing.length > 30) {
    //     pricingValidationLevel = VALIDATION_LEVEL_ERROR;
    //     pricingValidationMessage = "Too long value";
    // }

    for (const promo of promos) {
        if (promo._id === promoId) {
            promo.pricing = pricing;
            break;
        }
    }

    steps[4].isCompleted = state.promoPageState.scheduleType !== ""
        && state.promoPageState.scheduleTypeValidationMessage === ""
        && pricing !== ""
        && pricingValidationMessage === ""
        && state.promoPageState.budgetPeriod !== ""
        && state.promoPageState.budgetPeriodValidationMessage === ""
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

            pricing,
            pricingValidationLevel,
            pricingValidationMessage,

            isEditable,
        },
    };
}
