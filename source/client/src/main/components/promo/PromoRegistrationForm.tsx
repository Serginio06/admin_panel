/// <reference path="../../util/google.maps.d.ts"/>
import * as React from "react";
import {Button} from "react-bootstrap";
import {Alert} from "../../../common/components/Alert/Alert";
import {Checkbox} from "../../../common/components/Checkbox/Checkbox";
import {DatePickerInput} from "../../../common/components/DatepickerInput";
import {Dropdown} from "../../../common/components/Dropdown";
import {DropdownMenu} from "../../../common/components/DropdownMenu";
import {Input} from "../../../common/components/Input";
import {LanguageSwitcher} from "../../../common/components/LanguageSwitcher";
import {LogoUploader} from "../../../common/components/LogoUploader";
import {Textarea} from "../../../common/components/Textarea";
import {TextareaAutocomplete} from "../../../common/components/TextareaAutocomplete";
import {getErrorText} from "../../../common/util/errorUtil";
import {AgesOptions} from "../../constants/PromoAges";
import {InterestsOptions} from "../../constants/PromoInterests";
import {PromoCard} from "./PromoCard";
import {PromoConfirmationPopup} from "./PromoConfirmationPopup";
import SVGInline from "react-svg-inline";
import {Color} from "../../../common/constants/Color";
import {ICompanyProduct, IDropdownListValue, IPromoPageState} from "../../state";
import {PromoCodeType} from "../../../../../types/constants/PromoCodeType";
import {PromoCondition} from "../../../../../types/constants/PromoCondition";
import {PromoType} from "../../../../../types/constants/PromoType";
import {PromoTargetGender} from "../../../../../types/constants/PromoTargetGender";
import {PromoTargetLanguage} from "../../../../../types/constants/PromoTargetLanguage";
import {PromoRewardType} from "../../../../../types/constants/PromoRewardType";
import {ProductObject} from "../../constants/ProductObject";
import {PromoTargetAge} from "../../../../../types/constants/PromoTargetAge";
import {PromoTargetInterest} from "../../../../../types/constants/PromoTargetInterest";
import {PromoObjective} from "../../../../../types/constants/PromoObjective";
import PlaceResult = google.maps.places.PlaceResult;
import {Alignment} from "../../../common/constants/alignment";
import {isNotReadyForApproval} from "../../util/promoValidationUtil";

const types: IDropdownListValue[] = [
        {value: PromoType.FREE, label: "Free"},
        {value: PromoType.SALE, label: "Sale"},
        {value: PromoType.DEAL, label: "Deal"},
    ],

    conditions: IDropdownListValue[] = [
        {value: PromoCondition.VIEW, label: "View"},
        {value: PromoCondition.CLICK, label: "Click"},
        {value: PromoCondition.ACTION, label: "Action"},
        {value: PromoCondition.VISIT, label: "Visit"},
    ],

    genders: IDropdownListValue[] = [
        {value: PromoTargetGender.NO_MATTER, label: "No matter"},
        {value: PromoTargetGender.MALE, label: "Men"},
        {value: PromoTargetGender.FEMALE, label: "Women"},
    ],

    promoCodeTypes: IDropdownListValue[] = [
        {value: PromoCodeType.NO_CODE, label: "No Code Required"},
        {value: PromoCodeType.CODE, label: "Promo Code"},
        {value: PromoCodeType.BAR_QR, label: "Bar & QR Code"},
    ],

    languages: IDropdownListValue[] = [
        {value: PromoTargetLanguage.RU, label: "Russian"},
        {value: PromoTargetLanguage.EN, label: "English"},
    ],

    scheduleTypes: IDropdownListValue[] = [
        {value: "By Budget", label: "By Budget"},
        {value: "By Time Period", label: "By Time Period"},
    ],

    pricings: IDropdownListValue[] = [
        {value: "By action", label: "By action"},
        {value: "By click", label: "By click"},
        {value: "By View", label: "By View"},
    ],

    budgetPeriods: IDropdownListValue[] = [
        {value: "Daily", label: "Daily"},
        {value: "Weekly", label: "Weekly"},
        {value: "Monthly", label: "Monthly"},
    ];

let autocomplete;

interface IPromoRegistrationFormProps {
    promoPageState: IPromoPageState;

