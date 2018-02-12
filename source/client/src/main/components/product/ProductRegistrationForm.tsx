import * as React from "react";
import {Button} from "react-bootstrap";
import SVGInline from "react-svg-inline";
import {Alert} from "../../../common/components/Alert/Alert";
import {Checkbox} from "../../../common/components/Checkbox/Checkbox";
import {DatePickerInput} from "../../../common/components/DatepickerInput";
import {Dropdown} from "../../../common/components/Dropdown";
import {Input} from "../../../common/components/Input";
import {LanguageSwitcher} from "../../../common/components/LanguageSwitcher";
import {PictureUpload} from "../../../common/components/PictureUpload";
import {Textarea} from "../../../common/components/Textarea";
import {Color} from "../../../common/constants/Color";
import {getErrorText} from "../../../common/util/errorUtil";
import {ICompanyProduct, IDropdownListValue, IProductCategory, IProductPageState} from "../../state";
import {ProductObject} from "../../constants/ProductObject";
import {Alignment} from "../../../common/constants/alignment";

interface IProductRegistrationFormProps {
    productPageState: IProductPageState;

    productCategories: IProductCategory[];
    companyProducts: ICompanyProduct[];

    onChangeDataLanguage: () => void;
    onChangeName: (name: string) => void;
    onRegisterProduct: (b: boolean) => void;
    onChangeProductObject: (object: string) => void;
    onProductUploadImage: (selectedFile: File, isImgExtAllowed: boolean, isImgSizeExceeded: boolean) => void;
    onChangeIsUnlimitedQuantity: (v: boolean) => void;
    onChangeIsUnlimitedDate: (value: boolean) => void;
    onChangeIsOffline: (v: boolean) => void;
    onChangeIsOnline: (v: boolean) => void;
    onChangeCategory: (e: string) => void;
    onChangeDescription: (d: string) => void;
    onChangeExpDate: (d: string) => void;
    onChangeLink2product: (l: string) => void;
    onChangePrice: (p: string) => void;
    onChangeQuantity: (q: string) => void;
    onDeletePicture: (i: string) => void;
    onChangePicturesOrder: (items: any[]) => void;
}

interface IProductRegistrationFormState {
}

export class ProductRegistrationForm extends React.Component<IProductRegistrationFormProps, IProductRegistrationFormState> {

    private firstSelection: any;

    constructor(props: IProductRegistrationFormProps) {
        super(props);
    }

    public componentDidMount(): void {
        // this.firstSelection.field.refs.stateSelect.input.input.focus();
    }

    public componentDidUpdate(prevProps) {
        if (prevProps.productPageState.productId !== this.props.productPageState.productId) {
            // this.firstSelection.field.refs.stateSelect.input.input.focus();
        }
    }

