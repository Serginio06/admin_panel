import {VALIDATION_LEVEL_ERROR, VALIDATION_LEVEL_SUCCESS} from "../../../common/constants/ValidationLevelType";
import {ICompanyPromo, IState, IStepsState} from "../../state";
import {IChangeCodesAction} from "../../actions/promo/changeCodes";

export const changeCodesReducer = (state: IState, action: IChangeCodesAction): IState => {
    let codesValidationLevel: string = VALIDATION_LEVEL_SUCCESS;
    let codesValidationMessage: string = "";
    let codesArray: string[] = [];

    const codes: string = action.codes;
    const isEditable: boolean = state.promoPageState.isEditable;
    const promoId: string = state.promoPageState._id;
    const isUnlimited: boolean = state.promoPageState.isUnlimited;
    const quantity: string = state.promoPageState.quantity;
    const promos: ICompanyPromo[] = state.promos.slice();
    const steps: IStepsState[] = state.promoPageState.steps.slice();

    if (codes) {
        codesArray = codes.split("\n");
        codesArray = codesArray.filter((item) => {
            return item !== "";
        });
    }

    if (!codes || codes.length === 0) {
        codesValidationLevel = VALIDATION_LEVEL_ERROR;
        codesValidationMessage = "Field must be filled";
    } else if (isUnlimited && codesArray.length !== 1) {
        codesValidationLevel = VALIDATION_LEVEL_ERROR;
        codesValidationMessage = "You have to insert one promo code";
    } else if (!isUnlimited && codesArray.length !== +quantity) {
        codesValidationLevel = VALIDATION_LEVEL_ERROR;
        codesValidationMessage = "You need as much promo codes, as you said in `Quantity` section";
    }

    for (const promo of promos) {
        if (promo._id === promoId) {
            promo.codes = codes;
            break;
        }
    }

    steps[2].isCompleted = state.promoPageState.offerPhrase !== ""
        && state.promoPageState.offerPhraseValidationMessage === ""
        && state.promoPageState.about !== ""
        && state.promoPageState.aboutValidationMessage === ""
        && state.promoPageState.terms !== ""
        && state.promoPageState.termsValidationMessage === ""
        && state.promoPageState.type !== ""
        && state.promoPageState.typeValidationMessage === ""
        && state.promoPageState.condition !== ""
        && state.promoPageState.conditionValidationMessage === ""
        && state.promoPageState.value !== ""
        && state.promoPageState.valueValidationMessage === ""
        && ((state.promoPageState.quantity !== "" && state.promoPageState.quantityValidationMessage === "")
            || state.promoPageState.isUnlimited)
        && codes !== ""
        && codesValidationMessage === ""
        && state.promoPageState.time2Decide !== null
        && state.promoPageState.time2DecideValidationMessage === "";

    return {
        ...state,

        promos,

        promoPageState: {
            ...state.promoPageState,

            currentStep: 2,
            steps,

            codes,
            codesValidationLevel,
            codesValidationMessage,
            isEditable,
        },
    };
};
