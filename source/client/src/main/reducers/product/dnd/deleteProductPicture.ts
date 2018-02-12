import {ICompanyProduct, IState} from "../../../state";
import {IDeletePictureAction} from "../../../actions/product/dnd/deletePicture";

export const deleteProductPictureReducer = (state: IState, action: IDeletePictureAction): IState => {
    const images: any[] = state.productPageState.images,
        newImages: any[] = [],
        products: ICompanyProduct[] = state.companyProducts;

    images.forEach((item: any, index: number) => {
        if (+index !== +action.index) {
            newImages.push(item);
        }
    });

    for (const product of products) {
        if (product._id === state.productPageState.productId) {
            const pics = [];
            product.images.forEach((item: any, index: number) => {
                if (+index !== +action.index) {
                    pics.push(item);
                }
            });

            product.images = pics;
        }
    }

    return {
        ...state,
        companyProducts: products,
        productPageState: {
            ...state.productPageState,

            images: newImages,
        },
    };
};
