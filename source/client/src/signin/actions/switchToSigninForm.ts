import {Action} from "redux";
import {SWITCH_TO_SIGNIN_FORM} from "../constants";

export const switchToSigninFormAction = (): Action => ({
    type: SWITCH_TO_SIGNIN_FORM,
});
