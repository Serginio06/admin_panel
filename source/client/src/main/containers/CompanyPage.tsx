import * as React from "react";
import {reduxConnect, routerConnect} from "../../helpers/decorators";
import {
    addSocialLinkAction,
    changeAddressAction,
    changeCompanyCategoryAction,
    changeCompanyDataLanguageAction,
    changeCompanyDescriptionAction,
    changeCompanyNameAction,
    changeEmailAction,
    changePhoneAction,
    changeShowOnCardAction,
    changeSocialLinkAction,
    changeSubcategoryAction,
    changeWebAddressAction,
    checkEmailAction,
    checkPhoneAction,
    checkWebAddressAction,
    chooseCompany2EditAction,
    chooseCompanyAction, deleteCompanyAction,
    deleteSocialLinkAction,
    editCompanyAction,
    getCompanyCategoriesAction,
    loadCompanyProductsAction,
    loadCompanyPromosAction,
    loadCompanyPromoStatisticsAction,
    newCompanyAction,
    registerCompanyAction, selectCompanyAction,
    uploadLogoAction,
} from "../actions/index";
import {CompanyPanel} from "../components/company/CompanyPanel";
import {CompanyRegistrationForm} from "../components/company/CompanyRegistrationForm";
import {CompanyTable} from "../components/company/CompanyTable";
import {ICompanyPageState, ICompanySocialLink, ICompanySubcategories, IState, IUserCompany} from "../state";
import {ICategory, ICompany} from "../../../../types/entity";
import {SubcategoryLevel} from "../constants/SubcategoryLevel";
import {FieldOnCardType} from "../constants/FiledOnCardType";
import {IReduxProps} from "../../../../types/vendor";

export interface IContainerProps extends IReduxProps {
    companyCategories: ICategory[];
    companyPageState: ICompanyPageState;
    companyId: string;
    userCompanies: IUserCompany[];

    onSelectCompany: (companyId: string) => void;
    onChooseCompany2Edit: () => void;
    onGetCompanyCategories: () => void;
    onChooseCompany: (companyId: string) => void;
    onAddSocialLink: () => void;
    onChangeSocialLink: () => void;
    onDeleteSocialLink: () => void;
    onShowOnCardChange: () => void;
    onChangeAddress: () => void;
    onChangeCategory: () => void;
    onChangeCompanySubcategory: () => void;
    onChangeDataLanguage: () => void;
    onChangeDescription: () => void;
    onChangeEmail: () => void;
    onChangeName: () => void;
    onChangeWebAddress: () => void;
    onCompanyUploadImage: () => void;
    onChangePhone: () => void;
    onDeleteCompany: (companyId: string) => void;
}

export interface IContainerState {
    continue: boolean;
}

@routerConnect()
@reduxConnect(state2props, dispatch2props)
export class CompanyPage extends React.Component<IContainerProps, IContainerState> {

    constructor(props: IContainerProps) {
        super(props);
        this.state = {
            continue: false,
        };
    }

    public componentDidMount(): void {
        this.props.onGetCompanyCategories();

        if (this.props.userCompanies && this.props.userCompanies.length) {
            for (const company of this.props.userCompanies) {
                if (company._id === "0") {
                    this.props.onChooseCompany("0");
                    break;
                }
            }
        }
    }

    public render(): JSX.Element {
        return (
            <div className="companyPage-wrapper">
                <div className="companyPage__panel_form-wrapper">
                    <CompanyPanel
                        companyId={this.props.companyId}
                        userCompanies={this.props.userCompanies}
                        onNewCompany={this.onNewCompanyClick}
                        onSelectCompany={this.props.onSelectCompany}
                        onChooseCompany={this.props.onChooseCompany}/>
                </div>

                <div className="companyPage__mainContent-wrapper">
                    {(this.props.companyPageState.isEditable)
                    && <CompanyRegistrationForm
                        companyPageState={this.props.companyPageState}
                        companyCategories={this.props.companyCategories}

                        onAddSocialLink={this.props.onAddSocialLink}
                        onChangeSocialLink={this.props.onChangeSocialLink}
                        onDeleteSocialLink={this.props.onDeleteSocialLink}

                        onChangeDataLanguage={this.props.onChangeDataLanguage}
                        onShowOnCardChange={this.props.onShowOnCardChange}
                        onChangeAddress={this.props.onChangeAddress}
                        onChangeName={this.props.onChangeName}
                        onChangeDescription={this.props.onChangeDescription}
                        onChangeEmail={this.props.onChangeEmail}
                        onChangePhone={this.props.onChangePhone}
                        onChangeWebAddress={this.props.onChangeWebAddress}
                        onChangeCategory={this.props.onChangeCategory}
                        onChangeCompanySubcategory={this.props.onChangeCompanySubcategory}
                        onCompanyUploadImage={this.props.onCompanyUploadImage}

                        onCheckEmail={this.onCheckEmail}
                        onCheckPhone={this.onCheckPhone}
                        onCheckWebAddress={this.onCheckWebAddress}
                        onSaveContinueClick={this.onSaveContinueClick}
                        onSaveCloseClick={this.onSaveCloseClick}/>
                    }

                    <CompanyTable
                        userCompanies={this.props.userCompanies}
                        onNewCompany={this.onNewCompanyClick}
                        onDeleteCompany={this.onDeleteCompany}
                        onSelectCompany={this.props.onSelectCompany}
                        onChooseCompany2Edit={this.props.onChooseCompany2Edit}/>
                </div>
            </div>
        );
    }

    private onDeleteCompany = (): void => {
        const userCompanies: IUserCompany[] = this.props.userCompanies;

        for (const company of userCompanies) {
            if (company.checked) {
                this.props.onDeleteCompany(company._id);
                break;
            }
        }
    };

