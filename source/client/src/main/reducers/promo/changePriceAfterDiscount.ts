import {ICompanyProduct, ICompanyPromo, IPromoPageState, IState} from "../../state";
import {IChangePriceAfterDiscountAction} from "../../actions/promo/changePriceAfterDiscount";
import {PromoRewardType} from "../../../../../types/constants/PromoRewardType";

export const changePriceAfterDiscountReducer = (state: IState, action: IChangePriceAfterDiscountAction): IState => {
    const promoPageState: IPromoPageState = {...state.promoPageState};
    const productId: string = state.promoPageState.rewardType === PromoRewardType.SEPARATE_PRODUCT && state.promoPageState.separateProductId ?
        state.promoPageState.separateProductId : state.promoPageState.productId;
    const promos: ICompanyPromo[] = state.promos;

    let value: string = "0";
    let discount: string = "0";
    let priceAfterDiscount: string = action.priceAfterDiscount;

    if (priceAfterDiscount.length > 1) {
        priceAfterDiscount = priceAfterDiscount.match(/[^$]*/g).join("");

        if (priceAfterDiscount.split(".").length > 1) {
            const _priceAfterDiscount: string[] = priceAfterDiscount.split(".");
            _priceAfterDiscount[0] = /^\d+$/.test(_priceAfterDiscount[0]) ? _priceAfterDiscount[0] : "0";

            if (_priceAfterDiscount[0].length > 1 && _priceAfterDiscount[0].charAt(0) === "0") {
                let p: string = "";
                let flag: boolean = false;

                for (let i = 0; i < _priceAfterDiscount[0].length; i++) {
                    if (!flag && _priceAfterDiscount[0].charAt(i) !== "0") {
                        flag = true;
                    }

                    if (flag) {
                        p += _priceAfterDiscount[0].charAt(i);
                    }
                }

                _priceAfterDiscount[0] = p.length ? p : "0";
            }
            if (_priceAfterDiscount[1]) {
                _priceAfterDiscount[1] = /^\d+$/.test(_priceAfterDiscount[1]) ? _priceAfterDiscount[1] : "00";
                _priceAfterDiscount[1] = _priceAfterDiscount[1].substr(0, 2);
            }

            priceAfterDiscount = _priceAfterDiscount.join(".");
        } else {
            let p: string = "";
            let flag: boolean = false;

            for (let i = 0; i < priceAfterDiscount.length; i++) {
                if (!flag && priceAfterDiscount.charAt(i) !== "0") {
                    flag = true;
                }

                if (flag) {
                    p += priceAfterDiscount.charAt(i);
                }
            }

            priceAfterDiscount = p.length ? p : "0";
        }
    } else if (priceAfterDiscount.length === 1) {
        priceAfterDiscount = /^\d+$/.test(priceAfterDiscount) ? priceAfterDiscount : "0";
    } else {
        priceAfterDiscount = "0";
    }

    if (priceAfterDiscount !== "0") {
        const companyProducts: ICompanyProduct[] = state.companyProducts;
        for (const product of companyProducts) {
            if (product._id === productId) {
                if (product.price) {
                    if (+product.price - +priceAfterDiscount < 0) {
                        priceAfterDiscount = product.price;
                    }

                    value = (+product.price - +priceAfterDiscount).toString();
                    discount = (+product.price / 100 * +value).toString();
                    discount = Math.round(+discount).toString();

                    if (value.toString().indexOf(".") !== -1) {
                        const _value: string[] = value.split(".");
                        _value[1] = _value[1].substr(0, 2);

                        value = _value.join(".");
                    }
                    break;
                }
            }
        }
    }

    for (const promo of promos) {
        if (promo._id === promoPageState._id) {
            promo.discount = discount;
            promo.value = value;
            promo.priceAfterDiscount = priceAfterDiscount;
            break;
        }
    }

    promoPageState.value = value;
    promoPageState.priceAfterDiscount = priceAfterDiscount;
    promoPageState.discount = discount;

    return {
        ...state,

        promoPageState,
    }
};
