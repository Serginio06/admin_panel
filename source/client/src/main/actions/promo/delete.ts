import {Action, Dispatch} from "redux";
import {DELETE_PROMO_FAILED, DELETE_PROMO_SEND, DELETE_PROMO_SUCCESS} from "../../constants";
import {IFailedAction} from "../../../common/actions";
import {IResponse} from "../../../../../types/entity";
import {getFetchInitProps} from "../../../common/util";
import {ErrorCode} from "../../../../../types/constants/ErrorCode";

export interface IDeletePromoSendAction extends Action {
    promoId: string;
}

export interface IDeletePromoSuccessAction extends Action {
    promoId: string;
}

const send = (promoId: string): IDeletePromoSendAction => {
    return {
        type: DELETE_PROMO_SEND,
        promoId,
    }
};

const success = (promoId: string): IDeletePromoSuccessAction => {
    return {
        type: DELETE_PROMO_SUCCESS,
        promoId,
    }
};

const failed = (errorCode: string): IFailedAction => {
    return {
        type: DELETE_PROMO_FAILED,
        errorCode,
    }
};

export const deletePromoAction = (promoId: string) => (dispatch: Dispatch<Action>) => {
    const url: string = "/deletePromo";

    dispatch(send(promoId));

    fetch(url, getFetchInitProps(JSON.stringify({promoId})))
        .then((res: Response) => res.json())
        .then((res: IResponse<void>) => {
            if (res && res.success) {
                dispatch(success(promoId));
            } else {
                dispatch(failed(res.errorCode));
            }
        })
        .catch((error: Error) => {
            console.error(`deletePromoAction failed! ${error}`);

            dispatch(failed(ErrorCode.INTERNAL_ERROR));
        });
};
