import * as React from "react";
import {PromoPanel} from "../components/promo/PromoPanel";
import {PromoRegistrationForm} from "../components/promo/PromoRegistrationForm";
import {PromoTable} from "../components/promo/PromoTable";
import {PromoViewForm} from "../components/promo/PromoViewForm";
import {
    ICompanyProduct,
    ICompanyPromo,
    IDropdownListValue,
    IProductPageState,
    IPromoPageState as IPromoPage,
    IState,
    IStatisticsPageState,
} from "../state";
import {reduxConnect, routerConnect} from "../../helpers/decorators";
import {
    changePriceAfterDiscountAction,
    startPromoAction,
    selectPromoAction,
    changeAboutAction,
    changeAgeAction,
    changeBudgetAmountAction,
    changeBudgetPeriodAction,
    changeCodesAction,
    changeCodeTypeAction,
    changeConditionAction,
    changeCurrentStepAction,
    changeDiscountAction,
    changeFinishDateTimeAction,
    changeGenderAction,
    changeInterestAction,
    changeIsUnlimitedPromoQuantityAction,
    changeLanguageAction,
    changeLocationAction,
    changeObjectiveAction,
    changeOfferPhraseAction,
    changePricingAction,
    changeProductIdAction,
    changeProductObjectAction,
    changePromoDataLanguageAction,
    changePromoNameAction,
    changePromoQuantityAction,
    changeRewardTypeAction,
    changeScheduleAction,
    changeSeparateProductIdAction,
    changeStartDateTimeAction,
    changeTermsAction,
    changeTime2DecideAction,
    changeTypeAction,
    changeValueAction,
    choosePromoAction,
    choosePromo2ViewAction,
    finishPromoAction,
    loadCompanyProductsAction,
    newPromoAction,
    uploadImgCodeAction,
    editPromoAction,
    registerPromoAction,
    deletePromoAction,
} from "../actions/index";
import {PROMO_OBJECTIVES} from "../constants/promoObjectives";
import {PromoRewardType} from "../../../../types/constants/PromoRewardType";
import {IPromo} from "../../../../types/entity";
import {PromoTargetInterest} from "../../../../types/constants/PromoTargetInterest";
import {PromoTargetAge} from "../../../../types/constants/PromoTargetAge";
import {PromoCodeType} from "../../../../types/constants/PromoCodeType";
import {PromoCondition} from "../../../../types/constants/PromoCondition";
import {PromoTargetGender} from "../../../../types/constants/PromoTargetGender";
import {PromoTargetLanguage} from "../../../../types/constants/PromoTargetLanguage";
import {PromoObjective} from "../../../../types/constants/PromoObjective";
import {PromoType} from "../../../../types/constants/PromoType";
import {IReduxProps} from "../../../../types/vendor";

const rewardTypes: IDropdownListValue[] = [
    {value: PromoRewardType.SPECIAL_OFFER, label: "Special Offer"},
    {value: PromoRewardType.SEPARATE_PRODUCT, label: "Separate Product/Service"},
];

export interface IPromoPageProps extends IReduxProps {
    companyId: string;
    companyProducts: ICompanyProduct[],
    logo: string;
    name: string;
    productPageState: IProductPageState;
    promoPageState: IPromoPage;
    promos: ICompanyPromo[]
    statisticsPageState: IStatisticsPageState;

    onChangePriceAfterDiscount: (priceAfterDiscount: string) => void;
    onStartPromo: (promoId: string) => void;
    onSelectPromo: (promoId: string) => void;
    onDeletePromo: (promoId: string) => void;
    onChangeAbout: (about: string) => void;
    onChangeAge: (age: PromoTargetAge[]) => void;
    onChangeBudgetAmount: (budgetAmount: string) => void;
    onChangeBudgetPeriod: (budgetPeriod: string) => void;
    onChangeCodeType: (codeType: PromoCodeType) => void;
    onChangeCodes: (codes: string) => void;
    onChangeCondition: (condition: PromoCondition) => void;
    onChangeDataLanguage: () => void;
    onChangeDiscount: (discount: string) => void;
    onChangeFinishDateTime: (finishDateTime: string) => void;
    onChangeGender: (gender: PromoTargetGender) => void;
    onChangeInterest: (interest: PromoTargetInterest[]) => void;
    onChangeLanguage: (language: PromoTargetLanguage) => void;
    onChangeLocation: (location: string, lat: number, lng: number, locationType: string) => void;
    onChangeName: (name: string) => void;
    onChangeObjective: (objective: PromoObjective) => void;
    onChangeOfferPhrase: (offerPhrase: string) => void;
    onChangePricing: (pricing: string) => void;
    onChangeProductId: (productId: string) => void;
    onChangeProductObject: (productObject: string) => void;
    onChangePromoCurrentStep: (step: number) => void;
    onChangePromoIsUnlimitedQuantity: (isUnlimited: boolean) => void;
    onChangePromoSchedule: (scheduleType: string) => void;
    onChangePromoSeparateProduct: (separateProductId: string) => void;
    onChangeQuantity: (quantity: string) => void;
    onChangeRewardType: (rewardType: PromoRewardType) => void;
    onChangeStartDateTime: (startDateTime: string) => void;
    onChangeTerms: (terms: string) => void;
    onChangeTime2Decide: (time2Decide: string) => void;
    onChangeType: (type: PromoType) => void;
    onChangeValue: (value: string) => void;
    onChoosePromo: (promoId: string) => void;
    onFinishPromo: (promoId: string) => void;
    onLoadCompanyProducts: (companyId: string) => void;
    onPromoTableCheckboxClick: (promoId: string) => void;
    onPromoUploadImgCode: (selectedFile: File, isImgExtAllowed: boolean, isImgSizeExceeded: boolean) => void;

