
import {DataLanguage} from "../../../common/constants/dataLanguageType";
import {ICompanyPromo, initState, IState} from "../../state";
import {IEditPromoSendAction, IEditPromoSuccessAction} from "../../actions/promo/editPromo";
import {IPromo} from "../../../../../types/entity";

export function editPromoSendReducer(state: IState, action: IEditPromoSendAction): IState {
    return {
        ...state,

        promoPageState: {
            ...state.promoPageState,

            errorCode: "",
            failed: false,
        },
    };
}

export function editPromoSuccessReducer(state: IState, action: IEditPromoSuccessAction): IState {
    const promos: ICompanyPromo[] = action.promos.map((item: IPromo) => {
        return {
            ...item,
            checked: false,
            priceAfterDiscount: "",
            quantityIsUnlimitedChecked: item.isUnlimited,
        }
    });

    return {
        ...state,

        promos,

        promoPageState: {
            ...initState.promoPageState,
            currentStep: 0,

            isEditable: false,
            registered: false,

            _id: "0",

            dataLanguage: DataLanguage.EN,

            name: "",
            nameValidationLevel: "",
            nameValidationMessage: "",

            productObject: "",
            productObjectValidationLevel: "",
            productObjectValidationMessage: "",

            objective: null,
            objectiveValidationLevel: "",
            objectiveValidationMessage: "",

            productId: "",
            productIdValidationLevel: "",
            productIdValidationMessage: "",

            priceAfterDiscount: "",

            rewardType: null,
            rewardTypeValidationLevel: "",
            rewardTypeValidationMessage: "",

            separateProductId: "",
            separateProductIdValidationLevel: "",
            separateProductIdValidationMessage: "",

            offerPhrase: "",
            offerPhraseValidationLevel: "",
            offerPhraseValidationMessage: "",

            about: "",
            aboutValidationLevel: "",
            aboutValidationMessage: "",

            terms: "",
            termsValidationLevel: "",
            termsValidationMessage: "",

            type: "",

            typeValidationLevel: "",
            typeValidationMessage: "",

            condition: "",
            conditionValidationLevel: "",
            conditionValidationMessage: "",

            value: "",
            valueValidationLevel: "",
            valueValidationMessage: "",

            quantity: "",
            isUnlimited: false,
            quantityValidationLevel: "",
            quantityValidationMessage: "",

            codes: "",
            codesValidationLevel: "",
            codesValidationMessage: "",

            discount: "",
            discountValidationLevel: "",
            discountValidationMessage: "",

            time2Decide: null,
            time2DecideValidationLevel: "",
            time2DecideValidationMessage: "",

            gender: null,
            genderValidationLevel: "",
            genderValidationMessage: "",

            age: [],
            ageValidationLevel: "",
            ageValidationMessage: "",

            language: null,
            languageValidationLevel: "",
            languageValidationMessage: "",

            lat: 0,
            lng: 0,
            locationName: "",
            locationValidationLevel: "",
            locationValidationMessage: "",

            interests: [],
            interestValidationLevel: "",
            interestValidationMessage: "",

            scheduleType: "",
            scheduleTypeValidationLevel: "",
            scheduleTypeValidationMessage: "",

            pricing: "",
            pricingValidationLevel: "",
            pricingValidationMessage: "",

            finishDate: "",
            startDate: "",

            budgetPeriod: "",
            budgetPeriodValidationLevel: "",
            budgetPeriodValidationMessage: "",

            budgetAmount: "",
            budgetAmountValidationLevel: "",
            budgetAmountValidationMessage: "",

            imgCode: "",
            imgCodeValidationLevel: "",
            imgCodeValidationMessage: "",
        },
    };
}

export function editPromoFailedReducer(state, action) {
    return {
        ...state,

        promoPageState: {
            ...state.promoPageState,

            errorCode: action.errorCode,
            failed: true,
            registered: false,
        },
    };
}
