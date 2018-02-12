import {Action} from "redux";
import {getFetchInitProps} from "../../../common/util";
import {RECOVER_PASS_FAILED, RECOVER_PASS_SEND, RECOVER_PASS_SUCCESS} from "../../constants";
import {ErrorCode} from "../../../../../types/constants/ErrorCode";
import {IFailedAction} from "../../../common/actions";
import {IResponse} from "../../../../../types/entity";

const url: string = "/recoverPass";

export interface ISendEmailAction extends Action {
    email: string,
}

const sendEmail = (email: string): ISendEmailAction => {
    return {
        email,
        type: RECOVER_PASS_SEND,
    }
};

const sendEmailSuccess = (): Action => ({
    type: RECOVER_PASS_SUCCESS,
});

const sendEmailError = (errorCode: string): IFailedAction => ({
    errorCode,
    type: RECOVER_PASS_FAILED,
});
export const recoverPassAction = (email: string) => (dispatch) => {

    dispatch(sendEmail(email));

    fetch(url, getFetchInitProps(JSON.stringify({email})))
        .then((res: Response) => res.json())
        .then((res: IResponse<string>) => {
            if (res && res.success) {
                dispatch(sendEmailSuccess());
            } else {
                dispatch(sendEmailError(res.errorCode));
            }
        })
        .catch((error: Error) => {
            console.error(`recoverPassAction failed! ${error}`);

            dispatch(sendEmailError(ErrorCode.INTERNAL_ERROR));
        });
};
