import {Action} from "redux";
import {IFailedAction} from "../../../common/actions";
import {IState} from "../../state";

export const recoverPassSendReducer = (state: IState, action: Action): IState => ({
    ...state,
    recoverPageState: {
        ...state.recoverPageState,
        errorCode: "",
        failed: false,
        sent: false,
    },
});

export const recoverPassSuccessReducer = (state: IState, action: Action): IState => ({
    ...state,
    recoverPageState: {
        ...state.recoverPageState,
        email: "",
        sent: true,
    },
});

export const recoverPassFailedReducer = (state: IState, action: IFailedAction): IState => ({
    ...state,
    recoverPageState: {
        ...state.recoverPageState,
        errorCode: action.errorCode,
        failed: true,
    },
});
