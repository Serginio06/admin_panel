import {VALIDATION_LEVEL_ERROR, VALIDATION_LEVEL_SUCCESS} from "../../../common/constants/ValidationLevelType";
import {ICompanyPromo, IState, IStepsState} from "../../state";
import {IChangeScheduleAction} from "../../actions/promo/changeSchedule";

export function changeScheduleTypeReducer(state: IState, action: IChangeScheduleAction): IState {
    let scheduleTypeValidationLevel: string = VALIDATION_LEVEL_SUCCESS;
    let scheduleTypeValidationMessage: string = "";

    const scheduleType: string = action.scheduleType;
    const isEditable: boolean = state.promoPageState.isEditable;
    const promoId: string = state.promoPageState._id;
    const promos: ICompanyPromo[] = state.promos.slice();
    const steps: IStepsState[] = state.promoPageState.steps.slice();

    if (!scheduleType || scheduleType.length === 0) {
        scheduleTypeValidationLevel = VALIDATION_LEVEL_ERROR;
        scheduleTypeValidationMessage = "Field must be filled";
    }

    for (const promo of promos) {
        if (promo._id === promoId) {
            promo.scheduleType = scheduleType;
            break;
        }
    }

    steps[4].isCompleted = scheduleType !== ""
        && scheduleTypeValidationMessage === ""
        && state.promoPageState.pricing !== ""
        && state.promoPageState.pricingValidationMessage === ""
        && state.promoPageState.budgetPeriod !== ""
        && state.promoPageState.budgetPeriodValidationMessage === ""
        && state.promoPageState.budgetAmount !== ""
        && state.promoPageState.budgetAmountValidationMessage === "";

    if (scheduleType === "By Time Period") {
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

            isEditable,
            scheduleType,
            scheduleTypeValidationLevel,
            scheduleTypeValidationMessage,
        },
    };
}
