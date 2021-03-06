import * as React from "react";
import {Color} from "../../../common/constants/Color";
import {ICompanyPromo, IPromoPageState, IStepsState} from "../../state";
import * as classNames from "classnames";
import SVGInline from "react-svg-inline";
import {PromoStatus} from "../../../../../types/constants/PromoStatus";
import {IPromo} from "../../../../../types/entity";

interface IPromoPanelProps {
    promoPageState: IPromoPageState;

    promos: ICompanyPromo[];

    onChoosePromo2view?: (promoId: string) => void;
    onNewPromo: () => void;
}

interface IPromoPanelState {
}

export class PromoPanel extends React.Component<IPromoPanelProps, IPromoPanelState> {
    public render(): JSX.Element {
        const loudspeaker: string = require("../../../../resources/icons/svg/loudspeaker.svg");

        const steps: IStepsState[] = this.props.promoPageState.steps;
        const currentStep: number = this.props.promoPageState.currentStep;
        const promoSteps: JSX.Element = this.props.promoPageState.isEditable ? (
            <ul className={"promoPanel__ul"}>
                {steps.map((item: IStepsState, index: number) => {
                    const stepClassName = classNames({actionCompleted: item.isCompleted}, {currentStep: currentStep === index}, "promoPanel__steps");

                    return <li key={index} className={stepClassName}>
                        {item.name}
                    </li>;
                })}
            </ul>
        ) : null;

        const actives: IPromo[] = this.props.promos.filter((promo) => {
                return promo.status === PromoStatus.ACTIVE
            });
        const activesElem: JSX.Element[] = [];

        actives.map((item: IPromo, index: number) => {
            const selected: string = item._id === this.props.promoPageState._id ? "selected" : "";

            activesElem.push(
                <div key={index} className={"navPage__leftBar__Subcategory__text-item-wrapper " + selected}>
                    <span
                        className="navPage__leftBar__Subcategory__text-itemIcon">
                    <SVGInline svg={loudspeaker}
                               fill={Color.GREEN}
                               width="13px"
                               className="img__smallIcon"/>
                    </span>
                    <div className="navPage__leftBar__Subcategory__text-items"
                         onClick={this.onSelect}
                         id={item._id}>
                        {item.name}
                    </div>
                </div>,
            );
        });

        const drafts: ICompanyPromo[] = this.props.promos.filter((promo: ICompanyPromo) => (promo.status === PromoStatus.DRAFT));
        const draftsElem: JSX.Element[] = [];

        drafts.map((item: ICompanyPromo, index: number): void => {
            if (item.name.length) {
                const selected: string = item._id === this.props.promoPageState._id ? "selected" : "";

                draftsElem.push(
                    <div
                        key={index}
                        className={"navPage__leftBar__Subcategory__text-item-wrapper " + selected}
                    >
                    <span
                        className="navPage__leftBar__Subcategory__text-itemIcon">
                    <SVGInline svg={loudspeaker} width="13px" fill={Color.GREY_LIGHT}
                               className="img__smallIcon"/>
                    </span>
                        <div className="navPage__leftBar__Subcategory__text-items"
                             onClick={this.onSelect}
                             id={item._id}>
                            {item.name}
                        </div>
                    </div>,
                );
            }
        });

        const archive: ICompanyPromo[] = this.props.promos.filter((promo: ICompanyPromo) => {
            return promo.status === PromoStatus.EXPIRED;
        });
        const archivedElements: JSX.Element[] = [];

        archive.map((item: ICompanyPromo, index: number) => {
            if (item.name.length) {
                const selected: string = item._id === this.props.promoPageState._id ? "selected" : "";

                archivedElements.push(
                    <div
                        key={index}
                        className={"navPage__leftBar__Subcategory__text-item-wrapper " + selected}
                    >
                    <span
                        className="navPage__leftBar__Subcategory__text-itemIcon">
                    <SVGInline svg={loudspeaker} fill={Color.GREY} width="13px"
                               className="img__smallIcon"/>
                    </span>
                        <div className="navPage__leftBar__Subcategory__text-items"
                             onClick={this.onSelect}
                             id={item._id}>
                            {item.name}
                        </div>
                    </div>,
                );
            }
        });

        return (
            <div className="navPage__leftBar__Subcategory-wrapper">
                <div className="navPage__leftBar__Subcategory__section-wrapper">
                    <div className="navPage__leftBar__Subcategory__text-title">
                        <h2>{"PROMO CAMPAIGNS"}</h2>
                    </div>
                </div>
                <div className="navPage__leftBar__Subcategory__subsection-wrapper"
                     style={{background: this.props.promoPageState.isEditable ? "#1B1F26" : ""}}>
                    <button className={`navPage__leftBar__Subcategory__addBtn ${this.props.promoPageState.isEditable ? "active" : null}`}
                            onClick={this.onNewPromo}>

                        <div className="navPage__leftBar__Subcategory__text-Subcategory">
                            <h3><span>+</span>Create New</h3>
                        </div>
                    </button>
                    {promoSteps}
                </div>

                {activesElem.length > 0 &&
                <div className="navPage__leftBar__Subcategory__section-wrapper">
                    <div className="navPage__leftBar__Subcategory__text-title">
                        <h2 className={"navPage__leftBar__Subtitle__text-title"}>{"Active"}</h2>
                    </div>
                </div>}

                {activesElem.length > 0 &&
                <div className="navPage__leftBar__Subcategory__items-wrapper">
                    {activesElem}
                </div>}

                {false && // forApproval
                <div className="navPage__leftBar__Subcategory__section-wrapper">
                    <div className="navPage__leftBar__Subcategory__text-title">
                        <h2 className={"navPage__leftBar__Subtitle__text-title"}>{"For Approval"}</h2>
                    </div>
                </div>}

                {draftsElem.length > 0 &&
                <div className="navPage__leftBar__Subcategory__section-wrapper">
                    <div className="navPage__leftBar__Subcategory__text-title">
                        <h2 className={"navPage__leftBar__Subtitle__text-title"}>{"Draft"}</h2>
                    </div>
                </div>}

                {draftsElem.length > 0 &&
                <div className="navPage__leftBar__Subcategory__items-wrapper">
                    {draftsElem}
                </div>}

                {archivedElements.length > 0 &&
                <div className="navPage__leftBar__Subcategory__section-wrapper">
                    <div className="navPage__leftBar__Subcategory__text-title">
                        <h2 className={"navPage__leftBar__Subtitle__text-title"}>{"Archive"}</h2>
                    </div>
                </div>}

                {archivedElements.length > 0 &&
                <div className="navPage__leftBar__Subcategory__items-wrapper">
                    {archivedElements}
                </div>}

                <div className="pannel__rights">© 2018 Treasure Systems, Inc.
                    All Rights Reserved
                </div>
            </div>
        );
    }

    private onSelect = (e: React.FormEvent<HTMLDivElement>): void => {
        this.props.onChoosePromo2view((e.target as any).id);
    };

    private onNewPromo = (): void => {
        this.props.onNewPromo();
    };
}
