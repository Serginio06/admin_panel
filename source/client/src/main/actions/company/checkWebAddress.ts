import {getFetchInitProps} from "../../../common/util";
import {
    CHECK_COMPANY_WEB_ADDRESS_FAILED,
    CHECK_COMPANY_WEB_ADDRESS_SEND,
    CHECK_COMPANY_WEB_ADDRESS_SUCCESS,
} from "../../constants";
import {Action, Dispatch} from "redux";
import {ErrorCode} from "../../../../../types/constants/ErrorCode";
import {IFailedAction} from "../../../common/actions";
import {IResponse} from "../../../../../types/entity";

export interface ICheckWebAddressSendAction extends Action {
    webAddress: string;
}

export interface ICheckWebAddressSuccessAction extends Action {
    payload: boolean;
}

const send = (webAddress: string): ICheckWebAddressSendAction => {
    return {
        type: CHECK_COMPANY_WEB_ADDRESS_SEND,
        webAddress,
    }
};

const success = (payload: boolean): ICheckWebAddressSuccessAction => {
    return {
        payload,
        type: CHECK_COMPANY_WEB_ADDRESS_SUCCESS,
    }
};

const failed = (errorCode: string): IFailedAction => {
    return {
        errorCode,
        type: CHECK_COMPANY_WEB_ADDRESS_FAILED,
    }
};

export const checkWebAddressAction = (webAddress: string) => (dispatch: Dispatch<Action>) => {
    const url: string = "/checkWebAddress";

    dispatch(send(webAddress));

    fetch(url, getFetchInitProps(JSON.stringify({webAddress})))
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
            console.error(`checkWebAddressAction failed! ${err}`);

            dispatch(failed(ErrorCode.INTERNAL_ERROR));
        });
};
