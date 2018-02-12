import * as React from "react";
import SVGInline from "react-svg-inline";
const validator = require("validator");
import {Color} from "../../../common/constants/Color";
import {ProductPanelCategory} from "./ProductPanelCategory";
import {IProduct} from "../../../../../types/entity";

interface IProductPanelProps {
    productId: string;

    products: IProduct[];

    onSelectProduct: (productId: string) => void;
    onChooseProduct: (productId: string) => void;
    onNewProductClick: () => void;
    onFilterByCategory: (category: string) => void;
}

export class ProductPanel extends React.Component<IProductPanelProps> {

    public static defaultProps = {
        products: [],
    };

    public render() {
        const loudspeaker: string = require("../../../../resources/icons/svg/shopping-cart.svg");
        const products: IProduct[] = this.props.products;
        const categories: string[] = [];
        const categoriesMap: object = {};

        for (const product of products) {
            if (categories.indexOf(product.category) === -1) {
                categories.push(product.category);
            }
            if (!categoriesMap.hasOwnProperty(product.category)) {
                categoriesMap[product.category] = [];
            }
            categoriesMap[product.category].push(product);
        }

        categories.sort();

        const panels: JSX.Element[] = [];
        for (const category of categories) {
            panels.push(<ProductPanelCategory
                key={panels.length}
                name={category}
                products={categoriesMap[category]}
                productId={this.props.productId}
                onFilterByCategory={this.props.onFilterByCategory}
                onSelectProduct={this.props.onSelectProduct}/>)
        }

        const draft: IProduct[] = this.getDraft();
        const drafts: JSX.Element[] = [];
        let selected: string;

        draft.map((item: IProduct, index: number) => {
            selected = item._id === this.props.productId ? "selected" : "";
            drafts.push(
                <div key={index}
                     className={`navPage__leftBar__Subcategory__text-item-wrapper ${selected}`}>
                    <span
                        className="navPage__leftBar__Subcategory__text-itemIcon">
                        <SVGInline svg={loudspeaker}
                                   fill={item.completed ? Color.BLUE : Color.GREY}
                                   width="13px"
                                   className="img__smallIcon"/>
                    </span>
                    <div className="navPage__leftBar__Subcategory__text-items"
                         onClick={this.onDraftClick}
                         id={item._id}>
                        {item.name}
                    </div>
                </div>,
            );
        });

        return (
            <div className="navPage__leftBar__Subcategory-wrapper">
                <div className="navPage__leftBar__Subcategory__section-wrapper">
                    <div className="navPage__leftBar__Subcategory__text-title">
                        <h2>{"PRODUCTS/SERVICES"}</h2>
                    </div>
                </div>

                <div className="navPage__leftBar__Subcategory__subsection-wrapper">
                    <button className={`navPage__leftBar__Subcategory__addBtn`}
                            onClick={this.props.onNewProductClick}>
                        <div className="navPage__leftBar__Subcategory__text-Subcategory">
                            <h3><span>+</span>Add New</h3>
                        </div>
                    </button>
                </div>

                {panels && panels.length > 0 ? <div className="navPage__leftBar__Subcategory__section-wrapper">
                    <div className="navPage__leftBar__Subcategory__text-title">
                        <h2 className={"navPage__leftBar__Subtitle__text-title"}>{"Categories"}</h2>
                    </div>
                </div> : <div/>}

                <div className="navPage__leftBar__Subcategory__items-wrapper">
                    {panels}
                </div>

                {drafts && drafts.length > 0 ? <div className="navPage__leftBar__Subcategory__section-wrapper">
                    <div className="navPage__leftBar__Subcategory__text-title">
                        <h2 className={"navPage__leftBar__Subtitle__text-title"}>{"Draft"}</h2>
                    </div>
                </div> : <div/>}

                <div className="navPage__leftBar__Subcategory__items-wrapper">
                    {drafts}
                </div>
                <div className="pannel__rights">© 2018 Treasure Systems, Inc.
                    All Rights Reserved
                </div>
            </div>
        );
    }

    private onDraftClick = (e: React.MouseEvent<HTMLDivElement>) => {
        this.props.onChooseProduct(e.target["id"]);
    };

    private getDraft = (): IProduct[] => {
        const result: IProduct[] = [];
        const products: IProduct[] = this.props.products;

        for (const product of products) {
            if (this.isDraft(product)) {
                result.push(product);
            }
        }

        return result;
    };

    private isDraft = (product: IProduct): boolean => {
        return product._id !== "0" &&
            (!product.category
                || !product.description
                || !product.object
                || !product.name
                || !(product.isOnline && product.link && validator.isURL(product.link))
                || !product.images.length);
    };
}
