import {Action} from "redux";
import {CHOOSE_PRODUCT_TO_EDIT} from "../../constants";

export const chooseProduct2editAction = (): Action => {
    return {
        type: CHOOSE_PRODUCT_TO_EDIT,
    }
};
