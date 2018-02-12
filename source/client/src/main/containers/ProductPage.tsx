import * as React from "react";
import {reduxConnect, routerConnect} from "../../helpers/decorators";
import {
    deleteProductAction,
    changeExpDateAction,
    changeIsOfflineAction,
    changeIsOnlineAction,
    changeIsUnlimitedProductDateAction,
    changeIsUnlimitedProductQuantityAction,
    changeLink2productAction,
    changeObjectAction,
    changePicturesOrderAction,
    changePriceAction,
    changeProductCategoryAction,
    changeProductDataLanguageAction,
    changeProductDescriptionAction,
    changeProductNameAction,
    changeProductQuantityAction,
    chooseProductAction,
    editProductAction,
    loadCompanyProductsAction,
    newProductAction,
    registerProductAction,
    uploadImageAction,
    selectProductAction,
    chooseProduct2editAction,
    filterAction,
} from "../actions/index";
import {deletePictureAction} from "../actions/product/dnd/deletePicture";
import {ProductPanel} from "../components/product/ProductPanel";
import {ProductRegistrationForm} from "../components/product/ProductRegistrationForm";
import {ProductTable} from "../components/product/ProductTable";
import {ICompanyProduct, IState} from "../state";
import {IProduct} from "../../../../types/entity";
import {IReduxProps} from "../../../../types/vendor";

export interface IProductPageProps extends IReduxProps {
    companyId: string
    companyProducts: ICompanyProduct[];
    productCategories: any[];
    productPageState: any;

    onDeleteProduct: (productId: string) => void;
    onFilterByCategory: (category: string) => void;
    onChooseProduct2Edit: () => void;
    onSelectProduct: (productId: string) => void;
    onChangeCategory: (category: string) => void;
    onChangeDataLanguage: () => void;
    onChangeDescription: (description: string) => void;
    onChangeExpDate: (expDate: any) => void;
    onChangeIsOffline: (isOffline: boolean) => void;
    onChangeIsOnline: (isOnline: boolean) => void;
    onChangeIsUnlimitedDate: (isUnlimitedDate: boolean) => void;
    onChangeIsUnlimitedQuantity: (isUnlimitedQuantity: boolean) => void;
    onChangeLink2product: (link2product: string) => void;
    onChangeName: (name: string) => void;
    onChangePicturesOrder: (pictures: any[]) => void;
    onChangePrice: (price: string) => void;
    onChangeProductObject: (object: string) => void;
    onChangeQuantity: (quantity: string) => void;
    onChooseProduct: (productId: string) => void;
    onDeletePicture: (index: string) => void;
    onLoadCompanyProducts: (companyId: string) => void;
    onProductUploadImage: (selectedFile: File, isImgExtAllowed: boolean, isImgSizeExceeded: boolean) => void;
}

interface IProductPageState {
    companyId: string;
    continue: boolean;
}

@routerConnect()
@reduxConnect(state2props, dispatch2props)
export class ProductPage extends React.Component<IProductPageProps, IProductPageState> {

    constructor(props: IProductPageProps) {
        super(props);

        this.state = {
            companyId: "",
            continue: false,
        };
    }

    public componentDidMount() {
        if (this.props.companyProducts && this.props.companyProducts.length) {
            for (const product of this.props.companyProducts as IProduct[]) {
                if (product._id === "0") {
                    this.props.onChooseProduct("0");
                    break;
                }
            }
        }
    }

    public componentWillReceiveProps(nextProps) {
        if (nextProps.companyId !== this.state.companyId) {
            if (nextProps.companyId && nextProps.companyId.length) {
                this.setState({
                    companyId: nextProps.companyId,
                });

                this.props.onLoadCompanyProducts(nextProps.companyId);
            }
        }
    }

    public render() {
        return (
            <div className="companyPage-wrapper">
                <div className="companyPage__panel_form-wrapper">
                    <ProductPanel
                        products={this.props.companyProducts}
                        productId={this.props.productPageState.productId}
                        onSelectProduct={this.props.onSelectProduct}
                        onChooseProduct={this.props.onChooseProduct}
                        onNewProductClick={this.onNewProductClick}
                        onFilterByCategory={this.props.onFilterByCategory}
                    />
                </div>

                <div className="companyPage__mainContent-wrapper">
                    {(
                        this.props.productPageState.isEditable
                    )
                    && <ProductRegistrationForm
                        productPageState={this.props.productPageState}
                        companyProducts={this.props.companyProducts}
                        productCategories={this.props.productCategories}

                        onDeletePicture={this.props.onDeletePicture}
                        onChangePicturesOrder={this.props.onChangePicturesOrder}
                        onChangeDataLanguage={this.props.onChangeDataLanguage}
                        onChangeCategory={this.props.onChangeCategory}
                        onChangeName={this.props.onChangeName}
                        onChangeDescription={this.props.onChangeDescription}
                        onChangeProductObject={this.props.onChangeProductObject}
                        onChangePrice={this.props.onChangePrice}
                        onChangeQuantity={this.props.onChangeQuantity}
                        onChangeLink2product={this.props.onChangeLink2product}
                        onChangeExpDate={this.props.onChangeExpDate}
                        onChangeIsUnlimitedQuantity={this.props.onChangeIsUnlimitedQuantity}
                        onChangeIsOnline={this.props.onChangeIsOnline}
                        onChangeIsOffline={this.props.onChangeIsOffline}
                        onProductUploadImage={this.props.onProductUploadImage}
                        onRegisterProduct={this.onRegisterProduct}
                        onChangeIsUnlimitedDate={this.props.onChangeIsUnlimitedDate}
                    />
                    }

                    <ProductTable
                        isNewPromo={"block"}
                        chosenCategory={this.props.productPageState.chosenCategory}
                        companyProducts={this.props.companyProducts}
                        onNewProduct={this.onNewProductClick}
                        onSelectProduct={this.props.onSelectProduct}
                        onChooseProduct2Edit={this.props.onChooseProduct2Edit}
                        onDeleteProduct={this.onDeleteProduct}
                    />
                </div>
            </div>
        );
    }

