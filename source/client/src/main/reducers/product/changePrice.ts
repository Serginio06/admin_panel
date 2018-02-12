import {VALIDATION_LEVEL_ERROR, VALIDATION_LEVEL_SUCCESS} from "../../../common/constants/ValidationLevelType";
import {isCurrencyValid} from "../../../common/util/validation";
import {ICompanyProduct, IState} from "../../state";
import {IChangePriceAction} from "../../actions/product/changePrice";

export function changePriceReducer(state: IState, action: IChangePriceAction): IState {
    let priceValidationLevel: string = VALIDATION_LEVEL_SUCCESS,
        priceValidationMessage: string = "",

        price: string,
        priceMatch: string[];

    const isEditable: boolean = state.productPageState.isEditable,
        productId: string = state.productPageState.productId,
        companyProducts: ICompanyProduct[] = state.companyProducts.slice();

    if (action.price.length > 1) {
        price = action.price.match(/[^$]*/g).join("");

        if (price.split(".").length > 1) {
            priceMatch = price.split(".");
            priceMatch[0] = /^\d+$/.test(priceMatch[0]) ? priceMatch[0] : "0";
            if (priceMatch[0].length > 1 && priceMatch[0].charAt(0) === "0") {
                let p = "",
                    flag = false;

                for (let i = 0; i < priceMatch[0].length; i++) {
                    if (!flag && priceMatch[0].charAt(i) !== "0") {
                        flag = true;
                    }

                    if (flag) {
                        p += priceMatch[0].charAt(i);
                    }
                }

                priceMatch[0] = p.length ? p : "0";
            }
            if (priceMatch[1]) {
                priceMatch[1] = /^\d+$/.test(priceMatch[1]) ? priceMatch[1] : "00";
                priceMatch[1] = priceMatch[1].substr(0, 2);
            }
            price = priceMatch.join(".");
        } else {
            let p = "",
                flag = false;

            for (let i = 0; i < price.length; i++) {
                if (!flag && price.charAt(i) !== "0") {
                    flag = true;
                }

                if (flag) {
                    p += price.charAt(i);
                }
            }

            price = p.length ? p : "0";
        }
    } else if (action.price.length === 1) {
        price = /^\d+$/.test(action.price) ? action.price : "0";
    } else {
        price = "0";
    }

    if (price.length > 10) {
        price = price.substr(0, 10);
    }

    if (!price || price.length === 0) {
        priceValidationLevel = VALIDATION_LEVEL_ERROR;
        priceValidationMessage = "Field must be filled";
    } else if (!isCurrencyValid(price)) {
        price = state.productPageState.price;
    }

    for (const product of companyProducts) {
        if (product._id === "0" || (isEditable && product._id === productId)) {
            product.price = price;
            break;
        }
    }

    return {
        ...state,

        companyProducts,

        productPageState: {
            ...state.productPageState,

            price,
            priceValidationLevel,
            priceValidationMessage,
        },
    };
}
