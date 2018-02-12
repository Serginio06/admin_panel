import {IFailedAction} from "../../../common/actions";
import {getFetchInitProps} from "../../../common/util";
import {CHECK_EMAIL_FAILED, CHECK_EMAIL_SEND, CHECK_EMAIL_SUCCESS} from "../../constants";
import {Action} from "redux";
import {ErrorCode} from "../../../../../types/constants/ErrorCode";
import {IResponse} from "../../../../../types/entity";

export interface ISendCheckEmailAction extends Action {
    email: string,
}

export interface ISuccessCheckEmailAction extends Action {
    result: boolean,
}

const sendCheckEmailAction = (email: string): ISendCheckEmailAction => ({
    email,
    type: CHECK_EMAIL_SEND,
});
const successCheckEmailAction = (result: boolean): ISuccessCheckEmailAction => ({
    result,
    type: CHECK_EMAIL_SUCCESS,
});
const errorCheckEmailAction = (errorCode: string): IFailedAction => ({
    errorCode,
    type: CHECK_EMAIL_FAILED,

});
export const checkEmailAction = (email: string) => (dispatch) => {
    const url: string = "/checkEmail";

    dispatch(sendCheckEmailAction(email));

    fetch(url, getFetchInitProps(JSON.stringify({email})))
        .then((res: Response) => res.json())
        .then((res: IResponse<boolean>) => {
            if (res && res.success) {
                dispatch(successCheckEmailAction(res.payload));
            } else {
                dispatch(errorCheckEmailAction(res.errorCode));
            }
        })
        .catch((error: Error) => {
            console.error(`checkEmailAction failed! ${error}`);

            dispatch(errorCheckEmailAction(ErrorCode.INTERNAL_ERROR));
        });
};
