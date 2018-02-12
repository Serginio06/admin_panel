import {VALIDATION_LEVEL_ERROR, VALIDATION_LEVEL_SUCCESS} from "../../../common/constants/ValidationLevelType";
import {ICompanyPromo, IState, IStepsState} from "../../state";
import {IChangeObjectiveAction} from "../../actions/promo/changeObjective";
import {PromoObjective} from "../../../../../types/constants/PromoObjective";

export const changeObjectiveReducer = (state: IState, action: IChangeObjectiveAction): IState => {
    let objectiveValidationLevel: string = VALIDATION_LEVEL_SUCCESS;
    let objectiveValidationMessage: string = "";

    const objective: PromoObjective = action.objective;
    const isEditable: boolean = state.promoPageState.isEditable;
    const promoId: string = state.promoPageState._id;
    const promos: ICompanyPromo[] = state.promos.slice();
    const steps: IStepsState[] = state.promoPageState.steps.slice();

    if (!objective) {
        objectiveValidationLevel = VALIDATION_LEVEL_ERROR;
        objectiveValidationMessage = "Field must be filled";
    }

    for (const promo of promos) {
        if (promo._id === promoId) {
            promo.objective = objective;
            break;
        }
    }

    steps[0].isCompleted = state.promoPageState.name !== ""
        && state.promoPageState.nameValidationMessage === ""
        && objective !== null
        && objectiveValidationMessage === "";

    return {
        ...state,

        promos,

        promoPageState: {
            ...state.promoPageState,

            currentStep: 0,
            steps,

            objective,
            objectiveValidationLevel,
            objectiveValidationMessage,

            isEditable,
        },
    };
};
