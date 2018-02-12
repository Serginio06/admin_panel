import * as React from "react";
import SVGInline from "react-svg-inline";
import {Color} from "../../../common/constants/Color";
import {ICompanyPromo, IPromoPageState, IStepsState} from "../../state";
import {PromoStatus} from "../../../../../types/constants/PromoStatus";

interface IStatisticPanelProps {
    // isNew: boolean;

    promoPageState: IPromoPageState;
    promos: ICompanyPromo[];

    // onChoosePromo: (id: string) => void;
    // onNewPromo: () => void;
}

interface IStatisticPanelState {

}

export class StatisticPanel extends React.Component<IStatisticPanelProps, IStatisticPanelState> {
    public render(): JSX.Element {
        const loudspeaker: string = require("../../../../resources/icons/svg/loudspeaker.svg");

        const steps: IStepsState[] = this.props.promoPageState.steps;
        const currentStep: number = this.props.promoPageState.currentStep;
        // const promoSteps: JSX.Element = this.props.isNew || this.props.promoPageState.isEditable ? (
        //     <ul className={"promoPanel__ul"}>
        //         {steps.map((item, index) => {
        //             const stepClassName = (
        //                     item.isCompleted ? " actionCompleted " : " "
        //                 )
        //                 + (
        //                     currentStep === index ? " currentStep " : " "
        //                 ) + " promoPanel__steps ";
        //
        //             return <li key={index}
        //                        className={stepClassName}>
        //                 {item.name}
        //             </li>;
        //         })}
        //     </ul>
        // ) : <div/>;

        const currentTimestamp = Date.now ();
        const actives = this.props.promos.filter ((promo) => {
            return promo.status === PromoStatus.ACTIVE && currentTimestamp < promo.createdTimestamp + promo.time2Decide * 60 * 60 * 1000
        }),
            activesElem = [];

        actives.map((item, index) => {
            const selected: string = item._id === this.props.promoPageState._id ? "selected" : "";

            activesElem.push(
                <div key={index} className={"navPage__leftBar__Subcategory__text-item-wrapper " + selected}>
                    <span
                        className="navPage__leftBar__Subcategory__text-itemIcon">
                        <SVGInline svg={loudspeaker} fill={Color.GREEN} width="13px"
                                   className="img__smallIcon"/>
                    </span>
                    <div className="navPage__leftBar__Subcategory__text-items"
                         // onClick={this.onDraftClick}
                         id={item._id}>
                        {item.name}
                    </div>
                </div>,
            );
        });

        const drafts: ICompanyPromo[] = this.props.promos.filter((promo: ICompanyPromo) => (promo.status === PromoStatus.DRAFT));
        const draftsElem: JSX.Element[] = [];

        drafts.map((item, index) => {
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
                             // onClick={this.onDraftClick}
                             id={item._id}>
                            {item.name}
                        </div>
                    </div>,
                );
            }
        });

        const archive: ICompanyPromo[] = this.props.promos.filter((promo: ICompanyPromo) => {
                return currentTimestamp >= promo.createdTimestamp + promo.time2Decide * 60 * 60 * 1000;
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
                             // onClick={this.onDraftClick}
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
                        <h2>{"STATISTICS"}</h2>
                    </div>
                </div>
                <div className="navPage__leftBar__Subcategory__subsection-wrapper"
                     // style={{background: this.props.isNew ? "#1B1F26" : ""}}
                >
                    {/*<button className={`navPage__leftBar__Subcategory__addBtn ${this.props.isNew ? "active" : null}`}*/}
                            {/*// onClick={this.onNewPromo}*/}
                    {/*>*/}

                        {/*<div className="navPage__leftBar__Subcategory__text-Subcategory">*/}
                            {/*<h3><span>+</span>Create New</h3>*/}
                        {/*</div>*/}
                    {/*</button>*/}
                </div>

                {activesElem.length > 0 && (
                    <div>
                        <div className="navPage__leftBar__Subcategory__section-wrapper">
                            <div className="navPage__leftBar__Subcategory__text-title">
                                <h2 className="navPage__leftBar__Subtitle__text-title" >{"Active"}</h2>
                            </div>
                        </div>

                        <div className="navPage__leftBar__Subcategory__subsection-wrapper">
                            {activesElem}
                        </div>
                    </div>
                )}

                {false && // forApproval
                (
                    <div>
                        <div className="navPage__leftBar__Subcategory__section-wrapper">
                            <div className="navPage__leftBar__Subcategory__text-title">
                                <h2 className="navPage__leftBar__Subtitle__text-title" >{"For Approval"}</h2>
                            </div>
                        </div>

                        <div className="navPage__leftBar__Subcategory__subsection-wrapper">
                            {/*{drafts}*/}
                        </div>
                    </div>
                )}

                {draftsElem.length > 0 &&
                (
                    <div>
                        <div className="navPage__leftBar__Subcategory__section-wrapper">
                            <div className="navPage__leftBar__Subcategory__text-title">
                                <h2 className="navPage__leftBar__Subtitle__text-title" >{"Draft"}</h2>
                            </div>
                        </div>

                        <div className="navPage__leftBar__Subcategory__subsection-wrapper">
                            {draftsElem}
                        </div>
                    </div>
                )}

                {archivedElements.length > 0 &&
                (
                    <div>
                        <div className="navPage__leftBar__Subcategory__section-wrapper">
                            <div className="navPage__leftBar__Subcategory__text-title">
                                <h2 className="navPage__leftBar__Subtitle__text-title" >{"Archive"}</h2>
                            </div>
                        </div>

                        <div className="navPage__leftBar__Subcategory__subsection-wrapper">
                            {archivedElements}
                        </div>
                    </div>
                )}
                <div className="pannel__rights">© 2018 Treasure Systems, Inc.
                    All Rights Reserved</div>
            </div>
        );
    }

    // private onDraftClick = (e: React.FormEvent<HTMLDivElement>): void => {
    //     this.props.onChoosePromo((e.target as any).id);
    // };
    //
    // private onNewPromo = (): void => {
    //     this.props.onNewPromo();
    // };
    //
    // private onChoosePromo = (promoId: string): void => {
    //     this.props.onChoosePromo(promoId);
    // };
}
