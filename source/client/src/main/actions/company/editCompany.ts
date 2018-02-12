import {getFetchInitProps} from "../../../common/util";
import {EDIT_COMPANY_FAILED, EDIT_COMPANY_SEND, EDIT_COMPANY_SUCCESS} from "../../constants";
import {ICompany, IResponse} from "../../../../../types/entity";
import {Action, Dispatch} from "redux";
import {ErrorCode} from "../../../../../types/constants/ErrorCode";
import {IFailedAction} from "../../../common/actions";

export interface IEditCompanySendAction extends Action {
    company: ICompany;
    continue: boolean;
}

export interface IEditCompanySuccessAction extends Action {
    company: ICompany;
    continue: boolean;
}

const send = (company: ICompany, isContinue: boolean): IEditCompanySendAction => {
    return {
        company,
        continue: isContinue,
        type: EDIT_COMPANY_SEND,
    }
};

const success = (company: ICompany, isContinue: boolean): IEditCompanySuccessAction => {
    return {
        company,
        continue: isContinue,
        type: EDIT_COMPANY_SUCCESS,
    }
};

const failed = (errorCode: string): IFailedAction => {
    return {
        errorCode,
        type: EDIT_COMPANY_FAILED,
    }
};

export const editCompanyAction = (company: ICompany, isContinue: boolean) => (dispatch: Dispatch<Action>) => {
    const url: string = "/editCompany";

    dispatch(send(company, isContinue));

    fetch(url, getFetchInitProps(JSON.stringify({
        company,
    })))
        .then((res: Response) => res.json())
        .then((res: IResponse<ICompany>) => {
            if (res && res.success) {
                dispatch(success(res.payload, isContinue));
            } else {
                if (res.errorCode === ErrorCode.AUTH_ERROR) {
                    document.location.href = "/signin/";
                }

                dispatch(failed(res.errorCode));
            }
        })
        .catch((error: Error) => {
            console.error(`editCompanyAction failed! ${error}`);

            dispatch(failed(ErrorCode.INTERNAL_ERROR));
        });
};
