import {Action} from "redux";
import {IPromo, IResponse} from "../../../../../types/entity";
import {START_PROMO_FAILED, START_PROMO_SEND, START_PROMO_SUCCESS} from "../../constants";
import {IFailedAction} from "../../../common/actions";
import {getFetchInitProps} from "../../../common/util";
import {ErrorCode} from "../../../../../types/constants/ErrorCode";

export interface IStartPromoSendAction extends Action {
    promoId: string;
}

export interface IStartPromoSuccessAction extends Action {
    promos: IPromo[];
}

const send = (promoId: string): IStartPromoSendAction => {
    return {
        type: START_PROMO_SEND,
        promoId,
    }
};

const success = (promos: IPromo[]): IStartPromoSuccessAction => {
    return {
        type: START_PROMO_SUCCESS,
        promos,
    }
};

const failed = (errorCode: string): IFailedAction => {
    return {
        type: START_PROMO_FAILED,
        errorCode,
    }
};

export const startPromoAction = (promoId: string) => (dispatch) => {
    const url: string = "/startPromo";

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
            console.error(`startPromoAction failed! ${err}`);

            dispatch(failed(ErrorCode.INTERNAL_ERROR));
        });
};
