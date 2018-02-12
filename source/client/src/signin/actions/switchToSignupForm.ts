import {Action} from "redux";
import {SWITCH_TO_SIGNUP_FORM} from "../constants";

export const switchToSignupFormAction = (): Action => ({
    type: SWITCH_TO_SIGNUP_FORM,
});
