import {ICompanyPromo, initState, IState} from "../../state";
import {IChoosePromo2ViewAction} from "../../actions/promo/choosePromoToView";
import {VALIDATION_LEVEL_SUCCESS} from "../../../common/constants/ValidationLevelType";

export const choosePromoToViewReducer = (state: IState, action: IChoosePromo2ViewAction): IState => {
    const promos: ICompanyPromo[] = state.promos.slice();
    const isSamePromo: boolean = action.promoId === state.promoPageState._id;
    let targetPromo: ICompanyPromo = null;

    for (const promo of promos) {
        if (promo._id === action.promoId) {
            targetPromo = promo;
            promo.checked = !isSamePromo;
        } else {
            promo.checked = false;
        }
    }

    if (targetPromo === null) {
        console.error(`Promo wasn't found! PromoId: ${action.promoId}`);
        return {...state};
    }

    for (let i = 0; i < promos.length; i++) {
        if (promos[i]._id === "0") {
            promos.splice(i, 1);
            break;
        }
    }

    const nameLevel: string = VALIDATION_LEVEL_SUCCESS;
    const nameMessage: string = "";
    const offerPhraseLevel: string = VALIDATION_LEVEL_SUCCESS;
    const offerPhraseMessage: string = "";
    const aboutLevel: string = VALIDATION_LEVEL_SUCCESS;
    const aboutMessage: string = "";
    const termsLevel: string = VALIDATION_LEVEL_SUCCESS;
    const termsMessage: string = "";
    const codesLevel: string = VALIDATION_LEVEL_SUCCESS;
    const codesMessage: string = "";
    const timeLevel: string = VALIDATION_LEVEL_SUCCESS;
    const timeMessage: string = "";
    const locationLevel: string = VALIDATION_LEVEL_SUCCESS;
    const locationMessage: string = "";
    const pricingLevel: string = VALIDATION_LEVEL_SUCCESS;
    const pricingMessage: string = "";
    const budgetAmountLevel: string = VALIDATION_LEVEL_SUCCESS;
    const budgetAmountMessage: string = "";

    const pageState = isSamePromo ? initState.promoPageState : {
        ...state.promoPageState,

        isEditable: false,
        isViewable: !isSamePromo,
        _id: targetPromo._id,

        errorCode: "",
        failed: false,

        dataLanguage: targetPromo.dataLanguage,

        name: targetPromo.name || "",
        nameValidationLevel: nameLevel,
        nameValidationMessage: nameMessage,

        productObject: targetPromo.productObject || "",

        objective: targetPromo.objective || null,

        productId: targetPromo.productId || "",

        rewardType: targetPromo.rewardType || null,

        separateProductId: targetPromo.separateProductId || "",

        offerPhrase: targetPromo.offerPhrase || "",
        offerPhraseValidationLevel: offerPhraseLevel,
        offerPhraseValidationMessage: offerPhraseMessage,

        about: targetPromo.about || "",
        aboutValidationLevel: aboutLevel,
        aboutValidationMessage: aboutMessage,

        terms: targetPromo.terms || "",
        termsValidationLevel: termsLevel,
        termsValidationMessage: termsMessage,

        type: targetPromo.type,

        condition: targetPromo.condition || "",

        value: targetPromo.value ? targetPromo.value.match(/[^$]*/g).join("") : "",

        quantity: targetPromo.quantity || "",
        isUnlimited: targetPromo.isUnlimited,

        codes: targetPromo.codes || "",
        codesValidationLevel: codesLevel,
        codesValidationMessage: codesMessage,

        discount: targetPromo.discount || "",

        time2Decide: targetPromo.time2Decide,
        time2DecideValidationLevel: timeLevel,
        time2DecideValidationMessage: timeMessage,

        gender: targetPromo.gender || null,

        age: targetPromo.age && targetPromo.age || [],

        language: targetPromo.language || null,

        lat: targetPromo.lat,
        lng: targetPromo.lng,
        locationName: targetPromo.locationName,
        locationType: targetPromo.locationType,
        locationValidationLevel: locationLevel,
        locationValidationMessage: locationMessage,

        interests: targetPromo.interests || [],

        scheduleType: targetPromo.scheduleType || "",

        pricing: targetPromo.pricing || "",
        pricingValidationLevel: pricingLevel,
        pricingValidationMessage: pricingMessage,

        finishDate: targetPromo.finishDate || "",
        startDate: targetPromo.startDate || "",

        budgetPeriod: targetPromo.budgetPeriod || "",

        budgetAmount: targetPromo.budgetAmount || "",
        budgetAmountValidationLevel: budgetAmountLevel,
        budgetAmountValidationMessage: budgetAmountMessage,

        status: targetPromo.status || "",

        codeType: targetPromo.codeType || null,

        imgCode: targetPromo.imgCode || "",
        imgCodeValidationLevel: "",
        imgCodeValidationMessage: "",
    };

    return {
        ...state,

        promos,

        promoPageState: pageState,
    };
};
