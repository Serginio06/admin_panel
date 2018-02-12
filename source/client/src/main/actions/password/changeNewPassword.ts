import {CHANGE_NEW_PASSWORD} from "../../constants";
import {INewPasswordAction} from "./applyNewPassword";

export const changeNewPasswordAction = (newPassword: string): INewPasswordAction => ({
    newPassword,
    type: CHANGE_NEW_PASSWORD,
});
