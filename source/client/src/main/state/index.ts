import {DataLanguage} from "../../common/constants/dataLanguageType";
import {ICategory, ICompany, IProduct, IPromo, IPromoStatistics} from "../../../../types/entity";
import {PromoRewardType} from "../../../../types/constants/PromoRewardType";
import {PromoTargetAge} from "../../../../types/constants/PromoTargetAge";
import {PromoStatus} from "../../../../types/constants/PromoStatus";
import {PromoTargetLanguage} from "../../../../types/constants/PromoTargetLanguage";

export interface IDropdownListValue {
    label: string;
    value: string;
}

export interface IProductCategory {
    label: string;
    value: string;
}

export interface IPromoTargetAge {
    label: string;
    value: PromoTargetAge;
}

export interface IStepsState {
    isCompleted: boolean;
    name: string;
}

export interface ICompanyProduct extends IProduct {
    checked: boolean;
}

export interface ICompanyPromo extends IPromo {
    checked?: boolean;
    priceAfterDiscount: string;
}

export interface IPromoPageState extends ICompanyPromo {
    currentStep: number;
    errorCode: string;
    failed: boolean;

    isEditable: boolean;
    isViewable: boolean;
    registered: boolean;

    steps: IStepsState[];

    nameValidationLevel: string;
    nameValidationMessage: string;
    objectiveValidationLevel: string;
    objectiveValidationMessage: string;
    productObjectValidationLevel: string;
    productObjectValidationMessage: string;
    productIdValidationLevel: string;
    productIdValidationMessage: string;
    rewardTypeValidationLevel: string;
    rewardTypeValidationMessage: string;
    separateProductIdValidationLevel: string;
    separateProductIdValidationMessage: string;
    typeValidationLevel: string;
    typeValidationMessage: string;
    conditionValidationLevel: string;
    conditionValidationMessage: string;
    offerPhraseValidationLevel: string;
    offerPhraseValidationMessage: string;
    aboutValidationLevel: string;
    aboutValidationMessage: string;
    termsValidationLevel: string;
    termsValidationMessage: string;
    discountValidationLevel: string;
    discountValidationMessage: string;
    valueValidationLevel: string;
    valueValidationMessage: string;
    quantityValidationLevel: string;
    quantityValidationMessage: string;
    time2DecideValidationLevel: string;
    time2DecideValidationMessage: string;
    codesValidationLevel: string;
    codesValidationMessage: string;
    imgCodeValidationLevel: string;
    imgCodeValidationMessage: string;
    ageValidationLevel: string;
    ageValidationMessage: string;
    genderValidationLevel: string;
    genderValidationMessage: string;
    languageValidationLevel: string;
    languageValidationMessage: string;
    locationValidationLevel: string;
    locationValidationMessage: string;
    interestValidationLevel: string;
    interestValidationMessage: string;
    scheduleTypeValidationLevel: string;
    scheduleTypeValidationMessage: string;
    budgetPeriodValidationLevel: string;
    budgetPeriodValidationMessage: string;
    pricingValidationLevel: string;
    pricingValidationMessage: string;
    budgetAmountValidationLevel: string;
    budgetAmountValidationMessage: string;

    price: number;
}

export interface INavigationState {
    userName: string;

    companyId: string;
    logo: string;
    name: string;
}

export interface IPasswordPageState {
    errorCode: string;
    failed: boolean;

    changed: boolean;

    newPassword: string;
    newPasswordValidationLevel: string;
    newPasswordValidationMessage: string;

    newVerify: string;
    newVerifyValidationLevel: string;
    newVerifyValidationMessage: string;
}

export interface ISubcategoryItem {
    present: boolean;
    subcategory: ICategory
    values: ICategory[];
}

export interface ICompanySubcategories {
    first: ISubcategoryItem;
    second: ISubcategoryItem;
    third: ISubcategoryItem;
}

export interface ICompanySocialLink {
    link: string;
    level: string;
    message: string;
}

export interface ICompanyPageState {
    errorCode: string;
    failed: boolean;
    locationName: string;

    isEditable: boolean;
    registered: boolean;

    generalCategory: any;

    dataLanguage: string;

    address: string;
    addressValidationLevel: string;
    addressValidationMessage: string;
    lat: number;
    lng: number;
    showLocation: boolean;

    name: string;
    nameValidationLevel: string;
    nameValidationMessage: string;

    description: string;
    descriptionValidationLevel: string;
    descriptionValidationMessage: string;

    email: string;
    emailCheckFailed: boolean;
    emailChecked: boolean;
    emailValidationLevel: string;
    emailValidationMessage: string;
    showEmail: boolean;

    phone: string;
    phoneCheckFailed: boolean;
    phoneChecked: boolean;
    phoneValidationLevel: string;
    phoneValidationMessage: string;
    showPhone: boolean;

    showWebAddress: boolean;
    webAddress: string;
    webAddressCheckFailed: boolean;
    webAddressChecked: boolean;
    webAddressValidationLevel: string;
    webAddressValidationMessage: string;

    category: ICategory;
    categoryValidationLevel: string;
    categoryValidationMessage: string;

