import {getFetchInitProps} from "../../../common/util";
import {FINISH_PROMO_FAILED, FINISH_PROMO_SEND, FINISH_PROMO_SUCCESS} from "../../constants";
import {Action, Dispatch} from "redux";
import {IPromo, IResponse} from "../../../../../types/entity";
import {ErrorCode} from "../../../../../types/constants/ErrorCode";
import {IFailedAction} from "../../../common/actions";

export interface IFinishPromoSendAction extends Action {
    promoId: string;
}

export interface IFinishPromoSuccessAction extends Action {
    promos: IPromo[];
}

const send = (promoId: string): IFinishPromoSendAction => {
    return {
        promoId,
        type: FINISH_PROMO_SEND,
    }
};

const success = (promos: IPromo[]): IFinishPromoSuccessAction => {
    return {
        promos,
        type: FINISH_PROMO_SUCCESS,
    }
};

const failed = (errorCode: string): IFailedAction => {
    return {
        errorCode,
        type: FINISH_PROMO_FAILED,
    }
};

export const finishPromoAction = (promoId: string) => (dispatch) => {
    const url: string = "/finishPromo";

    dispatch(send(promoId));

    fetch(url, getFetchInitProps(JSON.stringify({promoId})))
        .then((res: Response) => res.json())
        .then((res: IResponse<IPromo[]>) => {
            if (res && res.success) {
                dispatch(success(res.payload));
            } else {
                dispatch(failed(res.errorCode));
            }
        })
        .catch((err: Error) => {
            console.error(`finishPromoAction failed! ${err}`);

            dispatch(failed(ErrorCode.INTERNAL_ERROR));
        });
};
