import {CHANGE_NEW_VERIFY} from "../../constants";
import {Action} from "redux";

interface INewVerifyAction extends Action {
    newVerify: string;
}

export const changeNewVerifyAction = (newVerify: string): INewVerifyAction => ({
    newVerify,
    type: CHANGE_NEW_VERIFY,
});