    logo: string;
    uploadImageValidationLevel: string;
    uploadImageValidationMessage: string;

    links: ICompanySocialLink[];

    subcategories: ICompanySubcategories;

    locationNameValidationLevel: string;
    locationNameValidationMessage: string;
}

export interface IProductPageState {
    errorCode: string;
    failed: boolean;
    registered: boolean;

    chosenCategory: string;

    isEditable: boolean;
    productId: string;

    dataLanguage: string;

    name: string;
    nameValidationLevel: string;
    nameValidationMessage: string;

    category: string | "All";

    description: string;
    descriptionValidationLevel: string;
    descriptionValidationMessage: string;

    object: string;
    objectValidationLevel: string;
    objectValidationMessage: string;

    price: string;
    priceValidationLevel: string;
    priceValidationMessage: string;

    quantity: string;
    quantityValidationLevel: string;
    quantityValidationMessage: string;
    quantityIsDisabled?: boolean;

    link2product: string;
    link2productValidationLevel: string;
    link2productValidationMessage: string;

    expDate: string;
    expDateValidationLevel: string;
    expDateValidationMessage: string;
    isUnlimitedDate: boolean;

    isOffline: boolean;
    isOnline: boolean;
    isUnlimitedQuantity: boolean;

    images: any[];
    uploadImageIsDisabled: boolean;
    uploadImageValidationLevel: string;
    uploadImageValidationMessage: string;
}

export interface IStatisticsPageState {
    errorCode: string;
    failed: boolean;

    promoStatistics: IPromoStatistics[];
}

export interface IRewardType {
    label: string;
    value: PromoRewardType;
}

export interface IUserCompany extends ICompany {
    checked: boolean;

    generalCategory?: any; //@todo remove me нахуй
    subcategory?: any; //@todo and me
}

export interface IState {
    companyCategories: ICategory[];
    userCompanies: IUserCompany[];
    companyProducts: ICompanyProduct[];
    productCategories: any[];
    promos: ICompanyPromo[];
    categoryParent2ChildrenMap: object;
    categoryChild2ParentMap: object;
    promoPageState: IPromoPageState;
    navigationState: INavigationState;
    passwordPageState: IPasswordPageState;
    companyPageState: ICompanyPageState;
    productPageState: IProductPageState;
    statisticsPageState: IStatisticsPageState
}

