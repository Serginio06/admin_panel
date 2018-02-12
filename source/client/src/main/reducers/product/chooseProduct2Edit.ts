import {ICompanyProduct, IState} from "../../state";
import {VALIDATION_LEVEL_ERROR, VALIDATION_LEVEL_SUCCESS} from "../../../common/constants/ValidationLevelType";
import {isCurrencyValid} from "../../../common/util/validation";

export const chooseProduct2EditReducer = (state: IState): IState => {
    let targetProduct: ICompanyProduct = null;
    const companyProducts: ICompanyProduct[] = state.companyProducts.slice();

    for (const product of companyProducts) {
        if (product.checked) {
            targetProduct = product;
            break;
        }
    }

    const validator = require("validator");

    let nameLevel: string = VALIDATION_LEVEL_SUCCESS,
        nameMessage: string = "",

        descriptionLevel: string = VALIDATION_LEVEL_SUCCESS,
        descriptionMessage: string = "",

        priceLevel: string = VALIDATION_LEVEL_SUCCESS,
        priceMessage: string = "",

        quantityLevel: string = VALIDATION_LEVEL_SUCCESS,
        quantityMessage: string = "",

        linkLevel: string = VALIDATION_LEVEL_SUCCESS,
        linkMessage: string = "";

    const objectLevel: string = VALIDATION_LEVEL_SUCCESS,
        objectMessage: string = "",

        dateLevel: string = VALIDATION_LEVEL_SUCCESS,
        dateMessage: string = "";

    if (targetProduct.name && targetProduct.name.length > 30) {
        nameLevel = VALIDATION_LEVEL_ERROR;
        nameMessage = "Too long value";
    }

    if (targetProduct.description && targetProduct.description.length > 250) {
        descriptionLevel = VALIDATION_LEVEL_ERROR;
        descriptionMessage = "Too long value";
    }

    if (targetProduct.price && !isCurrencyValid(targetProduct.price)) {
        priceLevel = VALIDATION_LEVEL_ERROR;
        priceMessage = "Value should have currency format 1,232.34";
    }

    if (!targetProduct.isUnlimited && targetProduct.quantity && !targetProduct.quantity.match(/^[0-9]+$/)) {
        quantityLevel = VALIDATION_LEVEL_ERROR;
        quantityMessage = "Only number allow";
    }

    if (targetProduct.isOnline) {
        if (!targetProduct.link || targetProduct.link.length === 0) {
            linkLevel = VALIDATION_LEVEL_ERROR;
            linkMessage = "Field must be filled";
        } else if (!validator.isURL(targetProduct.link)) {
            linkLevel = VALIDATION_LEVEL_ERROR;
            linkMessage = "Link isn't valid";
        }
    }

    return {
        ...state,

        companyProducts,

        productPageState: {
            ...state.productPageState,

            isEditable: true,

            chosenCategory: "All",

            errorCode: "",
            failed: false,

            dataLanguage: targetProduct.language,

            name: targetProduct.name,
            nameValidationLevel: nameLevel,
            nameValidationMessage: nameMessage,

            category: targetProduct.category,

            description: targetProduct.description,
            descriptionValidationLevel: descriptionLevel,
            descriptionValidationMessage: descriptionMessage,

            object: targetProduct.object,
            objectValidationLevel: objectLevel,
            objectValidationMessage: objectMessage,

            price: targetProduct.price === null ? "" : targetProduct.price,
            priceValidationLevel: priceLevel,
            priceValidationMessage: priceMessage,

            quantity: targetProduct.quantity,
            quantityValidationLevel: quantityLevel,
            quantityValidationMessage: quantityMessage,

            link2product: targetProduct.link,
            link2productValidationLevel: linkLevel,
            link2productValidationMessage: linkMessage,

            expDate: targetProduct.expDate,
            expDateValidationLevel: dateLevel,
            expDateValidationMessage: dateMessage,

            isOffline: targetProduct.isOffline,
            isOnline: targetProduct.isOnline,
            isUnlimitedQuantity: targetProduct.isUnlimited,

            images: targetProduct.images,
            uploadImageIsDisabled: targetProduct.images && targetProduct.images.length === 5,
            uploadImageValidationLevel: "",
            uploadImageValidationMessage: "",
        },
    };
};
