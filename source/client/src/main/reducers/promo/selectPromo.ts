import {ICompanyProduct, ICompanyPromo, IState, IStepsState} from "../../state";
import {ISelectPromoAction} from "../../actions/promo/selectPromo";
import {VALIDATION_LEVEL_ERROR, VALIDATION_LEVEL_SUCCESS} from "../../../common/constants/ValidationLevelType";
import {PromoRewardType} from "../../../../../types/constants/PromoRewardType";
import {isCurrencyValid} from "../../../common/util/validation";
import {PromoCodeType} from "../../../../../types/constants/PromoCodeType";

export const selectPromoReducer = (state: IState, action: ISelectPromoAction): IState => {
    const promos: ICompanyPromo[] = state.promos.slice();
    const products: ICompanyProduct[] = state.companyProducts;

    let steps: IStepsState[] = state.promoPageState.steps.slice();
    let price: string = "0.00";
    let targetPromo: ICompanyPromo = null;
    const nameLevel: string = VALIDATION_LEVEL_SUCCESS;
    const nameMessage: string = "";
    const offerPhraseLevel: string = VALIDATION_LEVEL_SUCCESS;
    const offerPhraseMessage: string = "";
    const aboutLevel: string = VALIDATION_LEVEL_SUCCESS;
    const aboutMessage: string = "";
    const termsLevel: string = VALIDATION_LEVEL_SUCCESS;
    const termsMessage: string = "";
    let codesLevel: string = VALIDATION_LEVEL_SUCCESS;
    let codesMessage: string = "";
    const timeLevel: string = VALIDATION_LEVEL_SUCCESS;
    const timeMessage: string = "";
    let locationLevel: string = VALIDATION_LEVEL_SUCCESS;
    let locationMessage: string = "";
    const pricingLevel: string = VALIDATION_LEVEL_SUCCESS;
    const pricingMessage: string = "";
    let budgetAmountLevel: string = VALIDATION_LEVEL_SUCCESS;
    let budgetAmountMessage: string = "";

    let isEditable: boolean = state.promoPageState.isEditable;

    for (const promo of promos) {
        if (promo._id === action.promoId) {
            if (promo.checked) {
                isEditable = false;
            }

            promo.checked = !promo.checked;
            targetPromo = promo;
        } else {
            promo.checked = false;
        }
    }

    for (let i = 0; i < promos.length; i++) {
        if (promos[i]._id === "0") {
            promos.splice(i, 1);
            break;
        }
    }

    if (targetPromo === null) {
        console.error(`Promo wasn't found! PromoId: ${action.promoId}`);
        return {...state};
    }

    if (targetPromo.productId) {
        for (const product of products) {
            if (product._id.toString() === targetPromo.productId.toString()) {
                price = product.price;
            }
        }
    }

    let codes = [];

    if (targetPromo.codes) {
        codes = targetPromo.codes.split("\n");
    }

    if (targetPromo.codes && targetPromo.isUnlimited && codes.length !== 1) {
        codesLevel = VALIDATION_LEVEL_ERROR;
        codesMessage = "You have to insert one promo code";
    } else if (targetPromo.codes && !targetPromo.isUnlimited && codes.length !== +targetPromo.quantity) {
        codesLevel = VALIDATION_LEVEL_ERROR;
        codesMessage = "You need as much promo codes, as you said in `Quantity` section";
    }
    if (targetPromo.locationName) {
        if (!targetPromo.lng || !targetPromo.lat || !targetPromo.locationType) {
            locationLevel = VALIDATION_LEVEL_ERROR;
            locationMessage = "Choose real address";
        }
    }

    if (targetPromo.budgetAmount && !isCurrencyValid(targetPromo.budgetAmount)) {
        budgetAmountLevel = VALIDATION_LEVEL_ERROR;
        budgetAmountMessage = "Insert valid data";
    }

    steps = getStepStatus(targetPromo, steps);

    let priceAfterDiscount: string = "0";
    if (targetPromo.productId && targetPromo.value) {
        const products: ICompanyProduct[] = state.companyProducts;

        for (const product of products) {
            if (product._id === targetPromo.productId) {
                if (product.price) {
                    if (+product.price < +targetPromo.value) {
                        priceAfterDiscount = "0";
                    } else {
                        priceAfterDiscount = (+product.price - +targetPromo.value).toString();
                        if (priceAfterDiscount.toString().split(".").length > 1) {
                            const _priceAfterDiscount: string[] = priceAfterDiscount.toString().split(".");
                            _priceAfterDiscount[1] = _priceAfterDiscount[1].substr(0, 2);
                            if (_priceAfterDiscount[1].length < 2) {
                                _priceAfterDiscount[1] += "0";
                            }
                            priceAfterDiscount = _priceAfterDiscount.join(".");
                        }
                    }
                }
                break;
            }
        }
    }

    return {
        ...state,

        promos,

        promoPageState: {
            ...state.promoPageState,

            isEditable,
            isViewable: false,
            _id: isEditable ? action.promoId : null,

            steps,

            errorCode: "",
            failed: false,

            dataLanguage: targetPromo.dataLanguage,

            name: targetPromo.name || "",
            nameValidationLevel: nameLevel,
            nameValidationMessage: nameMessage,

            productObject: targetPromo.productObject || "",

            priceAfterDiscount,

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

            price: +price || 0,

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

            codeType: targetPromo.codeType || "",

            imgCode: targetPromo.imgCode || "",
            imgCodeValidationLevel: "",
            imgCodeValidationMessage: "",
        },
    };
}
;

function getStepStatus(promoPageState: ICompanyPromo, steps: IStepsState[]) {
    // Mark sections filled in a right way as green point on the PromoPanel steps

    // section 1: check campaign name and main objective
    steps[0].isCompleted = promoPageState.name !== ""
        && promoPageState.objective !== null;

    steps[1].isCompleted = promoPageState.productId !== ""
        && promoPageState.rewardType !== null || (promoPageState.rewardType ===
            PromoRewardType.SEPARATE_PRODUCT && promoPageState.separateProductId !== null);

    steps[2].isCompleted = promoPageState.offerPhrase !== ""
        && promoPageState.about !== ""
        && promoPageState.terms !== ""
        && promoPageState.type !== ""
        && promoPageState.condition !== ""
        && promoPageState.value !== ""
        && (promoPageState.quantity !== "")
        && promoPageState.codes !== ""
        && promoPageState.time2Decide !== 0
        && promoPageState.codeType !== null
        || (promoPageState.codeType === PromoCodeType.BAR_QR && !!promoPageState.imgCode);

    steps[3].isCompleted = promoPageState.gender !== null
        && promoPageState.age !== null
        && promoPageState.language !== null
        && promoPageState.locationName !== ""
        && (promoPageState.interests.length !== 0);

    steps[4].isCompleted = promoPageState.scheduleType !== ""
        && promoPageState.pricing !== ""
        && promoPageState.budgetPeriod !== ""
        && promoPageState.budgetAmount !== "";

    return steps;
}
