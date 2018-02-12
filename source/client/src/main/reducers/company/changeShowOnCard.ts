import {FieldOnCardType} from "../../constants/FiledOnCardType";
import {IState, IUserCompany} from "../../state";
import {IChangeShowOnCardAction} from "../../actions/company/changeShowOnCard";

export const changeShowOnCardReducer = (state: IState, action: IChangeShowOnCardAction): IState => {
    let showLocation: boolean = state.companyPageState.showLocation;
    let showEmail: boolean = state.companyPageState.showEmail;
    let showPhone: boolean = state.companyPageState.showPhone;
    let showWebAddress: boolean = state.companyPageState.showWebAddress;

    let companyId: string;
    const isEditable: boolean = state.companyPageState.isEditable;
    const userCompanies: IUserCompany[] = state.userCompanies.slice();

    for (const company of userCompanies) {
        if (company.checked) {
            companyId = company._id;
            break;
        }
    }

    switch (action.fieldType) {
        case FieldOnCardType.WEB_ADDRESS:
            showWebAddress = !showWebAddress;
            break;

        case FieldOnCardType.ADDRESS:
            showLocation = !showLocation;
            break;

        case FieldOnCardType.EMAIL:
            showEmail = !showEmail;
            break;

        case FieldOnCardType.PHONE:
            showPhone = !showPhone;
            break;
    }

    for (const company of userCompanies) {
        if (company._id === "0" || (isEditable && company._id === companyId)) {
            company.showWebAddress = showWebAddress;
            company.showLocation = showLocation;
            company.showPhone = showPhone;
            company.showEmail = showEmail;
            break;
        }
    }

    return {
        ...state,
        companyPageState: {
            ...state.companyPageState,

            showEmail,
            showLocation,
            showPhone,
            showWebAddress,
        },
    };
};
