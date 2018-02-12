import * as React from "react";
import {Button, Table} from "react-bootstrap";
import SVGInline from "react-svg-inline";
import {Checkbox} from "../../../common/components/Checkbox/Checkbox";
import {DropdownWicon} from "../../../common/components/DropdownWicon";
import {Color} from "../../../common/constants/Color";
import {cutLabel} from "../../../common/util";
import {ICompanyProduct} from "../../state";
import * as classNames from "classnames";

interface IProductTableProps {
    isNewPromo: string;

    chosenCategory: string;

    companyProducts?: ICompanyProduct[];

    onNewProduct?: () => void;
    onSelectProduct?: (productId: string) => void;
    onChooseProduct2Edit?: () => void;
    onDeleteProduct?: () => void;
}

export class ProductTable extends React.Component<IProductTableProps> {

    constructor(props: IProductTableProps) {
        super(props);
    }

    public render(): JSX.Element {
        const shoppingCart: string = require("../../../../resources/icons/svg/shopping-cart.svg"),
            sortAsc: string = require("../../../../resources/icons/svg/sortAsc.svg"),
            action: string = require("../../../../resources/icons/svg/action.svg"),
            view: string = require("../../../../resources/icons/svg/visible.svg"),
            search: string = require("../../../../resources/icons/svg/search.svg");
        const trash: string = require("../../../../resources/icons/svg/trash.svg");
        const noImage = require("../../../../resources/icons/noImage.png");

        const rows: JSX.Element[] = [];
        let active: string = "";
        if (this.props.companyProducts) {
            this.props.companyProducts.map((item: ICompanyProduct, index: number) => {
                active = item.checked ? "active" : "";
                const imgs: JSX.Element[] = [];
                let pic;
                for (let i: number = 1; i < item.images.length; i++) {
                    pic = item.images[i] || noImage;
                    imgs.push(<img key={i} src={pic} id={item._id} className="companyTbl__table__company-img"/>);
                }

                let logo: string = "";
                if (item.images.length) {
                    logo = item.images[0];
                }

                const type: string = classNames({Offline: item.isOffline}, {Online: item.isOnline});
                if (item.category === this.props.chosenCategory || this.props.chosenCategory === "" || this.props.chosenCategory === "All") {
                    rows.push(<tr key={index}>
                        <td className={active}>
                            <Checkbox
                                small
                                id={item._id}
                                onChange={this.onChangeCheckbox}
                                disabled={false}
                                isChecked={item.checked}/>
                        </td>
                        <td className={"tablePromoNameCell " + active} id={item._id} style={{cursor: "pointer"}}
                            onClick={this.onSelect}>
                            {
                                logo
                                    ? <img src={logo} id={item._id} className="companyTbl__table__company-img"/>
                                    : <SVGInline id={item._id} className="companyTbl__table__company-img" svg={shoppingCart}
                                                 fill={Color.GREY} width="20px" height="19px"/>
                            }
                            {cutLabel(item.name, 15)}
                        </td>
                        <td className={active} id={item._id} style={{cursor: "pointer"}}
                            onClick={this.onSelect}>{item.category}</td>
                        <td className={"td-product-imgs " + active} id={item._id} style={{cursor: "pointer"}}
                            onClick={this.onSelect}>{imgs}</td>
                        <td className={active} id={item._id} style={{cursor: "pointer"}}
                            onClick={this.onSelect}>{type}</td>
                        <td className={active} id={item._id} style={{cursor: "pointer"}}
                            onClick={this.onSelect}>{item.price}</td>
                        <td className={active} id={item._id} style={{cursor: "pointer"}}
                            onClick={this.onSelect}>{cutLabel(item.description, 20)}</td>
                        <td className={active} id={item._id} style={{cursor: "pointer"}}
                            onClick={this.onSelect}>{cutLabel(item.link, 15)}</td>
                    </tr>);
                }
            });
        }

        // switсh headers between normal mode and new campain creation mode
        const header = this.props.isNewPromo === "block" ? <div className="mainBlock__header">
            <div className="mainBlock__header__text-wrapper">
                <SVGInline svg={shoppingCart} width="20px" height="19px"/>
                <span className="mainBlock__header__text">Products/Services</span>
            </div>
        </div> : "";

        let isActionEnabled: boolean = false;
        for (const product of this.props.companyProducts) {
            isActionEnabled = isActionEnabled || product.checked;
        }

        return (
            <div className="block__full-width">

                {header}

                <div className="mainBlock">
                    <div className="companyTbl__menu-wrapper">

                        <div className="companyTbl__menu__leftSide-block">
                            {/*// ======= ADD NEW PRODUCT BUTTON =============*/}
                            <div className="companyTbl__menu__AddBtn-wrapper" style={{display: this.props.isNewPromo}}>
                                <Button id="companyTbl__menu__AddBtn"
                                        onClick={this.props.onNewProduct}>
                                    {"+ Add New"}
                                </Button>
                            </div>

                            {/*// ======= FILTER BUTTON =============*/}
                            <div className="companyTbl__menu__filterBtn-wrapper">
                                <Button disabled className="companyTbl__menu__AllBtn grey_btn_blueColor grey_btn">
                                    {"All"}
                                </Button>
                                <Button disabled className="companyTbl__menu__Btn grey_btn">
                                    {"Stickers"}
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
                                        onClick={this.props.onDeleteProduct}>
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
                                    valuesArray={["Edit"]}
                                    callback={this.props.onChooseProduct2Edit}
                                    isActive={false}/>

                                <DropdownWicon
                                    disabled
                                    className={"img_btnIcon"}
                                    id={"3"}
                                    icon={view}
                                    label={"View"}
                                    valuesArray={["Action 1", "Action 2"]}
                                    isActive={false}/>

                                <Button className="companyTbl__menu__rightSideBtn__search grey_btn"
                                        disabled>
                                    <SVGInline svg={search} width="16px" height="16px" fill="#909090"
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
                                        onChange={this.onChangeCheckbox}
                                        isChecked={false}/>
                                </th>
                                <th>{"Product/Service name"}</th>
                                <th>{"Category"}</th>
                                <th>{"Picture"}</th>
                                <th>{"Type"}</th>
                                <th>{"Price"}</th>
                                <th>{"Description"}</th>
                                <th>{"Link to store"}

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

    private onSelect = (e: React.FormEvent<any>): void => {
        const id: string = (e.target as any).id;

        if (this.props.onSelectProduct) {
            this.props.onSelectProduct(id);
        }
    };

    private onChangeCheckbox = (e) => {
        const id: string = (e.target as any).id;

        if (this.props.onSelectProduct) {
            this.props.onSelectProduct(id);
        }
    };
}
