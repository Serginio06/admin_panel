import {IState} from "../../../state";
import {IChangePicturesOrderAction} from "../../../actions/product/dnd/changePicturesOrder";

export const changePicturesOrderReducer = (state: IState, action: IChangePicturesOrderAction) => ({
    ...state,
    productPageState: {
        ...state.productPageState,

        images: action.pictures,
    },
});
