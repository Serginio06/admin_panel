import {Action} from "redux";
import {CHANGE_IS_ON_DISPATCH} from "../../constants";

export const changeIsOnDispatchAction = (): Action => ({
    type: CHANGE_IS_ON_DISPATCH,
});
