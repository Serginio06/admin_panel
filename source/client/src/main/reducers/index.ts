import {
    SELECT_PROMO,
    CHANGE_PRICE_AFTER_DISCOUNT,

    DELETE_PROMO_FAILED,
    DELETE_PROMO_SEND,
    DELETE_PROMO_SUCCESS,
    DELETE_PRODUCT_SEND,
    DELETE_PRODUCT_FAILED,
    DELETE_PRODUCT_SUCCESS,
    DELETE_COMPANY_FAILED,
    DELETE_COMPANY_SEND,
    DELETE_COMPANY_SUCCESS,

    START_PROMO_SEND,
    START_PROMO_FAILED,
    START_PROMO_SUCCESS,

    UPDATE_STATISTICS,

    CHOOSE_PRODUCT_TO_EDIT,
    SELECT_PRODUCT,
    FILTER,
    SELECT_COMPANY,
    CHOOSE_COMPANY_TO_EDIT,
    ADD_SOCIAL_LINK,
    APPLY_NEW_PASSWORD_FAILED,
    APPLY_NEW_PASSWORD_SEND,
    APPLY_NEW_PASSWORD_SUCCESS,
    CHANGE_COMPANY_ADDRESS,
    CHANGE_COMPANY_CATEGORY,
    CHANGE_COMPANY_DESCRIPTION,
    CHANGE_COMPANY_EMAIL,
    CHANGE_COMPANY_LANGUAGE,
    CHANGE_COMPANY_NAME,
    CHANGE_COMPANY_PHONE,
    CHANGE_COMPANY_SUBCATEGORY,
    CHANGE_COMPANY_WEB_ADDRESS,
    CHANGE_NEW_PASSWORD,
    CHANGE_NEW_VERIFY,
    CHANGE_PICTURES_ORDER,
    CHANGE_PRODUCT_CATEGORY,
    CHANGE_PRODUCT_DATA_LANGUAGE,
    CHANGE_PRODUCT_DESCRIPTION,
    CHANGE_PRODUCT_EXPDATE,
    CHANGE_PRODUCT_IS_OFFLINE,
    CHANGE_PRODUCT_IS_ONLINE,
    CHANGE_PRODUCT_IS_UNLIMITED,
    CHANGE_PRODUCT_IS_UNLIMITED_DATE,
    CHANGE_PRODUCT_LINK2PRODUCT,
    CHANGE_PRODUCT_NAME,
    CHANGE_PRODUCT_OBJECT,
    CHANGE_PRODUCT_PRICE,
    CHANGE_PRODUCT_QUANTITY,
    CHANGE_PRODUCT_UPLOAD_IMAGE_FAILED,
    CHANGE_PRODUCT_UPLOAD_IMAGE_FAILED_SIZE_EXCEEDED,
    CHANGE_PRODUCT_UPLOAD_IMAGE_FAILED_WRONG_EXTENSION,
    CHANGE_PRODUCT_UPLOAD_IMAGE_LOADING,
    CHANGE_PRODUCT_UPLOAD_IMAGE_SUCCESS,
    CHANGE_PROMO_ABOUT,
    CHANGE_PROMO_AGE,
    CHANGE_PROMO_BUDGET_AMOUNT,
    CHANGE_PROMO_BUDGET_PERIOD,
    CHANGE_PROMO_CODE_TYPE,
    CHANGE_PROMO_CODES,
    CHANGE_PROMO_CONDITION,
    CHANGE_PROMO_CURRENT_STEP,
    CHANGE_PROMO_DATA_LANGUAGE,
    CHANGE_PROMO_DISCOUNT,
    CHANGE_PROMO_FINISH_DATE_TIME,
    CHANGE_PROMO_GENDER,
    CHANGE_PROMO_INTEREST,
    CHANGE_PROMO_IS_UNLIMITED_QUANTITY,
    CHANGE_PROMO_LANGUAGE,
    CHANGE_PROMO_LOCATION,
    CHANGE_PROMO_NAME,
    CHANGE_PROMO_OBJECTIVE,
    CHANGE_PROMO_OFFER_PHRASE,
    CHANGE_PROMO_PRICING,
    CHANGE_PROMO_PRODUCT_ID,
    CHANGE_PROMO_PRODUCT_OBJECT,
    CHANGE_PROMO_QUANTITY,
    CHANGE_PROMO_REWARD_TYPE,
    CHANGE_PROMO_SCHEDULE,
    CHANGE_PROMO_SEPARATE_PRODUCT_ACTION,
    CHANGE_PROMO_START_DATE_TIME,
    CHANGE_PROMO_TERMS,
    CHANGE_PROMO_TIME_DECIDE,
    CHANGE_PROMO_TYPE,
    CHANGE_PROMO_UPLOAD_IMGCODE_FAILED,
    CHANGE_PROMO_UPLOAD_IMGCODE_SUCCESS,
    CHANGE_PROMO_VALUE,
    CHANGE_SHOW_ON_CARD,
    CHANGE_SOCIAL_LINK,
    CHECK_COMPANY_EMAIL_FAILED,
    CHECK_COMPANY_EMAIL_SEND,
    CHECK_COMPANY_EMAIL_SUCCESS,
    CHECK_COMPANY_PHONE_FAILED,
    CHECK_COMPANY_PHONE_SEND,
    CHECK_COMPANY_PHONE_SUCCESS,
    CHECK_COMPANY_WEB_ADDRESS_FAILED,
    CHECK_COMPANY_WEB_ADDRESS_SEND,
    CHECK_COMPANY_WEB_ADDRESS_SUCCESS,
    CHOOSE_COMPANY,
    CHOOSE_COOKIED_COMPANY,
    CHOOSE_PRODUCT,
    CHOOSE_PROMO,
    CHOOSE_PROMO_TO_VIEW,
    DELETE_PRODUCT_PICTURE,
    DELETE_SOCIAL_LINK,
    EDIT_COMPANY_FAILED,
    EDIT_COMPANY_SEND,
    EDIT_COMPANY_SUCCESS,
    EDIT_PRODUCT_FAILED,
    EDIT_PRODUCT_SEND,
    EDIT_PRODUCT_SUCCESS,
    EDIT_PROMO_FAILED,
    EDIT_PROMO_SEND,
    EDIT_PROMO_SUCCESS,
    FINISH_PROMO_FAILED,
    FINISH_PROMO_SEND,
    FINISH_PROMO_SUCCESS,
    GET_COMPANY_CATEGORIES_FAILED,
    GET_COMPANY_CATEGORIES_SEND,
    GET_COMPANY_CATEGORIES_SUCCESS,
    LOAD_COMPANY_PRODUCTS_FAILED,
    LOAD_COMPANY_PRODUCTS_SEND,
    LOAD_COMPANY_PRODUCTS_SUCCESS,
    LOAD_COMPANY_PROMO_STATISTICS_FAILED,
    LOAD_COMPANY_PROMO_STATISTICS_SEND,
    LOAD_COMPANY_PROMO_STATISTICS_SUCCESS,
    LOAD_COMPANY_PROMOS_FAILED,
    LOAD_COMPANY_PROMOS_SEND,
    LOAD_COMPANY_PROMOS_SUCCESS,
    LOAD_USER_COMPANIES_FAILED,
    LOAD_USER_COMPANIES_SEND,
    LOAD_USER_COMPANIES_SUCCESS,
    NEW_COMPANY,
    NEW_PRODUCT,
    NEW_PROMO,
    REGISTER_COMPANY_FAILED,
    REGISTER_COMPANY_SEND,
    REGISTER_COMPANY_SUCCESS,
    REGISTER_PRODUCT_FAILED,
    REGISTER_PRODUCT_SEND,
    REGISTER_PRODUCT_SUCCESS,
    REGISTER_PROMO_FAILED,
    REGISTER_PROMO_SEND,
    REGISTER_PROMO_SUCCESS,
    UPLOAD_LOGO_FAILED,
    UPLOAD_LOGO_SUCCESS,
} from "../constants";
import {
    LOAD_USER_INFO_FAILED,
    LOAD_USER_INFO_SEND,
    LOAD_USER_INFO_SUCCESS,
    LOGOUT_FAILED,
    LOGOUT_SEND,
    LOGOUT_SUCCESS,
} from "../../common/constants";
import {
    startPromoSendReducer,
    startPromoFailedReducer,
    startPromoSuccessReducer,
} from "./promo/startPromo";
import {
    deleteCompanySendReducer,
    deleteCompanyFailedReducer,
    deleteCompanySuccessReducer,
} from "./company/delete";
import {
    deleteProductSendReducer,
    deleteProductFailedReducer,
    deleteProductSuccessReducer,
} from "./product/delete";
import {
    deletePromoSendReducer,
    deletePromoFailedReducer,
    deletePromoSuccessReducer,
} from "./promo/delete";
import {changePriceAfterDiscountReducer} from "./promo/changePriceAfterDiscount";
import {updateStatisticsReducer} from "./statistics/update";
import {chooseProduct2EditReducer} from "./product/chooseProduct2Edit";
import {selectProductReducer} from "./product/selectProduct";
import {filterReducer} from "./product/filter";
import {selectCompanyReducer} from "./company/selectCompany";
import {chooseCompany2editReducer} from "./company/chooseCompany2Edit";
import {addSocialLinkReducer} from "./company/addSocialLink";
import {changeAddressReducer} from "./company/changeAddress";
import {changeCategoryReducer as changeCompanyCategoryReducer} from "./company/changeCategory";
import {changeDataLanguageReducer as changeCompanyDataLanguageReducer} from "./company/changeDataLanguage";
import {changeDescriptionReducer as changeCompanyDescriptionReducer} from "./company/changeDescription";
import {changeEmailReducer} from "./company/changeEmail";
import {changeNameReducer as changeCompanyNameReducer} from "./company/changeName";
import {changePhoneReducer} from "./company/changePhone";
import {changeShowOnCardReducer} from "./company/changeShowOnCard";
import {changeSocialLinkReducer} from "./company/changeSocialLink";
import {changeCompanySubcategoryReducer} from "./company/changeSubcategory";
import {uploadLogoFailedReducer, uploadLogoSuccessReducer} from "./company/uploadLogo";
import {changeWebAddressReducer} from "./company/changeWebAddress";
import {checkEmailFailedReducer, checkEmailSendReducer, checkEmailSuccessReducer} from "./company/checkEmail";
import {checkPhoneFailedReducer, checkPhoneSendReducer, checkPhoneSuccessReducer} from "./company/checkPhone";
import {
    checkWebAddressFailedReducer,
    checkWebAddressSendReducer,
    checkWebAddressSuccessReducer,
} from "./company/checkWebAddress";
import {chooseCompanyReducer} from "./company/chooseCompany";
import {chooseCookiedCompanyReducer} from "./company/chooseCookiedCompany";
import {deleteSocialLinkReducer} from "./company/deleteSocialLink";
import {editCompanyFailedReducer, editCompanySendReducer, editCompanySuccessReducer} from "./company/editCompany";
import {newCompanyReducer} from "./company/newCompany";
import {
    registerCompanyFailedReducer,
    registerCompanySendReducer,
    registerCompanySuccessReducer,
} from "./company/registerCompany";
import {selectPromoReducer} from "./promo/selectPromo";
import {
    getCompanyCategoriesFailedReducer,
    getCompanyCategoriesSendReducer,
    getCompanyCategoriesSuccessReducer,
} from "./getCompanyCategories";
import {
    loadCompanyProductsFailedReducer,
    loadCompanyProductsSendReducer,
    loadCompanyProductsSuccessReducer,
} from "./getCompanyProducts";
import {
    loadCompanyPromosFailedReducer,
    loadCompanyPromosSendReducer,
    loadCompanyPromosSuccessReducer,
} from "./getCompanyPromos";
import {
    loadUserCompaniesFailedReducer,
    loadUserCompaniesSendReducer,
    loadUserCompaniesSuccessReducer,
} from "./getUserCompanies";
import {initReducer} from "./initReducer";
import {loadUserInfoFailedReducer, loadUserInfoSendReducer, loadUserInfoSuccessReducer} from "./loadUserInfo";
import {logoutFinishedReducer, logoutSendReducer} from "./logout";
import {
    applyNewPasswordFailedReducer,
    applyNewPasswordSendReducer,
    applyNewPasswordSuccessReducer,
} from "./password/applyNewPassword";
import {changeNewPasswordReducer} from "./password/changeNewPassword";
import {changeNewVerifyReducer} from "./password/changeNewVerify";
import {changeCategoryReducer as changeProductCategoryReducer} from "./product/changeCategory";
import {changeDataLanguageReducer as changeProductDataLanguageReducer} from "./product/changeDataLanguage";
import {changeDescriptionReducer as changeProductDescriptionReducer} from "./product/changeDescription";
import {changeExpDateReducer} from "./product/changeExpDate";
import {changeIsOffline} from "./product/changeIsOffline";
import {changeIsOnline} from "./product/changeIsOnline";
import {changeIsUnlimitedDate} from "./product/changeIsUnlimitedDate";
import {changeIsUnlimitedQuantity} from "./product/changeIsUnlimitedQuantity";
import {changeLink2productReducer} from "./product/changeLink2product";
import {changeNameReducer as changeProductNameReducer} from "./product/changeName";
import {changeObjectReducer} from "./product/changeObject";
import {changePriceReducer} from "./product/changePrice";
import {changeQuantityReducer as changeProductQuantityReducer} from "./product/changeQuantity";
import {chooseProductReducer} from "./product/chooseProduct";
import {changePicturesOrderReducer} from "./product/dnd/changePicturesOrder";
import {deleteProductPictureReducer} from "./product/dnd/deleteProductPicture";
import {editProductFailedReducer, editProductSendReducer, editProductSuccessReducer} from "./product/editProduct";
import {newProductReducer} from "./product/newProduct";
import {
    registerProductFailedReducer,
    registerProductSendReducer,
    registerProductSuccessReducer,
} from "./product/registerProduct";
import {
    uploadImageFailed,
    uploadImageFailedSizeExceeded,
    uploadImageFailedWrongExtension,
    uploadImageLoading,
    uploadImageSuccess,
} from "./product/uploadImage";
import {changeAboutReducer} from "./promo/changeAbout";
import {changeAgeReducer} from "./promo/changeAge";
import {changeBudgetAmountReducer} from "./promo/changeBudgetAmount";
import {changeBudgetPeriodReducer} from "./promo/changeBudgetPeriod";
import {changeCodesReducer} from "./promo/changeCodes";
import {changeCodeTypeReducer} from "./promo/changeCodeType";
import {changeConditionReducer} from "./promo/changeCondition";
import {changeCurrentStepReducer} from "./promo/changeCurrentStep";
import {changeDataLanguageReducer} from "./promo/changeDataLanguage";
import {changeDiscountReducer} from "./promo/changeDiscount";
import {changeFinishDateTimeReducer} from "./promo/changeFinishDateTime";
import {changeGenderReducer} from "./promo/changeGender";
import {changeInterestReducer} from "./promo/changeInterest";
import {changeIsUnlimitedQuantityReducer} from "./promo/changeIsUnlimitedQuantity";
import {changeLanguageReducer} from "./promo/changeLanguage";
import {changeLocationReducer} from "./promo/changeLocation";
import {changeNameReducer} from "./promo/changeName";
import {changeObjectiveReducer} from "./promo/changeObjective";
import {changeOfferPhraseReducer} from "./promo/changeOfferPhrase";
import {changePricingReducer} from "./promo/changePricing";
import {changeProductIdReducer} from "./promo/changeProductId";
import {changeProductObjectReducer} from "./promo/changeProductObject";
import {changeQuantityReducer as changePromoQuantityReducer} from "./promo/changeQuantity";
import {changeRewardTypeReducer} from "./promo/changeRewardType";
import {changeScheduleTypeReducer} from "./promo/changeScheduleType";
import {changeSeparateProductIdReducer} from "./promo/changeSeparateProductId";
import {changeStartDateTimeReducer} from "./promo/changeStartDateTime";
import {changeTermsReducer} from "./promo/changeTerms";
import {changeTime2DecideReducer} from "./promo/changeTime2Decide";
import {changeTypeReducer} from "./promo/changeType";
import {changeValueReducer} from "./promo/changeValue";
import {choosePromoReducer} from "./promo/choosePromo";
import {choosePromoToViewReducer} from "./promo/choosePromoToView";
import {editPromoFailedReducer, editPromoSendReducer, editPromoSuccessReducer} from "./promo/editPromo";
import {finishPromoFailedReducer, finishPromoSendReducer, finishPromoSuccessReducer} from "./promo/finishPromo";
import {newPromoReducer} from "./promo/newPromo";
import {
    registerPromoFailedReducer,
    registerPromoSendReducer,
    registerPromoSuccessReducer,
} from "./promo/registerPromo";
import {uploadImgCodeFailed, uploadImgCodeSuccess} from "./promo/uploadImgCode";
import {
    loadCompanyPromoStatisticsFailedReducer,
    loadCompanyPromoStatisticsSendReducer,
    loadCompanyPromoStatisticsSuccessReducer,
} from "./statistics/getCompanyPromoStatistics";

