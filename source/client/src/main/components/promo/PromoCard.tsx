import * as React from "react";
import Img from "react-image";
import SVGInline from "react-svg-inline";
import {Color} from "../../../common/constants/Color";
import {ICompanyProduct} from "../../state";
import {CountDown} from "./CountDown";
import {PromoType} from "../../../../../types/constants/PromoType";
import {PromoCondition} from "../../../../../types/constants/PromoCondition";

const diamondWhite: string = require("../../../../resources/icons/svg/diamondWhite2.svg");
const chevronLeft: string = require("../../../../resources/icons/svg/chevron-left.svg");
const buttonFrame: string = require("../../../../resources/icons/svg/buttonFrame.svg");

interface IPromoCardProps {
    product: ICompanyProduct;

    condition?: string;

    discount?: string;

    valueSign: string;
    value: string;
    newPrice?: string;

    time: number;

    logo: string,
    name: string,
    type: string,
    about: string,
    offerPhrase: string,
}

interface IPromoCardState {
    expanded: string;
}

export class PromoCard extends React.Component<IPromoCardProps, IPromoCardState> {
    public static defaultProps: Partial<IPromoCardProps> = {
        logo: "",
        name: "",
    };

    constructor(props: IPromoCardProps) {
        super(props);
        this.state = {
            expanded: "",
        };
    }

