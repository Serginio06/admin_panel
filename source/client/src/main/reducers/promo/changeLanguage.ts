import {VALIDATION_LEVEL_ERROR, VALIDATION_LEVEL_SUCCESS} from "../../../common/constants/ValidationLevelType";
import {ICompanyPromo, IState, IStepsState} from "../../state";
import {IChangeLanguageAction} from "../../actions/promo/changeLanguage";
import {PromoTargetLanguage} from "../../../../../types/constants/PromoTargetLanguage";

export function changeLanguageReducer(state: IState, action: IChangeLanguageAction): IState {
    let languageValidationLevel: string = VALIDATION_LEVEL_SUCCESS;
    let languageValidationMessage: string = "";
    const language: PromoTargetLanguage = action.language;
    const isEditable: boolean = state.promoPageState.isEditable;
    const promoId: string = state.promoPageState._id;
    const promos: ICompanyPromo[] = state.promos.slice();
    const steps: IStepsState[] = state.promoPageState.steps.slice();

    if (!language || language.length === 0) {
        languageValidationLevel = VALIDATION_LEVEL_ERROR;
        languageValidationMessage = "Field must be filled";
    }

    for (const promo of promos) {
        if (promo._id === promoId) {
            promo.language = language;
            break;
        }
    }

    steps[3].isCompleted = state.promoPageState.gender !== null
        && state.promoPageState.genderValidationMessage === ""
        && state.promoPageState.age !== null
        && state.promoPageState.ageValidationMessage === ""
        && language !== null
        && languageValidationMessage === ""
        && state.promoPageState.interests !== null
        && state.promoPageState.interestValidationMessage === "";

    return {
        ...state,

        promos,

        promoPageState: {
            ...state.promoPageState,

            currentStep: 3,
            steps,

            language,
            languageValidationLevel,
            languageValidationMessage,

            isEditable,
        },
    };
}
