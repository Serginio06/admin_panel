import {PromoRewardType} from "../../../../types/constants/PromoRewardType";
import {IPromoPageState} from "../state";

export const isNotReadyForApproval = (pageState: IPromoPageState): boolean => {
    return !pageState.name || pageState.name === "" || pageState.nameValidationMessage !== ""
        || !pageState.productObject || pageState.productObject === "" || pageState.productObjectValidationMessage !== ""
        || !pageState.objective || pageState.objective === null || pageState.objectiveValidationMessage !== ""
        || !pageState.productId || pageState.productId === "" || pageState.productIdValidationMessage !== ""
        || !pageState.rewardType || pageState.rewardType === null || pageState.rewardTypeValidationMessage !== ""
        || (pageState.rewardType === PromoRewardType.SEPARATE_PRODUCT
            && (!pageState.separateProductId || pageState.separateProductId === ""
                || pageState.separateProductIdValidationMessage !== ""))
        || (pageState.rewardType === PromoRewardType.SPECIAL_OFFER
            && (!pageState.discount || pageState.discount === null || pageState.discountValidationMessage !== ""))
        || !pageState.offerPhrase || pageState.offerPhrase === "" || pageState.offerPhraseValidationMessage !== ""
        || !pageState.about || pageState.about === "" || pageState.aboutValidationMessage !== ""
        || !pageState.terms || pageState.terms === "" || pageState.termsValidationMessage !== ""
        || !pageState.type || pageState.type === "" || pageState.typeValidationMessage !== ""
        || !pageState.condition || pageState.condition === "" || pageState.conditionValidationMessage !== ""
        || !pageState.value || pageState.value === "" || pageState.valueValidationMessage !== ""
        || (!pageState.isUnlimited
            && (!pageState.quantity || pageState.quantity === "" || pageState.quantityValidationMessage !== ""))
        || !pageState.time2Decide || pageState.time2Decide === null || pageState.time2DecideValidationMessage !== ""
        || !pageState.gender || pageState.gender === null || pageState.genderValidationMessage !== ""
        || !pageState.age || pageState.age === null || pageState.ageValidationMessage !== ""
        || !pageState.language || pageState.language === null || pageState.languageValidationMessage !== ""
        || !pageState.locationName || pageState.locationName === "" || pageState.locationValidationMessage !== ""
        || !pageState.interests || pageState.interests === null || pageState.interestValidationMessage !== ""
        || !pageState.scheduleType || pageState.scheduleType === "" || pageState.scheduleTypeValidationMessage !== ""
        || !pageState.pricing || pageState.pricing === "" || pageState.pricingValidationMessage !== ""
        || !pageState.budgetPeriod || pageState.budgetPeriod === "" || pageState.budgetPeriodValidationMessage !== ""
        || !pageState.budgetAmount || pageState.budgetAmount === "" || pageState.budgetAmountValidationMessage !== ""
        || !pageState.codeType;
};
