import "./Navigation.scss";
import * as React from "react";
import {ICompanyProduct, IPromoPageState, IUserCompany} from "../../../main/state";
import {TopNavBar} from "./TopNavBar";
import {LeftNavBar} from "./LeftNavBar";
import {PageType} from "../../../main/constants/PageType";

interface INavigationProps {
    name?: string;
    logo?: string;
    companyId?: string;
    userName?: string;

    currentPage?: PageType;

    userCompanies?: IUserCompany[];
    promoPageState?: IPromoPageState;
    companyProducts?: ICompanyProduct[];

    onLogout?: () => void;

    history?: any;
}

export class Navigation extends React.Component<INavigationProps> {

    public render(): JSX.Element {
        return (
            <div className="navPage">
                <TopNavBar
                    name={this.props.name}
                    logo={this.props.logo}
                    userName={this.props.userName}
                />

                <div className="leftMenu_mainContent-wrapper">
                    <LeftNavBar
                        name={this.props.name}
                        history={this.props.history}
                        userName={this.props.userName}
                        companyId={this.props.companyId}
                        currentPage={this.props.currentPage}
                        companyProducts={this.props.companyProducts}

                        onLogout={this.props.onLogout}
                    />

                    <div className="mainContent-wrapper">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}
