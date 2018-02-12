import {ICompanyPromo, IState, IStepsState} from "../../state";
import {IChangeFinishDateTimeAction} from "../../actions/promo/changeFinishDateTime";

export function changeFinishDateTimeReducer(state: IState, action: IChangeFinishDateTimeAction): IState {
    const finishDate: string = action.finishDateTime;
    const isEditable: boolean = state.promoPageState.isEditable;
    const promoId: string = state.promoPageState._id;
    const promos: ICompanyPromo[] = state.promos.slice();
    const steps: IStepsState[] = state.promoPageState.steps.slice();

    for (const promo of promos) {
        if (promo._id === promoId) {
            promo.finishDate = finishDate;
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
            && state.promoPageState.startDate !== ""
            && finishDate !== "";
    }

    return {
        ...state,

        promos,

        promoPageState: {
            ...state.promoPageState,

            currentStep: 4,
            steps,

            finishDate,
            isEditable,
        },
    };
}