export const initState: IState = {
    companyCategories: [],

    userCompanies: [],

    companyProducts: [],

    productCategories: [],

    promos: [],

    categoryParent2ChildrenMap: {},

    categoryChild2ParentMap: {},

    promoPageState: {
        isEditable: false,
        isViewable: false,
        registered: false,

        errorCode: "",
        failed: false,

        currentStep: 0,
        steps: [
            {
                isCompleted: false,
                name: "Main Objective",
            },
            {
                isCompleted: false,
                name: "Advertised Object",
            },
            {
                isCompleted: false,
                name: "Reward Card",
            },
            {
                isCompleted: false,
                name: "Target Audience",
            },
            {
                isCompleted: false,
                name: "Schedule & Budget",
            },
        ],

        _id: "0",
        status: "",
        price: 0,
        priceAfterDiscount: "",

        dataLanguage: DataLanguage.EN,

        name: "",
        nameValidationLevel: "",
        nameValidationMessage: "",
        objective: null,
        objectiveValidationLevel: "",
        objectiveValidationMessage: "",

        productObject: "",
        productObjectValidationLevel: "",
        productObjectValidationMessage: "",
        productId: "",
        productIdValidationLevel: "",
        productIdValidationMessage: "",
        rewardType: null,
        rewardTypeValidationLevel: "",
        rewardTypeValidationMessage: "",
        separateProductId: "",
        separateProductIdValidationLevel: "",
        separateProductIdValidationMessage: "",

        type: "",
        typeValidationLevel: "",
        typeValidationMessage: "",
        condition: "",
        conditionValidationLevel: "",
        conditionValidationMessage: "",
        offerPhrase: "",
        offerPhraseValidationLevel: "",
        offerPhraseValidationMessage: "",
        about: "",
        aboutValidationLevel: "",
        aboutValidationMessage: "",
        terms: "",
        termsValidationLevel: "",
        termsValidationMessage: "",
        discount: "",
        discountValidationLevel: "",
        discountValidationMessage: "",
        value: "",
        valueValidationLevel: "",
        valueValidationMessage: "",
        quantity: "",
        quantityValidationLevel: "",
        quantityValidationMessage: "",
        isUnlimited: false,
        time2Decide: null,
        time2DecideValidationLevel: "",
        time2DecideValidationMessage: "",
        codeType: "",
        codes: "",
        codesValidationLevel: "",
        codesValidationMessage: "",
        imgCode: "",
        imgCodeValidationLevel: "",
        imgCodeValidationMessage: "",

        age: [],
        ageValidationLevel: "",
        ageValidationMessage: "",
        gender: null,
        genderValidationLevel: "",
        genderValidationMessage: "",
        language: null,
        languageValidationLevel: "",
        languageValidationMessage: "",
        locationName: "",
        locationValidationLevel: "",
        locationValidationMessage: "",
        locationType: "",
        lat: 0,
        lng: 0,
        interests: [],
        interestValidationLevel: "",
        interestValidationMessage: "",

        scheduleType: "",
        scheduleTypeValidationLevel: "",
        scheduleTypeValidationMessage: "",
        budgetPeriod: "",
        budgetPeriodValidationLevel: "",
        budgetPeriodValidationMessage: "",
        budgetAmount: "",
        budgetAmountValidationLevel: "",
        budgetAmountValidationMessage: "",
        pricing: "",
        pricingValidationLevel: "",
        pricingValidationMessage: "",
        startDate: "",
        finishDate: "",
    },

    navigationState: {
        userName: "",

        companyId: "",
        logo: "",
        name: "",
    },

    passwordPageState: {
        errorCode: "",
        failed: false,

        changed: false,

        newPassword: "",
        newPasswordValidationLevel: "",
        newPasswordValidationMessage: "",

        newVerify: "",
        newVerifyValidationLevel: "",
        newVerifyValidationMessage: "",
    },

    companyPageState: {
        errorCode: "",

        failed: false,
        generalCategory: {},

        isEditable: false,
        registered: false,

        dataLanguage: DataLanguage.EN,

        address: "",
        addressValidationLevel: "",
        addressValidationMessage: "",
        lat: 0,
        lng: 0,
        showLocation: false,

        name: "",
        nameValidationLevel: "",
        nameValidationMessage: "",

        description: "",
        descriptionValidationLevel: "",
        descriptionValidationMessage: "",

        email: "",
        emailCheckFailed: false,
        emailChecked: false,
        emailValidationLevel: "",
        emailValidationMessage: "",
        showEmail: false,

        phone: "",
        phoneCheckFailed: false,
        phoneChecked: false,
        phoneValidationLevel: "",
        phoneValidationMessage: "",
        showPhone: false,

        showWebAddress: false,
        webAddress: "",
        webAddressCheckFailed: false,
        webAddressChecked: false,
        webAddressValidationLevel: "",
        webAddressValidationMessage: "",

        category: null,
        categoryValidationLevel: "",
        categoryValidationMessage: "",

        logo: "",
        uploadImageValidationLevel: "",
        uploadImageValidationMessage: "",

        links: [{link: "", level: "", message: ""}],
        locationName: "",

        locationNameValidationLevel: "",
        locationNameValidationMessage: "",

        subcategories: {
            first: {
                present: true,
                subcategory: null,
                values: [],
            },
            second: {
                present: true,
                subcategory: null,
                values: [],
            },
            third: {
                present: true,
                subcategory: null,
                values: [],
            },
        },
    },

    productPageState: {
        errorCode: "",
        failed: false,
        registered: false,

        chosenCategory: "",

        isEditable: false,
        productId: "0",

        dataLanguage: DataLanguage.EN,

        name: "",
        nameValidationLevel: "",
        nameValidationMessage: "",

        category: "All",

        description: "",
        descriptionValidationLevel: "",
        descriptionValidationMessage: "",

        object: "",
        objectValidationLevel: "",
        objectValidationMessage: "",

        price: "",
        priceValidationLevel: "",
        priceValidationMessage: "",

        quantity: "",
        quantityValidationLevel: "",
        quantityValidationMessage: "",

        link2product: "",
        link2productValidationLevel: "",
        link2productValidationMessage: "",

        expDate: "",
        expDateValidationLevel: "",
        expDateValidationMessage: "",
        isUnlimitedDate: false,

        isOffline: false,
        isOnline: false,
        isUnlimitedQuantity: false,

        images: [],
        uploadImageIsDisabled: false,
        uploadImageValidationLevel: "",
        uploadImageValidationMessage: "",
    },

    statisticsPageState: {
        errorCode: "",
        failed: false,

        promoStatistics: [],
    },
};

export interface ICookiedCompany {
    id: string;
    name: string;
}

export const initProduct: ICompanyProduct = {
    _id: "0",

    checked: true,

    category: "All",
    companyId: "",
    description: "",
    expDate: "0",
    isOffline: false,
    isOnline: false,
    isUnlimited: false,
    language: DataLanguage.EN,
    link: "",
    name: "",
    objectId: null,
    price: "",
    quantity: null,

    images: [],
};

export const initPromo: ICompanyPromo = {
    _id: "0",

    checked: true,

    discount: "",
    name: "",
    objective: null,
    offerPhrase: "",
    productId: null,
    rewardType: null,
    separateProductId: null,
    status: PromoStatus.DRAFT,
    type: "",
    priceAfterDiscount: "",
    isUnlimited: false,
    createdTimestamp: 0,

    dataLanguage: DataLanguage.EN,
    companyId: "",
    language: PromoTargetLanguage.EN,
    quantity: null,

};

export const initCompany: IUserCompany = {
    _id: "0",

    checked: true,

    name: "",

    generalCategory: {},
    links: [""],

    category: {
        name: "",
        id: "0",
    },
    subcategory: {
        name: "",
        id: "0",
    },

    dataLanguage: DataLanguage.EN,
    email: "",
    locationName: "",
    phone: "",
    webAddress: "",
};
