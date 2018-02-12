import {ICompanyPromo, IState, IStepsState} from "../../state";
import {IChangeStartDateTimeAction} from "../../actions/promo/changeStartDateTime";

export function changeStartDateTimeReducer(state: IState, action: IChangeStartDateTimeAction): IState {
    const startDate: string = action.startDateTime;
    const isEditable: boolean = state.promoPageState.isEditable;
    const promoId: string = state.promoPageState._id;
    const promos: ICompanyPromo[] = state.promos.slice();
    const steps: IStepsState[] = state.promoPageState.steps.slice();

    for (const promo of promos) {
        if (promo._id === promoId) {
            promo.startDate = startDate;
            break;
        }
    }

    steps[4].isCompleted = state.promoPageState.scheduleType !== ""
        && state.promoPageState.scheduleTypeValidationMessage === ""
        && state.promoPageState.pricing !== ""
        && state.promoPageState.pricingValidationMessage === ""
        && state.promoPageState.budgetPeriod !== ""
        && state.promoPageState.budgetPeriodValidationMessage === ""
        && state.promoPageState.budgetAmount !== ""
        && state.promoPageState.budgetAmountValidationMessage === "";

    if (state.promoPageState.scheduleType === "By Time Period") {
        steps[4].isCompleted = steps[4].isCompleted
            && startDate !== ""
            && state.promoPageState.finishDate !== "";
    }

    return {
        ...state,

        promos,

        promoPageState: {
            ...state.promoPageState,

            currentStep: 4,
            steps,

            isEditable,
            startDate,
        },
    };
}
