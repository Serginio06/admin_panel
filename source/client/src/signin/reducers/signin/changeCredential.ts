import {IState} from "../../state";
import {ICredentialAction} from "../../actions/signin/changeCredential";

export function changeCredentialReducer(state: IState, action: ICredentialAction): IState {
    return {
        ...state,

        signinPageState: {
            ...state.signinPageState,

            password: action.credential,
        },
    };
}
