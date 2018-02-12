import {getFetchInitProps} from "../../common/util";
import {LOAD_COMPANY_PROMOS_FAILED, LOAD_COMPANY_PROMOS_SEND, LOAD_COMPANY_PROMOS_SUCCESS} from "../constants";
import {ErrorCode} from "../../../../types/constants/ErrorCode";
import {IPromo, IResponse} from "../../../../types/entity";
import {Action} from "redux";
import {IDispatch} from "../../../../types/vendor";
import {IFailedAction} from "../../common/actions";

const url: string = "/loadCompanyPromos";

interface ILoadCompanyPromosAction extends Action {
    companyId: string;
}

const startAction = (companyId: string): ILoadCompanyPromosAction => ({
    companyId,
    type: LOAD_COMPANY_PROMOS_SEND,
});

interface ISuccessLoadCompanyPromosAction extends Action {
    payload: IPromo[];
}

const successAction = (payload: IPromo[]): ISuccessLoadCompanyPromosAction => ({
    payload,
    type: LOAD_COMPANY_PROMOS_SUCCESS,
});

const errorAction = (errorCode: string): IFailedAction => ({
    errorCode,
    type: LOAD_COMPANY_PROMOS_FAILED,
});

export const loadCompanyPromosAction = (companyId: string): IDispatch => (dispatch) => {
    dispatch(startAction(companyId));

    fetch(url, getFetchInitProps(JSON.stringify({
        companyId,
    })))
        .then((res: Response) => res.json())
        .then((res: IResponse<IPromo[]>) => {
            if (res && res.success) {
                dispatch(successAction(res.payload));
            } else {
                dispatch(errorAction(res.errorCode));
            }
        })
        .catch((err) => {
            console.error(`loadCompanyPromosAction failed! ${err}`);

            dispatch(errorAction(ErrorCode.INTERNAL_ERROR));
        });
};