    public render(): JSX.Element {
        const shoppingCart: string = require("../../../../resources/icons/svg/shopping-cart.svg"),
            pageState: IProductPageState = this.props.productPageState,
            productValue: string = pageState.object ? pageState.object : "";

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

        const disabled: boolean = pageState.name === "";

        return (
            <div className="block__full-width">
                <div className="mainBlock__header">
                    <div className="mainBlock__header__text-wrapper">
                        <SVGInline svg={shoppingCart} fill={Color.GREY_DARK} width="20px" height="19px"
                                   className="img__midIcon"/>
                        <span className="mainBlock__header__text">
                            {"Product/Service registration"}
                        </span>
                    </div>

                    <div className="mainBlock__header__inputBtn-wrapper">
                        <Button className="grey__wide__btn btn-w30"
                                disabled={disabled}
                                onClick={this.onSaveContinueClick}>
                            {"Save & Continue"}
                        </Button>

                        <Button className="btn-w30"
                                disabled={disabled}
                                onClick={this.onSaveExitClick}>
                            {"Save & Exit"}
                        </Button>
                    </div>
                </div>

                <div className="productRegForm__form-wrapper mainBlock">
                    <div className="form__header__wrapper">
                        <div className="language__switcher-wrapper">
                            <LanguageSwitcher label={"LANGUAGE"}
                                              tooltipText={"Specify product data language"}
                                              value={pageState.dataLanguage}
                                              onChange={this.props.onChangeDataLanguage}/>
                        </div>
                        <h1>{"Product/Service Registration"}</h1>
                    </div>

                    {pageState.failed && <Alert type={"error"} text={getErrorText(pageState.errorCode)}/>}

                    <div className="productRegForm__formInputs-wrapper">

                        <div className="productReg__row">
                            <div className="productCol">
                                <Dropdown
                                    ref={(firstSelection: Dropdown) => {
                                        this.firstSelection = firstSelection;
                                    }}
                                    isStar
                                    label={"product/service object"}
                                    placeholder={"Choose"}
                                    tooltipPresent={true}
                                    tooltipText={"product/service object"}
                                    validationLevel={pageState.objectValidationLevel}
                                    validationMessage={pageState.objectValidationMessage}
                                    onChange={this.onProductObjectChange}
                                    valuesArray={productObjects}
                                    value={productValue}
                                    isEnabled={true}
                                    dropdownClass={"input__wrapper-w100"}/>

                                <Input
                                    isStar
                                    label={"Object name"}
                                    placeholder={"Enter Product/Service Name"}
                                    tooltipText={"Enter Product/Service name"}
                                    validationLevel={pageState.nameValidationLevel}
                                    validationMessage={pageState.nameValidationMessage}
                                    value={pageState.name}
                                    onChange={this.props.onChangeName}
                                    inputClass={"input__wrapper-w100"}
                                    maxLength={"30"}/>
                            </div>

                            <div className="productCol" id="productReg__row-spacearound">
                                <Checkbox
                                    tooltipText={"Check for online promo"}
                                    checkboxClass={"input__wrapper-w30"}
                                    onChange={this.onIsOnlineChange}
                                    isChecked={pageState.isOnline}>
                                    {"ONLINE"}
                                </Checkbox>

                                <Checkbox
                                    tooltipText={"Check for offline promo"}
                                    checkboxClass={"input__wrapper-w30"}
                                    onChange={this.onIsOfflineChange}
                                    isChecked={pageState.isOffline}>
                                    {"OFFLINE"}
                                </Checkbox>

                                <div>
                                    <span
                                        className="productReg__checkbox-description">{"Mark Product/Service Type. Required 1 or Both"}</span>
                                </div>
                            </div>

                            <div className="productCol">
                                <PictureUpload
                                    isStar
                                    label={"Pictures"}
                                    tooltipPresent={true}
                                    tooltipText={"Choose up to 5 pics"}
                                    validationLevel={pageState.uploadImageValidationLevel}
                                    validationMessage={pageState.uploadImageValidationMessage}
                                    picUploadClass={""}
                                    picturesSrc={pageState.images}
                                    onDeletePicture={this.props.onDeletePicture}
                                    onProductUploadImage={this.onProductUploadImage}
                                    onChangePicturesOrder={this.props.onChangePicturesOrder}
                                    isDisabled={pageState.uploadImageIsDisabled}/>
                            </div>
                        </div>

                        <div className="productReg__row">
                            <div className="productCol1">
                                <Dropdown
                                    label={"product/service category"}
                                    placeholder={"Choose"}
                                    tooltipText={"Enter product/service category"}
                                    onChange={this.onCategoryChange}
                                    valuesArray={this.props.productCategories}
                                    value={pageState.category}
                                    isCreatable={true}
                                    dropdownClass={"input__wrapper-w100"}/>

                                <div className="input__checkbox-wrapper">
                                    <DatePickerInput
                                        tooltipText={"Enter date"}
                                        label={"expiration date/time"}
                                        inputClass={"input__wrapper-w100"}
                                        value={pageState.expDate}
                                        isDisabled={pageState.isUnlimitedDate}
                                        timeIntervals={5}
                                        onChange={this.props.onChangeExpDate}/>

                                    <Checkbox
                                        tooltipText={"Check if not expiration date"}
                                        checkboxClass={"input__wrapper-w40"}
                                        onChange={this.onIsUnlimitedDateChange}
                                        isChecked={pageState.isUnlimitedDate}>
                                        {"UNLIMITED"}
                                    </Checkbox>
                                </div>

                            </div>

                            <div className="productCol">
                                <div className="input__checkbox-wrapper">
                                    <Input
                                        label={"QUANTITY"}
                                        placeholder={"Add quantity"}
                                        tooltipText={"Enter Quantity"}
                                        validationLevel={pageState.quantityValidationLevel}
                                        validationMessage={pageState.quantityValidationMessage}
                                        value={pageState.quantity}
                                        onChange={this.props.onChangeQuantity}
                                        inputClass={"input__checkbox"}
                                        isDisabled={pageState.isUnlimitedQuantity}/>

                                    <Checkbox
                                        tooltipText={"Check for unlimited quantity"}
                                        checkboxClass={"input__wrapper-w40"}
                                        onChange={this.onIsUnlimitedQuantityChange}
                                        isChecked={pageState.isUnlimitedQuantity}>
                                        {"UNLIMITED"}
                                    </Checkbox>
                                </div>

                                <Input
                                    label={"PRICE, $"}
                                    placeholder={"$ Price"}
                                    tooltipPresent={true}
                                    tooltipText={"Enter price"}
                                    caret="$"
                                    caretAlignment={Alignment.LEFT}
                                    validationLevel={pageState.priceValidationLevel}
                                    validationMessage={pageState.priceValidationMessage}
                                    value={pageState.price ? pageState.price : "Price"}
                                    onChange={this.props.onChangePrice}
                                    inputClass={"input__wrapper-w100"}/>

                                <Input
                                    isStar
                                    label={"DIRECT LINK TO THE OBJECT"}
                                    placeholder={"Enter Direct Link To The Object"}
                                    tooltipText={"Enter link to product"}
                                    validationLevel={pageState.link2productValidationLevel}
                                    validationMessage={pageState.link2productValidationMessage}
                                    value={pageState.link2product}
                                    onChange={this.props.onChangeLink2product}
                                    inputClass={"input__wrapper-w100"}
                                    maxLength={"0"}
                                    isDisabled={!pageState.isOnline}/>
                            </div>

                            <div className="productCol">
                                <Textarea
                                    isStar
                                    label={"SHORT DESCRIPTION"}
                                    placeholder={"Enter Product/Service’s Short Description"}
                                    tooltipText={"Enter product description"}
                                    validationLevel={pageState.descriptionValidationLevel}
                                    validationMessage={pageState.descriptionValidationMessage}
                                    value={pageState.description}
                                    onChange={this.props.onChangeDescription}
                                    textAreaHeight="219px"
                                    textAreaClass={"input__wrapper-w100 textArea__workingHours"}
                                    maxLength={250}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private onCategoryChange = (e: string): void => {
        this.props.onChangeCategory(e);
    };
    private onIsOnlineChange = (e: React.FormEvent<HTMLInputElement>): void => {
        const value = (e.target as HTMLInputElement).checked;

        this.props.onChangeIsOnline(value);
    };
    private onIsOfflineChange = (e: React.FormEvent<HTMLInputElement>): void => {
        const value = (e.target as HTMLInputElement).checked;

        this.props.onChangeIsOffline(value);
    };
    private onIsUnlimitedDateChange = (e: React.FormEvent<HTMLInputElement>): void => {
        const value = (e.target as HTMLInputElement).checked;
        this.props.onChangeIsUnlimitedDate(value);
    };
    private onIsUnlimitedQuantityChange = (e: React.FormEvent<HTMLInputElement>): void => {
        const value = (e.target as HTMLInputElement).checked;
        this.props.onChangeIsUnlimitedQuantity(value);
    };
    private onProductUploadImage = (selectedFile: File, isImgExtAllowed: boolean, isImgSizeExceeded: boolean): void => {
        this.props.onProductUploadImage(selectedFile, isImgExtAllowed, isImgSizeExceeded);
    };
    private onProductObjectChange = (object: string): void => {
        this.props.onChangeProductObject(object);
    };
    private onSaveContinueClick = (): void => {
        this.props.onRegisterProduct(true);
    };
    private onSaveExitClick = (): void => {
        this.props.onRegisterProduct(false);
    };
}
