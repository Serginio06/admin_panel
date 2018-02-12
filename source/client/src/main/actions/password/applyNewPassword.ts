import {getFetchInitProps} from "../../../common/util";
import {APPLY_NEW_PASSWORD_FAILED, APPLY_NEW_PASSWORD_SEND, APPLY_NEW_PASSWORD_SUCCESS} from "../../constants";
import {ErrorCode} from "../../../../../types/constants/ErrorCode";
import {IResponse} from "../../../../../types/entity";
import {IDispatch} from "../../../../../types/vendor";
import {Action} from "redux";
import {IFailedAction} from "../../../common/actions";

const url: string = "/applyNewPassword";

export interface INewPasswordAction extends Action {
    newPassword: string;
}

const startAction = (newPassword: string): INewPasswordAction => ({
    newPassword,
    type: APPLY_NEW_PASSWORD_SEND,
});

const successAction = (): Action => ({
    type: APPLY_NEW_PASSWORD_SUCCESS,
});

const errorAction = (errorCode: string): IFailedAction => ({
    errorCode,
    type: APPLY_NEW_PASSWORD_FAILED,
});

export const applyNewPasswordAction = (newPassword: string): IDispatch => (dispatch) => {
    dispatch(startAction(newPassword));

    fetch(url, getFetchInitProps(JSON.stringify({newPassword})))
        .then((res: Response) => res.json())
        .then((res: IResponse<string>) => {
            if (res && res.success) {
                dispatch(successAction());
            } else {
                dispatch(errorAction(res.errorCode));
            }
        })
        .catch((error: Error) => {
            console.error(`applyNewPasswordAction failed! ${error}`);

            dispatch(errorAction(ErrorCode.INTERNAL_ERROR));
        });
};
