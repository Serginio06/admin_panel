import {IState} from "../state";

export const loadUserInfoSendReducer = (state, action): IState => ({...state});

export const loadUserInfoSuccessReducer = (state, action): IState => ({
    ...state,
    navigationState: {
        ...state.navigationState,
        userName: action.payload.userName,
    },
});

export const loadUserInfoFailedReducer = (state, action): IState => ({
    ...state,
});
