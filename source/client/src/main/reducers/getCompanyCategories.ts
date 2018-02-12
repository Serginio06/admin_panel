export function getCompanyCategoriesSendReducer(state, action) {
    return {...state};
}

export function getCompanyCategoriesSuccessReducer(state, action) {
    const categoryParent2ChildrenMap = {},
        categoryChild2ParentMap = {},

        subcategories = state.companyPageState.subcategories;

    for (const category of action.payload) {
        categoryParent2ChildrenMap[category.id] = category.subcategories;

        if (!category.subcategories || category.subcategories.length === 0) {
            continue;
        }

        for (const subcategory of category.subcategories) {
            categoryParent2ChildrenMap[subcategory.id] = subcategory.subcategories;
            categoryChild2ParentMap[subcategory.id] = category;

            subcategories.first.values.push(subcategory);

            if (!subcategory.subcategories || subcategory.subcategories.length === 0) {
                continue;
            }

            for (const subSubcategory of subcategory.subcategories) {
                categoryParent2ChildrenMap[subSubcategory.id] = subSubcategory.subcategories;
                categoryChild2ParentMap[subSubcategory.id] = subcategory;

                subcategories.second.values.push(subSubcategory);

                if (!subSubcategory.subcategories || subSubcategory.subcategories.length === 0) {
                    continue;
                }

                for (const subSubSubcategory of subSubcategory.subcategories) {
                    categoryChild2ParentMap[subSubSubcategory.id] = subSubcategory;

                    subcategories.third.values.push(subSubSubcategory);
                }
            }
        }
    }

    return {
        ...state,
        categoryParent2ChildrenMap,

        categoryChild2ParentMap,

        companyCategories: action.payload,

        companyPageState: {
            ...state.companyPageState,

            subcategories,
        },
    };
}

export function getCompanyCategoriesFailedReducer(state, action) {
    return {
        ...state,
        failed: true,

        errorCode: action.errorCode,
    };
}
