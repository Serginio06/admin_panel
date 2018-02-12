import {getFetchInitProps} from "../../../common/util";
import {CHECK_COMPANY_EMAIL_FAILED, CHECK_COMPANY_EMAIL_SEND, CHECK_COMPANY_EMAIL_SUCCESS} from "../../constants";
import {Action, Dispatch} from "redux";
import {ErrorCode} from "../../../../../types/constants/ErrorCode";
import {IResponse} from "../../../../../types/entity";
import {IFailedAction} from "../../../common/actions";

export interface ICheckEmailSendAction extends Action {
    email: string;
}

export interface ICheckEmailSuccessAction extends Action {
    result: boolean;
}

const send = (email: string): ICheckEmailSendAction => {
    return {
        email,
        type: CHECK_COMPANY_EMAIL_SEND,
    }
};

const success = (result: boolean): ICheckEmailSuccessAction => {
    return {
        result,
        type: CHECK_COMPANY_EMAIL_SUCCESS,
    }
};

const failed = (errorCode: string): IFailedAction => {
    return {
        type: CHECK_COMPANY_EMAIL_FAILED,
        errorCode,
    }
};

export const checkEmailAction = (email: string) => (dispatch: Dispatch<Action>) => {
    const url: string = "/checkCompanyEmail";

    dispatch(send(email));

    fetch(url, getFetchInitProps(JSON.stringify({email})))
        .then((res: Response) => res.json())
        .then((res: IResponse<boolean>) => {
            if (res && res.success) {
                dispatch(success(res.payload));
            } else {
                if (res.errorCode === ErrorCode.AUTH_ERROR) {
                    document.location.href = "/signin/";
                }

                dispatch(failed(res.errorCode));
            }
        })
        .catch((err) => {
            console.error(`checkEmailAction failed! ${err}`);

            dispatch(failed(ErrorCode.INTERNAL_ERROR));
        });
};
