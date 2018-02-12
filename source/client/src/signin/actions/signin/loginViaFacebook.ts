import {Action} from "redux";
import {IResponse, ISigninResult} from "../../../../../types/entity";
import {IFailedAction} from "../../../common/actions";
import {getFetchInitProps} from "../../../common/util";
import {LOGIN_VIA_FACEBOOK_FAILED, LOGIN_VIA_FACEBOOK_SEND, LOGIN_VIA_FACEBOOK_SUCCESS} from "../../constants";
import {ErrorCode} from "../../../../../types/constants/ErrorCode";

export interface ILoginViaFacebookAction extends Action {
    facebookId: string;
    keepLogged: boolean;
}

export interface ISuccessLoginViaFacebookAction extends Action {
    payload: ISigninResult
}

const sendLoginFacebookAction = (facebookId: string, keepLogged: boolean): ILoginViaFacebookAction => ({
    facebookId,
    keepLogged,
    type: LOGIN_VIA_FACEBOOK_SEND,
});
const successLoginFacebookAction = (payload: ISigninResult): ISuccessLoginViaFacebookAction => ({
    payload,
    type: LOGIN_VIA_FACEBOOK_SUCCESS,
});
const errorLoginFacebookAction = (errorCode: string): IFailedAction => ({
    errorCode,
    type: LOGIN_VIA_FACEBOOK_FAILED,
});
export const loginViaFacebookAction = (facebookId: string, keepLogged: boolean) => (dispatch) => {
    const url: string = "/loginViaFacebook";

    dispatch(sendLoginFacebookAction(facebookId, keepLogged));

    fetch(url, getFetchInitProps(JSON.stringify({facebookId, keepLogged})))
        .then((res: Response) => res.json())
        .then((res: IResponse<ISigninResult>) => {
            if (res && res.success) {
                dispatch(successLoginFacebookAction(res.payload));
                document.location.href = "/welcome";
            } else {
                dispatch(errorLoginFacebookAction(res.errorCode));
            }
        })
        .catch((error: Error) => {
            console.error(`loginAction failed! ${error}`);

            dispatch(errorLoginFacebookAction(ErrorCode.INTERNAL_ERROR));
        });
};
