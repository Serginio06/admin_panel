import {VALIDATION_LEVEL_ERROR, VALIDATION_LEVEL_SUCCESS} from "../../../common/constants/ValidationLevelType";
import {ICompanyPromo, IState, IStepsState} from "../../state";
import {IChangeGenderAction} from "../../actions/promo/changeGender";
import {PromoTargetGender} from "../../../../../types/constants/PromoTargetGender";

export function changeGenderReducer(state: IState, action: IChangeGenderAction): IState {
    let genderValidationLevel: string = VALIDATION_LEVEL_SUCCESS;
    let genderValidationMessage: string = "";

    const gender: PromoTargetGender = action.gender;
    const isEditable: boolean = state.promoPageState.isEditable;
    const promoId: string = state.promoPageState._id;
    const promos: ICompanyPromo[] = state.promos.slice();
    const steps: IStepsState[] = state.promoPageState.steps.slice();

    if (!gender || gender.length === 0) {
        genderValidationLevel = VALIDATION_LEVEL_ERROR;
        genderValidationMessage = "Field must be filled";
    }

    for (const promo of promos) {
        if (promo._id === promoId) {
            promo.gender = gender;
            break;
        }
    }

    steps[3].isCompleted = gender !== null
        && genderValidationMessage === ""
        && state.promoPageState.age !== null
        && state.promoPageState.ageValidationMessage === ""
        && state.promoPageState.language !== null
        && state.promoPageState.languageValidationMessage === ""
        && state.promoPageState.interests !== null
        && state.promoPageState.interestValidationMessage === "";

    return {
        ...state,

        promos,

        promoPageState: {
            ...state.promoPageState,

            currentStep: 3,
            steps,

            gender,
            genderValidationLevel,
            genderValidationMessage,
            isEditable,
        },
    };
}
