import {getFetchInitProps} from "../../../common/util";
import {EDIT_PRODUCT_FAILED, EDIT_PRODUCT_SEND, EDIT_PRODUCT_SUCCESS} from "../../constants";
import {ErrorCode} from "../../../../../types/constants/ErrorCode";
import {Action} from "redux";
import {IFailedAction} from "../../../common/actions";
import {IProduct, IResponse} from "../../../../../types/entity";

export interface IEditProductAction extends Action {
    isContinue: boolean,
    product: IProduct,
}

const sendAction = (product: IProduct, isContinue: boolean): IEditProductAction => ({
    product,
    isContinue,
    type: EDIT_PRODUCT_SEND,
});

export interface ISuccessEditProductAction extends Action {
    product: IProduct;
}

const successAction = (product: IProduct): ISuccessEditProductAction => ({
    product,
    type: EDIT_PRODUCT_SUCCESS,
});
const errorAction = (errorCode: string): IFailedAction => ({
    errorCode,
    type: EDIT_PRODUCT_FAILED,
});

export const editProductAction = (product: IProduct, isContinue: boolean) => (dispatch) => {
    const url: string = "/editProduct";

    dispatch(sendAction(product, isContinue));

    fetch(url, getFetchInitProps(JSON.stringify({product})))
        .then((res: Response) => res.json())
        .then((res: IResponse<IProduct>) => {
            if (res && res.success) {
                dispatch(successAction(res.payload));
            } else {
                dispatch(errorAction(res.errorCode));
            }
        })
        .catch((error: Error) => {
            console.error(`editProductAction failed! ${error}`);

            dispatch(errorAction(ErrorCode.INTERNAL_ERROR));
        });
};
