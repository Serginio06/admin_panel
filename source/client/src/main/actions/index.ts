import {addSocialLinkAction} from "./company/addSocialLink";
import {changeAddressAction} from "./company/changeAddress";
import {changeCategoryAction as changeCompanyCategoryAction} from "./company/changeCategory";
import {changeDataLanguageAction as changeCompanyDataLanguageAction} from "./company/changeDataLanguage";
import {changeDescriptionAction as changeCompanyDescriptionAction} from "./company/changeDescription";
import {changeEmailAction} from "./company/changeEmail";
import {changeNameAction as changeCompanyNameAction} from "./company/changeName";
import {changePhoneAction} from "./company/changePhone";
import {changeShowOnCardAction} from "./company/changeShowOnCard";
import {changeSocialLinkAction} from "./company/changeSocialLink";
import {changeSubcategoryAction} from "./company/changeSubcategory";
import {changeWebAddressAction} from "./company/changeWebAddress";
import {checkEmailAction} from "./company/checkEmail";
import {checkPhoneAction} from "./company/checkPhone";
import {checkWebAddressAction} from "./company/checkWebAddress";
import {deleteSocialLinkAction} from "./company/deleteSocialLink";
import {editCompanyAction} from "./company/editCompany";
import {newCompanyAction} from "./company/newCompany";
import {registerCompanyAction} from "./company/registerCompany";
import {uploadLogoAction} from "./company/uploadLogo";
import {chooseCompany2EditAction} from "./company/chooseCompany2Edit";
import {selectCompanyAction} from "./company/selectCompany";
import {filterAction} from "./product/filter";
import {updateStatisticsAction} from "./statistics/update";
import {startPromoAction} from "./promo/startPromo";
import {changePriceAfterDiscountAction} from "./promo/changePriceAfterDiscount";

import {deleteProductAction} from "./product/delete";
import {deletePromoAction} from "./promo/delete";

import {applyNewPasswordAction} from "./password/applyNewPassword";
import {changeNewPasswordAction} from "./password/changeNewPassword";
import {changeNewVerifyAction} from "./password/changeNewVerify";

import {changeCategoryAction as changeProductCategoryAction} from "./product/changeCategory";
import {changeDataLanguageAction as changeProductDataLanguageAction} from "./product/changeDataLanguage";
import {changeDescriptionAction as changeProductDescriptionAction} from "./product/changeDescription";
import {changeExpDateAction} from "./product/changeExpDate";
import {changeIsOfflineAction} from "./product/changeIsOffline";
import {changeIsOnlineAction} from "./product/changeIsOnline";
import {changeIsUnlimitedProductDateAction} from "./product/changeIsUnlimitedDate";
import {changeIsUnlimitedQuantityAction as changeIsUnlimitedProductQuantityAction} from "./product/changeIsUnlimitedQuantity";
import {changeLink2productAction} from "./product/changeLink2product";
import {changeNameAction as changeProductNameAction} from "./product/changeName";
import {changeObjectAction} from "./product/changeObject";
import {changePriceAction} from "./product/changePrice";
import {changeQuantityAction as changeProductQuantityAction} from "./product/changeQuantity";
import {changePicturesOrderAction} from "./product/dnd/changePicturesOrder";
import {editProductAction} from "./product/editProduct";
import {newProductAction} from "./product/newProduct";
import {registerProductAction} from "./product/registerProduct";
import {uploadImageAction} from "./product/uploadImage";

import {selectProductAction} from "./product/selectProduct";
import {chooseProduct2editAction} from "./product/chooseProduct2Edit";

import {chooseCompanyAction} from "./company/chooseCompany";
import {chooseCookiedCompanyAction} from "./company/chooseCookiedCompany";
import {chooseProductAction} from "./product/chooseProduct";
import {getCompanyCategoriesAction} from "./getCompanyCategories";
import {loadCompanyProductsAction} from "./getCompanyProducts";
import {loadUsersCompaniesAction} from "./getUserCompanies";
import {deleteCompanyAction} from "./company/delete";

