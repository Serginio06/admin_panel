import * as React from "react";
import SVGInline from "react-svg-inline";
import {PageType} from "../../../main/constants/PageType";
import {routerConnect} from "../../../helpers/decorators";
import {ICompanyProduct} from "../../../main/state";
import {LeftNavBarButton} from "./LeftNavBarButton";
import {Color} from "../../constants/Color";

const bell = require("../../../../resources/icons/svg/bell.svg");
const gear = require("../../../../resources/icons/svg/gear.svg");
const group = require("../../../../resources/icons/svg/group.svg");
const envelop = require("../../../../resources/icons/svg/envelop.svg");
const suiteCase = require("../../../../resources/icons/svg/suiteCase.svg");
const lineChart = require("../../../../resources/icons/svg/line-chart.svg");
const loudSpeaker = require("../../../../resources/icons/svg/loudspeaker.svg");
const shoppingCart = require("../../../../resources/icons/svg/shopping-cart.svg");
const logout = require("../../../../resources/icons/svg/logout.svg");

export interface ILeftNavBarProps {
    name: string;
    userName: string;
    companyId?: string;
    history: object;
    currentPage: PageType;
    companyProducts: ICompanyProduct[];

    onLogout: () => void;
}

export interface ILeftNavBarState {
    clientsActive: string;
    companiesActive: string;
    productsActive: string;
    promosActive: string;
    statisticsActive: string;
    welcomeActive: string;
}

@routerConnect()
export class LeftNavBar extends React.Component<ILeftNavBarProps, ILeftNavBarState> {
    public static defaultProps: Partial<ILeftNavBarProps> = {
        name: "Add Company",
        userName: "Sign in",
    };

    constructor(props: ILeftNavBarProps) {
        super(props);

        this.state = {
            clientsActive: "",
            companiesActive: "",
            productsActive: "",
            promosActive: "",
            statisticsActive: "",
            welcomeActive: "",
        };
    }

    public render(): JSX.Element {
        let companiesActive: boolean = false;
        let productsActive: boolean = false;
        let promosActive: boolean = false;
        let statisticsActive: boolean = false;

        const productsDisabled: boolean = this.props.name === "";
        const promosDisabled: boolean = productsDisabled || !(this.props.companyProducts && !!this.props.companyProducts.length);
        const statisticsDisabled: boolean = promosDisabled;

        switch (this.props.currentPage) {
            case PageType.COMPANY:
                companiesActive = true;
                break;

            case PageType.PRODUCT:
                productsActive = true;
                break;

            case PageType.WELCOME:
                break;

            case PageType.PROMO:
                promosActive = true;
                break;

            case PageType.PROMO_STATISTICS:
                statisticsActive = true;
                break;

            default:
                break;
        }

        const userName: string = this.props.userName;

        const logoutButton: JSX.Element = !userName || userName === "Sign in"
            ? <div className="navPage__leftBar__category__img-wrapper"/>
            : (
                <div className="navPage__leftBar__category__img-wrapper" onClick={this.props.onLogout}>
                    <SVGInline svg={logout} fill={Color.WHITE}/>
                </div>
            );

        return (
            <div className="navPage__leftBar-wrapper">
                <div className="navPage__leftBar__category-wrapper">
                    <div className="navPage__leftBar__category__section-wrapper">
                        <LeftNavBarButton
                            active={false}
                            disabled={false}
                            icon={envelop}
                            onClick={this.onMessagesClick}
                            width={"20px"}
                            badge={"2"}
                        />

                        <LeftNavBarButton
                            active={false}
                            disabled={false}
                            icon={bell}
                            width={"20px"}
                            height={"19px"}
                            onClick={this.onNotificationsClick}
                        />

                        <LeftNavBarButton
                            active={false}
                            disabled={false}
                            icon={gear}
                            width={"20px"}
                            onClick={this.onSettingsClick}
                        />
                        {logoutButton}
                    </div>

                    <div className="navPage__leftBar__category__section-wrapper-2">
                        <LeftNavBarButton
                            active={companiesActive}
                            disabled={false}
                            icon={suiteCase}
                            onClick={this.onCompaniesClick}
                        />

                        <LeftNavBarButton
                            active={productsActive}
                            disabled={productsDisabled}
                            icon={shoppingCart}
                            onClick={this.onProductsClick}
                            width={"28px"}
                            height={"31px"}
                        />

                        <LeftNavBarButton
                            active={promosActive}
                            disabled={promosDisabled}
                            icon={loudSpeaker}
                            onClick={this.onPromosClick}
                        />

                        <LeftNavBarButton
                            active={statisticsActive}
                            disabled={statisticsDisabled}
                            icon={lineChart}
                            onClick={this.onStatisticsClick}
                        />

                        <LeftNavBarButton
                            active={false}
                            disabled
                            icon={group}
                            onClick={this.onClientsClick}
                        />
                    </div>
                </div>
            </div>
        );
    }

    private onMessagesClick = (): void => {
        // do nothing
    };

    private onNotificationsClick = (): void => {
        // do nothing
    };

    private onSettingsClick = (): void => {
        // do nothing
    };

    private onCompaniesClick = (): void => {
        if (document.location.href.indexOf("/companies") !== -1) {
            (this.props.history as any).push("welcome");

            this.setState({
                companiesActive: "",
                productsActive: "",
                promosActive: "",
                statisticsActive: "",
            });
            return;
        }

        this.setState({
            companiesActive: "active",
            productsActive: "",
            promosActive: "",
            statisticsActive: "",
        });

        (this.props.history as any).push("companies");
    };

    private onProductsClick = (): void => {
        if (!this.props.name || this.props.name === "Add Company") {
            return;
        }

        if (document.location.href.indexOf("/projects") !== -1) {
            (this.props.history as any).push("welcome");

            this.setState({
                companiesActive: "",
                productsActive: "",
                promosActive: "",
                statisticsActive: "",
            });
            return;
        }

        this.setState({
            companiesActive: "",
            productsActive: "active",
            promosActive: "",
            statisticsActive: "",
        });

        (this.props.history as any).push("projects");
    };

    private onPromosClick = (): void => {
        if (!this.props.name || this.props.name === "Add Company") {
            return;
        }

        if (document.location.href.indexOf("/promos") !== -1) {
            (this.props.history as any).push("welcome");

            this.setState({
                companiesActive: "",
                productsActive: "",
                promosActive: "",
                statisticsActive: "",
            });
            return;
        }

        this.setState({
            companiesActive: "",
            productsActive: "",
            promosActive: "active",
            statisticsActive: "",
        });

        (this.props.history as any).push("promos");
    };

    private onStatisticsClick = (): void => {
        if (!this.props.name || this.props.name === "Add Company") {
            return;
        }

        if (document.location.href.indexOf("/statistics") !== -1) {
            (this.props.history as any).push("welcome");

            this.setState({
                companiesActive: "",
                productsActive: "",
                promosActive: "",
                statisticsActive: "",
            });
            return;
        }

        this.setState({
            companiesActive: "",
            productsActive: "",
            promosActive: "",
            statisticsActive: "active",
        });

        (this.props.history as any).push("statistics");
    };

    private onClientsClick = (): void => {
        // document.location.href = "/clients";
    };
}