    onRegisterPromo: (name: any) => void;
}

interface IPromoPageState {
    companyId: string;
    promoId: string;
}

@routerConnect()
@reduxConnect(state2props, dispatch2props)
export class PromoPage extends React.Component<IPromoPageProps, IPromoPageState> {
    constructor(props: IPromoPageProps) {
        super(props);

        this.state = {
            companyId: "",
            promoId: "",
        };
    }

    public componentWillReceiveProps(nextProps: IPromoPageProps): void {
        if (nextProps.companyId !== this.state.companyId) {
            if (nextProps.companyId && nextProps.companyId.length) {
                this.setState({
                    companyId: nextProps.companyId,
                });
                this.props.onLoadCompanyProducts(nextProps.companyId);
            }
        }
    }

    public render(): JSX.Element {
        const tableElem: JSX.Element = //!this.props.promoPageState.isNew ? (
                <PromoTable
                    {...this.props}
                    onSelectPromo={this.props.onSelectPromo}
                    onDeletePromoClick={this.onDeletePromo}
                    objectives={PROMO_OBJECTIVES}
                    rewardTypes={rewardTypes}
                    onStartPromo={this.props.onStartPromo}
                    onFinishPromo={this.props.onFinishPromo}
                    onNewPromo={this.onNewPromoClick}/>;

        return (
            <div className="companyPage-wrapper">
                <div className="companyPage__panel_form-wrapper">
                    <PromoPanel
                        {...this.props}
                        onChoosePromo2view={this.props.onPromoTableCheckboxClick}
                        onNewPromo={this.onNewPromoClick}/>
                </div>

                <div className="companyPage__mainContent-wrapper">
                    {this.props.promoPageState.isEditable &&
                    <PromoRegistrationForm
                        {...this.props}
                        objectives={PROMO_OBJECTIVES}
                        rewardTypes={rewardTypes}
                        onRegisterPromo={this.onRegisterPromo}/>}

                    {this.props.promoPageState.isViewable &&
                    <PromoViewForm
                        {...this.props}
                        statistics={this.props.statisticsPageState.promoStatistics}
                        rewardTypes={rewardTypes}
                        objectives={PROMO_OBJECTIVES}/>}

                    {tableElem}
                </div>
            </div>
        );
    }

    private onNewPromoClick = (): void => {
        this.props.dispatch(newPromoAction());
    };

    private onDeletePromo = (): void => {
        const promos: ICompanyPromo[] = this.props.promos;

        for (const promo of promos) {
            if (promo.checked) {
                this.props.onDeletePromo(promo._id);
                break;
            }
        }
    };

    private onRegisterPromo = (isDraft: boolean): void => {
        const pageState: IPromoPage = this.props.promoPageState;
        const age: PromoTargetAge[] = pageState.age;

        const promoToRegister: IPromo = {
            name: pageState.name,
            objective: pageState.objective,

            productObject: pageState.productObject,
            productId: pageState.productId,
            rewardType: pageState.rewardType,
            separateProductId: pageState.separateProductId,

            type: pageState.type,
            condition: pageState.condition,
            offerPhrase: pageState.offerPhrase,
            about: pageState.about,
            terms: pageState.terms,
            discount: pageState.discount,
            value: pageState.value,
            quantity: pageState.quantity,
            isUnlimited: pageState.isUnlimited,
            time2Decide: pageState.time2Decide ? +pageState.time2Decide : null,
            codeType: pageState.codeType,
            codes: pageState.codes,
            imgCode: pageState.imgCode,

            age,
            gender: pageState.gender,
            language: pageState.language,
            interests: pageState.interests,
            locationName: pageState.locationName,
            lat: pageState.lat,
            lng: pageState.lng,
            locationType: pageState.locationType,

            scheduleType: pageState.scheduleType,
            budgetAmount: pageState.budgetAmount,
            budgetPeriod: pageState.budgetPeriod,
            pricing: pageState.pricing,
            startDate: pageState.startDate,
            finishDate: pageState.finishDate,

            _id: pageState._id,
            companyId: this.props.companyId,
            dataLanguage: pageState.dataLanguage,
        };

        // if not promoId - new promo should be crated, in other case it is editing existed one
        if (pageState._id !== "0") { // ===== edit action fired======
            this.props.dispatch(editPromoAction(promoToRegister, isDraft));
        } else {
            this.props.dispatch(registerPromoAction(promoToRegister, isDraft));
        }
    };
}

