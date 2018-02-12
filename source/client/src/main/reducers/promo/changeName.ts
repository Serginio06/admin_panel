import {VALIDATION_LEVEL_ERROR, VALIDATION_LEVEL_SUCCESS} from "../../../common/constants/ValidationLevelType";
import {ICompanyPromo, IState, IStepsState} from "../../state";
import {IChangeNameAction} from "../../actions/promo/changeName";

export function changeNameReducer(state: IState, action: IChangeNameAction): IState {
    let nameValidationLevel: string = VALIDATION_LEVEL_SUCCESS;
    let nameValidationMessage: string = "";
    let name: string = action.name;

    const isEditable: boolean = state.promoPageState.isEditable;
    const promoId: string = state.promoPageState._id;
    const promos: ICompanyPromo[] = state.promos.slice();
    const steps: IStepsState[] = state.promoPageState.steps.slice();

    // if (name && name.length > 50) {
    //     name = name.substr(0, 50);
    // }

    if (!name || name.length === 0) {
        nameValidationLevel = VALIDATION_LEVEL_ERROR;
        nameValidationMessage = "Field must be filled";
    }
    // else if (name.length > 30) {
    //     nameValidationLevel = VALIDATION_LEVEL_ERROR;
    //     nameValidationMessage = "Too long value";
    // }

    for (const promo of promos) {
        if (promo._id === promoId) {
            promo.name = name;
            break;
        }
    }

    steps[0].isCompleted = name !== ""
        && nameValidationMessage === ""
        && state.promoPageState.objective !== null
        && state.promoPageState.objectiveValidationMessage === "";

    return {
        ...state,

        promos,

        promoPageState: {
            ...state.promoPageState,

            currentStep: 0,
            steps,

            name,
            nameValidationLevel,
            nameValidationMessage,

            isEditable,
        },
    };
}
