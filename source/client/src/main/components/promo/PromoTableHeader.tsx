import * as React from "react";
import SVGInline from "react-svg-inline";
import {Color} from "../../../common/constants/Color";
import {IPromoPageProps} from "../../containers/PromoPage";
import {ProductTable} from "../product/ProductTable";
import {PromoTable} from "./PromoTable";
import {IDropdownListValue} from "../../state";

const shoppingCart = require("../../../../resources/icons/svg/shopping-cart.svg"),
    rewardCard = require("../../../../resources/icons/svg/rewardCardActive.svg"),
    budget = require("../../../../resources/icons/svg/budget.svg"),
    target = require("../../../../resources/icons/svg/target.svg");

interface IPromoTableHeaderProps extends IPromoPageProps {
    onNewProduct?: () => void;
    objectives?: any[];
    rewardTypes?: IDropdownListValue[];
    isHeader?: boolean;
}

interface IPromoTableHeaderState {
    productToggler: string;
    tableElem: string;

}

export class PromoTableHeader extends React.Component<IPromoTableHeaderProps, IPromoTableHeaderState> {

    constructor(props: IPromoTableHeaderProps) {
        super(props);
        this.state = {
            productToggler: "Product/Services",
            tableElem: "Product/Services",
        };
    }

    public render(): JSX.Element {
        const tableElem = this.state.productToggler === "Product/Services" ?
            <ProductTable isNewPromo={"none"}
                          chosenCategory={this.props.productPageState.chosenCategory}
                          companyProducts={this.props.companyProducts}
                          onNewProduct={this.props.onNewProduct}/> : <PromoTable {...this.props} />;

        return (
            <div className="block__full-width">

                <div className="tableBlock__header">
                    <div className="tableBlock__header__button-wrapper">
                        <div className="tableBlock__header__button" onClick={this.onProductsClick}>
                            <SVGInline svg={shoppingCart} fill={Color.GREY_DARK} width="20px" height="19px"
                                       className="img__midIcon"/>
                            <span className="mainBlock__header__text textUnselectable active"
                            >
                                Product/Services
                            </span>
                        </div>
                        <div className="tableBlock__header__button" onClick={this.onCardsClick}>
                            <SVGInline svg={rewardCard} width="16px" className="img__midIcon buttonDisabled"/>
                            <span className="mainBlock__header__text textUnselectable">
                                Reward cards
                            </span>
                        </div>
                        <div className="tableBlock__header__button buttonDisabled">
                            <SVGInline svg={target} width="16px" className="img__midIcon buttonDisabled"/>
                            <span className="mainBlock__header__text textUnselectable buttonDisabled">
                                Target Audience
                            </span>
                        </div>
                        <div className="tableBlock__header__button buttonDisabled">
                            <SVGInline svg={budget} className="img__midIcon buttonDisabled" width="16px"/>
                            <span className="mainBlock__header__text textUnselectable buttonDisabled">
                                {"Schedule & Budget"}
                            </span>
                        </div>
                    </div>
                </div>
                {tableElem}
            </div>
        );
    }

    private onProductsClick = (): void => {
        if (this.state.productToggler !== "Product/Services") {
            this.setState({
                productToggler: "Product/Services",
            });
        }
    };
    private onCardsClick = (): void => {
        if (this.state.productToggler !== "Reward Cards") {
            this.setState({
                productToggler: "Reward Cards",
            });
        }
    }
}
