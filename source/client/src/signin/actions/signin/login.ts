import {Action} from "redux";
import {IResponse, ISigninResult} from "../../../../../types/entity";
import {IFailedAction} from "../../../common/actions";
import {getFetchInitProps} from "../../../common/util";
import {setCookie} from "../../../common/util/cookieUtil";
import {LOGIN_FAILED, LOGIN_SEND, LOGIN_SUCCESS} from "../../constants";
import {ErrorCode} from "../../../../../types/constants/ErrorCode";

export interface ISendLoginAction extends Action {
    email: string;
    password: string;
    keepLogged: boolean;
}

export interface ISuccessSendLoginAction extends Action {
    payload: ISigninResult
}

const fireLoginAction = (email: string, password: string, keepLogged: boolean): ISendLoginAction => ({
    email,
    keepLogged,
    password,
    type: LOGIN_SEND,
});
const successLoginAction = (payload: ISigninResult): ISuccessSendLoginAction => ({
    payload,
    type: LOGIN_SUCCESS,
});
const errorLoginAction = (errorCode: string): IFailedAction => ({
    errorCode,
    type: LOGIN_FAILED,
});

export const loginAction = (email: string, password: string, keepLogged: boolean) => (dispatch) => {
    const url: string = "/login";

    dispatch(fireLoginAction(email, password, keepLogged));

    fetch(url, getFetchInitProps(JSON.stringify({email, password, keepLogged})))
        .then((res: Response) => res.json())
        .then((res: IResponse<ISigninResult>) => {
            if (res && res.success) {
                dispatch(successLoginAction(res.payload));
                setCookie("company", null);
                document.location.href = "/welcome";
            } else {
                dispatch(errorLoginAction(res.errorCode));
            }
        })
        .catch((error: Error) => {
            console.error(`loginAction failed! ${error}`);

            dispatch(errorLoginAction(ErrorCode.INTERNAL_ERROR));
        });
};
