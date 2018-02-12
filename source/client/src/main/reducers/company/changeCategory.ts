import {VALIDATION_LEVEL_ERROR, VALIDATION_LEVEL_SUCCESS} from "../../../common/constants/ValidationLevelType";
import {SubcategoryLevel} from "../../constants/SubcategoryLevel";
import {getSubcategoryValuesArray, setCompanySubcategory} from "../../util/subcategoryTreeUtil";
import {ICompanySubcategories, IState} from "../../state";
import {IChangeCategoryAction} from "../../actions/company/changeCategory";
import {ICategory} from "../../../../../types/entity";

export function changeCategoryReducer(state: IState, action: IChangeCategoryAction) {
    let categoryValidationLevel: string = VALIDATION_LEVEL_SUCCESS;
    let categoryValidationMessage: string = "";
    let category: ICategory = null;

    const companyCategories: ICategory[] = state.companyCategories;

    for (const cat of companyCategories) {
        if (cat.id === action.categoryId) {
            category = cat;
            break;
        }
    }

    if (!category) {
        categoryValidationLevel = VALIDATION_LEVEL_ERROR;
        categoryValidationMessage = "Field must be filled";
    }

    const subcategories: ICompanySubcategories = {
        first: {
            present: true,
            subcategory: null,
            values: getSubcategoryValuesArray(category, null, null, companyCategories, SubcategoryLevel.SUBCATEGORY_LEVEL_FIRST),
        },

        second: {
            present: true,
            subcategory: null,
            values: getSubcategoryValuesArray(category, null, null, companyCategories, SubcategoryLevel.SUBCATEGORY_LEVEL_SECOND),
        },

        third: {
            present: true,
            subcategory: null,
            values: getSubcategoryValuesArray(category, null, null, companyCategories, SubcategoryLevel.SUBCATEGORY_LEVEL_THIRD),
        },
    };

    const newState: IState = {
        ...state,

        companyPageState: {
            ...state.companyPageState,

            category,
            categoryValidationLevel,
            categoryValidationMessage,

            subcategories,
        },
    };

    return setCompanySubcategory(newState);
}
