import {VALIDATION_LEVEL_ERROR, VALIDATION_LEVEL_SUCCESS} from "../../../common/constants/ValidationLevelType";
import {isCurrencyValid} from "../../../common/util/validation";
import {ICompanyProduct, ICompanyPromo, IState, IStepsState} from "../../state";
import {IChangeValueAction} from "../../actions/promo/changeValue";
import {PromoRewardType} from "../../../../../types/constants/PromoRewardType";
import {PromoCodeType} from "../../../../../types/constants/PromoCodeType";

export const changeValueReducer = (state: IState, action: IChangeValueAction): IState => {
    let valueValidationLevel: string = VALIDATION_LEVEL_SUCCESS;
    let valueValidationMessage: string = "";
    let value: string;
    let priceAfterDiscount: string = "0.00";
    let discount: string = "";

    const isEditable: boolean = state.promoPageState.isEditable;
    const promoId: string = state.promoPageState._id;
    const promos: ICompanyPromo[] = state.promos.slice();
    const steps: IStepsState[] = state.promoPageState.steps.slice();

    if (action.value.length > 1) {
        value = action.value.match(/[^$]*/g).join("");

        if (value.split(".").length > 1) {
            const _value: string[] = value.split(".");
            _value[0] = /^\d+$/.test(_value[0]) ? _value[0] : "0";

            if (_value[0].length > 1 && _value[0].charAt(0) === "0") {
                let p: string = "";
                let flag: boolean = false;

                for (let i = 0; i < _value[0].length; i++) {
                    if (!flag && _value[0].charAt(i) !== "0") {
                        flag = true;
                    }

                    if (flag) {
                        p += _value[0].charAt(i);
                    }
                }

                _value[0] = p.length ? p : "0";
            }
            if (_value[1]) {
                _value[1] = /^\d+$/.test(_value[1]) ? _value[1] : "00";
                _value[1] = _value[1].substr(0, 2);
            }

            value = _value.join(".");
        } else {
            let p: string = "";
            let flag: boolean = false;

            for (let i = 0; i < value.length; i++) {
                if (!flag && value.charAt(i) !== "0") {
                    flag = true;
                }

                if (flag) {
                    p += value.charAt(i);
                }
            }

            value = p.length ? p : "0";
        }
    } else if (action.value.length === 1) {
        value = /^\d+$/.test(action.value) ? action.value : "0";
    } else {
        value = "0";
    }

    if (!value.length) {
        valueValidationLevel = VALIDATION_LEVEL_ERROR;
        valueValidationMessage = "Field must be filled";
    } else if (!isCurrencyValid(value)) {
        value = state.promoPageState.value;
    }

    let productId: string;
    if (state.promoPageState.rewardType === PromoRewardType.SEPARATE_PRODUCT) {
        productId = state.promoPageState.separateProductId;
    } else {
        productId = state.promoPageState.productId;
    }

    if (state.promoPageState.productId && value) {
        const products: ICompanyProduct[] = state.companyProducts;
        for (const product of products) {
            if (product._id === productId) {
                if (product.price) {
                    if (+product.price < +value) {
                        value = product.price;
                    }

                    priceAfterDiscount = (+product.price - +value).toString();

                    if (priceAfterDiscount.toString().split(".").length > 1) {
                        const _priceAfterDiscount: string[] = priceAfterDiscount.toString().split(".");
                        _priceAfterDiscount[1] = _priceAfterDiscount[1].substr(0, 2);
                        if (_priceAfterDiscount[1].length < 2) {
                            _priceAfterDiscount[1] += "0";
                        }
                        priceAfterDiscount = _priceAfterDiscount.join(".");
                    }

                    discount = (+value / (+product.price / 100)).toString();
                    discount = (Math.floor(+discount)).toString();
                    break;
                }
            }
        }
    }

    for (const promo of promos) {
        if (promo._id === promoId) {
            promo.value = value;
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
        && value !== ""
        && valueValidationMessage === ""
        && state.promoPageState.codeType !== ""
        && state.promoPageState.time2Decide !== null
        && state.promoPageState.time2DecideValidationMessage === "";

    if (!state.promoPageState.isUnlimited) {
        steps[2].isCompleted = steps[2].isCompleted
            && state.promoPageState.quantity !== ""
            && state.promoPageState.quantityValidationMessage === "";
    }

    if (state.promoPageState.rewardType === PromoRewardType.SPECIAL_OFFER) {
        steps[2].isCompleted = steps[2].isCompleted
            && state.promoPageState.discount !== ""
            && state.promoPageState.discountValidationMessage === "";
    }

    if (state.promoPageState.codeType === PromoCodeType.CODE) {
        steps[2].isCompleted = steps[2].isCompleted
            && state.promoPageState.codes !== ""
            && state.promoPageState.codesValidationMessage === "";
    }

    if (state.promoPageState.codeType === PromoCodeType.BAR_QR) {
        steps[2].isCompleted = steps[2].isCompleted
            && state.promoPageState.imgCode !== "";
    }

    return {
        ...state,

        promos,

        promoPageState: {
            ...state.promoPageState,

            currentStep: 2,
            steps,

            discount,
            discountValidationLevel: VALIDATION_LEVEL_SUCCESS,
            discountValidationMessage: "",

            isEditable,
            value,
            valueValidationLevel,
            valueValidationMessage,

            priceAfterDiscount,
        },
    };
};
