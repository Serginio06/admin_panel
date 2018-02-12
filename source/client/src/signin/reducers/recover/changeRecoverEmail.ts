import {IState} from "../../state";
import {IChangeRecoverEmailAction} from "../../actions/recover/changeRecoverEmail";

export const changeRecoverEmailReducer = (state: IState, action: IChangeRecoverEmailAction): IState => ({
    ...state,
    recoverPageState: {
        ...state.recoverPageState,
        email: action.email,
    },
});
