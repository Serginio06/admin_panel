import {VALIDATION_LEVEL_ERROR, VALIDATION_LEVEL_SUCCESS} from "../../../common/constants/ValidationLevelType";
import {ICompanySubcategories, IState, IUserCompany} from "../../state";
import {ICategory} from "../../../../../types/entity";

export const chooseCompany2editReducer = (state: IState): IState => {
    const userCompanies: IUserCompany[] = state.userCompanies.slice();

    let targetCompany: IUserCompany = null;

    const validator: any = require("validator");
    const libphonenumber: any = require("libphonenumber-js");

    for (const company of userCompanies) {
        if (company.checked) {
            targetCompany = company;
            break;
        }
    }

    const subcategories: ICompanySubcategories = {
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
        };
    const companyCategories: ICategory[] = state.companyCategories;
    let cat = null;
    let values: ICategory[] = [];

    if (targetCompany && targetCompany.category) {
        for (const category of companyCategories) {
            if (category.id === targetCompany.category.id) {
                cat = category;
                values = category.subcategories;
                break;
            }
        }
    }

    if (targetCompany.category.subcategories) {
        subcategories.first = {
            present: true,
            subcategory: targetCompany.category.subcategories[0],
            values,
        };
    }

    const links = [];
    let isValid;

    for (const linkItem of targetCompany.links) {
        isValid = linkItem || linkItem === "" || validator.isURL(linkItem); //@todo fix me

        links.push({
            level: isValid ? VALIDATION_LEVEL_SUCCESS : VALIDATION_LEVEL_ERROR,
            link: linkItem,
            message: isValid ? "" : "Link isn't valid",
        });
    }

    let nameLevel: string = VALIDATION_LEVEL_SUCCESS,
        nameMessage: string = "",

        descriptionLevel: string = VALIDATION_LEVEL_SUCCESS,
        descriptionMessage: string = "",

        locationNameLevel: string = VALIDATION_LEVEL_SUCCESS,
        locationNameMessage: string = "",

        emailLevel: string = VALIDATION_LEVEL_SUCCESS,
        emailMessage: string = "",

        phoneLevel: string = VALIDATION_LEVEL_SUCCESS,
        phoneMessage: string = "",

        webAddressLevel: string = VALIDATION_LEVEL_SUCCESS,
        webAddressMessage: string = "";

    const categoryLevel: string = VALIDATION_LEVEL_SUCCESS,
        categoryMessage: string = "";

    if (targetCompany.name && targetCompany.name.length > 30) {
        nameLevel = VALIDATION_LEVEL_ERROR;
        nameMessage = "Too long value";
    }

    if (targetCompany.description && targetCompany.description.length > 250) {
        descriptionLevel = VALIDATION_LEVEL_ERROR;
        descriptionMessage = "Too long value";
    }

    if (targetCompany.locationName && (!targetCompany.lng || !targetCompany.lat)) {
        locationNameLevel = VALIDATION_LEVEL_ERROR;
        locationNameMessage = "Choose real address";
    }

    if (targetCompany.email && targetCompany.email.length > 50) {
        emailLevel = VALIDATION_LEVEL_ERROR;
        emailMessage = "Too long value";
    } else if (targetCompany.email && targetCompany.email.length && !validator.isEmail(targetCompany.email)) {
        emailLevel = VALIDATION_LEVEL_ERROR;
        emailMessage = "E-mail isn't valid";
    }

    if (targetCompany.phone && !libphonenumber.isValidNumber(targetCompany.phone)) {
        phoneLevel = VALIDATION_LEVEL_ERROR;
        phoneMessage = "Phone isn't valid";
    }

    if (targetCompany.webAddress && targetCompany.webAddress.length > 150) {
        webAddressLevel = VALIDATION_LEVEL_ERROR;
        webAddressMessage = "Too long value";
    } else if (targetCompany.webAddress && targetCompany.webAddress.length && !validator.isURL(targetCompany.webAddress)) {
        webAddressLevel = VALIDATION_LEVEL_ERROR;
        webAddressMessage = "Link isn't valid";
    }

    return {
        ...state,

        companyPageState: {
            ...state.companyPageState,

            errorCode: "",
            failed: false,

            isEditable: true,

            dataLanguage: targetCompany.dataLanguage,

            locationName: targetCompany.locationName,
            locationNameValidationLevel: locationNameLevel,
            locationNameValidationMessage: locationNameMessage,

            lat: targetCompany.lat,
            lng: targetCompany.lng,

            name: targetCompany.name,
            nameValidationLevel: nameLevel,
            nameValidationMessage: nameMessage,

            description: targetCompany.description ? targetCompany.description : "",
            descriptionValidationLevel: descriptionLevel,
            descriptionValidationMessage: descriptionMessage,

            email: targetCompany.email,
            emailValidationLevel: emailLevel,
            emailValidationMessage: emailMessage,

            phone: targetCompany.phone,
            phoneValidationLevel: phoneLevel,
            phoneValidationMessage: phoneMessage,

            webAddress: targetCompany.webAddress,
            webAddressValidationLevel: webAddressLevel,
            webAddressValidationMessage: webAddressMessage,

            category: cat,
            categoryValidationLevel: categoryLevel,
            categoryValidationMessage: categoryMessage,

            logo: targetCompany.logo,
            subcategories,

            showEmail: targetCompany.showEmail,
            showLocation: targetCompany.showLocation,
            showPhone: targetCompany.showPhone,
            showWebAddress: targetCompany.showWebAddress,

            links,
        },
    };
};
