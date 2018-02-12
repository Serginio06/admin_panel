import {IState} from "../../state";
import {Action} from "redux";

export const changeKeepLoggedReducer = (state: IState, action: Action): IState => ({
    ...state,
    signinPageState: {
        ...state.signinPageState,

        keepLogged: !state.signinPageState.keepLogged,
    },
});
