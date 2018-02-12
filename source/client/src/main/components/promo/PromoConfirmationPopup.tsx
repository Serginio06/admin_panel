import * as React from "react";
import {Button, Modal} from "react-bootstrap";
import SVGInline from "react-svg-inline";

interface IPromoConfirmationPopupProps {
    show: boolean;

    name: string;

    onRegisterPromo: () => void;
    onCancelButtonClick: () => void;
    onModalHide?: () => void;
}

export class PromoConfirmationPopup extends React.Component<IPromoConfirmationPopupProps, {}> {
    constructor(props: IPromoConfirmationPopupProps) {
        super(props);
    }

    public render(): JSX.Element {
        const diamond: string = require("../../../../resources/icons/svg/diamondWhite.svg");
        const cancelCross: string = require("../../../../resources/icons/svg/cancel-cross.svg");

        return (
            <Modal id="PromoConfirmationPopup" show={this.props.show} onHide={this.props.onModalHide}>
                <div className="form-wrapper">
                    <div className="form__header">
                        <div className="form__header__cancelBtn-wrapper">
                            <button className="form__header__cancelBtn"
                                    onClick={this.props.onCancelButtonClick}>
                                <SVGInline svg={cancelCross} className="form__header__logo-img" width="13px" height="13px"/>
                            </button>
                        </div>

                        <div className="form__header__logo-wrapper">
                            <SVGInline svg={diamond} className="form__header__logo-img" width="31px" height="32px"/>
                            <div className="form__header__logo__siteName-wrapper">
                                <div className="form__header__logo__siteName__topRow">{`treasure`}</div>
                                <div className="form__header__logo__siteName__bottomRow">{`systems`}</div>
                            </div>
                        </div>
                        <div className="promo-confirmation-popup-wrapper">
                            <span className="promo-confirmation-popup-text-uppercase">SEND PROMO CAMPAIGN</span>
                            <span className="promo-confirmation-popup-text-lowercase">RichBit Stickers Promo</span>
                            <span className="promo-confirmation-popup-text-uppercase">TO TREASURE ADMIN FOR REVIEW?</span>

                            {/*<h1 className="modal-header">{`Send Promo ${this.props.name} to treasure admin for review?`}</h1>*/}
                        </div>
                    </div>

                    <div className="form__content-wrapper">
                        <div className="form__content__inputBtn-wrapper" >
                            <Button className="white__btn form__content__actionBtn"
                                    onClick={this.onRegisterPromo}
                            >
                                {"SEND"}
                            </Button>

                            <Button className="black__btn form__content__actionBtn"
                                    onClick={this.props.onCancelButtonClick}
                            >
                                {"Cancel"}
                            </Button>
                            <span className="promo-confirmation-popup-terms">As soon as the Promo Campaign would be approved by
specialist you’ll receive a message and this
Promo Campaign will get status “Ready to Start”</span>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }

    private onRegisterPromo = (): void => {
        this.props.onCancelButtonClick();
        this.props.onRegisterPromo();
    }

}
