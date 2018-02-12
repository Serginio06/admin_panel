import {VALIDATION_LEVEL_ERROR, VALIDATION_LEVEL_SUCCESS} from "../../../common/constants/ValidationLevelType";
import {ICompanyPromo, IPromoTargetAge, IState, IStepsState} from "../../state";
import {IChangeAgeAction} from "../../actions/promo/changeAge";
import {PromoTargetAge} from "../../../../../types/constants/PromoTargetAge";

export function changeAgeReducer(state: IState, action: IChangeAgeAction): IState {
    let ageValidationLevel: string = VALIDATION_LEVEL_SUCCESS;
    let ageValidationMessage: string = "";

    const ages: PromoTargetAge[] = action.ages;
    const isEditable: boolean = state.promoPageState.isEditable;
    const promoId: string = state.promoPageState._id;
    const promos: ICompanyPromo[] = state.promos.slice();
    const steps: IStepsState[] = state.promoPageState.steps.slice();

    if (!ages || ages.length === 0) {
        ageValidationLevel = VALIDATION_LEVEL_ERROR;
        ageValidationMessage = "Field must be filled";
    }

    for (const promo of promos) {
        if (promo._id === promoId) {
            promo.age = ages;
            break;
        }
    }

    steps[3].isCompleted = state.promoPageState.gender !== null
        && state.promoPageState.genderValidationMessage === ""
        && ages !== []
        && ageValidationMessage === ""
        && state.promoPageState.language !== null
        && state.promoPageState.languageValidationMessage === ""
        && state.promoPageState.interests !== []
        && state.promoPageState.interestValidationMessage === "";

    return {
        ...state,

        promos,

        promoPageState: {
            ...state.promoPageState,

            currentStep: 3,
            steps,

            age: ages,
            ageValidationLevel,
            ageValidationMessage,
            isEditable,
        },
    };
}
