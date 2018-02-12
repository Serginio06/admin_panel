import {SubcategoryLevel} from "../constants/SubcategoryLevel";
import {initCompany, IState, IUserCompany} from "../state";
import {Action} from "redux";

export function isChildrensChildrenPresent(state: IState, subcategoryId: string) {
    const categoryParent2ChildrenMap: any = state.categoryParent2ChildrenMap;

    if (!categoryParent2ChildrenMap.hasOwnProperty(subcategoryId)) {
        return false;
    }

    for (const child of categoryParent2ChildrenMap[subcategoryId]) {
        if (categoryParent2ChildrenMap.hasOwnProperty(child.id)) {
            return true;
        }
    }
}

export function getSubcategoryValuesArray(category: any, first: object, second: object, companyCategories: any[], subcategoryLevel: SubcategoryLevel) {
    let values: any[] = [];

    switch (subcategoryLevel) {
        case SubcategoryLevel.SUBCATEGORY_LEVEL_FIRST:
            if (category === null) {
                for (const cat of companyCategories) {
                    values = values.concat(cat.subcategories);
                }

                return values;
            }
            return category.subcategories;
    }
}

interface ICompanySubcategoryAction extends Action {
    subcategoryLevel: SubcategoryLevel;
}

export function nullifySubcategory(state: IState, action: ICompanySubcategoryAction) {
    const subcategoryLevel = action.subcategoryLevel;
    let subcategories = state.companyPageState.subcategories;

    switch (subcategoryLevel) {
        case SubcategoryLevel.SUBCATEGORY_LEVEL_FIRST:
            subcategories = {
                first: {
                    present: true,
                    subcategory: null,
                    values: getSubcategoryValuesArray(state.companyPageState.category, null, null, state.companyCategories, SubcategoryLevel.SUBCATEGORY_LEVEL_FIRST),
                },

                second: {
                    present: true,
                    subcategory: null,
                    values: [], // getSubcategoryValuesArray(state.companyPageState.category, null, null, state.companyCategories, SUBCATEGORY_LEVEL_SECOND),
                },

                third: {
                    present: true,
                    subcategory: null,
                    values: [], // getSubcategoryValuesArray(state.companyPageState.category, null, null, state.companyCategories, SUBCATEGORY_LEVEL_THIRD),
                },
            };
            break;

        /* case SUBCATEGORY_LEVEL_SECOND:
			subcategories = {
				...subcategories,

				second: {
					present: true,
					subcategory: null,
					values: getSubcategoryValuesArray(state.companyPageState.category, subcategories.first.subcategory, null, state.companyCategories, SUBCATEGORY_LEVEL_SECOND),
				},

				third: {
					present: isChildrensChildrenPresent(state, subcategories.first.subcategory.id),
					subcategory: null,
					values: getSubcategoryValuesArray(state.companyPageState.category, subcategories.first.subcategory, null, state.companyCategories, SUBCATEGORY_LEVEL_THIRD),
				}
			};
			break;

		case SUBCATEGORY_LEVEL_THIRD:
			subcategories = {
				...subcategories,

				third: {
					present: true,
					subcategory: null,
					values: getSubcategoryValuesArray(state.companyPageState.category, subcategories.first.subcategory, subcategories.second.subcategory, state.companyCategories, SUBCATEGORY_LEVEL_THIRD),
				}
			};
			break; */

        default:
            console.error(`Unknown subcategory level! ${subcategoryLevel}`);
            break;
    }

    const newState = {
        ...state,
        companyPageState: {
            ...state.companyPageState,

            subcategories,
        },
    };

    return setCompanySubcategory(newState);
}

export function setCompanySubcategory(state: IState) {
    const subcategories = state.companyPageState.subcategories;

    if (subcategories.third.present && subcategories.third.subcategory) {
        return _setCompanySubcategory(state, subcategories.third.subcategory);
    }

    if (subcategories.second.present && subcategories.second.subcategory) {
        return _setCompanySubcategory(state, subcategories.second.subcategory);
    }

    if (subcategories.first.present && subcategories.first.subcategory) {
        return _setCompanySubcategory(state, subcategories.first.subcategory);
    }

    return _setCompanySubcategory(state, null);
}

function _setCompanySubcategory(state: IState, subcategory) {
    let flag = true;
    const userCompanies = state.userCompanies.slice(),

        isEditable = state.companyPageState.isEditable;
    let companyId;

    for (const company of userCompanies) {
        if (company.checked) {
            companyId = company._id;
            break;
        }
    }

    for (const company of userCompanies) {
        if (company._id === "0" || (isEditable && company._id === companyId)) {
            company.generalCategory = {
                name: state.companyPageState.category && state.companyPageState.category.name,
            };
            company.subcategory = {
                name: subcategory ? subcategory.name : "",
            };
            flag = false;
            break;
        }
    }

    if (flag) {
        const company: IUserCompany = {...initCompany};
        company.generalCategory = {
            name: state.companyPageState.category && state.companyPageState.category.name,
        };
        company.subcategory = {
            name: subcategory ? subcategory.name : "",
        };
        userCompanies.unshift(company);
    }

    return {
        ...state,
        userCompanies,
    };
}
