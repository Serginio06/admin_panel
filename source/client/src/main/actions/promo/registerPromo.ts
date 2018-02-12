import {getFetchInitProps} from "../../../common/util";
import {REGISTER_PROMO_FAILED, REGISTER_PROMO_SEND, REGISTER_PROMO_SUCCESS} from "../../constants";
import {Action, Dispatch} from "redux";
import {IPromo, IResponse} from "../../../../../types/entity";
import {ErrorCode} from "../../../../../types/constants/ErrorCode";
import {IFailedAction} from "../../../common/actions";

export interface IRegisterPromoSendAction extends Action {
    promo: IPromo;
    isDraft: boolean;
}

export interface IRegisterPromoSuccessAction extends Action {
    promos: IPromo[];
}

const send = (promo: IPromo, isDraft: boolean): IRegisterPromoSendAction => {
    return {
        isDraft,
        promo,
        type: REGISTER_PROMO_SEND,
    }
};

const success = (promos: IPromo[]): IRegisterPromoSuccessAction => {
    return {
        promos,
        type: REGISTER_PROMO_SUCCESS,
    }
};

const failed = (errorCode: string): IFailedAction => {
    return {
        errorCode,
        type: REGISTER_PROMO_FAILED,
    }
};

export const registerPromoAction = (promo: IPromo, isDraft: boolean) => (dispatch: Dispatch<Action>) => {
    dispatch(send(promo, isDraft));

    const url: string = "/newPromo";

    fetch(url, getFetchInitProps(JSON.stringify({promo, isDraft})))
        .then((res: Response) => res.json())
        .then((res: IResponse<IPromo[]>) => {
            if (res && res.success) {
                dispatch(success(res.payload));
            } else {
                dispatch(failed(res.errorCode));
            }
        })
        .catch((err: Error) => {
            console.error(`registerPromoAction failed! ${err}`);

            dispatch(failed(ErrorCode.INTERNAL_ERROR));
        });
};