    private onCheckEmail = (): void => {
        const email: string = this.props.companyPageState.email;

        if (email) {
            this.props.dispatch(checkEmailAction(email));
        }
    };

    private onCheckPhone = (): void => {
        const phone: string = this.props.companyPageState.phone;

        if (phone) {
            this.props.dispatch(checkPhoneAction(phone));
        }
    };

    private onCheckWebAddress = (): void => {
        const webAddress: string = this.props.companyPageState.webAddress;

        if (webAddress) {
            this.props.dispatch(checkWebAddressAction(webAddress));
        }
    };

    private onNewCompanyClick = (): void => {
        this.props.dispatch(newCompanyAction());
    };

    private onSaveContinueClick = (): void => {
        this.onRegisterCompany(true);
    };

    private onSaveCloseClick = (): void => {
        this.onRegisterCompany(false);
    };

    private onRegisterCompany = (isContinue: boolean): void => {
        const pageState: ICompanyPageState = this.props.companyPageState;
        const subcategories: ICompanySubcategories = pageState.subcategories;
        const links: string[] = pageState.links.map((item: ICompanySocialLink) => item.link);
        const userCompanies: IUserCompany[] = this.props.userCompanies;
        let _id: string;
        for (const company of userCompanies) {
            if (company.checked) {
                _id = company._id;
                break;
            }
        }

        const company: ICompany = {
                category: pageState.category ? {
                    id: pageState.category.id,
                    name: pageState.category.name,
                    subcategories: [],
                } : null,
                _id,
                dataLanguage: pageState.dataLanguage,
                description: pageState.description,
                email: pageState.email,
                lat: pageState.lat,
                links,
                lng: pageState.lng,
                locationName: pageState.locationName,
                logo: pageState.logo,
                name: pageState.name,
                phone: pageState.phone,
                showEmail: pageState.showEmail,
                showLocation: pageState.showLocation,
                showPhone: pageState.showPhone,
                showWebAddress: pageState.showWebAddress,
                webAddress: pageState.webAddress,
            };

        if (subcategories.first.subcategory) {
            if (company.category) {
                company.category.subcategories.push({
                    id: subcategories.first.subcategory.id,
                    name: subcategories.first.subcategory.name,
                });

                if (subcategories.second.subcategory) {
                    company.category.subcategories.push({
                        id: subcategories.second.subcategory.id,
                        name: subcategories.second.subcategory.name,
                    });

                    if (subcategories.third.subcategory) {
                        company.category.subcategories.push({
                            id: subcategories.third.subcategory.id,
                            name: subcategories.third.subcategory.name,
                        });
                    }
                }
            }
        }

        if (_id !== "0") {
            this.props.dispatch(editCompanyAction(company, isContinue));
        } else {
            this.props.dispatch(registerCompanyAction(company, isContinue));
        }

        this.setState({
            ...this.state,
            continue: isContinue,
        });
    };
}

function state2props(state: IState) {
    return {
        companyCategories: state.companyCategories,
        companyId: state.navigationState.companyId,
        companyPageState: state.companyPageState,
        userCompanies: state.userCompanies,
    };
}

function dispatch2props(dispatch: any) {
    return {
        onSelectCompany: (companyId: string): void => dispatch(selectCompanyAction(companyId)),
        onChooseCompany2Edit: (): void => dispatch(chooseCompany2EditAction()),
        onGetCompanyCategories: () => dispatch(getCompanyCategoriesAction()),

        onChooseCompany: (companyId: string, forEdit: boolean) => {
            dispatch(chooseCompanyAction(companyId, forEdit));
            if (companyId !== "0") {
                dispatch(loadCompanyProductsAction(companyId));
                dispatch(loadCompanyPromosAction(companyId));
                dispatch(loadCompanyPromoStatisticsAction(companyId));
            }
        },

        onDeleteCompany: (companyId: string) => dispatch(deleteCompanyAction(companyId)),
        onAddSocialLink: () => dispatch(addSocialLinkAction()),
        onChangeSocialLink: (link: string, index: number) => dispatch(changeSocialLinkAction(index, link)),
        onDeleteSocialLink: (index: number) => dispatch(deleteSocialLinkAction(index)),

        onShowOnCardChange: (fieldType: FieldOnCardType) => dispatch(changeShowOnCardAction(fieldType)),

        onChangeAddress: (address: string, lat: number, lng: number) =>
            dispatch(changeAddressAction(address, lat, lng)),
        onChangeCategory: (categoryId: string) => dispatch(changeCompanyCategoryAction(categoryId)),
        onChangeCompanySubcategory: (companySubcategoryId: string, subcategoryLevel: SubcategoryLevel) =>
            dispatch(changeSubcategoryAction(companySubcategoryId, subcategoryLevel)),
        onChangeDataLanguage: () => dispatch(changeCompanyDataLanguageAction()),
        onChangeDescription: (description: string) =>
            dispatch(changeCompanyDescriptionAction(description)),
        onChangeEmail: (email: string) => dispatch(changeEmailAction(email)),
        onChangeName: (name: string) => dispatch(changeCompanyNameAction(name)),
        onChangePhone: (phone: string) => dispatch(changePhoneAction(phone)),
        onChangeWebAddress: (webAddress: string) => dispatch(changeWebAddressAction(webAddress)),

        onCompanyUploadImage: (selectedFile: File, isImgExtAllowed: boolean, isImgSizeExceeded: boolean) =>
            dispatch(uploadLogoAction(selectedFile, isImgExtAllowed, isImgSizeExceeded)),

        dispatch,
    };
}
