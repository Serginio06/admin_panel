import {DataLanguage} from "../../../common/constants/dataLanguageType";
import {ICompanyPromo, IState} from "../../state";

export const changeDataLanguageReducer = (state: IState): IState => {
    const dataLanguage: DataLanguage = state.promoPageState.dataLanguage === DataLanguage.EN ? DataLanguage.RU : DataLanguage.EN;
    const promos: ICompanyPromo[] = state.promos.slice();

    for (const promo of promos) {
        if (promo._id === "0") {
            promo.dataLanguage = dataLanguage;
            break;
        }
    }

    return {
        ...state,

        promos,

        promoPageState: {
            ...state.promoPageState,

            dataLanguage,
        },
    };
};
