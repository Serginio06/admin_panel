import * as React from "react";
import SVGInline from "react-svg-inline";
import {Color} from "../../../common/constants/Color";
import {Panel} from "react-bootstrap";
import {cutLabel} from "../../../common/util";

interface IProductPanelCategoryProps {
    name: string;

    productId: string;
    products: any[];

    onSelectProduct: (productId: string) => void;
    onFilterByCategory: (category: string) => void;
}

interface IProductPanelCategoryState {
    expanded: boolean;
}

export class ProductPanelCategory extends React.Component<IProductPanelCategoryProps, IProductPanelCategoryState> {
    constructor(props: IProductPanelCategoryProps) {
        super(props);

        this.state = {
            expanded: false,
        };
    }

    public render() {
        const shoppingCart: string = require("../../../../resources/icons/svg/shopping-cart.svg");
        const header: JSX.Element = <div onClick={this.onHeaderClick}>
            <span className="navPage__leftBar__Subcategory__text-itemIcon">
                <SVGInline svg={shoppingCart} fill={Color.WHITE} width="13px"
                           className="img__smallIcon"/>
            </span>
            {this.props.name}
        </div>;

        return (
            <div className="productPanel__Subcategory__text-item-wrapper" onClick={this.onHeaderClick}>
                <div className="navPage__leftBar__Subcategory__text-Subcategory">
                    <Panel collapsible header={header} defaultExpanded={false} expanded={this.state.expanded}>
                        {/*<Panel.Heading onClick={this.onHeaderClick}>{this.props.name}</Panel.Heading>*/}
                        {/*<PanelCollapse>*/}
                            {/*<PanelBody>*/}
                                {this.props.products && this.props.products.map((item, index) => {
                                    const selected: string = item._id === this.props.productId ? "selected" : "";
                                    return (
                                        <div key={index}
                                             onClick={this.onItemClick}
                                             id={item._id}
                                             className={`navPage__leftBar__Subcategory__text-item-wrapper productCategory ${selected}`}
                                        >
                                            {cutLabel(item.name, 12)}
                                        </div>
                                    );
                                })}
                            {/*</PanelBody>*/}
                        {/*</PanelCollapse>*/}
                    </Panel>
                </div>
            </div>
        );
    }

    private onItemClick = (e) => {
        e.stopPropagation();

        this.props.onSelectProduct(e.target.id);
    };

    private onHeaderClick = (): void => {
        this.setState({
            expanded: !this.state.expanded,
        });

        this.props.onFilterByCategory(this.props.name);
    };
}
