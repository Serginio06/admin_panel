import {Action} from "redux";
import {getFetchInitProps} from "../../../common/util";
import {REGISTER_USER_FAILED, REGISTER_USER_SEND, REGISTER_USER_SUCCESS} from "../../constants";
import {IFailedAction} from "../../../common/actions";
import {ErrorCode} from "../../../../../types/constants/ErrorCode";
import {IResponse} from "../../../../../types/entity";

export interface ISendRegisterUserAction extends Action {
    firstName: string,
    familyName: string,
    email: string,
    password: string,
    verify: string
}

const sendAction = (firstName: string, familyName: string, email: string, password: string, verify: string): ISendRegisterUserAction => ({
    email,
    familyName,
    firstName,
    password,
    verify,
    type: REGISTER_USER_SEND,
});
const successAction = (): Action => ({
    type: REGISTER_USER_SUCCESS,
});
const errorAction = (errorCode: string): IFailedAction => ({
    errorCode,
    type: REGISTER_USER_FAILED,
});

export const registerUserAction = (firstName, familyName, email, password, verify) => (dispatch) => {
    const url: string = "/registerUser";

    dispatch(sendAction(email, familyName, firstName, password, verify));

    fetch(url, getFetchInitProps(JSON.stringify({
        email,
        familyName,
        firstName,
        password,
        verify,
    })))
        .then((res: Response) => res.json())
        .then((res: IResponse<any>) => {
            if (res && res.success) {
                dispatch(successAction());

                document.location.href = "/companies";
            } else {
                dispatch(errorAction(res.errorCode));
            }
        })
        .catch((error: Error) => {
            console.error(`registerUserAction failed! ${error}`);

            dispatch(errorAction(ErrorCode.INTERNAL_ERROR));
        });
};
