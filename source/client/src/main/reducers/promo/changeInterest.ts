import {VALIDATION_LEVEL_ERROR, VALIDATION_LEVEL_SUCCESS} from "../../../common/constants/ValidationLevelType";
import {ICompanyPromo, IState, IStepsState} from "../../state";
import {IChangeInterestsAction} from "../../actions/promo/changeInterest";
import {PromoTargetInterest} from "../../../../../types/constants/PromoTargetInterest";

export function changeInterestReducer(state: IState, action: IChangeInterestsAction): IState {
    let interestValidationLevel: string = VALIDATION_LEVEL_SUCCESS;
    let interestValidationMessage: string = "";
    const interests: PromoTargetInterest[] = action.interests;
    const isEditable: boolean = state.promoPageState.isEditable;
    const promoId: string = state.promoPageState._id;
    const promos: ICompanyPromo[] = state.promos.slice();
    const steps: IStepsState[] = state.promoPageState.steps.slice();

    if (!interests || interests.length === 0) {
        interestValidationLevel = VALIDATION_LEVEL_ERROR;
        interestValidationMessage = "Field must be filled";
    }

    for (const promo of promos) {
        if (promo._id === promoId) {
            promo.interests = interests;
            break;
        }
    }

    steps[3].isCompleted = state.promoPageState.gender !== null
        && state.promoPageState.genderValidationMessage === ""
        && state.promoPageState.age !== null
        && state.promoPageState.ageValidationMessage === ""
        && state.promoPageState.language !== null
        && state.promoPageState.languageValidationMessage === ""
        && interests !== null
        && interestValidationMessage === "";

    return {
        ...state,

        promos,

        promoPageState: {
            ...state.promoPageState,

            currentStep: 3,
            steps,

            interests: interests,
            interestValidationLevel,
            interestValidationMessage,
            isEditable,
        },
    };
}
