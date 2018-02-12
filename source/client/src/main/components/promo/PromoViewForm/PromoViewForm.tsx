import * as React from "react";
import {Button} from "react-bootstrap";
import SVGInline from "react-svg-inline";
import {Label} from "../../../../common/components/Label";
import {Color} from "../../../../common/constants/Color";
import {ICompanyProduct, ICompanyPromo, IDropdownListValue, IPromoPageState} from "../../../state";
import {PromoCard} from "../PromoCard";
import {PromoRewardType} from "../../../../../../types/constants/PromoRewardType";
import {IPromoStatistics} from "../../../../../../types/entity";
import "./PromoViewForm.scss";
import * as classNames from "classnames";
import * as block from "bem-cn";
import {PromoStatus} from "../../../../../../types/constants/PromoStatus";
import {PromoConfirmationPopup} from "../PromoConfirmationPopup";
import {isNotReadyForApproval} from "../../../util/promoValidationUtil";

const loudspeaker: string = require("../../../../../resources/icons/svg/loudspeaker.svg");
const specialOffer: string = require("../../../../../resources/icons/svg/specialOffer.svg");
const b = block("PromoViewForm");

interface IPromoViewFormProps {
    logo: string,
    name: string,

    promoPageState: IPromoPageState;

    statistics: IPromoStatistics[];
    companyProducts: ICompanyProduct[];
    rewardTypes: IDropdownListValue[];
    objectives: any[];

    onFinishPromo: (promoId: string) => void;
    onStartPromo: (promoId: string) => void;
    onChoosePromo: (promoId: string) => void;
}

interface IPromoViewFormState {
    isPopupVisible: boolean;
}

export class PromoViewForm extends React.Component<IPromoViewFormProps, IPromoViewFormState> {
    constructor(props: IPromoViewFormProps) {
        super(props);
        this.state = {
            isPopupVisible: false,
        };
    };

