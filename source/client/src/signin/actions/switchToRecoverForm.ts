import {Action} from "redux";
import {SWITCH_TO_RECOVER_FORM} from "../constants";

export const switchToRecoverFormAction = (): Action => ({
    type: SWITCH_TO_RECOVER_FORM,
});
