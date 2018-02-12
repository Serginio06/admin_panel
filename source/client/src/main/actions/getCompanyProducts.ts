import {getFetchInitProps} from "../../common/util";
import {LOAD_COMPANY_PRODUCTS_FAILED, LOAD_COMPANY_PRODUCTS_SEND, LOAD_COMPANY_PRODUCTS_SUCCESS} from "../constants";
import {ErrorCode} from "../../../../types/constants/ErrorCode";
import {IDispatch} from "../../../../types/vendor";
import {IResponse} from "../../../../types/entity";
import {Action} from "redux";
import {ICompanyProduct} from "../state";
import {IFailedAction} from "../../common/actions";

const url: string = "/loadCompanyProducts";

export interface ILoadCompanyProductsAction extends Action {
    companyId: string;
}

const startAction = (companyId: string): ILoadCompanyProductsAction => ({
    companyId,
    type: LOAD_COMPANY_PRODUCTS_SEND,
});

const errorAction = (errorCode: string): IFailedAction => ({
    errorCode,
    type: LOAD_COMPANY_PRODUCTS_FAILED,
});

export interface ISuccessLoadCompanyProductsAction extends Action {
    payload: ICompanyProduct[];
}

const successAction = (payload: ICompanyProduct[]): ISuccessLoadCompanyProductsAction => ({
    payload,
    type: LOAD_COMPANY_PRODUCTS_SUCCESS,
});

export const loadCompanyProductsAction = (companyId: string): IDispatch => (dispatch) => {
    dispatch(startAction(companyId));

    fetch(url, getFetchInitProps(JSON.stringify({
        companyId,
    })))
        .then((res: Response) => res.json())
        .then((res: IResponse<ICompanyProduct[]>) => {
            if (res && res.success) {
                dispatch(successAction(res.payload));
            } else {
                dispatch(errorAction(res.errorCode));
            }
        })
        .catch((error: Error) => {
            console.error(`loadCompanyProductsAction failed! ${error}`);

            dispatch(errorAction(ErrorCode.INTERNAL_ERROR));
        });
};
