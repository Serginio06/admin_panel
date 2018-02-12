import {CHANGE_FAMILY_NAME} from "../../constants";
import {Action} from "redux";

export interface IFamilyNameAction extends Action {
    familyName: string,
}

export function changeFamilyNameAction(familyName: string): IFamilyNameAction {
    return {
        familyName,
        type: CHANGE_FAMILY_NAME,
    };
}
