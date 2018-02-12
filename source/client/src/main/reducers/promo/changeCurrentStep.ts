import {IState} from "../../state";
import {IChangeCurrentStepAction} from "../../actions/promo/changeCurrentStep";

export const changeCurrentStepReducer = (state: IState, action: IChangeCurrentStepAction): IState => ({
    ...state,
    promoPageState: {
        ...state.promoPageState,

        currentStep: action.step,
    },
});
