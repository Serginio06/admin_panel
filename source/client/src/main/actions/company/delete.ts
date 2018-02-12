import {Action, Dispatch} from "redux";
import {DELETE_COMPANY_FAILED, DELETE_COMPANY_SEND, DELETE_COMPANY_SUCCESS} from "../../constants";
import {IFailedAction} from "../../../common/actions";
import {IResponse} from "../../../../../types/entity";
import {getFetchInitProps} from "../../../common/util";
import {ErrorCode} from "../../../../../types/constants/ErrorCode";

export interface IDeleteCompanySendAction extends Action {
    companyId: string;
}

export interface IDeleteCompanySuccessAction extends Action {
    companyId: string;
}

const send = (companyId: string): IDeleteCompanySendAction => {
    return {
        type: DELETE_COMPANY_SEND,
        companyId,
    };
};

const success = (companyId: string): IDeleteCompanySuccessAction => {
    return {
        type: DELETE_COMPANY_SUCCESS,
        companyId,
    };
};

const failed = (errorCode: string): IFailedAction => {
    return {
        type: DELETE_COMPANY_FAILED,
        errorCode,
    };
};

export const deleteCompanyAction = (companyId: string) => (dispatch: Dispatch<Action>) => {
    const url: string = "/deleteCompany";

    dispatch(send(companyId));

    fetch(url, getFetchInitProps(JSON.stringify({
        companyId,
    })))
        .then((res: Response) => res.json())
        .then((res: IResponse<void>) => {
            if (res && res.success) {
                dispatch(success(companyId));
            } else {
                if (res.errorCode === ErrorCode.AUTH_ERROR) {
                    document.location.href = "/signin/";
                }

                dispatch(failed(res.errorCode));
            }
        })
        .catch((error: Error) => {
            console.error(`deleteCompanyAction failed! ${error}`);

            dispatch(failed(ErrorCode.INTERNAL_ERROR));
        });
};