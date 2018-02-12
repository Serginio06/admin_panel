import {CHANGE_PRODUCT_LINK2PRODUCT} from "../../constants";
import {Action} from "redux";

export interface IChangeLink2productAction extends Action {
    link2product: string;
}

export function changeLink2productAction(link2product: string): IChangeLink2productAction {
    return {
        link2product,
        type: CHANGE_PRODUCT_LINK2PRODUCT,
    };
}
