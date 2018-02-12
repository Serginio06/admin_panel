import {Action} from "redux";
import {IState} from "../../state";

export const changeIsOnDispatchReducer = (state: IState, action: Action): IState => ({
    ...state,
    signupPageState: {
        ...state.signupPageState,
        isOnDispatch: !state.signupPageState.isOnDispatch,
    },
});
