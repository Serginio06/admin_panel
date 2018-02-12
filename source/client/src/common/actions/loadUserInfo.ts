import {LOAD_USER_INFO_FAILED, LOAD_USER_INFO_SEND, LOAD_USER_INFO_SUCCESS} from "../constants";
import {getFetchInitProps} from "../util";
import {ErrorCode} from "../../../../types/constants/ErrorCode";
import {Action} from "redux";
import {IResponse, ISigninResult} from "../../../../types/entity";
import {IFailedAction} from "./index";
import {IDispatch} from "../../../../types/vendor";

export interface ILoadUserInfoAction extends Action {
    payload: ISigninResult;
}

export interface ISendLoadUserInfo extends Action {
    resolvePublic: boolean;
}

const startAction = (resolvePublic: boolean): ISendLoadUserInfo => ({
    resolvePublic,
    type: LOAD_USER_INFO_SEND,
});

const successAction = (payload: ISigninResult): ILoadUserInfoAction => ({
    payload,
    type: LOAD_USER_INFO_SUCCESS,
});
const errorAction = (errorCode: string): IFailedAction => ({
    errorCode,
    type: LOAD_USER_INFO_FAILED,
});

export const loadUserInfoAction = (resolvePublic: boolean = false): IDispatch => (dispatch) => {
    const url: string = "/loadUserInfo";

    dispatch(startAction(resolvePublic));

    fetch(url, getFetchInitProps(JSON.stringify({resolvePublic})))
        .then((res: Response) => res.json())
        .then((res: IResponse<ISigninResult>) => {
            if (res && res.success) {
                dispatch(successAction(res.payload));
            } else {
                if (res.errorCode === ErrorCode.AUTH_ERROR && !resolvePublic) {
                    document.location.href = "/signin/";
                }

                dispatch(errorAction(res.errorCode));
            }
        })
        .catch((error: Error) => {
            console.error(`loadUserDataAction failed! ${error}`);

            dispatch(errorAction(ErrorCode.INTERNAL_ERROR));
        });
};
