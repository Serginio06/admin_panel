import {Action} from "redux";

import {CHANGE_KEEP_LOGGED} from "../../constants";

export const changeKeepLoggedAction = (): Action => ({
    type: CHANGE_KEEP_LOGGED,
});
