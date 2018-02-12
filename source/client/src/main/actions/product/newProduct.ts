import {NEW_PRODUCT} from "../../constants";
import {Action} from "redux";

export const newProductAction = (): Action => ({
    type: NEW_PRODUCT,
});