    public render(): JSX.Element {
        const pageState: IPromoPageState = this.props.promoPageState;
        const companyProducts: ICompanyProduct[] = this.props.companyProducts;
        const separateProductArr: ICompanyProduct[] = companyProducts.filter((productItem: ICompanyProduct) => (
            productItem._id === pageState.separateProductId
        ));

        const separateProductObj: ICompanyProduct = separateProductArr.length ? separateProductArr[0] : null;
        const separateProductImg: string = separateProductObj && separateProductObj.images.length ? separateProductObj.images[0] : null;

        let targetProduct: ICompanyProduct = null;

        if (pageState.productId) {
            for (const product of companyProducts) {
                if (product._id === pageState.productId) {
                    targetProduct = product;
                    break;
                }
            }
        }

        const rewardTypes: IDropdownListValue[] = this.props.rewardTypes.filter((rewardType: IDropdownListValue) => (
            rewardType.value === pageState.rewardType
        ));
        const rewardTypeName: string = rewardTypes.length ? rewardTypes[0].label : "";
        const rewardImg: JSX.Element = pageState.rewardType === PromoRewardType.SPECIAL_OFFER
            ? (separateProductImg ? <img src={separateProductImg} alt="separateProductImg "/> : null)
            : <SVGInline svg={specialOffer} width="24px"/>;
        const valueSign: string = pageState.rewardType === PromoRewardType.SEPARATE_PRODUCT ? "$" : "%";

        let objectiveItem: any = this.props.objectives.map((objective) => {
            const item = objective.subItems.filter((subItem) => {
                return subItem.value === pageState.objective;
            });
            return item.length > 0 ? item[0] : null;
        });

        objectiveItem = objectiveItem.length && objectiveItem.filter((item) => (item !== null));

        const objectiveName: string = objectiveItem.length ? objectiveItem[0].label : "";

        let stat: any = {};
        for (const s of this.props.statistics) {
            if (s.promoId === pageState._id) {
                stat = s;
                break;
            }
        }

        const isDraft: boolean = this.props.promoPageState.status === PromoStatus.DRAFT;
        const finishDisabled: boolean = this.props.promoPageState.status === PromoStatus.EXPIRED;

        console.error(isDraft)
        console.error(isNotReadyForApproval(this.props.promoPageState))

        const readyLabel: JSX.Element = isDraft && !isNotReadyForApproval(this.props.promoPageState) ? <div className="for-approval-text">{`READY FOR APPROVAL`}</div> : null;

        const leftButtonItem: JSX.Element = isDraft ?
            <Button className="black__btn btn-w30"
                    onClick={this.onEditClick}>
                {`Edit`}
            </Button>
            :
            <div className="mainBlock__header__inputBtn__status-wrapper" style={{
                color: PromoViewForm.getColorBtStatus(this.props.promoPageState.status as PromoStatus),
            }}>
                {this.props.promoPageState.status.toString().toUpperCase()}
            </div>;

        const rightButtonItem: JSX.Element = isDraft ?
            <Button className="black__btn btn-w30"
                    onClick={this.onSendForApprovalClick}>
                {`Send for Approval`}
            </Button>
            :
            <Button disabled={finishDisabled}
                    className="black__btn btn-w30"
                    onClick={this.onFinishClick}>
                {`Finish`}
            </Button>;

        const confirmationPopup: JSX.Element = (
            <PromoConfirmationPopup
                onCancelButtonClick={this.onCancelButtonClick}
                onRegisterPromo={this.onStartPromo}
                show={this.state.isPopupVisible}
                name={pageState.name}
            />
        );

        return (
            <div className={classNames(b(), "block__full-width")}>
                {confirmationPopup}
                <div className="mainBlock__header">
                    <div className="mainBlock__header__text-wrapper">
                        <SVGInline svg={loudspeaker} fill={Color.GREY_DARK} width="16px" className="img__midIcon"/>
                        <span className="mainBlock__header__text">
                            {"Promo Campaign"}
                        </span>
                    </div>

                    <div className="mainBlock__header__inputBtn-wrapper">
                        {readyLabel}
                        {leftButtonItem}
                        {rightButtonItem}
                    </div>
                </div>

                <div className="promoRegForm__form-wrapper">
                    <div className="productRegForm__formInputs-wrapper">

                        <div className="promoViewForm__row2">
                            <div className="promoViewForm_33percent">
                                <h6>{`Details`}</h6>

                                <div className="promoCol_100percent">

                                    <div className="promoCol_50percent">
                                        <Label
                                            title={"CAMPAIGN NAME"}
                                            text={pageState.name}/>

                                        <Label
                                            title={"ADVERTISED OBJECT"}
                                            text={targetProduct ? targetProduct.name : ""}
                                            picSrc={targetProduct ? targetProduct.images[0] : ""}
                                        />

                                        <Label
                                            title={"REWARD"}
                                            text={separateProductObj && separateProductObj.name ? rewardTypeName + " - " + separateProductObj.name : rewardTypeName}
                                            picSrc={rewardImg}/>

                                    </div>

                                    <div className="promoCol_50percent">

                                        <Label
                                            title={"MAIN OBJECTIVE"}
                                            text={objectiveName}/>

                                        <Label
                                            title={"PROMO TYPE"}
                                            text={pageState.type}/>

                                        <Label
                                            title={"PROMO VALUE"}
                                            text={pageState.value + " " + valueSign}/>
                                    </div>
                                </div>
                            </div>

                            <div className="promoViewForm_25percent">
                                <h5>{pageState.name}</h5>
                                <PromoCard
                                    condition={pageState.condition}
                                    logo={this.props.logo}
                                    name={this.props.name}
                                    product={targetProduct}
                                    offerPhrase={pageState.offerPhrase}
                                    about={pageState.about}
                                    type={pageState.type}
                                    value={pageState.value}
                                    valueSign={valueSign}
                                    time={pageState.time2Decide}
                                    discount={pageState.discount}
                                    newPrice={pageState.priceAfterDiscount}
                                />

                            </div>
                            <div className="promoViewForm_33percent">
                                <h6>{`Result`}</h6>

                                <div className="promoCol_100percent">
                                    <div className="promoCol_50percent">
                                        <Label
                                            title={"ACQUISITIONS"}
                                            text={stat.acquisitions}/>

                                        <Label
                                            title={"REJECTIONS"}
                                            text={stat.rejections}/>

                                        <Label
                                            title={"SAVES"}
                                            text={stat.saves}/>
                                    </div>

                                    <div className="promoCol_50percent">
                                        <Label
                                            title={"VIEWS"}
                                            text={stat.views}/>

                                        <Label
                                            title={"ACTIVATIONS"}
                                            text={stat.activates}/>

                                        <Label
                                            title={"COMPANY INFO SHOWS"}
                                            text={stat.companyInfoShows}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private onFinishClick = (): void => {
        this.props.onFinishPromo(this.props.promoPageState._id);
    };

    private onEditClick = (): void => {
        this.props.onChoosePromo(this.props.promoPageState._id);
    };

    private onSendForApprovalClick = (): void => {
        this.setState({
            isPopupVisible: true,
        });
    };

    private onStartPromo = (): void => {
        this.props.onStartPromo(this.props.promoPageState._id);
    };

    private onCancelButtonClick = (): void => {
        if (this.state.isPopupVisible) {
            this.setState({
                isPopupVisible: false,
            });
        }
    };

    private static getColorBtStatus(status: PromoStatus) {
        switch (status) {
            case PromoStatus.ACTIVE:
                return Color.GREEN;
            case PromoStatus.EXPIRED:
                return Color.RED;
            case PromoStatus.DRAFT:
                return Color.GREY;
            case PromoStatus.FOR_APPROVAL:
                return Color.YELLOW;
            default:
                return Color.BLACK;
        }
    }
}
