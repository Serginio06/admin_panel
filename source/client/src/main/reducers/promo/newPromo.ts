import {ICompanyPromo, initPromo, initState, IState, IStepsState} from "../../state";

export const newPromoReducer = (state: IState): IState => {
    const promos: ICompanyPromo[] = state.promos.slice();
    const steps: IStepsState[] = JSON.parse(JSON.stringify(initState.promoPageState.steps));

    let flag: boolean = true;

    for (let promo of promos) {
        if (promo._id === "0") {
            promo = Object.assign({}, initPromo);
            flag = false;
        } else {
            promo.checked = false;
        }
    }

    if (flag) {
        promos.unshift(Object.assign({}, initPromo));
    }

    for (const step of steps) {
        step.isCompleted = false;
    }

    return {
        ...state,

        promoPageState: {
            ...initState.promoPageState,

            isEditable: true,
            steps,
        },
        promos,
    };
};
