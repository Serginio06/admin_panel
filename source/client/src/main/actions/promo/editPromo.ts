import {getFetchInitProps} from "../../../common/util";
import {EDIT_PROMO_FAILED, EDIT_PROMO_SEND, EDIT_PROMO_SUCCESS} from "../../constants";
import {Action, Dispatch} from "redux";
import {IPromo, IResponse} from "../../../../../types/entity";
import {ErrorCode} from "../../../../../types/constants/ErrorCode";
import {IFailedAction} from "../../../common/actions";

export interface IEditPromoSendAction extends Action {
    promo: IPromo;
    isDraft: boolean;
}

export interface IEditPromoSuccessAction extends Action {
    promos: IPromo[];
}

const send = (promo: IPromo, isDraft: boolean): IEditPromoSendAction => {
    return {
        isDraft,
        promo,
        type: EDIT_PROMO_SEND,
    }
};

const success = (promos: IPromo[]): IEditPromoSuccessAction => {
    return {
        promos,
        type: EDIT_PROMO_SUCCESS,
    }
};

const failed = (errorCode: string): IFailedAction => {
    return {
        errorCode,
        type: EDIT_PROMO_FAILED,
    }
};

export const editPromoAction = (promo: IPromo, isDraft: boolean) => (dispatch: Dispatch<Action>) => {
    const url: string = "/editPromo";

    dispatch(send(promo, isDraft));

    fetch(url, getFetchInitProps(JSON.stringify({promo, isDraft})))
        .then((res: Response) => res.json())
        .then((res: IResponse<IPromo[]>) => {
            if (res && res.success) {
                dispatch(success(res.payload));
            } else {
                dispatch(failed(res.errorCode));
            }
        })
        .catch((error: Error) => {
            console.error(`editPromoAction failed! ${error}`);

            dispatch(failed(ErrorCode.INTERNAL_ERROR));
        });
};
