import * as React from "react";
import {Button, Table} from "react-bootstrap";
import SVGInline from "react-svg-inline";
import {Checkbox} from "../../../common/components/Checkbox/Checkbox";
import {DropdownWicon} from "../../../common/components/DropdownWicon";
import {Color} from "../../../common/constants/Color";
import {PromoRewardType} from "../../../../../types/constants/PromoRewardType";
import {PromoStatus} from "../../../../../types/constants/PromoStatus";
import {ICompanyProduct, ICompanyPromo, IDropdownListValue} from "../../state";

interface IPromoTableProps {
    isHeader?: boolean;

    objectives?: any[];
    rewardTypes?: IDropdownListValue[];
    promos: ICompanyPromo[];
    companyProducts: ICompanyProduct[];

    onChoosePromo?: (promoId: string) => void;
    onSelectPromo?: (promoId: string) => void;
    onDeletePromoClick?: () => void;
    onNewPromo?: () => void;
    onPromoTableCheckboxClick: (itemId: string) => void;

    onFinishPromo?: (promoId: string) => void;
    onStartPromo?: (promoId: string) => void;
}

export class PromoTable extends React.Component<IPromoTableProps, {}> {
    constructor(props: IPromoTableProps) {
        super(props);
    }

    public render(): JSX.Element {
        const sortAsc: string = require("../../../../resources/icons/svg/sortAsc.svg");
        const action: string = require("../../../../resources/icons/svg/action.svg");
        const view: string = require("../../../../resources/icons/svg/visible.svg");
        const search: string = require("../../../../resources/icons/svg/search.svg");
        const loudspeaker: string = require("../../../../resources/icons/svg/loudspeaker.svg");
        const specialOffer: string = require("../../../../resources/icons/svg/specialOffer.svg");
        const trash: string = require("../../../../resources/icons/svg/trash.svg");
        const noImage: string = require("../../../../resources/icons/noImage.png");

        const rows: JSX.Element[] = [];
        const objectives: any[] = this.props.objectives;
        const rewardTypes: any[] = this.props.rewardTypes;

        let active: string = "";
        let objective: any;
        let rewardType: any;

        if (this.props.promos) {
            this.props.promos.map((item, index) => {
                active = item.checked ? "active" : "";

                let mainProductArr, separateProductArr;
                let mainProductObj, separateProductObj;

                mainProductArr = this.props.companyProducts.filter((productItem) => (
                    productItem._id === item.productId
                ));
                separateProductArr = this.props.companyProducts.filter((productItem) => (
                    productItem._id === item.separateProductId
                ));

                mainProductObj = mainProductArr.length ? mainProductArr[0] : "";
                separateProductObj = separateProductArr.length ? separateProductArr[0] : "";

                const mainProductImg = mainProductObj && mainProductObj.images.length ? mainProductObj.images[0] : noImage;
                const separateProductImg = separateProductObj && separateProductObj.images.length ? separateProductObj.images[0] : noImage;
                let statusColor;

                if (item.status === PromoStatus.ACTIVE) {
                    statusColor = Color.GREEN;
                } else {
                    statusColor = Color.GREY_LIGHT;
                }

                const rewardImg = item.rewardType === PromoRewardType.SEPARATE_PRODUCT && separateProductImg ? separateProductImg : noImage;
                const status = item.status;

                // get promo objective from constants
                objective = objectives.filter((objective) => {
                    return objective.subItems.filter((subItem) => {
                        return subItem.value === item.objective;
                    });
                });

                // get promo reward from constants
                rewardType = rewardTypes.filter((rewardType) => (
                    rewardType.value === item.rewardType
                ));
                let promoRewardName;
                if (rewardType.length) {
                    if (rewardType[0].value === "SPECIAL_OFFER") {
                        promoRewardName = rewardType[0].label;
                    } else {
                        promoRewardName = separateProductObj ? separateProductObj.name : "";
                    }
                } else {
                    promoRewardName = "";
                }

                rows.push(
                    <tr key={index}>
                        <td className={active}>
                            <Checkbox
                                small
                                id={item._id}
                                onChange={this.onChangeCheckbox}
                                disabled={false}
                                isChecked={item.checked}
                                onClick={this.onSelect}/>
                        </td>
                        <td className={"tablePromoNameCell " + active} id={item._id} onClick={this.onSelect}
                            style={{cursor: "pointer"}}>
                            <SVGInline
                                svg={loudspeaker} fill={statusColor} width="19px" height="18px"
                                className="companyTbl__table__company-img"/>{item.name}
                        </td>
                        <td className={active} id={item._id} onClick={this.onSelect}
                            style={{cursor: "pointer"}}>{status}</td>
                        <td className={active} id={item._id} onClick={this.onSelect}
                            style={{cursor: "pointer"}}>{objective.length ? objective[0].label : ""}</td>
                        <td className={"tablePromoNameCell " + active} id={item._id} onClick={this.onSelect}
                            style={{cursor: "pointer"}}>
                            <img src={mainProductImg} className="companyTbl__table__company-img"/>
                            {mainProductObj ? mainProductObj.name : ""}

                        </td>
                        <td className={"table-rewardType " + active} id={item._id} onClick={this.onSelect}
                            style={{cursor: "pointer"}}>
                            {
                                item.rewardType === PromoRewardType.SEPARATE_PRODUCT
                                    ? <img src={rewardImg} className="companyTbl__table__company-img"/>

                                    : <SVGInline svg={specialOffer} height="20px" width="20px"/>

                            }
                            {promoRewardName}
                        </td>
                        <td className={active} id={item._id} onClick={this.onSelect}
                            style={{cursor: "pointer"}}>{item.offerPhrase}</td>
                        <td className={active} id={item._id} onClick={this.onSelect}
                            style={{cursor: "pointer"}}>{item.type && item.type.toLowerCase()}
                        </td>
                        <td className={active} id={item._id} onClick={this.onSelect}
                            style={{cursor: "pointer"}}>{item.condition && item.condition.toLowerCase()}
                        </td>
                    </tr>);
            });
        }

        // switch headers between normal mode and new campaign creation mode
        const header = !this.props.isHeader ? <div className="mainBlock__header">
            <div className="mainBlock__header__text-wrapper">
                <SVGInline svg={loudspeaker} width="16px" height="16px" fill="#282D37"/>
                <span className="mainBlock__header__text">Promo campaigns</span>
            </div>
        </div> : "";

        let isActionEnabled: boolean = false;
        let isViewEnabled: boolean = false;

        for (const promo of this.props.promos) {
            isActionEnabled = isActionEnabled || promo.checked;

            isViewEnabled = isViewEnabled || (promo.checked && promo._id !== "0");
        }

        return (
            <div className="block__full-width">
                {header}

                <div className="mainBlock">
                    <div className="companyTbl__menu-wrapper">

                        <div className="companyTbl__menu__leftSide-block">
                            {/*// ======= ADD NEW PRODUCT BUTTON =============*/}
                            <div className="companyTbl__menu__AddBtn-wrapper">
                                <Button
                                    id="companyTbl__menu__AddBtn"
                                    onClick={this.props.onNewPromo}>
                                    {"+ Add New"}
                                </Button>
                            </div>

                            {/*// ======= FILTER BUTTON =============*/}
                            <div className="companyTbl__menu__filterBtn-wrapper">
                                <Button disabled className="companyTbl__menu__AllBtn grey_btn_blueColor grey_btn">
                                    {"All"}
                                </Button>
                                <Button disabled className="companyTbl__menu__Btn grey_btn">
                                    {"Active"}
                                </Button>
                                <Button disabled className="companyTbl__menu__Btn grey_btn">
                                    {"For Approval"}
                                </Button>
                                <Button disabled className="companyTbl__menu__Btn grey_btn">
                                    {"Draft"}
                                </Button>
                                <Button disabled className="companyTbl__menu__Btn grey_btn">
                                    {"Archive"}
                                </Button>
                                <Button disabled className="companyTbl__menu__Plusbtn grey_btn btn_label_fontSize16">
                                    {"+"}
                                </Button>
                            </div>
                        </div>

                        <div className="companyTbl__menu__rightSide-block">
                            {/*// ======= RIGHT PANEL BUTTON =============*/}
                            <div className="companyTbl__menu__rightSideBtn-wrapper">
                                <Button disabled={!isActionEnabled}
                                        className="companyTbl__menu__rightSideBtn__trash grey_btn"
                                        onClick={this.props.onDeletePromoClick}>
                                    <SVGInline svg={trash} width={"16px"} height={"16px"} fill={"#8d8d8d"}/>
                                </Button>

                                <DropdownWicon
                                    disabled
                                    className={"img_btnIcon"}
                                    id={"1"}
                                    icon={sortAsc}
                                    label={"Sort"}
                                    valuesArray={["Ascending", "Descending"]}
                                    isActive={false}/>

                                <DropdownWicon
                                    disabled={!isActionEnabled}
                                    className={"img_btnIcon"}
                                    id={"2"}
                                    icon={action}
                                    label={"Action"}
                                    valuesArray={["EDIT", "START", "FINISH"]}
                                    isActive={false}
                                    callback={this.onChoose2edit}
                                    onFinish={this.onFinish}
                                    onStart={this.onStart}/>

                                <DropdownWicon
                                    disabled={!isViewEnabled}
                                    className={"img_btnIcon"}
                                    id={"3"}
                                    icon={view}
                                    label={"View"}
                                    valuesArray={["VIEW"]}
                                    isActive={false}
                                    callback={this.onViewPromo}/>

                                <Button
                                    className="companyTbl__menu__rightSideBtn__search grey_btn"
                                    disabled>
                                    <SVGInline
                                        svg={search} alt="sort out" width="16px" height="16px" fill="#909090"
                                        className="img_btnIcon"/>
                                    <span className="btnLabel">Search</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="table-wrapper">
                        <Table className="companyTbl__table" striped={true}>
                            <thead>
                            <tr>
                                <th>
                                    <Checkbox
                                        disabled
                                        small
                                        // bsClass="table-checkbox"
                                        onChange={this.onChangeCheckbox}
                                        isChecked={false}/>
                                </th>
                                <th>{"Campaing name"}</th>
                                <th>{"Status"}</th>
                                <th>{"Main objective"}</th>
                                <th>{"Advertised object"}</th>
                                <th>{"Rewards"}</th>
                                <th>{"Main offer line"}</th>
                                <th>{"Promo type"}</th>
                                <th>{"Promo condition"}</th>
                            </tr>
                            </thead>
                            <tbody>
                            {rows}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        );
    }

    private onFinish = (): void => {
        const promos: ICompanyPromo[] = this.props.promos;

        for (const promo of promos) {
            if (promo.checked) {
                this.props.onFinishPromo(promo._id);
                break;
            }
        }
    };

    private onStart = (): void => {
        const promos: ICompanyPromo[] = this.props.promos;

        for (const promo of promos) {
            if (promo.checked) {
                this.props.onStartPromo(promo._id);
                break;
            }
        }
    };

    private onSelect = (e): void => {
        const id: string = (e.target as any).id;

        if (this.props.onSelectPromo) {
            this.props.onSelectPromo(id);
        }
    };

    private onChoose2edit = (): void => {
        const promos: ICompanyPromo[] = this.props.promos;

        for (const promo of promos) {
            if (promo.checked) {
                this.props.onChoosePromo(promo._id);
                break;
            }
        }
    };

    private onChangeCheckbox = (): void => {
        // do nothing
    };

    private onViewPromo = (): void => {
        for (const promo of this.props.promos) {
            if (promo.checked && promo._id !== "0") {
                this.props.onPromoTableCheckboxClick(promo._id);
            }
        }
    };
}