    public render(): JSX.Element {
        const {
            product,
            offerPhrase,
            about,
            type,
            value,
            newPrice,
            time,
            logo,
            name,
        } = this.props;

        let {valueSign} = this.props;

        const pic: string = product && product.images && product.images.length ? product.images[0] : "";

        let firstCircle: JSX.Element;
        let secondCircle: JSX.Element;
        let values: string[];

        values = value.toString().split(".");

        if (values[0] && values[0].charAt(0) === "$") {
            values[0] = values[0].substr(1);
        }

        values[1] = values[1] ? values[1] : "00";

        if (values[1] === "00" && !values[0]) {
            values[1] = "";
            valueSign = "";
        } else if (values[1].length === 1) {
            values[1] += 0;
        }

        if (!values[0] && !values[1]) {
            valueSign = "";
        }

        const curPrice: string[] = newPrice ? newPrice.toString().split(".") : [];
        curPrice[0] = curPrice[0] ? curPrice[0] : "0";
        curPrice[1] = curPrice[1] ? curPrice[1].substr(0, 2) : "00";

        let save: string = "";
        if (product && product.price && typeof +product.price === "number" && typeof +newPrice === "number") {
            save = (+product.price - +newPrice).toString().substr(0, 4);
            save = "save $" + save;
        }

        let isOnlineLabel: string;
        if (product && product.isOnline && product.isOffline) {
            isOnlineLabel = null;
        } else if (product && product.isOnline) {
            isOnlineLabel = "*online";
        } else {
            isOnlineLabel = "*in store";
        }

        firstCircle = (
            <div className="promoCard__info-circle info-circle_left">
                {<p className="condition-where">{`*${this.props.condition}`}</p>}
                {type && <p className="condition-type">{type}</p>}
                {<p className="condition-percent">
                    {valueSign === "%" ? `${values[0]}${valueSign}` : `${valueSign}${values[0]}`}
                </p>}
            </div>
        );

        secondCircle = (
            <div className="promoCard__info-circle info-circle_right">
                <p className="old-price">{"BEFORE "}
                    {<del>{`$${product && product.price ? product.price : "0.00"}`}</del>}
                </p>
                <p className="current-price"><span className="value-sign">$</span>{curPrice[0]}<sup>{curPrice[1]}</sup>
                </p>
                {<p className="save-info">{save}</p>}
            </div>
        );

        return (
            <div className="PromoCard">
                <div className={"promo-company-logo " + this.state.expanded}>
                    <Img src={logo}/>
                </div>
                <div className={"icon_toolbar " + this.state.expanded}>
                    {
                        <button className="icon-shop">
                            <SVGInline
                                height="35.4px"
                                className={"icon icon-shop"}
                                svg={require("../../../../resources/icons/svg/shop-color.svg")}/>
                            <div className="promoCard__distance invisible">
                                <SVGInline
                                    fill="#fe947c"
                                    className={"icon icon-navigator"}
                                    svg={require("../../../../resources/icons/svg/arrow.svg")}/>
                                {"0.3 mi"}
                            </div>
                        </button>
                    }
                    {
                        <button className="icon-share">
                            <SVGInline
                                width="35px"
                                height="38px"
                                className={"icon icon-share"}
                                svg={require("../../../../resources/icons/svg/share-color.svg")}/>
                            <div className="promoCard__distance"/>
                        </button>
                    }
                </div>
                {/*<div className="line-cut" />*/}
                <div className={"promoCard__content-wrapper " + this.state.expanded}>
                    <div className="promoCard__top">
                        <div className="promoCard__top__img-wrapper">
                            {pic && <img src={pic} alt="Product/service pic"/>}
                        </div>
                        <div className="promoCard__top__logo-wrapper">
                            <SVGInline svg={diamondWhite} width="20px" height="21px" fill={Color.WHITE}
                                       className="promoCard__top__logo"/>
                            <div className="btn_back">
                                {this.state.expanded &&
                                <button onClick={this.onCartRevert}>
                                    <SVGInline
                                        svg={chevronLeft} width="20px" height="20px" fill={Color.WHITE}
                                        className="promoCard__top__logo"/>
                                </button>}
                            </div>
                        </div>

                        {firstCircle}

                        {secondCircle}

                    </div>

                    <div className={"promoCard__bottom " + this.state.expanded}>
                    </div>

                </div>
                <div className={"promoCard__bottom__companyDesc-wrapper " + this.state.expanded}>
                    <h3 className={"promoCard__company-name " + this.state.expanded}>{name}</h3>
                    <p className={"about " + this.state.expanded}>
                        {offerPhrase}
                    </p>
                    <p className={"promoCard__bottom__promoDesc-wrapper " + this.state.expanded}>
                        {about}
                    </p>
                </div>
                <div className={"promoCard__bottom__buttons-wrapper " + this.state.expanded}>
                    <button onClick={this.onCardExpand} className="promoCard__bottom__button-oval"
                            tabIndex={-1}>
                        <SVGInline svg={buttonFrame}/>
                        {this.state.expanded ? "ACTIVATE" : "OPEN"}
                    </button>
                </div>
                <div className={"promoCard__indicators " + this.state.expanded}>
                    {
                        this.state.expanded ?
                            <div className={"promoCard__terms-conditions " + this.state.expanded}
                                 style={{cursor: "pointer"}}>{"Terms & Conditions"}</div>
                            : (
                                isOnlineLabel === "*online"
                                    ? <div className="promoCard__online">
                                        <SVGInline
                                            fill={Color.GREY_LIGHT}
                                            className={"icon icon-online"}
                                            svg={require("../../../../resources/icons/svg/globe_earth.svg")}/>
                                        {"Online"}
                                    </div>
                                    : <div className="promoCard__distance invisible">
                                        <SVGInline
                                            fill="rgba(117, 128, 147)"
                                            className={"icon icon-navigator"}
                                            svg={require("../../../../resources/icons/svg/arrow.svg")}/>
                                        {"0.3 mi"}
                                    </div>
                            )
                    }
                    {<div className={"promoCard__expires-time " + this.state.expanded}>
                        {"Expires in "}
                        <CountDown time={time}/>
                    </div>
                    }
                </div>
            </div>
        );
    }

    private onCardExpand = (): void => {
        this.setState({expanded: "expanded"});
    };

    private onCartRevert = (): void => {
        this.setState({expanded: ""});
    };
}
