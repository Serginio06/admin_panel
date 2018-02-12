import {CHANGE_COMPANY_DESCRIPTION} from "../../constants";
import {Action} from "redux";

export interface IChangeDescriptionAction extends Action {
    description: string;
}

export function changeDescriptionAction(description: string): IChangeDescriptionAction {
    return {
        description,
        type: CHANGE_COMPANY_DESCRIPTION,
    };
}
