import {getFetchInitProps} from "../../../common/util";
import {CHECK_COMPANY_PHONE_FAILED, CHECK_COMPANY_PHONE_SEND, CHECK_COMPANY_PHONE_SUCCESS} from "../../constants";
import {Action, Dispatch} from "redux";
import {ErrorCode} from "../../../../../types/constants/ErrorCode";
import {IFailedAction} from "../../../common/actions";
import {IDispatch} from "../../../../../types/vendor";
import {IResponse} from "../../../../../types/entity";

export interface ICheckPhoneSendAction extends Action {
    phone: string;
}

export interface ICheckPhoneSuccessAction extends Action {
    result: boolean;
}

const send = (phone: string): ICheckPhoneSendAction => {
    return {
        phone,
        type: CHECK_COMPANY_PHONE_SEND,
    }
};

const success = (result: boolean): ICheckPhoneSuccessAction => {
    return {
        result,
        type: CHECK_COMPANY_PHONE_SUCCESS,
    }
};

const failed = (errorCode: string): IFailedAction => {
    return {
        errorCode,
        type: CHECK_COMPANY_PHONE_FAILED,
    }
};

export const checkPhoneAction = (phone: string): IDispatch => (dispatch: Dispatch<Action>) => {
    const url: string = "/checkPhone";

    dispatch(send(phone));

    fetch(url, getFetchInitProps(JSON.stringify({phone})))
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
            console.error(`checkPhoneAction failed! ${err}`);

            dispatch(failed(ErrorCode.INTERNAL_ERROR));
        });
};
