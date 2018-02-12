export const loadCompanyPromosSendReducer = (state) => ({...state});

export const loadCompanyPromosSuccessReducer = (state, action) => {
    const promos = action.payload.slice();

    if (promos && promos.length) {
        for (const promo of promos) {
            promo.checked = false;
        }
    }

    return {
        ...state,
        promos,
    };
};

export const loadCompanyPromosFailedReducer = (state, action) => ({
    ...state,
    promoPageState: {
        ...state.promoPageState,

        errorCode: action.errorCode,
        failed: true,
    },
});
