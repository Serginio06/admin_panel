import * as block from "bem-cn";
import * as classnames from "classnames";
import * as React from "react";
import {Button, ButtonToolbar, Table} from "react-bootstrap";
import SVGInline from "react-svg-inline";
import {DropdownWicon} from "../../../common/components/DropdownWicon";
import {Color} from "../../../common/constants/Color";
import {Checkbox} from "../../../common/components/Checkbox/Checkbox";
import "./PromoStatisticsForm.scss";
import {PromoStatus} from "../../../../../types/constants/PromoStatus";

// const b = block("PromoStatisticsForm");

const shoppingCart = require("../../../../resources/icons/svg/shopping-cart.svg"),
    sortAsc = require("../../../../resources/icons/svg/sortAsc.svg"),
    action = require("../../../../resources/icons/svg/action.svg"),
    view = require("../../../../resources/icons/svg/visible.svg"),
    search = require("../../../../resources/icons/svg/search.svg"),
    chevronRight = require("../../../../resources/icons/svg/chevron-right.svg"),
    loudspeaker = require("../../../../resources/icons/svg/loudspeaker.svg"),
    trash = require("../../../../resources/icons/svg/trash.svg"),
    lineChart = require("../../../../resources/icons/svg/line-chart.svg"),
    specialOffer = require("../../../../resources/icons/svg/specialOffer.svg");

interface IPromoStatisticsFormProps {
    statistics: any[];
}

export class PromoStatisticsForm extends React.Component<IPromoStatisticsFormProps, {}> {
    public static defaultProps = {
        statistics: [],
    };

    constructor(props) {
        super(props);
    }

    public render() {
        const active: string = "";
        const promoStatistics = this.props.statistics,
            rows = [];

        promoStatistics.forEach((item, index) => {
            let statusColor;

            if (item.status === PromoStatus.ACTIVE) {
                statusColor = Color.GREEN;
            } else {
                statusColor = Color.GREY_LIGHT;
            }

            rows.push(<tr key={index}>
                <td className={active}>

                    <Checkbox
                        // bsClass="table-checkbox"
                        small
                        // onChange={this.onChangeCheckbox}
                        disabled={false}
                        // isChecked={item.checked}
                        // onClick={this.onPromoTableCheckboxClick.bind(this, item._id)}
                    />
                </td>
                <td className={"tablePromoNameCell " + active}>
                    <SVGInline
                        svg={loudspeaker} fill={statusColor} width="19px" height="18px"
                        className="companyTbl__table__company-img"/>{item.name}
                </td>
                <td>{item.status}</td>
                <td>{item.acquisitions}</td>
                <td>{item.rejections}</td>
                <td>{item.saves}</td>
                <td>{item.views}</td>
                <td>{item.activates}</td>
                <td>{item.companyInfoShows}</td>
                <td>{item.shares}</td>
            </tr>);
        });

        const header = <div className="mainBlock__header">
            <div className="mainBlock__header__text-wrapper">
                <SVGInline svg={lineChart} width="16px" height="16px" fill="#282D37"/>
                <span className="mainBlock__header__text">Statistics</span>
            </div>
        </div>

        return (<div className="block__full-width PromoStatisticsForm">
            {/*<div className={b("header")()}>*/}
            {/*<div className={b("header-text-wrapper")()}>*/}
            {/*<SVGInline svg={lineChart} width="20px"/>*/}
            {/*<span className={"mainBlock__header__text"}>*/}
            {/*{"Statistics"}*/}
            {/*</span>*/}
            {/*</div>*/}
            {/*</div>*/}

            {header}

            <div className="mainBlock">
                <div className="companyTbl__menu-wrapper">
                    {/*<div className={b("toolbar")()}>*/}
                        <div className="companyTbl__menu__leftSide-block">
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
                                <Button disabled className="companyTbl__menu__rightSideBtn__trash grey_btn">
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
                                    disabled
                                    className={"img_btnIcon"}
                                    id={"2"}
                                    icon={action}
                                    label={"Action"}
                                    valuesArray={["Action 1", "Action 2"]}
                                    isActive={false}/>

                                <DropdownWicon
                                    disabled
                                    className={"img_btnIcon"}
                                    id={"3"}
                                    icon={view}
                                    label={"View"}
                                    valuesArray={["Action 1", "Action 2"]}
                                    isActive={false}/>

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
                    {/*</div>*/}

                    {/*<ButtonToolbar className={b("selectPanel")()}>*/}
                    {/*<Button>All</Button>*/}
                    {/*<Button>Active</Button>*/}
                    {/*<Button>For Approval</Button>*/}
                    {/*<Button>Draft</Button>*/}
                    {/*<Button>Archive</Button>*/}
                    {/*<Button className="plus">+</Button>*/}
                    {/*</ButtonToolbar>*/}
                    {/*<ButtonToolbar className={b("sortPanel")()}>*/}
                    {/*<Button disabled className={classnames(b("sortPanel__trash")(), "grey_btn")}>*/}
                    {/*<SVGInline*/}
                    {/*svg={trash}*/}
                    {/*width="15px"*/}
                    {/*height="20px"*/}
                    {/*fill={Color.GREY_LIGHT}*/}
                    {/*className="img_btnIcon"/>*/}
                    {/*</Button>*/}

                    {/*<DropdownWicon*/}
                    {/*disabled*/}
                    {/*id={"1"}*/}
                    {/*icon={sortAsc}*/}
                    {/*label={"Sort"}*/}
                    {/*valuesArray={["Ascending", "Descending"]}*/}
                    {/*isActive={false}/>*/}

                    {/*<DropdownWicon*/}
                    {/*disabled*/}
                    {/*id={"2"}*/}
                    {/*icon={action}*/}
                    {/*label={"Action"}*/}
                    {/*valuesArray={["Action 1", "Action 2"]}*/}
                    {/*isActive={false}/>*/}

                    {/*<DropdownWicon*/}
                    {/*disabled*/}
                    {/*id={"3"}*/}
                    {/*icon={view}*/}
                    {/*label={"View"}*/}
                    {/*valuesArray={["Action 1", "Action 2"]}*/}
                    {/*isActive={false}/>*/}

                    {/*<Button*/}
                    {/*className="companyTbl__menu__rightSideBtn__search grey_btn"*/}
                    {/*disabled>*/}
                    {/*<SVGInline*/}
                    {/*svg={search}*/}
                    {/*width="15px"*/}
                    {/*height="20px"*/}
                    {/*fill={Color.GREY_LIGHT}*/}
                    {/*className="img_btnIcon"/>*/}
                    {/*{"Search"}*/}
                    {/*</Button>*/}
                    {/*</ButtonToolbar>*/}
                </div>
                <div className="table-wrapper">
                    <Table className="companyTbl__table" striped>
                        <thead>
                        <tr>
                            <th>
                                <Checkbox
                                    disabled
                                    small
                                    isChecked={false}/>
                            </th>
                            <th>{"CAMPAIGN NAME"}</th>
                            <th>{"STATUS"}</th>
                            <th>{"ACQUISITIONS"}</th>
                            <th>{"REJECTIONS"}</th>
                            <th>{"SAVES"}</th>
                            <th>{"VIEWS"}</th>
                            <th>{"ACTIVATIONS"}</th>
                            <th>{"COMPANY'S INFO VIEW"}</th>
                            <th>{"SHARES"}</th>
                        </tr>
                        </thead>

                        <tbody>
                        {rows}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>);
    }
}
