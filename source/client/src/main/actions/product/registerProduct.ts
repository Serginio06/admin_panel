import {getFetchInitProps} from "../../../common/util";
import {REGISTER_PRODUCT_FAILED, REGISTER_PRODUCT_SEND, REGISTER_PRODUCT_SUCCESS} from "../../constants";
import {ErrorCode} from "../../../../../types/constants/ErrorCode";
import {Action} from "redux";
import {IFailedAction} from "../../../common/actions";
import {IProduct, IResponse} from "../../../../../types/entity";

export interface ISendRegisterProductAction extends Action {
    _continue: boolean;
    product: IProduct;
}

export interface ISuccessRegisterProductAction extends Action {
    continue: boolean;
    payload: IProduct;
}

const sendRegisterProductAction = (_continue: boolean, product: IProduct): ISendRegisterProductAction => ({
    _continue,
    product,
    type: REGISTER_PRODUCT_SEND,
});
const successRegisterProductAction = (_continue: boolean, payload: any): ISuccessRegisterProductAction => ({
    "continue": _continue,
    payload,
    type: REGISTER_PRODUCT_SUCCESS,
});
const errorRegisterProductAction = (errorCode: string): IFailedAction => ({
    errorCode,
    type: REGISTER_PRODUCT_FAILED,
});
export const registerProductAction = (product: IProduct, isContinue: boolean) => (dispatch) => {
    const url: string = "/registerProduct";

    dispatch(sendRegisterProductAction(isContinue, product));

    fetch(url, getFetchInitProps(JSON.stringify({product})))
        .then((res: Response) => res.json())
        .then((res: IResponse<any>) => {
            if (res && res.success) {
                dispatch(successRegisterProductAction(isContinue, res.payload));
            } else {
                dispatch(errorRegisterProductAction(res.errorCode));
            }
        })
        .catch((error: Error) => {
            console.error(`registerProductAction failed! ${error}`);

            dispatch(errorRegisterProductAction(ErrorCode.INTERNAL_ERROR));
        });
};