export default function reducer(state, action) {
    switch (action.type) {
        case "@@redux/INIT":
            return initReducer(state, action);

        case CHANGE_PRICE_AFTER_DISCOUNT:
            return changePriceAfterDiscountReducer(state, action);

        case START_PROMO_SEND:
            return startPromoSendReducer(state, action);
        case START_PROMO_SUCCESS:
            return startPromoSuccessReducer(state, action);
        case START_PROMO_FAILED:
            return startPromoFailedReducer(state, action);

        case SELECT_PROMO:
            return selectPromoReducer(state, action);

        case DELETE_PROMO_SEND:
            return deletePromoSendReducer(state);
        case DELETE_PROMO_SUCCESS:
            return deletePromoSuccessReducer(state, action);
        case DELETE_PROMO_FAILED:
            return deletePromoFailedReducer(state);

        case DELETE_PRODUCT_SEND:
            return deleteProductSendReducer(state);
        case DELETE_PRODUCT_SUCCESS:
            return deleteProductSuccessReducer(state, action);
        case DELETE_PRODUCT_FAILED:
            return deleteProductFailedReducer(state);

        case DELETE_COMPANY_SEND:
            return deleteCompanySendReducer(state);
        case DELETE_COMPANY_SUCCESS:
            return deleteCompanySuccessReducer(state, action);
        case DELETE_COMPANY_FAILED:
            return deleteCompanyFailedReducer(state);

        case UPDATE_STATISTICS:
            return updateStatisticsReducer(state, action);

        case CHOOSE_PRODUCT_TO_EDIT:
            return chooseProduct2EditReducer(state);
        case FILTER:
            return filterReducer(state, action);
        case SELECT_PRODUCT:
            return selectProductReducer(state, action);

        case CHOOSE_COMPANY_TO_EDIT:
            return chooseCompany2editReducer(state);
        case SELECT_COMPANY:
            return selectCompanyReducer(state, action);

        case FINISH_PROMO_SEND:
            return finishPromoSendReducer(state, action);
        case FINISH_PROMO_SUCCESS:
            return finishPromoSuccessReducer(state, action);
        case FINISH_PROMO_FAILED:
            return finishPromoFailedReducer(state, action);

        case LOAD_COMPANY_PROMO_STATISTICS_SEND:
            return loadCompanyPromoStatisticsSendReducer(state);
        case LOAD_COMPANY_PROMO_STATISTICS_SUCCESS:
            return loadCompanyPromoStatisticsSuccessReducer(state, action);
        case LOAD_COMPANY_PROMO_STATISTICS_FAILED:
            return loadCompanyPromoStatisticsFailedReducer(state, action);

        case CHANGE_SOCIAL_LINK:
            return changeSocialLinkReducer(state, action);
        case ADD_SOCIAL_LINK:
            return addSocialLinkReducer(state);
        case DELETE_SOCIAL_LINK:
            return deleteSocialLinkReducer(state, action);

        case CHANGE_PROMO_CURRENT_STEP:
            return changeCurrentStepReducer(state, action);

        case NEW_PROMO:
            return newPromoReducer(state);
        case NEW_COMPANY:
            return newCompanyReducer(state);
        case NEW_PRODUCT:
            return newProductReducer(state, action);

        case CHOOSE_COMPANY:
            return chooseCompanyReducer(state, action);
        case CHOOSE_COOKIED_COMPANY:
            return chooseCookiedCompanyReducer(state, action);
        case CHOOSE_PRODUCT:
            return chooseProductReducer(state, action);

        case REGISTER_PRODUCT_SEND:
            return registerProductSendReducer(state, action);
        case REGISTER_PRODUCT_SUCCESS:
            return registerProductSuccessReducer(state, action);
        case REGISTER_PRODUCT_FAILED:
            return registerProductFailedReducer(state, action);

        case EDIT_COMPANY_SEND:
            return editCompanySendReducer(state, action);
        case EDIT_COMPANY_SUCCESS:
            return editCompanySuccessReducer(state, action);
        case EDIT_COMPANY_FAILED:
            return editCompanyFailedReducer(state, action);

        case EDIT_PRODUCT_SEND:
            return editProductSendReducer(state, action);
        case EDIT_PRODUCT_SUCCESS:
            return editProductSuccessReducer(state, action);
        case EDIT_PRODUCT_FAILED:
            return editProductFailedReducer(state, action);

        case LOAD_COMPANY_PRODUCTS_SEND:
            return loadCompanyProductsSendReducer(state, action);
        case LOAD_COMPANY_PRODUCTS_SUCCESS:
            return loadCompanyProductsSuccessReducer(state, action);
        case LOAD_COMPANY_PRODUCTS_FAILED:
            return loadCompanyProductsFailedReducer(state, action);

        case LOAD_USER_COMPANIES_SEND:
            return loadUserCompaniesSendReducer(state);
        case LOAD_USER_COMPANIES_SUCCESS:
            return loadUserCompaniesSuccessReducer(state, action);
        case LOAD_USER_COMPANIES_FAILED:
            return loadUserCompaniesFailedReducer(state, action);

        case LOAD_COMPANY_PROMOS_SEND:
            return loadCompanyPromosSendReducer(state);
        case LOAD_COMPANY_PROMOS_SUCCESS:
            return loadCompanyPromosSuccessReducer(state, action);
        case LOAD_COMPANY_PROMOS_FAILED:
            return loadCompanyPromosFailedReducer(state, action);

        case APPLY_NEW_PASSWORD_SEND:
            return applyNewPasswordSendReducer(state, action);
        case APPLY_NEW_PASSWORD_SUCCESS:
            return applyNewPasswordSuccessReducer(state, action);
        case APPLY_NEW_PASSWORD_FAILED:
            return applyNewPasswordFailedReducer(state, action);

        case CHANGE_NEW_PASSWORD:
            return changeNewPasswordReducer(state, action);
        case CHANGE_NEW_VERIFY:
            return changeNewVerifyReducer(state, action);

        case LOAD_USER_INFO_SEND:
            return loadUserInfoSendReducer(state, action);
        case LOAD_USER_INFO_SUCCESS:
            return loadUserInfoSuccessReducer(state, action);
        case LOAD_USER_INFO_FAILED:
            return loadUserInfoFailedReducer(state, action);

        case LOGOUT_SEND:
            return logoutSendReducer(state, action);
        case LOGOUT_SUCCESS:
        case LOGOUT_FAILED:
            return logoutFinishedReducer(state, action);

        case GET_COMPANY_CATEGORIES_SEND:
            return getCompanyCategoriesSendReducer(state, action);
        case GET_COMPANY_CATEGORIES_SUCCESS:
            return getCompanyCategoriesSuccessReducer(state, action);
        case GET_COMPANY_CATEGORIES_FAILED:
            return getCompanyCategoriesFailedReducer(state, action);

        case CHANGE_COMPANY_NAME:
            return changeCompanyNameReducer(state, action);
        case CHANGE_COMPANY_DESCRIPTION:
            return changeCompanyDescriptionReducer(state, action);
        case CHANGE_COMPANY_EMAIL:
            return changeEmailReducer(state, action);
        case CHANGE_COMPANY_PHONE:
            return changePhoneReducer(state, action);
        case CHANGE_COMPANY_WEB_ADDRESS:
            return changeWebAddressReducer(state, action);
        case CHANGE_COMPANY_CATEGORY:
            return changeCompanyCategoryReducer(state, action);
        case CHANGE_COMPANY_SUBCATEGORY:
            return changeCompanySubcategoryReducer(state, action);
        case CHANGE_COMPANY_ADDRESS:
            return changeAddressReducer(state, action);
        case CHANGE_SHOW_ON_CARD:
            return changeShowOnCardReducer(state, action);
        case CHANGE_COMPANY_LANGUAGE:
            return changeCompanyDataLanguageReducer(state);

        case CHECK_COMPANY_EMAIL_SEND:
            return checkEmailSendReducer(state, action);
        case CHECK_COMPANY_EMAIL_SUCCESS:
            return checkEmailSuccessReducer(state, action);
        case CHECK_COMPANY_EMAIL_FAILED:
            return checkEmailFailedReducer(state, action);

        case CHECK_COMPANY_PHONE_SEND:
            return checkPhoneSendReducer(state, action);
        case CHECK_COMPANY_PHONE_SUCCESS:
            return checkPhoneSuccessReducer(state, action);
        case CHECK_COMPANY_PHONE_FAILED:
            return checkPhoneFailedReducer(state, action);

        case CHECK_COMPANY_WEB_ADDRESS_SEND:
            return checkWebAddressSendReducer(state, action);
        case CHECK_COMPANY_WEB_ADDRESS_SUCCESS:
            return checkWebAddressSuccessReducer(state, action);
        case CHECK_COMPANY_WEB_ADDRESS_FAILED:
            return checkWebAddressFailedReducer(state, action);

        case REGISTER_COMPANY_SEND:
            return registerCompanySendReducer(state, action);
        case REGISTER_COMPANY_SUCCESS:
            return registerCompanySuccessReducer(state, action);
        case REGISTER_COMPANY_FAILED:
            return registerCompanyFailedReducer(state, action);

        case UPLOAD_LOGO_SUCCESS:
            return uploadLogoSuccessReducer(state, action);
        case UPLOAD_LOGO_FAILED:
            return uploadLogoFailedReducer(state, action);

        case CHANGE_PRODUCT_NAME:
            return changeProductNameReducer(state, action);
        case CHANGE_PRODUCT_CATEGORY:
            return changeProductCategoryReducer(state, action);
        case CHANGE_PRODUCT_DESCRIPTION:
            return changeProductDescriptionReducer(state, action);
        case CHANGE_PRODUCT_OBJECT:
            return changeObjectReducer(state, action);
        case CHANGE_PRODUCT_QUANTITY:
            return changeProductQuantityReducer(state, action);
        case CHANGE_PRODUCT_PRICE:
            return changePriceReducer(state, action);
        case CHANGE_PRODUCT_LINK2PRODUCT:
            return changeLink2productReducer(state, action);
        case CHANGE_PRODUCT_EXPDATE:
            return changeExpDateReducer(state, action);
        case CHANGE_PRODUCT_IS_UNLIMITED:
            return changeIsUnlimitedQuantity(state, action);
        case CHANGE_PRODUCT_IS_UNLIMITED_DATE:
            return changeIsUnlimitedDate(state, action);
        case CHANGE_PRODUCT_IS_ONLINE:
            return changeIsOnline(state, action);
        case CHANGE_PRODUCT_IS_OFFLINE:
            return changeIsOffline(state, action);
        case CHANGE_PRODUCT_DATA_LANGUAGE:
            return changeProductDataLanguageReducer(state, action);
        case DELETE_PRODUCT_PICTURE:
            return deleteProductPictureReducer(state, action);
        case CHANGE_PICTURES_ORDER:
            return changePicturesOrderReducer(state, action);

        case CHANGE_PRODUCT_UPLOAD_IMAGE_LOADING:
            return uploadImageLoading(state, action);
        case CHANGE_PRODUCT_UPLOAD_IMAGE_SUCCESS:
            return uploadImageSuccess(state, action);
        case CHANGE_PRODUCT_UPLOAD_IMAGE_FAILED:
            return uploadImageFailed(state, action);
        case CHANGE_PRODUCT_UPLOAD_IMAGE_FAILED_WRONG_EXTENSION:
            return uploadImageFailedWrongExtension(state, action);
        case CHANGE_PRODUCT_UPLOAD_IMAGE_FAILED_SIZE_EXCEEDED:
            return uploadImageFailedSizeExceeded(state, action);

        case CHANGE_PROMO_NAME:
            return changeNameReducer(state, action);
        case CHANGE_PROMO_OBJECTIVE:
            return changeObjectiveReducer(state, action);
        case CHANGE_PROMO_PRODUCT_OBJECT:
            return changeProductObjectReducer(state, action);

        case CHANGE_PROMO_PRODUCT_ID:
            return changeProductIdReducer(state, action);
        case CHANGE_PROMO_REWARD_TYPE:
            return changeRewardTypeReducer(state, action);
        case CHANGE_PROMO_SEPARATE_PRODUCT_ACTION:
            return changeSeparateProductIdReducer(state, action);
        case CHANGE_PROMO_OFFER_PHRASE:
            return changeOfferPhraseReducer(state, action);
        case CHANGE_PROMO_ABOUT:
            return changeAboutReducer(state, action);
        case CHANGE_PROMO_TERMS:
            return changeTermsReducer(state, action);
        case CHANGE_PROMO_TYPE:
            return changeTypeReducer(state, action);
        case CHANGE_PROMO_CONDITION:
            return changeConditionReducer(state, action);
        case CHANGE_PROMO_VALUE:
            return changeValueReducer(state, action);
        case CHANGE_PROMO_QUANTITY:
            return changePromoQuantityReducer(state, action);
        case CHANGE_PROMO_IS_UNLIMITED_QUANTITY:
            return changeIsUnlimitedQuantityReducer(state, action);
        case CHANGE_PROMO_CODES:
            return changeCodesReducer(state, action);
        case CHANGE_PROMO_TIME_DECIDE:
            return changeTime2DecideReducer(state, action);
        case CHANGE_PROMO_GENDER:
            return changeGenderReducer(state, action);
        case CHANGE_PROMO_AGE:
            return changeAgeReducer(state, action);
        case CHANGE_PROMO_LANGUAGE:
            return changeLanguageReducer(state, action);
        case CHANGE_PROMO_INTEREST:
            return changeInterestReducer(state, action);
        case CHANGE_PROMO_SCHEDULE:
            return changeScheduleTypeReducer(state, action);
        case CHANGE_PROMO_PRICING:
            return changePricingReducer(state, action);
        case CHANGE_PROMO_START_DATE_TIME:
            return changeStartDateTimeReducer(state, action);
        case CHANGE_PROMO_FINISH_DATE_TIME:
            return changeFinishDateTimeReducer(state, action);
        case CHANGE_PROMO_BUDGET_PERIOD:
            return changeBudgetPeriodReducer(state, action);
        case CHANGE_PROMO_BUDGET_AMOUNT:
            return changeBudgetAmountReducer(state, action);
        case CHANGE_PROMO_DATA_LANGUAGE:
            return changeDataLanguageReducer(state);
        case CHANGE_PROMO_LOCATION:
            return changeLocationReducer(state, action);
        case CHOOSE_PROMO:
            return choosePromoReducer(state, action);
        case CHANGE_PROMO_DISCOUNT:
            return changeDiscountReducer(state, action);
        case CHANGE_PROMO_CODE_TYPE:
            return changeCodeTypeReducer(state, action);

        case REGISTER_PROMO_SEND:
            return registerPromoSendReducer(state, action);
        case REGISTER_PROMO_SUCCESS:
            return registerPromoSuccessReducer(state, action);
        case REGISTER_PROMO_FAILED:
            return registerPromoFailedReducer(state, action);

        case EDIT_PROMO_SEND:
            return editPromoSendReducer(state, action);
        case EDIT_PROMO_SUCCESS:
            return editPromoSuccessReducer(state, action);
        case EDIT_PROMO_FAILED:
            return editPromoFailedReducer(state, action);

        case CHOOSE_PROMO_TO_VIEW:
            return choosePromoToViewReducer(state, action);

        case CHANGE_PROMO_UPLOAD_IMGCODE_SUCCESS:
            return uploadImgCodeSuccess(state, action);
        case CHANGE_PROMO_UPLOAD_IMGCODE_FAILED:
            return uploadImgCodeFailed(state, action);

        default:
            console.error(`Unhalted action! ${action.type}`);
            return state;
    }
}
