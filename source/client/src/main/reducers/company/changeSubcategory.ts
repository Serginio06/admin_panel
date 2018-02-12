import {isNull} from "util";
import {VALIDATION_LEVEL_ERROR, VALIDATION_LEVEL_SUCCESS} from "../../../common/constants/ValidationLevelType";
import {SubcategoryLevel} from "../../constants/SubcategoryLevel";
import {
    getSubcategoryValuesArray,
    isChildrensChildrenPresent,
    nullifySubcategory,
    setCompanySubcategory,
} from "../../util/subcategoryTreeUtil";
import {ICompanySubcategories, IState} from "../../state";
import {IChangeSubcategoryAction} from "../../actions/company/changeSubcategory";
import {ICategory} from "../../../../../types/entity";

export function changeCompanySubcategoryReducer(state: IState, action: IChangeSubcategoryAction): IState {
    //
    // some dark and weird magic is going here
    // be patient and try not to break it all
    // thank you <3
    //

    const companySubcategoryId: string = action.companySubcategoryId;
    const subcategoryLevel: SubcategoryLevel = action.subcategoryLevel;

    const categoryParent2ChildrenMap: any = state.categoryParent2ChildrenMap;
    const categoryChild2ParentMap: any = state.categoryChild2ParentMap;
    const companyCategories: ICategory[] = state.companyCategories;

    let companySubcategory: ICategory = null;
    let parent: ICategory;
    let category: ICategory = state.companyPageState.category;
    let subcategories: ICompanySubcategories = state.companyPageState.subcategories;
    let categoryValidationLevel: string = state.companyPageState.categoryValidationLevel;
    let categoryValidationMessage: string = state.companyPageState.categoryValidationMessage;

    if (companySubcategoryId === null) {
        return nullifySubcategory(state, action);
    }

    if (!categoryChild2ParentMap.hasOwnProperty(companySubcategoryId)) {
        return setCompanySubcategory(state);
    }

    parent = categoryChild2ParentMap[companySubcategoryId];

    for (const subcategory of parent.subcategories) {
        if (subcategory.id === companySubcategoryId) {
            companySubcategory = subcategory;
            break;
        }
    }

    if (companySubcategory === null) {
        return setCompanySubcategory(state);
    }

    switch (subcategoryLevel) {
        case SubcategoryLevel.SUBCATEGORY_LEVEL_FIRST:
            if (isNull(category)) {
                category = categoryChild2ParentMap[companySubcategoryId];
            }

            subcategories = {
                first: {
                    present: true,
                    subcategory: companySubcategory,
                    values: getSubcategoryValuesArray(category, companySubcategory, null, companyCategories, SubcategoryLevel.SUBCATEGORY_LEVEL_FIRST),
                },

                second: {
                    present: categoryParent2ChildrenMap.hasOwnProperty(companySubcategoryId),
                    subcategory: null,
                    values: [], // getSubcategoryValuesArray(category, companySubcategory, null, companyCategories, SUBCATEGORY_LEVEL_SECOND),
                },

                third: {
                    present: isChildrensChildrenPresent(state, companySubcategoryId),
                    subcategory: null,
                    values: [], // getSubcategoryValuesArray(category, companySubcategory, null, companyCategories, SUBCATEGORY_LEVEL_THIRD),
                },
            };
            break;

        default:
            console.error(`Unknown subcategory level! ${subcategoryLevel}`);
            break;
    }

    if (!category) {
        categoryValidationLevel = VALIDATION_LEVEL_ERROR;
        categoryValidationMessage = "Field must be filled";
    } else {
        categoryValidationLevel = VALIDATION_LEVEL_SUCCESS;
        categoryValidationMessage = "";
    }

    const newState = {
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
