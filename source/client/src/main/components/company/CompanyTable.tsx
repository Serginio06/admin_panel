import * as React from "react";
import {Button, Table} from "react-bootstrap";
import SVGInline from "react-svg-inline";
import {Checkbox} from "../../../common/components/Checkbox/Checkbox";
import {DropdownWicon} from "../../../common/components/DropdownWicon";
import {cutLabel} from "../../../common/util";
import {IUserCompany} from "../../state";

export interface IComponentProps {
    userCompanies: IUserCompany[];

    onNewCompany: () => void;
    onSelectCompany: (companyId: string) => void;
    onChooseCompany2Edit: () => void;
    onDeleteCompany: () => void;
}

export interface IComponentState {
}

export class CompanyTable extends React.Component<IComponentProps, IComponentState> {
    constructor(props: IComponentProps) {
        super(props);
    }

    public render(): JSX.Element {
        const suiteCaseDark = require("../../../../resources/icons/svg/suiteCase.svg");
        const sortAsc = require("../../../../resources/icons/svg/sortAsc.svg");
        const action = require("../../../../resources/icons/svg/action.svg");
        const view = require("../../../../resources/icons/svg/visible.svg");
        const search = require("../../../../resources/icons/svg/search.svg");
        const trash = require("../../../../resources/icons/svg/trash.svg");
        const noImage = require("../../../../resources/icons/noImage.png");

        let editEnabled: boolean = false;

        const rows: JSX.Element[] = [];
        let active: string;
        let pic: string;
        let categoryName: string = "";
        let subCategoryName: string = "";

        if (this.props.userCompanies) {
            this.props.userCompanies.map((item, index) => {
                editEnabled = editEnabled || item.checked;
                active = item.checked ? "active" : "";
                pic = item.logo || noImage;
                if (item.generalCategory && item.subcategory) {
                    categoryName = item.generalCategory.name;
                    subCategoryName = item.subcategory.name;
                } else if (item.category) {
                    categoryName = item.category.name;
                    subCategoryName = item.category.subcategories.length ? item.category.subcategories[0].name : "";
                }

                rows.push(<tr key={index}>
                    <td className={active} style={{cursor: "pointer"}} >
                        <Checkbox
                            small
                            id={item._id}
                            onChange={this.onChangeCheckbox}
                            disabled={false}
                            isChecked={item.checked}/>
                    </td>
                    <td id={item._id} className={active} style={{cursor: "pointer"}} onClick={this.onSelect}>
                        <img id={item._id} src={pic} className="companyTbl__table__company-img"/>
                        {cutLabel(item.name, 15)}
                    </td>

                    <td id={item._id} style={{cursor: "pointer"}} onClick={this.onSelect} className={active}>{categoryName}</td>
                    <td id={item._id} style={{cursor: "pointer"}} onClick={this.onSelect} className={active}>{subCategoryName}</td>

                    <td id={item._id} style={{cursor: "pointer"}} onClick={this.onSelect} className={active}>{cutLabel(item.webAddress, 15)}</td>
                    <td id={item._id} style={{cursor: "pointer"}} onClick={this.onSelect} className={active}>{cutLabel(item.email, 15)}</td>
                    <td id={item._id} style={{cursor: "pointer"}} onClick={this.onSelect} className={active}>{item.phone}</td>
                    <td id={item._id} style={{cursor: "pointer"}} onClick={this.onSelect} className={active}>{item.locationName && item.locationName}</td>
                </tr>);
            });
        }

        let deleteDisabled: boolean = false;
        for (const company of this.props.userCompanies) {
            deleteDisabled = deleteDisabled || company.checked;
        }

        return (
            <div className="block__full-width">
                <div className="mainBlock__header">
                    <div className="mainBlock__header__text-wrapper">
                        <SVGInline svg={suiteCaseDark} width="20px" height="16px"/>
                        <span className="mainBlock__header__text">
                            {"Companies"}
                        </span>
                    </div>
                </div>
                <div className="mainBlock">
                    <div className="companyTbl__menu-wrapper">

                        <div className="companyTbl__menu__leftSide-block">
                            <div className="companyTbl__menu__AddBtn-wrapper">
                                <Button
                                    id="companyTbl__menu__AddBtn"
                                    onClick={this.props.onNewCompany}>
                                    {"+ Add New"}
                                </Button>
                            </div>

                            <div className="companyTbl__menu__filterBtn-wrapper">
                                <Button disabled className="companyTbl__menu__AllBtn grey_btn_blueColor grey_btn">
                                    {"All"}
                                </Button>
                                <Button disabled className="companyTbl__menu__Plusbtn grey_btn">
                                    {"+"}
                                </Button>
                            </div>
                        </div>

                        <div className="companyTbl__menu__rightSide-block">
                            <div className="companyTbl__menu__rightSideBtn-wrapper">
                                <Button disabled={!deleteDisabled}
                                        className="companyTbl__menu__rightSideBtn__trash grey_btn"
                                        onClick={this.props.onDeleteCompany}>
                                    <SVGInline svg={trash} width={"16px"} height={"16px"} fill={"#8d8d8d"}/>
                                </Button>

                                <DropdownWicon
                                    className={"img_btnIcon"}
                                    disabled
                                    id={"1"}
                                    icon={sortAsc}
                                    label={"Sort"}
                                    isActive={false} valuesArray={["Ascending", "Descending"]}/>

                                <DropdownWicon
                                    disabled={!editEnabled}
                                    className={"img_btnIcon"}
                                    id={"2"}
                                    icon={action}
                                    label={"Action"}
                                    valuesArray={["Edit"]}
                                    callback={this.props.onChooseCompany2Edit}
                                    isActive={false}/>

                                <DropdownWicon
                                    className={"img_btnIcon"}
                                    disabled
                                    id={"3"}
                                    icon={view}
                                    label={"View"}
                                    valuesArray={["Action 1", "Action 2"]}
                                    isActive={false}/>

                                <Button className="companyTbl__menu__rightSideBtn__search grey_btn" disabled>

                                    <SVGInline
                                        className={"img_btnIcon"} svg={search} fill="#909090" width="16px"
                                        height="16px"/>
                                    <span className="btnLabel">Search</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="table-wrapper">
                        <Table className="companyTbl__table" striped>
                            <thead>
                                <tr>
                                    <th>
                                        <Checkbox
                                            disabled
                                            small
                                            onChange={this.onChangeCheckbox}
                                            isChecked={false}/>
                                    </th>
                                    <th>{"Company name"}</th>
                                    <th>{"General category"}</th>
                                    <th>{"Sub category"}</th>
                                    <th>{"Web address"}</th>
                                    <th>{"Email"}</th>
                                    <th>{"Phone number"}</th>
                                    <th>{"Local address"}
                                    </th>
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

    private onChangeCheckbox = (e: any): void => {
        const id: string = (e.target as any).id;

        this.props.onSelectCompany(id);
    };

    private onSelect = (e: React.FormEvent<any>): void => {
        const id: string = (e.target as any).id;

        this.props.onSelectCompany(id);
    }
}
