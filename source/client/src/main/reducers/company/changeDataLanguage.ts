import {DataLanguage} from "../../../common/constants/dataLanguageType";
import {IState, IUserCompany} from "../../state";

export const changeDataLanguageReducer = (state: IState): IState => {
    const dataLanguage: DataLanguage = state.companyPageState.dataLanguage === DataLanguage.EN ? DataLanguage.RU : DataLanguage.EN;
    const isEditable: boolean = state.companyPageState.isEditable;
    let companyId: string;
    const userCompanies: IUserCompany[] = state.userCompanies.slice();

    for (const company of userCompanies) {
        if (company.checked) {
            companyId = company._id;
            break;
        }
    }

    for (const company of userCompanies) {
        if (company._id === "0" || (isEditable && company._id === companyId)) {
            company.dataLanguage = dataLanguage;
            break;
        }
    }

    return {
        ...state,

        userCompanies,

        companyPageState: {
            ...state.companyPageState,

            dataLanguage,
        },
    };
};