function state2props(state: IState): Partial<IPromoPageProps> {
    return {
        companyId: state.navigationState.companyId,
        companyProducts: state.companyProducts,
        logo: state.navigationState.logo,
        name: state.navigationState.name,
        productPageState: state.productPageState,
        promoPageState: state.promoPageState,
        promos: state.promos,
        statisticsPageState: state.statisticsPageState,
    };
}

function dispatch2props(dispatch): Partial<IPromoPageProps> {
    return {
        dispatch,
        onChangePriceAfterDiscount: (priceAfterDiscount: string) => dispatch(changePriceAfterDiscountAction(priceAfterDiscount)),
        onStartPromo: (promoId: string) => dispatch(startPromoAction(promoId)),
        onSelectPromo: (promoId: string) => dispatch(selectPromoAction(promoId)),
        onDeletePromo: (promoId: string) => dispatch(deletePromoAction(promoId)),
        onChangeAbout: (about: string) => dispatch(changeAboutAction(about)),
        onChangeAge: (age: PromoTargetAge[]) => dispatch(changeAgeAction(age)),
        onChangeBudgetAmount: (budgetAmount: string) => dispatch(changeBudgetAmountAction(budgetAmount)),
        onChangeBudgetPeriod: (budgetPeriod: string) => dispatch(changeBudgetPeriodAction(budgetPeriod)),
        onChangeCodeType: (codeType: PromoCodeType) => dispatch(changeCodeTypeAction(codeType)),
        onChangeCodes: (codes: string) => dispatch(changeCodesAction(codes)),
        onChangeCondition: (condition: PromoCondition) => dispatch(changeConditionAction(condition)),
        onChangeDataLanguage: () => dispatch(changePromoDataLanguageAction()),
        onChangeDiscount: (discount: string) => dispatch(changeDiscountAction(discount)),
        onChangeFinishDateTime: (finishDateTime: string) => dispatch(changeFinishDateTimeAction(finishDateTime)),
        onChangeGender: (gender: PromoTargetGender) => dispatch(changeGenderAction(gender)),
        onChangeInterest: (interest: PromoTargetInterest[]) => dispatch(changeInterestAction(interest)),
        onChangeLanguage: (language: PromoTargetLanguage) => dispatch(changeLanguageAction(language)),
        onChangeLocation: (location: string, lat: number, lng: number, locationType: string) => dispatch(changeLocationAction(location, lat, lng, locationType)),
        onChangeName: (name: string) => dispatch(changePromoNameAction(name)),
        onChangeObjective: (objective: PromoObjective) => dispatch(changeObjectiveAction(objective)),
        onChangeOfferPhrase: (offerPhrase: string) => dispatch(changeOfferPhraseAction(offerPhrase)),
        onChangePricing: (pricing: string) => dispatch(changePricingAction(pricing)),
        onChangeProductId: (productId: string) => dispatch(changeProductIdAction(productId)),
        onChangeProductObject: (productObject: string) => dispatch(changeProductObjectAction(productObject)),
        onChangePromoCurrentStep: (step: number) => dispatch(changeCurrentStepAction(step)),
        onChangePromoIsUnlimitedQuantity: (isUnlimited: boolean) => dispatch(changeIsUnlimitedPromoQuantityAction(isUnlimited)),
        onChangePromoSchedule: (scheduleType: string) => dispatch(changeScheduleAction(scheduleType)),
        onChangePromoSeparateProduct: (separateProductId: string) => dispatch(changeSeparateProductIdAction(separateProductId)),
        onChangeQuantity: (quantity: string) => dispatch(changePromoQuantityAction(quantity)),
        onChangeRewardType: (rewardType: PromoRewardType) => dispatch(changeRewardTypeAction(rewardType)),
        onChangeStartDateTime: (startDateTime: string) => dispatch(changeStartDateTimeAction(startDateTime)),
        onChangeTerms: (terms: string) => dispatch(changeTermsAction(terms)),
        onChangeTime2Decide: (time2Decide: string) => dispatch(changeTime2DecideAction(time2Decide)),
        onChangeType: (type: PromoType) => dispatch(changeTypeAction(type)),
        onChangeValue: (value: string) => dispatch(changeValueAction(value)),
        onChoosePromo: (promoId: string) => dispatch(choosePromoAction(promoId)),
        onFinishPromo: (promoId: string) => dispatch(finishPromoAction(promoId)),
        onLoadCompanyProducts: (companyId: string) => dispatch(loadCompanyProductsAction(companyId)),
        onPromoTableCheckboxClick: (promoId: string) => dispatch(choosePromo2ViewAction(promoId)),
        onPromoUploadImgCode: (selectedFile: File, isImgExtAllowed: boolean, isImgSizeExceeded: boolean) =>
            dispatch(uploadImgCodeAction(selectedFile, isImgExtAllowed, isImgSizeExceeded)),
    };
}