    logo: string;
    name: string;

    objectives: any[]; //@todo fix me with type
    rewardTypes: any[];
    companyProducts: ICompanyProduct[];

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
    onChangePromoIsUnlimitedQuantity: (quantityIsUnlimitedChecked: boolean) => void;
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
    onRegisterPromo: (_continue: boolean) => void;
    onChangePriceAfterDiscount: (priceAfterDiscount: string) => void;
}

interface IPromoRegistrationFormState {
    isPopup: boolean;
}

export class PromoRegistrationForm extends React.Component<IPromoRegistrationFormProps, IPromoRegistrationFormState> {
    constructor(props: IPromoRegistrationFormProps) {
        super(props);
        this.state = {
            isPopup: false,
        };
    }

    public componentDidMount(): void {
        document.getElementById("firstFocusTarget").focus();

        autocomplete = new google.maps.places.Autocomplete((document.getElementById("autocomplete")) as HTMLInputElement, {types: ["geocode"]} as any);

        autocomplete.addListener("place_changed", this.onPlaceChange);
    }

    public render(): JSX.Element {
        const objectives: any = this.props.objectives;
        const rewardTypes: any = this.props.rewardTypes;
        const loudspeaker: string = require("../../../../resources/icons/svg/loudspeaker.svg");
        const pageState: IPromoPageState = this.props.promoPageState;
        const companyProducts: ICompanyProduct[] = this.props.companyProducts.filter((item: ICompanyProduct) => {
            if (pageState.productObject) {
                return item.object === pageState.productObject;
            } else {
                return true;
            }
        });
        const products: IDropdownListValue[] = companyProducts.map((item: ICompanyProduct) => ({
            value: item._id,
            label: item.name,
        }));
        const separateProducts: IDropdownListValue[] = this.props.companyProducts.map((item: ICompanyProduct) => ({
            value: item._id,
            label: item.name,
        }));
        const productObjects: IDropdownListValue[] = [
            {
                label: ProductObject.SINGLE_PRODUCT_SERVICE,
                value: ProductObject.SINGLE_PRODUCT_SERVICE,
            },
            {
                label: ProductObject.ENTIRE_ASSORTMENT,
                value: ProductObject.ENTIRE_ASSORTMENT,
            },
            {
                label: ProductObject.SINGLE_PRODUCT_SERVICE_CATEGORY,
                value: ProductObject.SINGLE_PRODUCT_SERVICE_CATEGORY,
            }];
        const step0: string = pageState.currentStep === 0 ? "active" : "";
        const step1: string = pageState.currentStep === 1 ? "active" : "";
        const step2: string = pageState.currentStep === 2 ? "active" : "";
        const step3: string = pageState.currentStep === 3 ? "active" : "";
        const step4: string = pageState.currentStep === 4 ? "active" : "";
        let targetProduct: ICompanyProduct = null;
        if (pageState.productId) {
            for (const product of companyProducts) {
                if (product._id === pageState.productId) {
                    targetProduct = product;
                    break;
                }
            }
        }
        if (pageState.rewardType === PromoRewardType.SEPARATE_PRODUCT && pageState.separateProductId) {
            for (const product of companyProducts) {
                if (product._id === pageState.separateProductId) {
                    targetProduct = product;
                    break;
                }
            }
        }

        // check if all fields are filled in and valid
        let isFinishDisabled: boolean = isNotReadyForApproval(pageState);

        if (pageState.codeType === "PROMO_CODE_TYPE_CODE") {
            isFinishDisabled = isFinishDisabled || !pageState.isUnlimited
                && (!pageState.quantity || pageState.quantity === "" || pageState.codesValidationLevel !== "")
        }

        const isSaveCloseDisabled: boolean = !pageState.name || pageState.name === "";

        const valueSign: string = pageState.rewardType === PromoRewardType.SEPARATE_PRODUCT ? "$" : "%";
        const cardValue: string = pageState.rewardType === PromoRewardType.SEPARATE_PRODUCT ? pageState.value : pageState.discount;
        const confirmationPopup: JSX.Element = (
            <PromoConfirmationPopup
                onCancelButtonClick={this.onCancelButtonClick}
                onRegisterPromo={this.onFinishClick}
                show={this.state.isPopup}
                name={pageState.name}
            />
        );
        let codeElement: JSX.Element = null;
        if (pageState.codeType === "PROMO_CODE_TYPE_CODE") {
            codeElement = (
                <Textarea
                    isStar
                    label={"PROMO CODES"}
                    textAreaHeight={"123px"}
                    placeholder={"Add Promo Codes"}
                    tooltipText={"Enter promo codes"}
                    textAreaClass={"input__wrapper-w100 textArea__workingHours"}
                    value={pageState.codes}
                    validationLevel={pageState.codesValidationLevel}
                    validationMessage={pageState.codesValidationMessage}
                    onFocus={this.onFocusThirdStep}
                    onChange={this.props.onChangeCodes}
                />
            );
        } else if (pageState.codeType === "PROMO_CODE_TYPE_BAR_QR") {
            codeElement = (
                <LogoUploader
                    isStar
                    tooltipPresent
                    label={"PROMO CODES"}
                    pictureSrc={pageState.imgCode}
                    validationLevel={pageState.imgCodeValidationLevel}
                    validationMessage={"Picture Size Max 100KB"}
                    buttonLabel={"Upload Code"}
                    tooltipText={"Upload promo BAR/QR code"}
                    buttonInfo={"Picture Size Max 100KB"}
                    onUploadImage={this.onPromoUploadImgCode}
                />
            );
        }

        const _interests: IDropdownListValue[] = pageState.interests && pageState.interests.length ?
            pageState.interests.map((item: PromoTargetInterest) => {
                return {value: item, label: item.toString()}
            }) : [];

        return (
            <div className="block__full-width">
                <div className="popup">{confirmationPopup}</div>
                <div className="mainBlock__header">
                    <div className="mainBlock__header__text-wrapper">
                        <SVGInline
                            svg={loudspeaker} fill={Color.GREY_DARK}
                            width="16px"
                            className="img__midIcon"
                            style={{height: 16}}
                        />
                        <span className="mainBlock__header__text">
                            {"Promo Campaign creation"}
                        </span>
                    </div>

                    <div className="mainBlock__header__inputBtn-wrapper">
                        <LanguageSwitcher
                            value={pageState.dataLanguage}
                            onChange={this.props.onChangeDataLanguage}
                        />

                        <Button
                            className="grey__wide__btn btn-w30"
                            disabled={isSaveCloseDisabled}
                            onClick={this.onSaveCloseClick}>
                            {"Save & Close"}
                        </Button>

                        <Button
                            className="btn-w30"
                            disabled={isFinishDisabled}
                            onClick={this.onConfirmationPromoPopup}>
                            {"Finish"}
                        </Button>
                    </div>
                </div>

                <div className="promoRegForm__form-wrapper">
                    <div className="productRegForm__formInputs-wrapper">

                        {pageState.failed && <Alert type={"error"} text={getErrorText(pageState.errorCode)}/>}

                        <div className="promoRegForm__row1">
                            <div className="promoCol_20percent">
                                <div className={"promo__currentStep left_shift " + step0}>
                                    <Input
                                        isStar
                                        tooltipPresent
                                        maxLength={"30"}
                                        placeholder={"Add Campaign Name"}
                                        id={"firstFocusTarget"}
                                        label={"PROMO CAMPAIGN  NAME"}
                                        tooltipText={"Add Campaign Name"}
                                        inputClass={"promoRegForm__input"}
                                        value={pageState.name}
                                        validationLevel={pageState.nameValidationLevel}
                                        validationMessage={pageState.nameValidationMessage}
                                        onFocus={this.onFocusFirstStep}
                                        onChange={this.props.onChangeName}
                                    />

                                    <DropdownMenu
                                        isStar
                                        tooltipPresent
                                        items={objectives}
                                        label={"MAIN OBJECTIVE"}
                                        placeholder={"Choose"}
                                        title={"Choose"}
                                        tooltipText={"Choose promo campaign main objective"}
                                        className={"dropdownMenu-wrapper"}
                                        value={pageState.objective}
                                        validationLevel={pageState.objectiveValidationLevel}
                                        validationMessage={pageState.objectiveValidationMessage}
                                        onFocus={this.onFocusFirstStep}
                                        onChange={this.props.onChangeObjective}
                                    />
                                </div>
                            </div>

                            <div className={"promo-step2 " + step1}>
                                <div className="promoCol_20percent">
                                    <div className={"promo__currentStep "}>
                                        <Dropdown
                                            isStar
                                            isEnabled
                                            tooltipPresent
                                            placeholder={"Choose"}
                                            label={"ADVERTISED OBJECT"}
                                            dropdownClass={"input__wrapper-w100"}
                                            tooltipText={"Choose Advertised object"}
                                            value={pageState.productObject}
                                            valuesArray={productObjects}
                                            validationLevel={pageState.productObjectValidationLevel}
                                            validationMessage={pageState.productObjectValidationMessage}
                                            onFocus={this.onFocusSecondStep}
                                            onChange={this.props.onChangeProductObject}
                                        />

                                        <Dropdown
                                            isStar
                                            isEnabled
                                            tooltipPresent
                                            placeholder={"Choose"}
                                            label={"PRODUCT/SERVICE NAME"}
                                            dropdownClass={"input__wrapper-w100"}
                                            tooltipText={"Choose product/service name"}
                                            valuesArray={products}
                                            value={pageState.productId}
                                            validationLevel={pageState.productIdValidationLevel}
                                            validationMessage={pageState.productIdValidationMessage}
                                            onFocus={this.onFocusSecondStep}
                                            onChange={this.props.onChangeProductId}
                                        />
                                    </div>
                                </div>

                                <div className="promoCol_20percent">
                                    <div className={"promo__currentStep"}>
                                        <Dropdown
                                            isStar
                                            isEnabled
                                            tooltipPresent
                                            label={"REWARD TYPE"}
                                            placeholder={"Choose"}
                                            tooltipText={"Choose reward type"}
                                            dropdownClass={"input__wrapper-w100"}
                                            valuesArray={rewardTypes}
                                            value={pageState.rewardType}
                                            validationLevel={pageState.rewardTypeValidationLevel}
                                            validationMessage={pageState.rewardTypeValidationMessage}
                                            onFocus={this.onFocusSecondStep}
                                            onChange={this.props.onChangeRewardType}
                                        />

                                        <Dropdown
                                            isStar
                                            tooltipPresent
                                            placeholder={"Choose"}
                                            label={"PRODUCT/SERVICE NAME"}
                                            dropdownClass={"input__wrapper-w100"}
                                            tooltipText={"Choose product/service object"}
                                            isEnabled={pageState.rewardType === "SEPARATE_PRODUCT"}
                                            value={pageState.rewardType === "SEPARATE_PRODUCT" ? pageState.separateProductId : ""}
                                            valuesArray={separateProducts}
                                            validationLevel={pageState.separateProductIdValidationLevel}
                                            validationMessage={pageState.separateProductIdValidationMessage}
                                            onFocus={this.onFocusSecondStep}
                                            onChange={this.props.onChangePromoSeparateProduct}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="promoCol_33percent">
                                <div className={`promo__currentStep ${step2} promo-top-step`}>
                                    <div className="promoCol_100percent">
                                        <div className="promoCol_50percent">
                                            <Dropdown
                                                isStar
                                                isEnabled
                                                tooltipPresent
                                                label={"PROMO TYPE"}
                                                placeholder={"Choose"}
                                                tooltipText={"Choose Promo type"}
                                                dropdownClass={"input__wrapper-w100"}
                                                valuesArray={types}
                                                value={pageState.type}
                                                validationLevel={pageState.typeValidationLevel}
                                                validationMessage={pageState.typeValidationMessage}
                                                onFocus={this.onFocusThirdStep}
                                                onChange={this.props.onChangeType}
                                            />
                                        </div>
                                        <div className="promoCol_50percent">
                                            <Dropdown
                                                isStar
                                                isEnabled
                                                tooltipPresent
                                                placeholder={"Choose"}
                                                label={"PROMO CONDITION"}
                                                dropdownClass={"input__wrapper-w100"}
                                                tooltipText={"Choose Product/Service object"}
                                                valuesArray={conditions}
                                                value={pageState.condition}
                                                validationLevel={pageState.conditionValidationLevel}
                                                validationMessage={pageState.conditionValidationMessage}
                                                onFocus={this.onFocusThirdStep}
                                                onChange={this.props.onChangeCondition}
                                            />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="promoRegForm__row2">
                            <div className="promoCol_33percent flex-item">
                                <div className={"promo__currentStep left_shift " + step2}>
                                    <Input
                                        isStar
                                        maxLength={"30"}
                                        label={"MAIN OFFER PHRASE"}
                                        placeholder={"Add Main Offer Phrase"}
                                        tooltipText={"Add main offer phrase"}
                                        inputClass={"promoRegForm__input"}
                                        value={pageState.offerPhrase}
                                        validationLevel={pageState.offerPhraseValidationLevel}
                                        validationMessage={pageState.offerPhraseValidationMessage}
                                        onFocus={this.onFocusThirdStep}
                                        onChange={this.props.onChangeOfferPhrase}
                                    />

                                    <Textarea
                                        isStar
                                        maxLength={200}
                                        textAreaHeight={"100px"}
                                        label={"ABOUT PROMOTION"}
                                        placeholder={"Add About Promotion"}
                                        tooltipText={"Enter product description"}
                                        textAreaClass={"input__wrapper-w100 textArea__workingHours"}
                                        value={pageState.about}
                                        validationLevel={pageState.aboutValidationLevel}
                                        validationMessage={pageState.aboutValidationMessage}
                                        onFocus={this.onFocusThirdStep}
                                        onChange={this.props.onChangeAbout}
                                    />

                                    <Textarea
                                        isStar
                                        maxLength={200}
                                        textAreaHeight={"180px"}
                                        label={"TERMS & CONDITIONS"}
                                        tooltipText={"Enter product description"}
                                        placeholder={"Add Terms & Conditions"}
                                        textAreaClass={"input__wrapper-w100 textArea__workingHours"}
                                        value={pageState.terms}
                                        validationLevel={pageState.termsValidationLevel}
                                        validationMessage={pageState.termsValidationMessage}
                                        onFocus={this.onFocusThirdStep}
                                        onChange={this.props.onChangeTerms}
                                    />
                                </div>
                                <div className="promoCol_100percent">
                                    <div className="promoCol_50percent__fix">
                                        <div className={"promo__currentStep left_shift " + step3}>
                                            <Dropdown
                                                isStar
                                                isEnabled
                                                tooltipPresent
                                                label={"GENDER"}
                                                placeholder={"Choose"}
                                                tooltipText={"Choose target gender"}
                                                dropdownClass={"input__wrapper-w100"}
                                                valuesArray={genders}
                                                value={pageState.gender}
                                                validationLevel={pageState.genderValidationLevel}
                                                validationMessage={pageState.genderValidationMessage}
                                                onFocus={this.onFocusForthStep}
                                                onChange={this.props.onChangeGender}
                                            />

                                            <TextareaAutocomplete
                                                isStar
                                                tooltipPresent
                                                label={"AGE"}
                                                options={AgesOptions}
                                                placeholder={"Choose"}
                                                tooltipText={"Choose ages groups"}
                                                textAreaClass={"input__wrapper-w100 textArea__ages"}
                                                value={pageState.age}
                                                validationLevel={pageState.ageValidationLevel}
                                                validationMessage={pageState.ageValidationMessage}
                                                onFocus={this.onFocusForthStep}
                                                onChange={this.props.onChangeAge}
                                            />

                                            <Dropdown
                                                isStar
                                                isEnabled
                                                tooltipPresent
                                                label={"LANGUAGE"}
                                                placeholder={"Choose"}
                                                dropdownClass={"input__wrapper-w100"}
                                                tooltipText={"Choose target language"}
                                                valuesArray={languages}
                                                value={pageState.language}
                                                validationLevel={pageState.languageValidationLevel}
                                                validationMessage={pageState.languageValidationMessage}
                                                onFocus={this.onFocusForthStep}
                                                onChange={this.props.onChangeLanguage}
                                            />
                                        </div>
                                    </div>

                                    <div className="promoCol_50percent__fix">
                                        <div className={"promo__currentStep " + step3}>
                                            <TextareaAutocomplete
                                                isStar
                                                tooltipPresent
                                                label={"INTERESTS"}
                                                options={InterestsOptions}
                                                placeholder={"Add interests"}
                                                textAreaHeight={"116px"}
                                                tooltipText={"Choose interests"}
                                                textAreaClass={"input__wrapper-w100 textArea__workingHours promoRegForm__input-interests"}
                                                value={_interests}
                                                validationLevel={pageState.interestValidationLevel}
                                                validationMessage={pageState.interestValidationMessage}
                                                onFocus={this.onFocusForthStep}
                                                onChange={this.props.onChangeInterest}
                                            />

                                            <Input
                                                isStar
                                                id={"autocomplete"}
                                                label={"LOCATION"}
                                                placeholder={"Choose"}
                                                tooltipText={"Choose target location"}
                                                value={pageState.locationName}
                                                validationLevel={pageState.locationValidationLevel}
                                                validationMessage={pageState.locationValidationMessage}
                                                onChange={this.onLocationChange}
                                                inputClass={"input__wrapper-w100"}
                                                onFocus={this.onFocusForthStep}
                                                isEnabled
                                                tooltipPresent
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="promo-card-wrapper flex-item">
                                <PromoCard
                                    product={targetProduct}
                                    logo={this.props.logo}
                                    name={this.props.name}
                                    condition={pageState.condition}
                                    offerPhrase={pageState.offerPhrase}
                                    about={pageState.about}
                                    type={pageState.type}
                                    value={cardValue}
                                    discount={pageState.discount}
                                    newPrice={pageState.priceAfterDiscount}
                                    valueSign={valueSign}
                                    time={pageState.time2Decide}
                                />
                            </div>

                            <div className="promoCol_33percent flex-item">
                                <div className={"promo__currentStep " + step2}>
                                    <div className="promoCol_100percent">
                                        <div className="promoCol_50percent">
                                            <Input
                                                tooltipPresent
                                                isDisabled
                                                label={"PRODUCT PRICE, $"}
                                                tooltipText={"Product Price Value"}
                                                inputClass={"promoRegForm__input"}
                                                caret="$"
                                                caretAlignment={Alignment.LEFT}
                                                value={pageState.price ? pageState.price : "0.00"}
                                            />

                                            <Input
                                                isStar
                                                isDisabled={false}
                                                tooltipPresent
                                                label={"PRICE AFTER DISCOUNT, $"}
                                                placeholder={valueSign === "$" ? valueSign + "$0.00" : "0 " + valueSign}
                                                tooltipText={"Enter promo value"}
                                                inputClass={"input__wrapper-w100"}
                                                value={pageState.priceAfterDiscount}
                                                caret="$"
                                                caretAlignment={Alignment.LEFT}
                                                onFocus={this.onFocusThirdStep}
                                                onChange={this.props.onChangePriceAfterDiscount}
                                            />
                                        </div>

                                        <div className="promoCol_50percent">
                                            <Input
                                                tooltipPresent
                                                isDisabled={pageState.rewardType !== "SPECIAL_OFFER"}
                                                placeholder={valueSign === "%" ? "0%" : "$0"}
                                                label={"DISCOUNT, " + valueSign}
                                                tooltipText={"Add Discount"}
                                                inputClass={"promoRegForm__input"}
                                                value={pageState.discount}
                                                caret="%"
                                                validationLevel={pageState.discountValidationLevel}
                                                validationMessage={pageState.discountValidationMessage}
                                                onFocus={this.onFocusThirdStep}
                                                onChange={this.props.onChangeDiscount}
                                            />

                                            <Input
                                                isStar
                                                tooltipPresent
                                                label={"PROMO VALUE, $"}
                                                placeholder={"$0.00"}
                                                tooltipText={"Enter promo value"}
                                                inputClass={"input__wrapper-w100"}
                                                value={pageState.value}
                                                caret="$"
                                                caretAlignment={Alignment.LEFT}
                                                validationLevel={pageState.valueValidationLevel}
                                                validationMessage={pageState.valueValidationMessage}
                                                onFocus={this.onFocusThirdStep}
                                                onChange={this.props.onChangeValue}
                                            />
                                        </div>
                                    </div>

                                    <div className="promoCol_100percent mt20">
                                        <div className="input__checkbox-wrapper">
                                            <div className="promoCol_50percent flex-baseline">
                                                <Input
                                                    isStar
                                                    tooltipPresent
                                                    placeholder={"0"}
                                                    label={"CARD QUANTITY"}
                                                    tooltipText={"Enter promo card quantity"}
                                                    inputClass={"input__checkbox card_quanity"}
                                                    value={pageState.quantity.toString()}
                                                    isDisabled={pageState.isUnlimited}
                                                    validationLevel={pageState.quantityValidationLevel}
                                                    validationMessage={pageState.quantityValidationMessage}
                                                    onFocus={this.onFocusThirdStep}
                                                    onChange={this.props.onChangeQuantity}
                                                />

                                                <Checkbox
                                                    tooltipText={"Check for unlimited quantity"}
                                                    checkboxClass={"input__wrapper-w40-noMinWidth "}
                                                    isChecked={pageState.isUnlimited}
                                                    onFocus={this.onFocusThirdStep}
                                                    onChange={this.props.onChangePromoIsUnlimitedQuantity}>
                                                    {"UNLIMITED"}
                                                </Checkbox>
                                            </div>
                                            <div className="promoCol_50percent">
                                                <Input
                                                    isStar
                                                    tooltipPresent
                                                    placeholder={"00h"}
                                                    label={"TIME TO DECIDE, HOURS"}
                                                    tooltipText={"Enter time to decide"}
                                                    inputClass={"input__wrapper-w100"}
                                                    value={pageState.time2Decide}
                                                    caret="h"
                                                    validationLevel={pageState.time2DecideValidationLevel}
                                                    validationMessage={pageState.time2DecideValidationMessage}
                                                    onFocus={this.onFocusThirdStep}
                                                    onChange={this.props.onChangeTime2Decide}
                                                />
                                            </div>
                                        </div>

                                        <Dropdown
                                            isStar
                                            isEnabled
                                            tooltipPresent
                                            label={"PROMO CODE TYPE"}
                                            dropdownClass={"input__wrapper-w100"}
                                            placeholder={"Choose promo code type"}
                                            tooltipText={"Choose promo code type"}
                                            value={pageState.codeType}
                                            valuesArray={promoCodeTypes}
                                            onFocus={this.onFocusThirdStep}
                                            onChange={this.props.onChangeCodeType}
                                        />

                                        <div className="codeElement">
                                            {codeElement}
                                        </div>
                                    </div>
                                </div>
                                <div className="promoCol_100percent">
                                    <div className="promoCol_50percent__fix">
                                        <div className={"promo__currentStep " + step4}>
                                            <Dropdown
                                                isStar
                                                isEnabled
                                                tooltipPresent
                                                label={"SCHEDULE TYPE"}
                                                placeholder={"Choose"}
                                                dropdownClass={"input__wrapper-w100"}
                                                tooltipText={"Choose schedule type"}
                                                valuesArray={scheduleTypes}
                                                value={pageState.scheduleType}
                                                validationLevel={pageState.scheduleTypeValidationLevel}
                                                validationMessage={pageState.scheduleTypeValidationMessage}
                                                onFocus={this.onFocusFifthStep}
                                                onChange={this.props.onChangePromoSchedule}
                                            />

                                            <Dropdown
                                                isStar
                                                isEnabled
                                                tooltipPresent
                                                label={"PRICING"}
                                                placeholder={"Choose"}
                                                dropdownClass={"input__wrapper-w100"}
                                                tooltipText={"Choose pricing type"}
                                                valuesArray={pricings}
                                                value={pageState.pricing}
                                                validationLevel={pageState.pricingValidationLevel}
                                                validationMessage={pageState.pricingValidationMessage}
                                                onFocus={this.onFocusFifthStep}
                                                onChange={this.props.onChangePricing}
                                            />

                                            <DatePickerInput
                                                isStar
                                                showTimeSelect
                                                timeIntervals={60}
                                                label={"Start date/time"}
                                                dateFormat={"MMM DD, YYYY"}
                                                timeFormat={"hh a"}
                                                tooltipText={"Enter start date"}
                                                inputClass={"input__wrapper-w100"}
                                                value={pageState.startDate}
                                                isDisabled={pageState.scheduleType !== "By Time Period"}
                                                onFocus={this.onFocusFifthStep}
                                                onChange={this.props.onChangeStartDateTime}
                                            />
                                        </div>
                                    </div>

                                    <div className="promoCol_50percent__fix">
                                        <div className={"promo__currentStep " + step4}>
                                            <Dropdown
                                                isStar
                                                isEnabled
                                                tooltipPresent
                                                label={"BUDGET PERIOD"}
                                                placeholder={"Choose"}
                                                dropdownClass={"input__wrapper-w100"}
                                                tooltipText={"Choose Budget period"}
                                                valuesArray={budgetPeriods}
                                                value={pageState.budgetPeriod}
                                                validationLevel={pageState.budgetPeriodValidationLevel}
                                                validationMessage={pageState.budgetPeriodValidationMessage}
                                                onFocus={this.onFocusFifthStep}
                                                onChange={this.props.onChangeBudgetPeriod}
                                            />

                                            <Input
                                                isStar
                                                tooltipPresent
                                                placeholder={"$0.00"}
                                                label={"BUDGET AMOUNT, $"}
                                                tooltipText={"Enter price"}
                                                inputClass={"promoRegForm__input"}
                                                value={pageState.budgetAmount}
                                                validationLevel={pageState.budgetAmountValidationLevel}
                                                validationMessage={pageState.budgetAmountValidationMessage}
                                                onFocus={this.onFocusFifthStep}
                                                onChange={this.props.onChangeBudgetAmount}
                                            />

                                            <div style={{marginTop: 11, width: "100%"}}>
                                                <DatePickerInput
                                                    isStar
                                                    showTimeSelect
                                                    timeIntervals={60}
                                                    className={"last"}
                                                    label={"Finish date/time"}
                                                    dateFormat={"MMM DD, YYYY"}
                                                    timeFormat={"hh a"}
                                                    tooltipText={"Enter finish date"}
                                                    inputClass={"input__wrapper-w100"}
                                                    value={pageState.finishDate}
                                                    valueStartDateTime={pageState.startDate || null}
                                                    isDisabled={pageState.scheduleType !== "By Time Period"}
                                                    onFocus={this.onFocusFifthStep}
                                                    onChange={this.props.onChangeFinishDateTime}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private onCancelButtonClick = (): void => {
        if (this.state.isPopup) {
            this.setState({
                isPopup: false,
            });
        }
    };

    private onFinishClick = (): void => {
        this.props.onRegisterPromo(false);
    };

    private onSaveCloseClick = (): void => {
        this.props.onRegisterPromo(true);
    };

    private onFocusFirstStep = (): void => {
        this.props.onChangePromoCurrentStep(0);
    };

    private onFocusSecondStep = (): void => {
        this.props.onChangePromoCurrentStep(1);
    };

    private onFocusThirdStep = (): void => {
        this.props.onChangePromoCurrentStep(2);
    };

    private onFocusForthStep = (): void => {
        this.props.onChangePromoCurrentStep(3);
    };

    private onFocusFifthStep = (): void => {
        this.props.onChangePromoCurrentStep(4);
    };

    private onConfirmationPromoPopup = (): void => {
        this.setState({
            isPopup: true,
        });
    };

    private onPlaceChange = (): void => {
        const place: any = autocomplete.getPlace();
        let location: string = this.props.promoPageState.locationName;
        let locationType: string = null;
        let lat: number = null;
        let lng: number = null;

        if (place) {
            location = place.formatted_address;

            if (place.geometry && place.geometry.location) {
                lat = place.geometry.location.lat();
                lng = place.geometry.location.lng();
            }

            if (place.address_components && place.address_components[0] && place.address_components[0].types) {
                locationType = place.address_components[0].types[0];
            }
        }

        this.props.onChangeLocation(location, lat, lng, locationType);
    };

    private onLocationChange = (value: string): void => {
        const place: PlaceResult = autocomplete.getPlace();
        let locationType: string = null;
        let lat: number = null;
        let lng: number = null;

        if (place) {
            if (place.geometry && place.geometry.location) {
                lat = place.geometry.location.lat();
                lng = place.geometry.location.lng();
            }

            if (place.address_components && place.address_components[0] && place.address_components[0].types) {
                locationType = place.address_components[0].types[0];
            }
        }

        this.props.onChangeLocation(value, lat, lng, locationType);
    };

    private onPromoUploadImgCode = (selectedFile: File, isImgExtAllowed: boolean, isImgSizeExceeded: boolean): void => {
        this.props.onPromoUploadImgCode(selectedFile, isImgExtAllowed, isImgSizeExceeded);
    };
}
