import * as React from "react";
import SVGInline from "react-svg-inline";
import {Color} from "../../../common/constants/Color";
import {IUserCompany} from "../../state";

export interface ICompanyPanelState {
    activeCompany: string;
    isNew: boolean;
}

export interface ICompanyPanelProps {
    userCompanies: IUserCompany[],
    companyId: string;
    onChooseCompany: (companyId: string, forEdit: boolean) => void;
    onSelectCompany: (companyId: string) => void;
    onNewCompany: () => void;
}

export class CompanyPanel extends React.Component<ICompanyPanelProps, ICompanyPanelState> {
    constructor(props: ICompanyPanelProps) {
        super(props);

        this.state = {
            activeCompany: null,
            isNew: false,
        };
    }

    public componentWillReceiveProps(nextProps: ICompanyPanelProps): void {
        if (this.state.activeCompany !== nextProps.companyId) {
            this.setState({
                activeCompany: nextProps.companyId,
            });
        }
    }

    public render(): JSX.Element {
        const suiteCase = require("../../../../resources/icons/svg/suiteCase.svg");
        const active: string = this.state.isNew ? "active" : "";

        return (
            <div className="navPage__leftBar__Subcategory-wrapper">
                <div className="navPage__leftBar__Subcategory__section-wrapper">
                    <div className="navPage__leftBar__Subcategory__text-title">
                        <h2>{"COMPANIES"}</h2>
                    </div>
                </div>

                <div className="navPage__leftBar__Subcategory__subsection-wrapper">
                    <button
                        className={`navPage__leftBar__Subcategory__addBtn at-panel ${active}`}
                        onClick={this.onNewCompanyButtonClick}
                    >
                        <div className="navPage__leftBar__Subcategory__text-Subcategory">
                            <h3><span>+</span>Add New</h3>
                        </div>
                    </button>
                </div>

                <div className="navPage__leftBar__Subcategory__subsection-wrapper">
                    {
                        this.props.userCompanies && this.props.userCompanies.map((item, index) => {
                            if (item._id !== "0") {
                                const selected: string = item._id === this.props.companyId ? " selected" : "";
                                let iconColor;

                                if (selected) {
                                    iconColor = Color.BLUE;
                                } else {
                                    if (item.completed) {
                                        iconColor = Color.GREEN;
                                    } else {
                                        iconColor = Color.WHITE;
                                    }
                                }
                                return (
                                    <div key={index} id={item._id}
                                         className={`navPage__leftBar__Subcategory__text-item-wrapper ${selected}`}
                                         onClick={this.onCompanyItemClick}>
                                    <span id={item._id} className="navPage__leftBar__Subcategory__text-itemIcon">
                                        <SVGInline
                                            fill={iconColor}
                                            id={item._id}
                                            width="13px"
                                            height="10px"
                                            className={"img__smallIcon"}
                                            svg={suiteCase}
                                        />
                                    </span>
                                        <div className="navPage__leftBar__Subcategory__text-items" id={item._id}>
                                            {item.name}
                                        </div>
                                    </div>
                                );
                            }
                        })}
                </div>
                <div className="pannel__rights">© 2018 Treasure Systems, Inc.
                    All Rights Reserved</div>
            </div>
        );
    }

    private onCompanyItemClick = (e: React.FormEvent<HTMLDivElement>): void => {
        const id: string = (e.target as any).id;

        for (const company of this.props.userCompanies) {
            if (company._id === id) {
                if (company.completed) {
                    this.setState({
                        activeCompany: id,
                        isNew: false,
                    });

                    this.props.onChooseCompany(id, false);
                } else {
                    this.props.onSelectCompany(id);
                }
                break;
            }
        }
    };

    private onNewCompanyButtonClick = (): void => {
        this.setState({isNew: true, activeCompany: null});
        this.props.onNewCompany();
    };
}
