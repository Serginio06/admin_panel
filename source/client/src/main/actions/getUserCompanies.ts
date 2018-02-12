import {getFetchInitProps} from "../../common/util";
import {LOAD_USER_COMPANIES_FAILED, LOAD_USER_COMPANIES_SEND, LOAD_USER_COMPANIES_SUCCESS} from "../constants";
import {Action, Dispatch} from "redux";
import {ICompany, IResponse} from "../../../../types/entity";
import {ErrorCode} from "../../../../types/constants/ErrorCode";

const url: string = "/loadUserCompanies";

export interface ILoadUserCompaniesSuccess extends Action {
    payload: ICompany[];
}

export interface ILoadUserCompaniesFailed extends Action {
    errorCode: string;
}

const success = (payload: ICompany[]): ILoadUserCompaniesSuccess => {
    return {
        type: LOAD_USER_COMPANIES_SUCCESS,
        payload,
    };
};

const failed = (errorCode: string): ILoadUserCompaniesFailed => {
    return {
        type: LOAD_USER_COMPANIES_FAILED,
        errorCode,
    };
};

export const loadUsersCompaniesAction = () => (dispatch: Dispatch<Action>) => {
    dispatch({
        type: LOAD_USER_COMPANIES_SEND,
    });

    fetch(url, getFetchInitProps())
        .then((res: Response) => res.json())
        .then((res: IResponse<ICompany[]>) => {
            if (res && res.success) {
                dispatch(success(res.payload));
            } else {
                dispatch(failed(res.errorCode));
            }
        })
        .catch((err) => {
            console.error(`loadUsersCompaniesAction failed! ${err}`);

            dispatch(failed(ErrorCode.INTERNAL_ERROR));
        });
};
