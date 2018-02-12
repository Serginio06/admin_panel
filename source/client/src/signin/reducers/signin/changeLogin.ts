import {IState} from "../../state";
import {ILoginAction} from "../../actions/signin/changeLogin";

export function changeLoginReducer(state: IState, action: ILoginAction): IState {
    return {
        ...state,

        signinPageState: {
            ...state.signinPageState,

            email: action.login,
        },
    };
}
