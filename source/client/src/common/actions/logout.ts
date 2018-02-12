import {LOGOUT_FAILED, LOGOUT_SEND, LOGOUT_SUCCESS} from "../constants";
import {getFetchInitProps} from "../util";
import {setCookie} from "../util/cookieUtil";
import {ErrorCode} from "../../../../types/constants/ErrorCode";
import {IResponse, ISigninResult} from "../../../../types/entity";
import {Action} from "redux";
import {IFailedAction} from "./index";
import {closeSocket} from "../util/ws";

const startAction = (): Action => ({
    type: LOGOUT_SEND,
});

const successAction = (): Action => ({
    type: LOGOUT_SUCCESS,
});

const errorAction = (errorCode): IFailedAction => ({
    errorCode,
    type: LOGOUT_FAILED,
});

export const logoutAction = () => (dispatch) => {
    const url: string = "/logout";

    dispatch(startAction());
    closeSocket();

    fetch(url, getFetchInitProps())
        .then((res: Response) => res.json())
        .then((res: IResponse<ISigninResult>) => {
            setCookie("company", null);

            if (res && res.success) {
                dispatch(successAction());

                document.location.href = "/signin/";
            } else {
                if (res.errorCode === ErrorCode.AUTH_ERROR) {
                    document.location.href = "/signin/";
                }

                dispatch(errorAction(res.errorCode));
            }
        })
        .catch((error: Error) => {
            console.error(`logoutAction failed! ${error}`);

            dispatch(errorAction(ErrorCode.INTERNAL_ERROR))
        });
};
