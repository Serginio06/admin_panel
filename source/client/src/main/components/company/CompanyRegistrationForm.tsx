/// <reference path="../../util/google.maps.d.ts"/>
import * as React from "react";
import {Button} from "react-bootstrap";
import {findDOMNode} from "react-dom";
import SVGInline from "react-svg-inline";
import {Alert} from "../../../common/components/Alert/Alert";
import {Checkbox} from "../../../common/components/Checkbox/Checkbox";
import {Dropdown} from "../../../common/components/Dropdown";
import {Input} from "../../../common/components/Input";
import {LanguageSwitcher} from "../../../common/components/LanguageSwitcher";
import {LogoUploader} from "../../../common/components/LogoUploader";
import {Textarea} from "../../../common/components/Textarea";
import {getErrorText} from "../../../common/util/errorUtil";
import {FieldOnCardType} from "../../constants/FiledOnCardType";
import {ICompanyPageState} from "../../state";
import {SubcategoryLevel} from "../../constants/SubcategoryLevel";

let autocomplete;

interface ICompanyRegistrationFormProps {
    companyPageState: ICompanyPageState,

    companyCategories: any[],

    onChangeSocialLink: () => void;
    onCompanyUploadImage: (selectedFile: string, isImgExtAllowed: boolean, isImgSizeExceeded: boolean) => void;
    onShowOnCardChange: (fieldType: FieldOnCardType) => void;
    onChangeCompanySubcategory: (companySubCategoryId: string, level: SubcategoryLevel) => void;
    onChangeCategory: (categoryId) => void;
    onCheckWebAddress: () => void;
    onCheckPhone: () => void;
    onCheckEmail: () => void;
    onChangeAddress: (address, lat, lng) => void;
    onAddSocialLink: () => void;
    onDeleteSocialLink: () => void;
    onSaveContinueClick: () => void;
    onSaveCloseClick: () => void;
    onChangeDataLanguage: () => void;
    onChangeName: () => void;
    onChangeWebAddress: () => void;
    onChangeEmail: () => void;
    onChangePhone: () => void;
    onChangeDescription: () => void;
}

interface ICompanyRegistrationFormState {
}

export class CompanyRegistrationForm extends React.Component<ICompanyRegistrationFormProps, ICompanyRegistrationFormState> {

    private emailTimeoutId = null;

    private phoneTimeoutId = null;

    private webAddressTimeoutId = null;

    private companyName = null;

    public componentDidMount() {
        (findDOMNode(this.companyName.input) as HTMLElement).focus();
        autocomplete = new google.maps.places.Autocomplete((document.getElementById("autocomplete") as HTMLInputElement), {types: ["geocode"]} as any);

        autocomplete.addListener("place_changed", this.onPlaceChange);
    }

    public componentWillUpdate(nextProps) {
        if (nextProps.companyPageState.name !== this.props.companyPageState.name) {
            (findDOMNode(this.companyName.input) as HTMLElement).focus();
        }
    }

