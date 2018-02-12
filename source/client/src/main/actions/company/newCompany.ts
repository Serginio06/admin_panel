import {NEW_COMPANY} from "../../constants";
import {Action} from "redux";

export const newCompanyAction = (): Action => ({
    type: NEW_COMPANY,
});
