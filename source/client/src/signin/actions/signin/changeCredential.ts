import {Action} from "redux";
import {CHANGE_CREDENTIAL} from "../../constants";

export interface ICredentialAction extends Action {
    credential: string;
}

export function changeCredentialAction(credential: string): ICredentialAction {
    return {
        credential,
        type: CHANGE_CREDENTIAL,
    };
}