    public render() {
        const suiteCaseDark = require("../../../../resources/icons/svg/suiteCase.svg");

        const pageState: ICompanyPageState = this.props.companyPageState,
            categories = this.props.companyCategories,

            categoryValue = pageState.category ? pageState.category.id : "",
            subcategoryValue = pageState.subcategories.first.subcategory ?
                pageState.subcategories.first.subcategory.id : "",
            subSubcategoryValue = pageState.subcategories.second.subcategory ?
                pageState.subcategories.second.subcategory.id : "",
            subSubSubcategoryValue = pageState.subcategories.third.subcategory ?
                pageState.subcategories.third.subcategory.id : "",

            categoryValues = [],
            subValues = [],
            subSubValues = [],
            subSubSubValues = [];

        let disabled;

        for (const category of categories) {
            categoryValues.push({
                label: category.name,
                value: category.id,
            });
        }

        for (const category of pageState.subcategories.first.values) {
            subValues.push({
                label: category.name,
                value: category.id,
            });
        }

        /* for (let category of pageState.subcategories.second.values) {
            subSubValues.push({
                value: category.id,
                label: category.name,
            })
        }

        for (let category of pageState.subcategories.third.values) {
            subSubSubValues.push({
                value: category.id,
                label: category.name,
            })
        } */

        disabled = pageState.name === "";

        let firstSubCategory = null,
            secondSubCategory = null,
            thirdSubcategory = null;

        if (subSubSubValues.length !== 0) {
            thirdSubcategory = (
                <Dropdown
                    label={"SUB CATEGORY"}
                    placeholder={"Choose Sub Category"}
                    type={"text"}
                    tooltipPresent={true}
                    tooltipText={"Enter third sub category name"}
                    onChange={this.onCompanyThirdSubcategoryChange}
                    valuesArray={subSubSubValues}
                    value={subSubSubcategoryValue}
                    isEnabled={true}
                    dropdownClass={"input__wrapper-w100"}
                    validationLevel=""
                />
            );
        }

        if (subSubValues.length !== 0) {
            secondSubCategory = (
                <Dropdown
                    label={"SUB CATEGORY"}
                    isStar
                    placeholder={"Choose Sub Category"}
                    type={"text"}
                    tooltipPresent={true}
                    tooltipText={"Enter second sub category name"}
                    onChange={this.onCompanySecondSubcategoryChange}
                    valuesArray={subSubValues}
                    value={subSubcategoryValue}
                    isEnabled={true}
                    dropdownClass={"input__wrapper-w100"}
                    validationLevel=""
                />
            );
        }

        if (subValues.length !== 0) {
            firstSubCategory = (
                <Dropdown
                    label={"SUB CATEGORY"}
                    isStar
                    placeholder={"Choose Sub Category"}
                    type={"text"}
                    tooltipPresent={true}
                    tooltipText={"Enter first sub category name"}
                    onChange={this.onCompanyFirstSubcategoryChange}
                    valuesArray={subValues}
                    value={subcategoryValue}
                    isEnabled={true}
                    dropdownClass={"input__wrapper-w100"}
                    validationLevel=""
                />
            );
        }

        const links = [];

        for (let i = 0; i < pageState.links.length; i++) {

            if (i === 0) {

                links.push(
                    <div key={i} style={{width: "100%"}}>
                        <Input
                            placeholder={"Enter Social Media Link"}
                            tooltipPresent
                            buttonId={i}
                            buttonText={"+"}
                            buttonDisabled={pageState.links.length === 5}
                            label={"SOCIAL MEDIA LINKS"}
                            value={pageState.links.length === 0 ? "" : pageState.links[i].link}
                            validationLevel={pageState.links[i].level}
                            validationMessage={pageState.links[i].message}
                            tooltipText={"Enter social link"}
                            inputClass={"input__wrapper-w100 social-links-input"}
                            onChange={this.props.onChangeSocialLink}
                            onButtonClick={this.props.onAddSocialLink}/>
                    </div>);
            } else {
                links.push(
                    <div key={i} style={{width: "100%"}}>
                        <Input
                            buttonId={i}
                            value={pageState.links[i].link}
                            validationLevel={pageState.links[i].level}
                            validationMessage={pageState.links[i].message}
                            buttonText={"-"}
                            inputClass={"input__wrapper-w100 social-links-input"}
                            onChange={this.props.onChangeSocialLink}
                            onButtonClick={this.props.onDeleteSocialLink}
                        />
                    </div>);
            }
        }

        return (
            <div className="block__full-width">
                <div className="mainBlock__header">
                    <div className="mainBlock__header__text-wrapper">
                        <SVGInline svg={suiteCaseDark} width="16px" height="16px" className="img__midIcon"/>
                        <span className="mainBlock__header__text">
                            {"Company Registration"}
                        </span>
                    </div>
                    <div className="mainBlock__header__inputBtn-wrapper">
                        <Button className="white__btn btn-w45" disabled={disabled}
                                onClick={this.props.onSaveContinueClick}>
                            {"Save & Continue"}
                        </Button>

                        <Button className="btn-w45" disabled={disabled} onClick={this.props.onSaveCloseClick}>
                            {"Save & Exit"}
                        </Button>
                    </div>
                </div>
                <div className="companyRegForm__form-wrapper mainBlock">
                    <div className="form__header__wrapper">
                        <div className="language__switcher-wrapper">
                            <LanguageSwitcher
                                label={"LANGUAGE"}
                                value={pageState.dataLanguage}
                                tooltipText={"Specify company data language"}
                                onChange={this.props.onChangeDataLanguage}/>
                        </div>
                        <h1>{"Company Registration"}</h1>
                    </div>

                    {pageState.failed && <Alert type={"error"} text={getErrorText(pageState.errorCode)}/>}

                    <div className="companyRegForm__formInputs-wrapper">
                        <div className="companyReg__row">
                            <div className="companyCol">

                                <Input
                                    ref={(companyName) => {
                                        this.companyName = companyName;
                                    }}
                                    placeholder={"Enter Company’s Name"}
                                    isStar
                                    tooltipPresent
                                    label={"COMPANY’S NAME"}
                                    tooltipText={"Enter company name"}
                                    validationLevel={pageState.nameValidationLevel}
                                    validationMessage={pageState.nameValidationMessage}
                                    value={pageState.name}
                                    onChange={this.props.onChangeName}
                                    inputClass={"input__wrapper-w100"}
                                    maxLength="30"/>
                            </div>
                            <div className="companyCol">
                                <LogoUploader
                                    label={"LOGO"}
                                    isStar
                                    tooltipPresent={true}
                                    tooltipText={"Upload company logo"}
                                    validationLevel={pageState.uploadImageValidationLevel}
                                    validationMessage={pageState.uploadImageValidationMessage}
                                    picUploadClass={""}
                                    pictureSrc={pageState.logo}
                                    onUploadImage={this.onCompanyUploadImage}
                                    buttonLabel={"Upload Logo"}/>
                            </div>
                            <div className="companyCol"/>
                        </div>

                        <div className="companyReg__row">
                            <div className="companyCol">
                                <Dropdown
                                    label={"GENERAL CATEGORY"}
                                    isStar
                                    placeholder={"Choose General Category"}
                                    type={"text"}
                                    tooltipPresent={true}
                                    tooltipText={"Choose category"}
                                    validationLevel={pageState.categoryValidationLevel}
                                    validationMessage={pageState.categoryValidationMessage}
                                    onChange={this.onCategoryChange}
                                    valuesArray={categoryValues}
                                    value={categoryValue}
                                    isEnabled={true}
                                    dropdownClass={"input__wrapper-w100"}/>

                                {firstSubCategory}

                                {secondSubCategory}

                                {thirdSubcategory}

                                {links}
                            </div>

                            <div className="companyCol">
                                <div className="input__checkbox-wrapper">
                                    <Input
                                        tooltipPresent
                                        label={"WEB ADDRESS"}
                                        placeholder={"Enter Web Address"}
                                        tooltipText={"Enter company site"}
                                        validationLevel={pageState.webAddressValidationLevel}
                                        validationMessage={pageState.webAddressValidationMessage}
                                        value={pageState.webAddress}
                                        onChange={this.props.onChangeWebAddress}
                                        onKeyDown={this.onWebAddressKeyDown}
                                        onBlur={this.onWebAddressBlur}
                                        inputClass={"input__checkbox"}/>

                                    <Checkbox
                                        onChange={this.onWebAddressShowOnCardChange}
                                        isChecked={pageState.showWebAddress}
                                        tooltipText={"Show web address on promo?"}
                                        checkboxClass={"input__wrapper-w40"}>
                                        {"SHOW ON CARD"}
                                    </Checkbox>
                                </div>

                                <div className="input__checkbox-wrapper">
                                    <Input
                                        tooltipPresent
                                        label={"E-MAIL"}
                                        isStar
                                        placeholder={"Enter E-mail"}
                                        type={"email"}
                                        tooltipText={"Enter company email"}
                                        validationLevel={pageState.emailValidationLevel}
                                        validationMessage={pageState.emailValidationMessage}
                                        value={pageState.email}
                                        onChange={this.props.onChangeEmail}
                                        onKeyDown={this.onEmailKeyDown}
                                        onBlur={this.onEmailBlur}
                                        inputClass={"input__checkbox"}/>

                                    <Checkbox
                                        onChange={this.onEmailShowOnCardChange}
                                        isChecked={pageState.showEmail}
                                        tooltipText={"Show email on promo?"}
                                        checkboxClass={"input__wrapper-w40"}>
                                        {"SHOW ON CARD"}
                                    </Checkbox>
                                </div>

                                <div className="input__checkbox-wrapper">
                                    <Input
                                        tooltipPresent
                                        label={"PHONE NUMBER"}
                                        placeholder={"Enter Phone Number"}
                                        tooltipText={"Enter phone number"}
                                        validationLevel={pageState.phoneValidationLevel}
                                        validationMessage={pageState.phoneValidationMessage}
                                        value={pageState.phone}
                                        onChange={this.props.onChangePhone}
                                        onKeyDown={this.onPhoneKeyDown}
                                        onBlur={this.onPhoneBlur}
                                        inputClass={"input__checkbox"}/>

                                    <Checkbox
                                        onChange={this.onPhoneShowOnCardChange}
                                        isChecked={pageState.showPhone}
                                        tooltipText={"Show phone on promo?"}
                                        checkboxClass={"input__wrapper-w40"}>
                                        {"SHOW ON CARD"}
                                    </Checkbox>
                                </div>

                                <div className="input__checkbox-wrapper">
                                    <Input
                                        tooltipPresent
                                        id={"autocomplete"}
                                        label={"LOCAL ADDRESS"}
                                        placeholder={"Enter local address"}
                                        value={pageState.locationName}
                                        validationLevel={pageState.locationNameValidationLevel}
                                        validationMessage={pageState.locationNameValidationMessage}
                                        tooltipText={"Enter company address"}
                                        onChange={this.onAddressChange}
                                        inputClass={"input__checkbox"}/>

                                    <Checkbox
                                        onChange={this.onAddressShowOnCardChange}
                                        isChecked={pageState.showLocation}
                                        tooltipText={"Show address on promo?"}
                                        checkboxClass={"input__wrapper-w40"}>
                                        {"SHOW ON CARD"}
                                    </Checkbox>
                                </div>

                            </div>

                            <div className="companyCol">
                                <Textarea
                                    label={"Description"}
                                    placeholder={"Enter Company’s Short Description"}
                                    tooltipText={"Enter company description"}
                                    validationLevel={pageState.descriptionValidationLevel}
                                    validationMessage={pageState.descriptionValidationMessage}
                                    value={pageState.description}
                                    onChange={this.props.onChangeDescription}
                                    textAreaClass={"input__wrapper-w100 textArea__description"}
                                    textAreaHeight="275px"
                                    maxLength={250}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private onPlaceChange = () => {
        const place = autocomplete.getPlace();
        let address = this.props.companyPageState.locationName,
            lat = null,
            lng = null;

        if (place) {
            address = place.formatted_address;

            if (place.geometry && place.geometry.location) {
                lat = place.geometry.location.lat();
                lng = place.geometry.location.lng();
            }
        }

        this.props.onChangeAddress(address, lat, lng);
    };

    private onAddressChange = (value) => {
        const place = autocomplete.getPlace();
        let lat = null,
            lng = null;

        if (place && place.geometry) {
            lat = place.geometry.location.lat();
            lng = place.geometry.location.lng();
        }

        this.props.onChangeAddress(value, lat, lng);
    };

    private onEmailKeyDown = (e) => {
        if (this.emailTimeoutId) {
            clearTimeout(this.emailTimeoutId);
        }

        if (e.keyCode === 13) {
            this.props.onCheckEmail();
        } else {
            this.emailTimeoutId = setTimeout(() => {
                this.props.onCheckEmail();
            }, 3000);
        }
    };

    private onEmailBlur = () => {
        if (this.props.companyPageState.emailChecked) {
            return;
        }

        if (this.emailTimeoutId) {
            clearTimeout(this.emailTimeoutId);
        }

        this.props.onCheckEmail();
    };

    private onPhoneKeyDown = (e) => {
        if (this.phoneTimeoutId) {
            clearTimeout(this.phoneTimeoutId);
        }

        if (e.keyCode === 13) {
            this.props.onCheckPhone();
        } else {
            this.phoneTimeoutId = setTimeout(() => {
                this.props.onCheckPhone();
            }, 3000);
        }
    };

    private onPhoneBlur = () => {
        if (this.props.companyPageState.phoneChecked) {
            return;
        }

        if (this.phoneTimeoutId) {
            clearTimeout(this.phoneTimeoutId);
        }

        this.props.onCheckPhone();
    };

    private onWebAddressKeyDown = (e) => {
        if (this.webAddressTimeoutId) {
            clearTimeout(this.webAddressTimeoutId);
        }

        if (e.keyCode === 13) {
            this.props.onCheckWebAddress();
        } else {
            this.webAddressTimeoutId = setTimeout(() => {
                this.props.onCheckWebAddress();
            }, 3000);
        }
    };

    private onWebAddressBlur = () => {
        if (this.props.companyPageState.webAddressChecked) {
            return;
        }

        if (this.webAddressTimeoutId) {
            clearTimeout(this.webAddressTimeoutId);
        }

        this.props.onCheckWebAddress();
    };

    private onCategoryChange = (categoryId) => {
        this.props.onChangeCategory(categoryId);
    };

    private onCompanyFirstSubcategoryChange = (companySubCategoryId) => {
        this.props.onChangeCompanySubcategory(companySubCategoryId, SubcategoryLevel.SUBCATEGORY_LEVEL_FIRST);
    };

    private onCompanySecondSubcategoryChange = (companySubCategoryId) => {
        this.props.onChangeCompanySubcategory(companySubCategoryId, SubcategoryLevel.SUBCATEGORY_LEVEL_SECOND);
    };

    private onCompanyThirdSubcategoryChange = (companySubCategoryId) => {
        this.props.onChangeCompanySubcategory(companySubCategoryId, SubcategoryLevel.SUBCATEGORY_LEVEL_THIRD);
    };

    private onWebAddressShowOnCardChange = () => {
        this.props.onShowOnCardChange(FieldOnCardType.WEB_ADDRESS);
    };

    private onPhoneShowOnCardChange = () => {
        this.props.onShowOnCardChange(FieldOnCardType.PHONE);
    };

    private onEmailShowOnCardChange = () => {
        this.props.onShowOnCardChange(FieldOnCardType.EMAIL);
    };

    private onAddressShowOnCardChange = () => {
        this.props.onShowOnCardChange(FieldOnCardType.ADDRESS);
    };

    private onCompanyUploadImage = (selectedFile, isImgExtAllowed, isImgSizeExceeded) => {
        this.props.onCompanyUploadImage(selectedFile, isImgExtAllowed, isImgSizeExceeded);
    };

}
