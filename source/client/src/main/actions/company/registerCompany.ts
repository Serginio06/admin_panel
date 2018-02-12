import {getFetchInitProps} from "../../../common/util";
import {REGISTER_COMPANY_FAILED, REGISTER_COMPANY_SEND, REGISTER_COMPANY_SUCCESS} from "../../constants";
import {ICompany, IResponse} from "../../../../../types/entity";
import {Action, Dispatch} from "redux";
import {ErrorCode} from "../../../../../types/constants/ErrorCode";
import {IFailedAction} from "../../../common/actions";

export interface IRegisterCompanySendAction extends Action {
    company: ICompany;
}

export interface IRegisterCompanySuccessAction extends Action {
    company: ICompany;
    _continue: boolean;
}

const send = (company: ICompany): IRegisterCompanySendAction => {
    return {
        company,
        type: REGISTER_COMPANY_SEND,
    }
};

const success = (company: ICompany, _continue: boolean): IRegisterCompanySuccessAction => {
    return {
        company,
        _continue,
        type: REGISTER_COMPANY_SUCCESS,
    }
};

const failed = (errorCode: string): IFailedAction => {
    return {
        errorCode,
        type: REGISTER_COMPANY_FAILED,
    }
};

export const registerCompanyAction = (company: ICompany, _continue: boolean) => (dispatch: Dispatch<Action>) => {
    const url: string = "/registerCompany";

    dispatch(send(company));

    fetch(url, getFetchInitProps(JSON.stringify({
        company,
    })))
        .then((res: Response) => res.json())
        .then((res: IResponse<ICompany>) => {
            if (res && res.success) {
                dispatch(success(res.payload, _continue));
            } else {
                if (res.errorCode === ErrorCode.AUTH_ERROR) {
                    document.location.href = "/signin/";
                }

                dispatch(failed(res.errorCode));
            }
        })
        .catch((err) => {
            console.error(`registerCompanyAction failed! ${err}`);

            dispatch(failed(ErrorCode.INTERNAL_ERROR));
        });
};