    private onNewProductClick = (): void => {
        this.props.dispatch(newProductAction());
    };

    private onRegisterProduct = (isContinue): void => {
        const pageState: IProduct = this.props.productPageState;
        const product: IProduct = {
                category: pageState.category,
                companyId: this.props.companyId,
                description: pageState.description,
                expDate: pageState.expDate,
                images: pageState.images,
                isOffline: pageState.isOffline,
                isOnline: pageState.isOnline,
                isUnlimitedQuantity: pageState.isUnlimitedQuantity,
                language: pageState.dataLanguage,
                link2product: pageState.link2product,
                name: pageState.name,
                object: pageState.object,
                price: pageState.price,
                productId: pageState.productId,
                quantity: pageState.quantity,
            };
        const companyProducts: ICompanyProduct[] = this.props.companyProducts;
        let productId: string;

        for (const product of companyProducts) {
            if (product.checked) {
                productId = product._id;
                break;
            }
        }

        product.productId = productId;

        if (product.price && product.price.indexOf(".") !== -1) {
            if (product.price.indexOf(".") === product.price.length - 1) {
                product.price += "00";
            }
        }

        if (productId && productId !== "0") {
            this.props.dispatch(editProductAction(product, isContinue));
        } else {
            this.props.dispatch(registerProductAction(product, isContinue));
        }

        this.setState({
            ...this.state,
            continue: isContinue,
        });
    };

    private onDeleteProduct = (): void => {
        const companyProducts: ICompanyProduct[] = this.props.companyProducts;

        for (const product of companyProducts) {
            if (product.checked) {
                this.props.onDeleteProduct(product._id);
                break;
            }
        }
    }
}

function state2props(state: IState): Partial<IProductPageProps> {
    return {
        companyId: state.navigationState.companyId,
        companyProducts: state.companyProducts,
        productCategories: state.productCategories,
        productPageState: state.productPageState,
    };
}

function dispatch2props(dispatch): Partial<IProductPageProps> {
    return {
        dispatch,
        onDeleteProduct: (productId: string) => dispatch(deleteProductAction(productId)),
        onFilterByCategory: (category: string) => dispatch(filterAction(category)),
        onChooseProduct2Edit: () => dispatch(chooseProduct2editAction()),
        onSelectProduct: (productId: string) => dispatch(selectProductAction(productId)),
        onChangeCategory: (category: string) => dispatch(changeProductCategoryAction(category)),
        onChangeDataLanguage: () => dispatch(changeProductDataLanguageAction()),
        onChangeDescription: (description: string) => dispatch(changeProductDescriptionAction(description)),
        onChangeExpDate: (expDate: any) => dispatch(changeExpDateAction(expDate)),
        onChangeIsOffline: (isOffline: boolean) => dispatch(changeIsOfflineAction(isOffline)),
        onChangeIsOnline: (isOnline: boolean) => dispatch(changeIsOnlineAction(isOnline)),
        onChangeIsUnlimitedDate: (isUnlimitedDate: boolean) =>
            dispatch(changeIsUnlimitedProductDateAction(isUnlimitedDate)),
        onChangeIsUnlimitedQuantity: (isUnlimitedQuantity: boolean) =>
            dispatch(changeIsUnlimitedProductQuantityAction(isUnlimitedQuantity)),
        onChangeLink2product: (link2product: string) => dispatch(changeLink2productAction(link2product)),
        onChangeName: (name: string) => dispatch(changeProductNameAction(name)),
        onChangePicturesOrder: (pictures: any[]) => dispatch(changePicturesOrderAction(pictures)),
        onChangePrice: (price: string) => dispatch(changePriceAction(price)),
        onChangeProductObject: (object: string) => dispatch(changeObjectAction(object)),
        onChangeQuantity: (quantity: string) => dispatch(changeProductQuantityAction(quantity)),
        onChooseProduct: (productId: string) => dispatch(chooseProductAction(productId)),
        onDeletePicture: (index: string) => dispatch(deletePictureAction(index)),
        onLoadCompanyProducts: (companyId: string) => dispatch(loadCompanyProductsAction(companyId)),
        onProductUploadImage: (selectedFile: File, isImgExtAllowed: boolean, isImgSizeExceeded: boolean) =>
            dispatch(uploadImageAction(selectedFile, isImgExtAllowed, isImgSizeExceeded)),
    };
}
