import {Action} from "redux";
import {loadUserInfoAction} from "./loadUserInfo";
import {logoutAction} from "./logout";

export {
    loadUserInfoAction,
    logoutAction,
};

export interface IFailedAction extends Action {
    errorCode: string;
}
