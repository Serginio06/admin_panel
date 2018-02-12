import {Action} from "redux";
import {DELETE_PRODUCT_FAILED, DELETE_PRODUCT_SEND, DELETE_PRODUCT_SUCCESS} from "../../constants";
import {IFailedAction} from "../../../common/actions";
import {getFetchInitProps} from "../../../common/util";
import {IResponse} from "../../../../../types/entity";
import {ErrorCode} from "../../../../../types/constants/ErrorCode";

export interface IDeleteProductSendAction extends Action {
    productId: string;
}

export interface IDeleteProductSuccessAction extends Action {
    productId: string;
}

const send = (productId: string): IDeleteProductSendAction => {
    return {
        type: DELETE_PRODUCT_SEND,
        productId,
    }
};

const success = (productId: string): IDeleteProductSuccessAction => {
    return {
        type: DELETE_PRODUCT_SUCCESS,
        productId,
    }
};

const failed = (errorCode: string): IFailedAction => {
    return {
        type: DELETE_PRODUCT_FAILED,
        errorCode,
    }
};

export const deleteProductAction = (productId: string) => (dispatch) => {
    const url: string = "/deleteProduct";

    dispatch(send(productId));

    fetch(url, getFetchInitProps(JSON.stringify({productId})))
        .then((res: Response) => res.json())
        .then((res: IResponse<void>) => {
            if (res && res.success) {
                dispatch(success(productId));
            } else {
                dispatch(failed(res.errorCode));
            }
        })
        .catch((error: Error) => {
            console.error(`deleteProductAction failed! ${error}`);

            dispatch(failed(ErrorCode.INTERNAL_ERROR));
        });
};
