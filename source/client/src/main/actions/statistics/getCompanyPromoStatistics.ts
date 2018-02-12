import {ErrorCode} from "../../../../../types/constants/ErrorCode";
import {getFetchInitProps} from "../../../common/util";
import {
    LOAD_COMPANY_PROMO_STATISTICS_FAILED,
    LOAD_COMPANY_PROMO_STATISTICS_SEND,
    LOAD_COMPANY_PROMO_STATISTICS_SUCCESS,
} from "../../constants";
import {Action} from "redux";
import {IPromoStatistics, IResponse} from "../../../../../types/entity";
import {IFailedAction} from "../../../common/actions";

const url: string = "/loadCompanyPromoStatistics";

interface ISendCompanyAction extends Action {
    companyId: string,
}

interface ISuccessCompanyAction extends Action {
    payload: IPromoStatistics[],
}

const sendLoadCompanyPromoStatisticsAction = (companyId: string): ISendCompanyAction => ({
    companyId,
    type: LOAD_COMPANY_PROMO_STATISTICS_SEND,
});
const successLoadCompanyPromoStatisticsAction = (payload: IPromoStatistics[]): ISuccessCompanyAction => ({
    payload,
    type: LOAD_COMPANY_PROMO_STATISTICS_SUCCESS,
});
const errorLoadCompanyPromoStatisticsAction = (errorCode: string): IFailedAction => ({
    errorCode,
    type: LOAD_COMPANY_PROMO_STATISTICS_FAILED,
});

export const loadCompanyPromoStatisticsAction = (companyId: string) => (dispatch) => {
    dispatch(sendLoadCompanyPromoStatisticsAction(companyId));

    fetch(url, getFetchInitProps(JSON.stringify({
        companyId,
    })))
        .then((res: Response) => res.json())
        .then((res: IResponse<IPromoStatistics[]>) => {
            if (res && res.success) {
                dispatch(successLoadCompanyPromoStatisticsAction(res.payload));
            } else {
                dispatch({
                    errorCode: res.errorCode,
                    type: LOAD_COMPANY_PROMO_STATISTICS_FAILED,
                });
            }
        })
        .catch((error: Error) => {
            console.error(`loadCompanyPromoStatisticsAction failed! ${error}`);

            dispatch(errorLoadCompanyPromoStatisticsAction(ErrorCode.INTERNAL_ERROR));
        });
};