import {changeAboutAction} from "./promo/changeAbout";
import {changeAgeAction} from "./promo/changeAge";
import {changeBudgetAmountAction} from "./promo/changeBudgetAmount";
import {changeBudgetPeriodAction} from "./promo/changeBudgetPeriod";
import {changeCodesAction} from "./promo/changeCodes";
import {changeCodeTypeAction} from "./promo/changeCodeType";
import {changeConditionAction} from "./promo/changeCondition";
import {changeCurrentStepAction} from "./promo/changeCurrentStep";
import {changeDataLanguageAction as changePromoDataLanguageAction} from "./promo/changeDataLanguage";
import {changeDiscountAction} from "./promo/changeDiscount";
import {changeFinishDateTimeAction} from "./promo/changeFinishDateTime";
import {changeGenderAction} from "./promo/changeGender";
import {changeInterestAction} from "./promo/changeInterest";
import {changeIsUnlimitedQuantityAction as changeIsUnlimitedPromoQuantityAction} from "./promo/changeIsUnlimitedQuantity";
import {changeLanguageAction} from "./promo/changeLanguage";
import {changeLocationAction} from "./promo/changeLocation";
import {changeNameAction as changePromoNameAction} from "./promo/changeName";
import {changeObjectiveAction} from "./promo/changeObjective";
import {changeOfferPhraseAction} from "./promo/changeOfferPhrase";
import {changePricingAction} from "./promo/changePricing";
import {changeProductIdAction} from "./promo/changeProductId";
import {changeProductObjectAction} from "./promo/changeProductObject";
import {changeQuantityAction as changePromoQuantityAction} from "./promo/changeQuantity";
import {changeRewardTypeAction} from "./promo/changeRewardType";
import {changeScheduleAction} from "./promo/changeSchedule";
import {changeSeparateProductIdAction} from "./promo/changeSeparateProductId";
import {changeStartDateTimeAction} from "./promo/changeStartDateTime";
import {changeTermsAction} from "./promo/changeTerms";
import {changeTime2DecideAction} from "./promo/changeTime2Decide";
import {changeTypeAction} from "./promo/changeType";
import {changeValueAction} from "./promo/changeValue";
import {choosePromoAction} from "./promo/choosePromo";
import {choosePromo2ViewAction} from "./promo/choosePromoToView";
import {editPromoAction} from "./promo/editPromo";
import {finishPromoAction} from "./promo/finishPromo";
import {newPromoAction} from "./promo/newPromo";
import {registerPromoAction} from "./promo/registerPromo";
import {uploadImgCodeAction} from "./promo/uploadImgCode";

import {selectPromoAction} from "./promo/selectPromo";
import {loadCompanyPromosAction} from "./getCompanyPromos";
import {loadCompanyPromoStatisticsAction} from "./statistics/getCompanyPromoStatistics";

export {
    addSocialLinkAction,
    changeSocialLinkAction,
    deleteSocialLinkAction,

    chooseCompanyAction,
    chooseCookiedCompanyAction,
    chooseProductAction,
    getCompanyCategoriesAction,
    loadCompanyProductsAction,
    loadUsersCompaniesAction,

    deleteCompanyAction,
    selectPromoAction,
    startPromoAction,

    changePicturesOrderAction,
    changeProductCategoryAction,
    changeProductDataLanguageAction,
    changeProductDescriptionAction,
    changeExpDateAction,
    changeIsOfflineAction,
    changeIsOnlineAction,
    changeIsUnlimitedProductQuantityAction,
    changeIsUnlimitedProductDateAction,
    changeLink2productAction,
    changeProductNameAction,
    changeObjectAction,
    changePriceAction,
    changeProductQuantityAction,
    editProductAction,
    newProductAction,
    registerProductAction,
    uploadImageAction,
    selectProductAction,
    chooseProduct2editAction,
    filterAction,

    applyNewPasswordAction,
    changeNewPasswordAction,
    changeNewVerifyAction,
    deletePromoAction,

    updateStatisticsAction,

    newCompanyAction,
    changeAddressAction,
    changeCompanyCategoryAction,
    changeCompanyDataLanguageAction,
    changeCompanyDescriptionAction,
    changeEmailAction,
    changeCompanyNameAction,
    changePhoneAction,
    changeSubcategoryAction,
    changeWebAddressAction,
    changeShowOnCardAction,
    checkEmailAction,
    checkWebAddressAction,
    checkPhoneAction,
    editCompanyAction,
    registerCompanyAction,
    uploadLogoAction,
    chooseCompany2EditAction,
    selectCompanyAction,

    deleteProductAction,

    changePromoDataLanguageAction,
    newPromoAction,
    changePromoNameAction,
    changeObjectiveAction,
    changeProductObjectAction,
    changeProductIdAction,
    changeRewardTypeAction,
    changeSeparateProductIdAction,
    changeOfferPhraseAction,
    changeAboutAction,
    changeTermsAction,
    changeTypeAction,
    changeConditionAction,
    changeValueAction,
    changePromoQuantityAction,
    changeIsUnlimitedPromoQuantityAction,
    changeCodesAction,
    changeTime2DecideAction,
    changeGenderAction,
    changeAgeAction,
    changeLanguageAction,
    changeInterestAction,
    changeScheduleAction,
    changePricingAction,
    changeStartDateTimeAction,
    changeFinishDateTimeAction,
    changeBudgetPeriodAction,
    changeCodeTypeAction,
    changeBudgetAmountAction,
    changeCurrentStepAction,
    registerPromoAction,
    editPromoAction,
    changeLocationAction,
    choosePromoAction,
    choosePromo2ViewAction,
    uploadImgCodeAction,
    changeDiscountAction,
    loadCompanyPromosAction,
    finishPromoAction,
    loadCompanyPromoStatisticsAction,
    changePriceAfterDiscountAction,
};
