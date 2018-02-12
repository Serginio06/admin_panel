import {Action} from "redux";
import {IFailedAction} from "../../../common/actions";
import {getFetchInitProps} from "../../../common/util";
import {
    REGISTER_USER_VIA_FACEBOOK_FAILED,
    REGISTER_USER_VIA_FACEBOOK_SEND,
    REGISTER_USER_VIA_FACEBOOK_SUCCESS,
} from "../../constants";
import {ErrorCode} from "../../../../../types/constants/ErrorCode";
import {IResponse} from "../../../../../types/entity";

export interface ISendFacebookRegisterUserAction extends Action {
    facebookId: string;
    name: string;
}

const sendFacebookRegisterUserAction = (facebookId: string, name: string): ISendFacebookRegisterUserAction => ({
    facebookId,
    name,
    type: REGISTER_USER_VIA_FACEBOOK_SEND,
});
const successFacebookRegisterUserAction = (): Action => ({
    type: REGISTER_USER_VIA_FACEBOOK_SUCCESS,
});
const errorFacebookRegisterUserAction = (errorCode: string): IFailedAction => ({
    errorCode,
    type: REGISTER_USER_VIA_FACEBOOK_FAILED,
});

export const registerUserViaFacebookAction = (facebookId: string, name: string) => (dispatch) => {
    const url: string = "/registerUserViaFacebook";

    dispatch(sendFacebookRegisterUserAction(facebookId, name));

    fetch(url, getFetchInitProps(JSON.stringify({
        facebookId,
        name,
    })))
        .then((res: Response) => res.json())
        .then((res: IResponse<any>) => {
            if (res && res.success) {
                dispatch(successFacebookRegisterUserAction());

                document.location.href = "/companies";
            } else {
                dispatch(errorFacebookRegisterUserAction(res.errorCode));
            }
        })
        .catch((error: Error) => {
            console.error(`registerUserViaFacebookAction failed! ${error}`);

            dispatch(errorFacebookRegisterUserAction(ErrorCode.INTERNAL_ERROR));
        });
};
