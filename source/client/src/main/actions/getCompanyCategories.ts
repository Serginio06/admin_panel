import {getFetchInitProps} from "../../common/util";
import {GET_COMPANY_CATEGORIES_FAILED, GET_COMPANY_CATEGORIES_SEND, GET_COMPANY_CATEGORIES_SUCCESS} from "../constants";
import {ErrorCode} from "../../../../types/constants/ErrorCode";
import {ICategory, IResponse} from "../../../../types/entity";
import {IDispatch} from "../../../../types/vendor";
import {Action} from "redux";
import {IFailedAction} from "../../common/actions";

const startAction = (): Action => ({
    type: GET_COMPANY_CATEGORIES_SEND,
});

export interface ISuccessGetCategoriesAction extends Action {
    payload: ICategory[],
}

const successAction = (payload: ICategory[]): ISuccessGetCategoriesAction => ({
    payload,
    type: GET_COMPANY_CATEGORIES_SUCCESS,
});
const errorAction = (errorCode: string): IFailedAction => ({
    errorCode,
    type: GET_COMPANY_CATEGORIES_FAILED,
});

export const getCompanyCategoriesAction = (): IDispatch => (dispatch) => {
    const url: string = "/getCompanyCategories";

    dispatch(startAction());

    fetch(url, getFetchInitProps())
        .then((res: Response) => res.json())
        .then((res: IResponse<ICategory[]>) => {
            if (res && res.success) {
                dispatch(successAction(res.payload));
           } else {
               dispatch(errorAction(res.errorCode))
           }
        })
        .catch((error: Error) => {
            console.error(`getCompanyCategoriesAction failed! ${error}`);

            dispatch(errorAction(ErrorCode.INTERNAL_ERROR))
        });
};
